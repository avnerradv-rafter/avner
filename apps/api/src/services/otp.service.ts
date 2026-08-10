import * as crypto from 'crypto';
import { redis } from '../config/redis';
import { env, isDev } from '../config/env';

const OTP_TTL_SECONDS = 600; // 10 minutes
const MAX_ATTEMPTS = 5;
const OTP_PREFIX = 'otp:';

interface OTPRecord {
  phoneHash: string;
  code: string;
  attempts: number;
}

function generateCode(): string {
  // Cryptographically secure 6-digit code (uniform distribution via rejection sampling)
  let n: number;
  do {
    n = crypto.randomInt(0, 1_000_000);
  } while (n < 100_000);
  return n.toString();
}

async function sendViaTwilio(phone: string, code: string): Promise<void> {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`,
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      To: phone,
      From: env.TWILIO_FROM_NUMBER,
      Body: `SafeConnect verification code: ${code}\n\nValid 10 minutes. Never share this code.`,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`SMS delivery failed: HTTP ${response.status}`);
  }
}

/**
 * Creates and sends an OTP. Returns a requestId the client must echo back.
 * The phone number is NOT stored — only its hash.
 */
export async function createOTP(phone: string, phoneHash: string): Promise<string> {
  const requestId = crypto.randomBytes(16).toString('hex');
  const code = generateCode();
  const record: OTPRecord = { phoneHash, code, attempts: 0 };

  await redis.set(`${OTP_PREFIX}${requestId}`, JSON.stringify(record), 'EX', OTP_TTL_SECONDS);

  if (isDev || !env.TWILIO_ACCOUNT_SID) {
    // Dev mode: log OTP to console (partial hash only — never the phone number)
    console.log(`[DEV OTP] phoneHash=${phoneHash.slice(0, 8)}... code=${code}`);
  } else {
    await sendViaTwilio(phone, code);
  }

  return requestId;
}

export type OTPVerifyResult =
  | { valid: true; phoneHash: string }
  | { valid: false; error: 'expired' | 'invalid_code' | 'locked' };

/**
 * Verifies an OTP. Consumes it on success. Increments attempts on failure.
 * Locks after MAX_ATTEMPTS failures.
 */
export async function verifyOTP(requestId: string, code: string): Promise<OTPVerifyResult> {
  const raw = await redis.get(`${OTP_PREFIX}${requestId}`);
  if (!raw) return { valid: false, error: 'expired' };

  const record: OTPRecord = JSON.parse(raw);

  if (record.attempts >= MAX_ATTEMPTS) {
    await redis.del(`${OTP_PREFIX}${requestId}`);
    return { valid: false, error: 'locked' };
  }

  // Pad both sides to equal length to prevent timing side-channels
  const expected = Buffer.allocUnsafe(6);
  expected.write(record.code.padStart(6, '0'));
  const provided = Buffer.allocUnsafe(6);
  provided.write(code.padStart(6, '0'));

  if (!crypto.timingSafeEqual(expected, provided)) {
    record.attempts++;
    await redis.set(`${OTP_PREFIX}${requestId}`, JSON.stringify(record), 'EX', OTP_TTL_SECONDS);
    return { valid: false, error: 'invalid_code' };
  }

  // Valid — consume the OTP
  await redis.del(`${OTP_PREFIX}${requestId}`);
  return { valid: true, phoneHash: record.phoneHash };
}
