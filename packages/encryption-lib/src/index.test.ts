import {
  encrypt,
  decrypt,
  encryptField,
  decryptField,
  encryptMedicalData,
  decryptMedicalData,
  serializeEncrypted,
  deserializeEncrypted,
  generateKey,
  generateSalt,
  deriveKey,
  hashPhone,
  hashIP,
  fuzzLocation,
  encryptPhoto,
  decryptPhoto,
  secureCompare,
  generateToken,
} from './index';

// ── encrypt / decrypt ──────────────────────────────────────────────────────────

describe('encrypt / decrypt', () => {
  const key = generateKey();

  it('round-trips a UTF-8 string', () => {
    const enc = encrypt('hello world', key);
    expect(decrypt(enc, key).toString('utf8')).toBe('hello world');
  });

  it('round-trips a Buffer', () => {
    const data = Buffer.from([0x01, 0x02, 0x03]);
    const enc = encrypt(data, key);
    expect(decrypt(enc, key)).toEqual(data);
  });

  it('uses a fresh IV each time (probabilistic uniqueness)', () => {
    const e1 = encrypt('same', key);
    const e2 = encrypt('same', key);
    expect(e1.iv).not.toEqual(e2.iv);
    expect(e1.ciphertext).not.toEqual(e2.ciphertext);
  });

  it('throws on tampered ciphertext', () => {
    const enc = encrypt('sensitive data', key);
    enc.ciphertext[0] ^= 0xff;
    expect(() => decrypt(enc, key)).toThrow();
  });

  it('throws on tampered auth tag', () => {
    const enc = encrypt('sensitive data', key);
    enc.authTag[0] ^= 0xff;
    expect(() => decrypt(enc, key)).toThrow();
  });

  it('throws when wrong key used', () => {
    const enc = encrypt('secret', key);
    const wrongKey = generateKey();
    expect(() => decrypt(enc, wrongKey)).toThrow();
  });
});

// ── serializeEncrypted / deserializeEncrypted ─────────────────────────────────

describe('serialize / deserialize', () => {
  const key = generateKey();

  it('round-trips through serialization', () => {
    const enc = encrypt('test data', key);
    const buf = serializeEncrypted(enc);
    const dec = deserializeEncrypted(buf);
    expect(decrypt(dec, key).toString('utf8')).toBe('test data');
  });

  it('first byte is version 0x01', () => {
    const buf = serializeEncrypted(encrypt('x', key));
    expect(buf[0]).toBe(0x01);
  });

  it('throws on unknown version byte', () => {
    const buf = serializeEncrypted(encrypt('x', key));
    buf[0] = 0x02;
    expect(() => deserializeEncrypted(buf)).toThrow(/version/i);
  });
});

// ── encryptField / decryptField ───────────────────────────────────────────────

describe('encryptField / decryptField', () => {
  const key = generateKey();

  it('round-trips a field value', () => {
    expect(decryptField(encryptField('HIV+', key), key)).toBe('HIV+');
  });

  it('returns a Buffer', () => {
    expect(encryptField('test', key)).toBeInstanceOf(Buffer);
  });

  it('different calls produce different ciphertexts', () => {
    const a = encryptField('same', key);
    const b = encryptField('same', key);
    expect(a).not.toEqual(b);
  });
});

// ── encryptMedicalData / decryptMedicalData ───────────────────────────────────

describe('encryptMedicalData / decryptMedicalData', () => {
  const medData = { status: 'positive', onTreatment: 'yes', undetectable: 'yes' };
  const password = 'user-passphrase-correct-battery-staple';

  it('round-trips all fields', () => {
    const { encrypted, salt } = encryptMedicalData(medData, password);
    const result = decryptMedicalData(encrypted, password, salt);
    expect(result.status).toBe('positive');
    expect(result.onTreatment).toBe('yes');
    expect(result.undetectable).toBe('yes');
  });

  it('different salts produce different ciphertexts', () => {
    const { encrypted: e1, salt: s1 } = encryptMedicalData(medData, password);
    const { encrypted: e2, salt: s2 } = encryptMedicalData(medData, password);
    expect(s1).not.toEqual(s2);
    expect(e1.status).not.toEqual(e2.status);
  });

  it('throws when wrong password supplied', () => {
    const { encrypted, salt } = encryptMedicalData({ status: 'positive' }, 'correct');
    expect(() => decryptMedicalData(encrypted, 'wrong-password', salt)).toThrow();
  });

  it('skips empty/falsy fields', () => {
    const { encrypted } = encryptMedicalData({ status: 'positive', empty: '' }, password);
    expect(encrypted.status).toBeDefined();
    expect(encrypted.empty).toBeUndefined();
  });
});

// ── hashPhone ─────────────────────────────────────────────────────────────────

describe('hashPhone', () => {
  const secret = 'test-secret';

  it('produces a 64-char hex string', () => {
    const h = hashPhone('+972501234567', secret);
    expect(h).toHaveLength(64);
    expect(h).toMatch(/^[0-9a-f]{64}$/);
  });

  it('is consistent for the same input', () => {
    expect(hashPhone('+972501234567', secret)).toBe(hashPhone('+972501234567', secret));
  });

  it('strips non-digit characters (normalises phone format)', () => {
    expect(hashPhone('+972-50-123-4567', secret)).toBe(hashPhone('972501234567', secret));
  });

  it('different secrets produce different hashes', () => {
    expect(hashPhone('+1234567890', 'secret-A')).not.toBe(hashPhone('+1234567890', 'secret-B'));
  });
});

// ── hashIP ────────────────────────────────────────────────────────────────────

describe('hashIP', () => {
  it('returns a 64-char hex hash', () => {
    const h = hashIP('192.168.1.1', 'secret');
    expect(h).toHaveLength(64);
    expect(h).toMatch(/^[0-9a-f]{64}$/);
  });

  it('is consistent', () => {
    expect(hashIP('10.0.0.1', 'secret')).toBe(hashIP('10.0.0.1', 'secret'));
  });
});

// ── fuzzLocation ──────────────────────────────────────────────────────────────

describe('fuzzLocation', () => {
  const TLV = { lat: 32.0853, lng: 34.7818 };

  it('returns coordinates within ~500m of the original', () => {
    const { lat, lng } = fuzzLocation(TLV.lat, TLV.lng);
    // 0.0045° ≈ 500m at mid-latitudes
    expect(Math.abs(lat - TLV.lat)).toBeLessThan(0.01);
    expect(Math.abs(lng - TLV.lng)).toBeLessThan(0.01);
  });

  it('does not return the exact original coordinates', () => {
    const results = Array.from({ length: 20 }, () => fuzzLocation(TLV.lat, TLV.lng));
    const exact = results.filter((r) => r.lat === TLV.lat && r.lng === TLV.lng);
    expect(exact.length).toBe(0);
  });

  it('produces different results on each call', () => {
    const r1 = fuzzLocation(TLV.lat, TLV.lng);
    const r2 = fuzzLocation(TLV.lat, TLV.lng);
    // Astronomically unlikely to collide twice
    expect(r1.lat === r2.lat && r1.lng === r2.lng).toBe(false);
  });
});

// ── encryptPhoto / decryptPhoto ───────────────────────────────────────────────

describe('encryptPhoto / decryptPhoto', () => {
  it('round-trips photo data', () => {
    const photoData = Buffer.from('fake-jpeg-binary-data-\x00\x01\x02\xFF', 'binary');
    const pek = generateKey();
    const { encryptedPhoto, encryptedPhotoKey } = encryptPhoto(photoData, pek);
    const decrypted = decryptPhoto(encryptedPhoto, encryptedPhotoKey, pek);
    expect(decrypted).toEqual(photoData);
  });

  it('encrypted photo key is different from the photo encryption key', () => {
    const pek = generateKey();
    const { encryptedPhoto, encryptedPhotoKey } = encryptPhoto(Buffer.from('data'), pek);
    expect(encryptedPhoto).not.toEqual(encryptedPhotoKey);
  });

  it('throws when wrong PEK supplied', () => {
    const pek = generateKey();
    const wrongPek = generateKey();
    const { encryptedPhoto, encryptedPhotoKey } = encryptPhoto(Buffer.from('data'), pek);
    expect(() => decryptPhoto(encryptedPhoto, encryptedPhotoKey, wrongPek)).toThrow();
  });
});

// ── secureCompare ─────────────────────────────────────────────────────────────

describe('secureCompare', () => {
  it('returns true for identical buffers', () => {
    expect(secureCompare(Buffer.from('secret'), Buffer.from('secret'))).toBe(true);
  });

  it('returns false for different content', () => {
    expect(secureCompare(Buffer.from('aaa'), Buffer.from('bbb'))).toBe(false);
  });

  it('returns false for different lengths', () => {
    expect(secureCompare(Buffer.from('short'), Buffer.from('muchlonger'))).toBe(false);
  });

  it('returns false for empty vs non-empty', () => {
    expect(secureCompare(Buffer.alloc(0), Buffer.from('x'))).toBe(false);
  });
});

// ── generateToken ─────────────────────────────────────────────────────────────

describe('generateToken', () => {
  it('returns a hex string of correct length (default 32 bytes → 64 chars)', () => {
    const t = generateToken();
    expect(t).toHaveLength(64);
    expect(t).toMatch(/^[0-9a-f]+$/);
  });

  it('respects the length parameter', () => {
    expect(generateToken(16)).toHaveLength(32);
    expect(generateToken(64)).toHaveLength(128);
  });

  it('generates unique tokens', () => {
    const tokens = new Set(Array.from({ length: 100 }, () => generateToken()));
    expect(tokens.size).toBe(100);
  });
});

// ── deriveKey ─────────────────────────────────────────────────────────────────

describe('deriveKey', () => {
  it('derives a 32-byte key', () => {
    const key = deriveKey('password', generateSalt());
    expect(key).toHaveLength(32);
  });

  it('is deterministic for same password + salt', () => {
    const salt = generateSalt();
    expect(deriveKey('password', salt)).toEqual(deriveKey('password', salt));
  });

  it('produces different keys for different salts', () => {
    expect(deriveKey('password', generateSalt())).not.toEqual(deriveKey('password', generateSalt()));
  });
});
