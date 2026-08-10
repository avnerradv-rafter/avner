import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import {
  startRegistration,
  verifyRegistrationOTP,
  confirmTOTPSetup,
  startLogin,
  verifyLogin,
  scheduleAccountDeletion,
} from '../services/auth.service';
import { consumeRefreshToken, invalidateRefreshToken, signAccessToken } from '../services/token.service';
import { authenticate } from '../middleware/auth.middleware';
import { audit, getClientIP } from '../middleware/audit.middleware';

// ── Zod input schemas ──────────────────────────────────────────────────────────

const phoneSchema = z.string().regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number format');
const otpCodeSchema = z.string().length(6).regex(/^\d+$/, 'OTP must be 6 digits');
const totpCodeSchema = z.string().min(6).max(8).regex(/^\d+$/, 'TOTP must be numeric');
const requestIdSchema = z.string().length(32).regex(/^[0-9a-f]+$/, 'Invalid requestId');

const RegisterBody = z.object({ phone: phoneSchema });
const VerifyOTPBody = z.object({ requestId: requestIdSchema, code: otpCodeSchema });
const ConfirmTOTPBody = z.object({ userId: z.string().uuid(), totpCode: totpCodeSchema });
const LoginBody = z.object({ phone: phoneSchema });
const LoginVerifyBody = z.object({
  requestId: requestIdSchema,
  otpCode: otpCodeSchema,
  totpCode: totpCodeSchema,
});
const RefreshBody = z.object({ refreshToken: z.string().min(10) });
const LogoutBody = z.object({ refreshToken: z.string().min(10) });
const DeleteAccountBody = z.object({ totpCode: totpCodeSchema });

// ── Route plugin ───────────────────────────────────────────────────────────────

export async function authRoutes(fastify: FastifyInstance): Promise<void> {
  // ── Registration ────────────────────────────────────────────────────────────

  fastify.post('/register', {
    config: { rateLimit: { max: 5, timeWindow: '15m' } },
    handler: async (request, reply) => {
      const body = RegisterBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: body.error.errors[0]?.message });

      const result = await startRegistration(body.data.phone);
      if ('error' in result) {
        // Timing-safe: return same response shape to prevent user enumeration
        if (result.error === 'already_registered') {
          audit({ action: 'register_duplicate', ip: getClientIP(request) });
          // Deliberately ambiguous response
          return reply.status(200).send({ success: true, requestId: 'rate-limited' });
        }
      }

      audit({ action: 'register_otp_sent', ip: getClientIP(request) });
      return reply.status(200).send({ success: true, requestId: (result as { requestId: string }).requestId });
    },
  });

  fastify.post('/register/verify-otp', {
    config: { rateLimit: { max: 10, timeWindow: '15m' } },
    handler: async (request, reply) => {
      const body = VerifyOTPBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: body.error.errors[0]?.message });

      const result = await verifyRegistrationOTP(body.data.requestId, body.data.code);
      if (!result.success) {
        audit({ action: 'register_otp_failed', metadata: { error: result.error }, ip: getClientIP(request) });
        return reply.status(400).send({ success: false, error: result.error });
      }

      audit({ action: 'register_otp_verified', userId: result.userId, ip: getClientIP(request) });
      return reply.status(200).send({ success: true, userId: result.userId, totpUri: result.totpUri });
    },
  });

  fastify.post('/register/confirm-totp', {
    config: { rateLimit: { max: 10, timeWindow: '15m' } },
    handler: async (request, reply) => {
      const body = ConfirmTOTPBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: body.error.errors[0]?.message });

      const result = await confirmTOTPSetup(body.data.userId, body.data.totpCode);
      if (!result.success) {
        audit({ action: 'totp_setup_failed', userId: body.data.userId, ip: getClientIP(request) });
        return reply.status(400).send({ success: false, error: result.error });
      }

      audit({ action: 'totp_setup_complete', userId: body.data.userId, ip: getClientIP(request) });
      return reply.status(200).send({
        success: true,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    },
  });

  // ── Login ────────────────────────────────────────────────────────────────────

  fastify.post('/login', {
    config: { rateLimit: { max: 10, timeWindow: '15m' } },
    handler: async (request, reply) => {
      const body = LoginBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: body.error.errors[0]?.message });

      const result = await startLogin(body.data.phone);
      if ('error' in result) {
        audit({ action: 'login_not_found', ip: getClientIP(request) });
        // Deliberately ambiguous — same response whether user exists or not
        return reply.status(200).send({ success: true, requestId: 'not-found' });
      }

      audit({ action: 'login_otp_sent', ip: getClientIP(request) });
      return reply.status(200).send({ success: true, requestId: result.requestId });
    },
  });

  fastify.post('/login/verify', {
    config: { rateLimit: { max: 10, timeWindow: '15m' } },
    handler: async (request, reply) => {
      const body = LoginVerifyBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: body.error.errors[0]?.message });

      const result = await verifyLogin(body.data.requestId, body.data.otpCode, body.data.totpCode);
      if (!result.success) {
        audit({ action: 'login_failed', metadata: { reason: result.error }, ip: getClientIP(request) });
        return reply.status(401).send({ success: false, error: 'Authentication failed' });
      }

      audit({ action: 'login_success', ip: getClientIP(request) });
      return reply.status(200).send({
        success: true,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    },
  });

  // ── Token management ─────────────────────────────────────────────────────────

  fastify.post('/token/refresh', {
    config: { rateLimit: { max: 30, timeWindow: '15m' } },
    handler: async (request, reply) => {
      const body = RefreshBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: 'Invalid request' });

      const result = await consumeRefreshToken(body.data.refreshToken);
      if (!result) {
        return reply.status(401).send({ success: false, error: 'Invalid or expired refresh token' });
      }

      const accessToken = signAccessToken(result.userId);
      return reply.status(200).send({
        success: true,
        accessToken,
        refreshToken: result.newRefreshToken,
      });
    },
  });

  fastify.post('/logout', {
    preHandler: authenticate,
    handler: async (request, reply) => {
      const body = LogoutBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: 'Invalid request' });

      await invalidateRefreshToken(body.data.refreshToken);
      audit({ action: 'logout', userId: request.userId, ip: getClientIP(request) });
      return reply.status(200).send({ success: true });
    },
  });

  // ── Account management ───────────────────────────────────────────────────────

  fastify.delete('/account', {
    preHandler: authenticate,
    config: { rateLimit: { max: 3, timeWindow: '1h' } },
    handler: async (request, reply) => {
      const body = DeleteAccountBody.safeParse(request.body);
      if (!body.success) return reply.status(400).send({ success: false, error: body.error.errors[0]?.message });

      const result = await scheduleAccountDeletion(request.userId, body.data.totpCode);
      if (!result.success) {
        audit({ action: 'account_delete_failed', userId: request.userId, ip: getClientIP(request) });
        return reply.status(400).send({ success: false, error: result.error });
      }

      audit({ action: 'account_delete_scheduled', userId: request.userId, ip: getClientIP(request) });
      return reply.status(200).send({ success: true, message: 'Account scheduled for deletion in 30 days' });
    },
  });
}
