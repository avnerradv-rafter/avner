import * as fs from 'fs';

function readKey(directVar: string, pathVar: string): string | undefined {
  const direct = process.env[directVar];
  if (direct) return direct;
  const keyPath = process.env[pathVar];
  if (keyPath) {
    try {
      return fs.readFileSync(keyPath, 'utf8');
    } catch {
      // fall through
    }
  }
  return undefined;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000'),
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  JWT_PRIVATE_KEY: readKey('JWT_PRIVATE_KEY', 'JWT_PRIVATE_KEY_PATH'),
  JWT_PUBLIC_KEY: readKey('JWT_PUBLIC_KEY', 'JWT_PUBLIC_KEY_PATH'),
  JWT_ACCESS_EXPIRY: (process.env.JWT_ACCESS_EXPIRY || '15m') as string,
  JWT_REFRESH_EXPIRY_SECONDS: 7 * 24 * 60 * 60, // 7 days
  PHONE_HASH_SECRET: process.env.PHONE_HASH_SECRET || 'dev-phone-hash-secret-change-in-prod',
  IP_HASH_SECRET: process.env.IP_HASH_SECRET || 'dev-ip-hash-secret-change-in-prod',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:19006',
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
} as const;

export const isDev = env.NODE_ENV === 'development';
export const isProd = env.NODE_ENV === 'production';

// Fail fast in production if critical secrets are missing
if (isProd) {
  const required: (keyof typeof env)[] = [
    'DATABASE_URL',
    'JWT_PRIVATE_KEY',
    'JWT_PUBLIC_KEY',
    'PHONE_HASH_SECRET',
    'IP_HASH_SECRET',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_FROM_NUMBER',
  ];
  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
