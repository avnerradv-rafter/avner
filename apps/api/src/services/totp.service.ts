import { TOTP, Secret } from 'otpauth';

const ISSUER = 'SafeConnect';
const DIGITS = 6;
const PERIOD = 30;
const WINDOW = 1; // allow ±1 period drift (~30s clock skew)

/**
 * Generates a new base32 TOTP secret (160-bit = 32 base32 chars).
 */
export function generateTOTPSecret(): string {
  return new Secret({ size: 20 }).base32;
}

/**
 * Returns an otpauth:// URI suitable for a QR code generator.
 * The label is an opaque identifier — never the real phone number.
 */
export function getTOTPUri(secretBase32: string, opaqueLabel: string): string {
  const totp = new TOTP({
    issuer: ISSUER,
    label: opaqueLabel,
    algorithm: 'SHA1',
    digits: DIGITS,
    period: PERIOD,
    secret: Secret.fromBase32(secretBase32),
  });
  return totp.toString();
}

/**
 * Returns true if the provided TOTP token is valid for the secret.
 */
export function verifyTOTP(secretBase32: string, token: string): boolean {
  const totp = new TOTP({
    issuer: ISSUER,
    label: '_',
    algorithm: 'SHA1',
    digits: DIGITS,
    period: PERIOD,
    secret: Secret.fromBase32(secretBase32),
  });
  return totp.validate({ token: token.replace(/\s/g, ''), window: WINDOW }) !== null;
}
