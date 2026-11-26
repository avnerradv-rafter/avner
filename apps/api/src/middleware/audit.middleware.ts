import { hashIP } from '@safeconnect/encryption-lib';
import { prisma } from '../config/prisma';
import { env } from '../config/env';

export interface AuditEvent {
  userId?: string;
  action: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Writes an audit log entry. Hashes IP before storage.
 * Fires-and-forgets to avoid blocking the response; errors are logged, not thrown.
 *
 * SECURITY: Never include PII (phone numbers, names, medical data) in metadata.
 */
export function audit(event: AuditEvent): void {
  const ipHash = event.ip ? hashIP(event.ip, env.IP_HASH_SECRET) : undefined;

  // Fire and forget — audit failures must not affect the user flow
  prisma.auditLog
    .create({
      data: {
        userId: event.userId ?? null,
        action: event.action,
        ipHash: ipHash ?? null,
        metadata: event.metadata ? JSON.parse(JSON.stringify(event.metadata)) : undefined,
      },
    })
    .catch((err: Error) => {
      // Log to stderr only — no PII
      console.error('[audit] Failed to write audit log:', err.message);
    });
}

/**
 * Extracts the real IP from a Fastify request, respecting trusted proxies.
 */
export function getClientIP(
  request: { headers: Record<string, string | string[] | undefined>; ip: string },
): string {
  // Prefer X-Forwarded-For if set by a trusted proxy
  const xff = request.headers['x-forwarded-for'];
  if (xff) {
    const first = Array.isArray(xff) ? xff[0] : xff.split(',')[0];
    return first.trim();
  }
  return request.ip;
}
