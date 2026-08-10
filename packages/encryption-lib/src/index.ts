import * as crypto from 'crypto';

const AES_ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 32;
const KEY_LENGTH = 32;

export const ARGON2_CONFIG = {
  timeCost: 3,
  memoryCost: 65536,
  parallelism: 4,
  hashLength: KEY_LENGTH,
};

export interface EncryptedData {
  ciphertext: Buffer;
  iv: Buffer;
  authTag: Buffer;
  salt?: Buffer;
}

export function deriveKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, 600000, KEY_LENGTH, 'sha512');
}

export function generateKey(): Buffer {
  return crypto.randomBytes(KEY_LENGTH);
}

export function generateSalt(): Buffer {
  return crypto.randomBytes(SALT_LENGTH);
}

export function encrypt(plaintext: string | Buffer, key: Buffer): EncryptedData {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(AES_ALGORITHM, key, iv, { authTagLength: AUTH_TAG_LENGTH });
  const data = typeof plaintext === 'string' ? Buffer.from(plaintext, 'utf8') : plaintext;
  const ciphertext = Buffer.concat([cipher.update(data), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return { ciphertext, iv, authTag };
}

export function decrypt(encrypted: EncryptedData, key: Buffer): Buffer {
  const decipher = crypto.createDecipheriv(AES_ALGORITHM, key, encrypted.iv, { authTagLength: AUTH_TAG_LENGTH });
  decipher.setAuthTag(encrypted.authTag);
  return Buffer.concat([decipher.update(encrypted.ciphertext), decipher.final()]);
}

export function serializeEncrypted(encrypted: EncryptedData): Buffer {
  const version = Buffer.from([0x01]);
  return Buffer.concat([version, encrypted.iv, encrypted.authTag, encrypted.ciphertext]);
}

export function deserializeEncrypted(data: Buffer): EncryptedData {
  if (data[0] !== 0x01) throw new Error(`Unknown encryption format version: ${data[0]}`);
  return {
    iv: data.subarray(1, 1 + IV_LENGTH),
    authTag: data.subarray(1 + IV_LENGTH, 1 + IV_LENGTH + AUTH_TAG_LENGTH),
    ciphertext: data.subarray(1 + IV_LENGTH + AUTH_TAG_LENGTH),
  };
}

export function encryptField(value: string, key: Buffer): Buffer {
  return serializeEncrypted(encrypt(value, key));
}

export function decryptField(data: Buffer, key: Buffer): string {
  return decrypt(deserializeEncrypted(data), key).toString('utf8');
}

export function encryptMedicalData(
  data: Record<string, string>,
  password: string
): { encrypted: Record<string, Buffer>; salt: Buffer } {
  const salt = generateSalt();
  const key = deriveKey(password, salt);
  const encrypted: Record<string, Buffer> = {};
  for (const [field, value] of Object.entries(data)) {
    if (value) encrypted[field] = encryptField(value, key);
  }
  key.fill(0);
  return { encrypted, salt };
}

export function decryptMedicalData(
  encrypted: Record<string, Buffer>,
  password: string,
  salt: Buffer
): Record<string, string> {
  const key = deriveKey(password, salt);
  const decrypted: Record<string, string> = {};
  for (const [field, value] of Object.entries(encrypted)) {
    if (value) decrypted[field] = decryptField(value, key);
  }
  key.fill(0);
  return decrypted;
}

export function hashPhone(phoneNumber: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(phoneNumber.replace(/\D/g, ''))
    .digest('hex');
}

export function hashIP(ip: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(ip).digest('hex');
}

export function fuzzLocation(lat: number, lng: number): { lat: number; lng: number } {
  const fuzzLat = 0.0045;
  const fuzzLng = 0.0045 / Math.cos((lat * Math.PI) / 180);
  return {
    lat: lat + (Math.random() * 2 - 1) * fuzzLat,
    lng: lng + (Math.random() * 2 - 1) * fuzzLng,
  };
}

export function encryptPhoto(
  photoData: Buffer,
  userPEK: Buffer
): { encryptedPhoto: Buffer; encryptedPhotoKey: Buffer } {
  const photoKey = generateKey();
  const encryptedPhoto = serializeEncrypted(encrypt(photoData, photoKey));
  const encryptedPhotoKey = serializeEncrypted(encrypt(photoKey, userPEK));
  photoKey.fill(0);
  return { encryptedPhoto, encryptedPhotoKey };
}

export function decryptPhoto(
  encryptedPhoto: Buffer,
  encryptedPhotoKey: Buffer,
  userPEK: Buffer
): Buffer {
  const photoKey = decrypt(deserializeEncrypted(encryptedPhotoKey), userPEK);
  const photo = decrypt(deserializeEncrypted(encryptedPhoto), photoKey);
  photoKey.fill(0);
  return photo;
}

export function secureCompare(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
