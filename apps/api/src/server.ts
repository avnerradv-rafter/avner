import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';

const server = Fastify({
  logger: {
    level: 'info',
    // SECURITY: Never log PII
    redact: ['req.headers.authorization', 'req.body.password', 'req.body.phone'],
  },
});

async function start() {
  // CORS
  await server.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:19006',
    credentials: true,
  });

  // Rate limiting
  await server.register(rateLimit, {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    timeWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  });

  // Health check
  server.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));

  // TODO Phase 1: Register route modules
  // await server.register(authRoutes, { prefix: '/api/v1/auth' });
  // await server.register(profileRoutes, { prefix: '/api/v1/profile' });
  // await server.register(discoverRoutes, { prefix: '/api/v1/discover' });
  // await server.register(matchRoutes, { prefix: '/api/v1/matches' });
  // await server.register(messageRoutes, { prefix: '/api/v1/messages' });
  // await server.register(safetyRoutes, { prefix: '/api/v1/safety' });

  const port = parseInt(process.env.PORT || '3000');
  await server.listen({ port, host: '0.0.0.0' });
  console.log(`SafeConnect API running on port ${port}`);
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
