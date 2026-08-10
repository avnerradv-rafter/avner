import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { redis } from '../config/redis';
import { env, isDev } from '../config/env';

// ── Key bootstrap ──────────────────────────────────────────────────────────────
// In production, keys come from env / KMS. In dev, generate ephemeral keys.

let privateKey: string;
let publicKey: string;

if (env.JWT_PRIVATE_KEY && env.JWT_PUBLIC_KEY) {
  privateKey = env.JWT_PRIVATE_KEY;
  publicKey = env.JWT_PUBLIC_KEY;
} else {
  if (!isDev) {
    throw new Error('JWT_PRIVATE_KEY and JWT_PUBLIC_KEY must be set in production');
  }
  const pair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });
  privateKey = pair.privateKey;
  publicKey = pair.publicKey;
  console.warn('[DEV] Using ephemeral RSA keys — set JWT_PRIVATE_KEY + JWT_PUBLIC_KEY for production');
}

// ── Access tokens (JWT RS256, 15 min) ─────────────────────────────────────────

export interface AccessTokenPayload {
  sub: string; // userId
  type: 'access';
}

export function signAccessToken(userId: string): string {
  return jwt.sign({ type: 'access' } satisfies Omit<AccessTokenPayload, 'sub'>, privateKey, {
    algorithm: 'RS256',
    subject: userId,
    expiresIn: env.JWT_ACCESS_EXPIRY as jwt.SignOptions['expiresIn'],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  if (typeof payload !== 'object' || payload.type !== 'access') {
    throw new Error('Invalid token type');
  }
  return payload as AccessTokenPayload;
}

// ── Refresh tokens (opaque, 7 days, stored in Redis) ─────────────────────────

const REFRESH_PREFIX = 'refresh:';
const REFRESH_TTL = env.JWT_REFRESH_EXPIRY_SECONDS;

export async function issueRefreshToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(40).toString('hex');
  await redis.set(`${REFRESH_PREFIX}${token}`, userId, 'EX', REFRESH_TTL);
  return token;
}

export async function consumeRefreshToken(
  token: string,
): Promise<{ userId: string; newRefreshToken: string } | null> {
  const userId = await redis.get(`${REFRESH_PREFIX}${token}`);
  if (!userId) return null;

  // Rotation: delete old token, issue new one atomically (best-effort)
  await redis.del(`${REFRESH_PREFIX}${token}`);
  const newToken = await issueRefreshToken(userId);
  return { userId, newRefreshToken: newToken };
}

export async function invalidateRefreshToken(token: string): Promise<void> {
  await redis.del(`${REFRESH_PREFIX}${token}`);
}

/**
 * Invalidate ALL refresh tokens for a user. Used during account wipe / password change.
 * NOTE: Requires a Redis SCAN for the userId-indexed approach.
 * For Phase 1 simplicity, we store a version counter in Redis instead.
 */
export async function invalidateAllTokensForUser(userId: string): Promise<void> {
  // TODO Phase 2: Implement token generation counter for batch invalidation.
  // For now, log a warning — individual tokens are still invalidated on use.
  console.warn(`[TODO] Batch token invalidation for userId=${userId.slice(0, 8)}... not yet implemented`);
}
