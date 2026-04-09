import Redis from 'ioredis';
import { env, isDev } from './env';

// In-memory fallback — used in dev when Redis isn't running
class InMemoryStore {
  private store = new Map<string, { value: string; expiresAt: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(
    key: string,
    value: string,
    expiryMode?: string,
    ttl?: number,
  ): Promise<'OK'> {
    const expiresAt = expiryMode === 'EX' && ttl ? Date.now() + ttl * 1000 : Infinity;
    this.store.set(key, { value, expiresAt });
    return 'OK';
  }

  async del(...keys: string[]): Promise<number> {
    let count = 0;
    for (const k of keys) if (this.store.delete(k)) count++;
    return count;
  }

  async exists(...keys: string[]): Promise<number> {
    return keys.filter((k) => {
      const item = this.store.get(k);
      return item && Date.now() <= item.expiresAt;
    }).length;
  }
}

export type RedisLike = Pick<Redis, 'get' | 'set' | 'del' | 'exists'>;

function createRedisClient(): RedisLike {
  const client = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    enableOfflineQueue: false,
    maxRetriesPerRequest: isDev ? 0 : 3,
  });

  client.on('error', (err: Error) => {
    if (isDev) {
      // Silently ignore in dev — InMemoryStore is the fallback per-call
    } else {
      console.error('Redis connection error:', err.message);
    }
  });

  return client;
}

let _redis: RedisLike | null = null;
let _inMemory: InMemoryStore | null = null;

async function withRedis<T>(
  fn: (r: RedisLike) => Promise<T>,
  fallbackFn: (r: InMemoryStore) => Promise<T>,
): Promise<T> {
  if (!_redis) _redis = createRedisClient();
  try {
    return await fn(_redis);
  } catch {
    if (!isDev) throw new Error('Redis unavailable');
    if (!_inMemory) _inMemory = new InMemoryStore();
    return fallbackFn(_inMemory);
  }
}

export const redis = {
  get: (key: string) =>
    withRedis((r) => r.get(key), (m) => m.get(key)),

  set: (key: string, value: string, expiryMode?: string, ttl?: number) =>
    withRedis(
      (r) => (r as Redis).set(key, value, expiryMode as 'EX', ttl as number),
      (m) => m.set(key, value, expiryMode, ttl),
    ),

  del: (...keys: string[]) =>
    withRedis((r) => r.del(...keys), (m) => m.del(...keys)),

  exists: (...keys: string[]) =>
    withRedis((r) => r.exists(...keys), (m) => m.exists(...keys)),
};
