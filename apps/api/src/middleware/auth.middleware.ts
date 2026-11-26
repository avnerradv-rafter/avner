import type { FastifyRequest, FastifyReply, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { verifyAccessToken } from '../services/token.service';

declare module 'fastify' {
  interface FastifyRequest {
    userId: string;
  }
}

/**
 * Extracts and verifies the Bearer JWT from Authorization header.
 * Injects `request.userId` for downstream handlers.
 */
async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({ success: false, error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyAccessToken(token);
    request.userId = payload.sub;
  } catch {
    return reply.status(401).send({ success: false, error: 'Invalid or expired token' });
  }
}

const authPlugin: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.decorate('authenticate', authenticate);
  done();
};

export default fp(authPlugin, { name: 'auth-middleware' });
export { authenticate };
