import * as crypto from 'crypto';
import { hashPhone } from '@safeconnect/encryption-lib';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { createOTP, verifyOTP } from './otp.service';
import { generateTOTPSecret, getTOTPUri, verifyTOTP } from './totp.service';
import { signAccessToken, issueRefreshToken } from './token.service';

// ── Registration ───────────────────────────────────────────────────────────────

/**
 * Step 1: Send OTP to verify phone ownership.
 * Returns a requestId; the phone number itself is never stored.
 */
export async function startRegistration(
  phone: string,
): Promise<{ requestId: string } | { error: 'already_registered' }> {
  const phoneHash = hashPhone(phone, env.PHONE_HASH_SECRET);

  const existing = await prisma.user.findUnique({ where: { phoneHash } });
  if (existing) return { error: 'already_registered' };

  const requestId = await createOTP(phone, phoneHash);
  return { requestId };
}

/**
 * Step 2: Verify OTP → create user → return TOTP setup URI.
 */
export async function verifyRegistrationOTP(
  requestId: string,
  code: string,
): Promise<
  | { success: true; userId: string; totpUri: string }
  | { success: false; error: string }
> {
  const result = await verifyOTP(requestId, code);
  if (!result.valid) return { success: false, error: result.error };

  const { phoneHash } = result;

  // Guard against race: re-check after OTP consumed
  const existing = await prisma.user.findUnique({ where: { phoneHash } });
  if (existing) return { success: false, error: 'already_registered' };

  const totpSecret = generateTOTPSecret();
  // Store TOTP secret encrypted in DB — for Phase 1 we store it as raw bytes;
  // TODO Phase 2: encrypt with server key before storage
  const totpSecretBuf = Buffer.from(totpSecret, 'utf8');

  // passwordHash: random placeholder — the client provides the real PEK hash during onboarding
  const passwordHash = crypto.randomBytes(32).toString('hex');

  const user = await prisma.user.create({
    data: {
      phoneHash,
      passwordHash,
      totpSecret: totpSecretBuf,
      isVerified: false, // true after TOTP confirmed
    },
  });

  // TOTP label is userId (opaque) — never the phone number
  const totpUri = getTOTPUri(totpSecret, user.id);
  return { success: true, userId: user.id, totpUri };
}

/**
 * Step 3: Confirm first TOTP code → mark verified → issue tokens.
 */
export async function confirmTOTPSetup(
  userId: string,
  totpCode: string,
): Promise<
  | { success: true; accessToken: string; refreshToken: string }
  | { success: false; error: string }
> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.totpSecret) return { success: false, error: 'user_not_found' };
  if (user.isVerified) return { success: false, error: 'already_verified' };

  const secret = user.totpSecret.toString('utf8');
  if (!verifyTOTP(secret, totpCode)) return { success: false, error: 'invalid_totp' };

  await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true, lastActive: new Date() },
  });

  const accessToken = signAccessToken(userId);
  const refreshToken = await issueRefreshToken(userId);
  return { success: true, accessToken, refreshToken };
}

// ── Login ──────────────────────────────────────────────────────────────────────

/**
 * Step 1: Find the user and send an OTP.
 */
export async function startLogin(
  phone: string,
): Promise<{ requestId: string } | { error: 'not_found' | 'suspended' }> {
  const phoneHash = hashPhone(phone, env.PHONE_HASH_SECRET);

  const user = await prisma.user.findUnique({ where: { phoneHash } });
  if (!user) return { error: 'not_found' };
  if (user.accountStatus === 'SUSPENDED' || user.accountStatus === 'DELETED') {
    return { error: 'suspended' };
  }

  const requestId = await createOTP(phone, phoneHash);
  return { requestId };
}

/**
 * Step 2: Verify OTP + TOTP → issue tokens.
 */
export async function verifyLogin(
  requestId: string,
  otpCode: string,
  totpCode: string,
): Promise<
  | { success: true; accessToken: string; refreshToken: string }
  | { success: false; error: string }
> {
  const otpResult = await verifyOTP(requestId, otpCode);
  if (!otpResult.valid) return { success: false, error: otpResult.error };

  const user = await prisma.user.findUnique({ where: { phoneHash: otpResult.phoneHash } });
  if (!user || !user.totpSecret) return { success: false, error: 'user_not_found' };
  if (!user.isVerified) return { success: false, error: 'totp_not_setup' };

  const secret = user.totpSecret.toString('utf8');
  if (!verifyTOTP(secret, totpCode)) return { success: false, error: 'invalid_totp' };

  await prisma.user.update({
    where: { id: user.id },
    data: { lastActive: new Date() },
  });

  const accessToken = signAccessToken(user.id);
  const refreshToken = await issueRefreshToken(user.id);
  return { success: true, accessToken, refreshToken };
}

// ── Account management ────────────────────────────────────────────────────────

/**
 * Schedules account deletion (30-day grace period per GDPR).
 */
export async function scheduleAccountDeletion(
  userId: string,
  totpCode: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.totpSecret) return { success: false, error: 'user_not_found' };

  const secret = user.totpSecret.toString('utf8');
  if (!verifyTOTP(secret, totpCode)) return { success: false, error: 'invalid_totp' };

  const deletionDate = new Date();
  deletionDate.setDate(deletionDate.getDate() + 30);

  await prisma.user.update({
    where: { id: userId },
    data: {
      accountStatus: 'PENDING_DELETION',
      deletionScheduledAt: deletionDate,
    },
  });

  return { success: true };
}
