import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { env } from './config/env';
import { authRoutes } from './routes/auth.routes';

const server = Fastify({
  logger: {
    level: env.NODE_ENV === 'production' ? 'warn' : 'info',
    // SECURITY: Redact PII from all log entries
    redact: [
      'req.headers.authorization',
      'req.body.phone',
      'req.body.password',
      'req.body.code',
      'req.body.otpCode',
      'req.body.totpCode',
      'req.body.refreshToken',
    ],
  },
});

async function start(): Promise<void> {
  // ── CORS ────────────────────────────────────────────────────────────────────
  await server.register(cors, {
    origin: env.CORS_ORIGIN,
    credentials: true,
  });

  // ── Global rate limiting ─────────────────────────────────────────────────
  await server.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW_MS,
    errorResponseBuilder: (_request, context) => ({
      success: false,
      error: 'Too many requests',
      retryAfter: context.after,
    }),
  });

  // ── Health check (no auth, no rate-limit counting) ───────────────────────
  server.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));

  // ── Auth routes ──────────────────────────────────────────────────────────
  await server.register(authRoutes, { prefix: '/api/v1/auth' });

  // TODO Phase 1 continued:
  // await server.register(profileRoutes, { prefix: '/api/v1/profile' });

  // TODO Phase 2:
  // await server.register(discoverRoutes, { prefix: '/api/v1/discover' });
  // await server.register(matchRoutes, { prefix: '/api/v1/matches' });
  // await server.register(messageRoutes, { prefix: '/api/v1/messages' });
  // await server.register(safetyRoutes, { prefix: '/api/v1/safety' });

  // ── Start ────────────────────────────────────────────────────────────────
  await server.listen({ port: env.PORT, host: '0.0.0.0' });
  console.log(`SafeConnect API running on port ${env.PORT} [${env.NODE_ENV}]`);
}

start().catch((err) => {
  console.error('Fatal: failed to start server:', err);
  process.exit(1);
});
