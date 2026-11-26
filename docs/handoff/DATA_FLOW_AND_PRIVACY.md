# DATA_FLOW_AND_PRIVACY.md — STAY POSITIVE / SafeConnect

**Audit date:** 2026-11-26

---

## Zero-Knowledge Medical Data Flow

```
USER DEVICE                           SERVER
─────────────────────────────────     ─────────────────────────────────
User enters passphrase
  │
  ▼
generateSalt() → 32-byte salt
  │
  ▼
deriveKey(passphrase, salt)           Server receives:
  PBKDF2-SHA512, 600k iterations       • AES-256-GCM ciphertext blob
  → 32-byte Client Encryption Key      • salt (for re-derivation)
  │                                    • Never: passphrase or CEK
  ▼
encryptMedicalData(fields, passphrase)
  → { encrypted: {field: ciphertext}, salt }
  │
  ├──────── HTTPS ──────────────────▶ stores Bytes in MedicalProfile
  │
  ◀──────── HTTPS ──────────────────── returns blob + salt
  │
decryptMedicalData(blob, passphrase, salt)
  (all client-side — server not involved)
```

---

## Phone Number Privacy Flow

```
User provides: +972-50-123-4567

hashPhone(phone, PHONE_HASH_SECRET):
  1. Strip non-digits → "972501234567"
  2. HMAC-SHA256(key=PHONE_HASH_SECRET, data=normalized)
  3. → 64-char hex hash

Stored in DB: users.phone_hash = "a3f92c..." (64 hex chars)
Never stored: the original phone number
```

**Consequence:** Phone number cannot be recovered from DB even with full DB access. SMS delivery uses the raw phone transiently (in OTP service) but it is never persisted.

---

## Location Privacy Flow

```
User provides: { lat: 32.0853, lng: 34.7818 }  (Tel Aviv)

fuzzLocation(lat, lng):
  → adds crypto.randomBytes random offset ±0.0045° (~500m)
  → { lat: 32.0831, lng: 34.7849 }  (example)

Stored in DB: profiles.location_lat_fuzzy, location_lng_fuzzy (Decimal 6,3)
Stored also: location_city (city name string — not fuzzed)
Never stored: exact GPS coordinates
```

---

## Photo Encryption Flow

```
USER DEVICE
  │
  ├─ generateKey() → photoKey (32 bytes, per photo)
  │
  ├─ encrypt(photoData, photoKey) → encryptedPhoto
  │
  ├─ encrypt(photoKey, userPEK) → encryptedPhotoKey
  │                               (Photo Encryption Key = user's master key)
  │
  └──── HTTPS ──────────────────▶ SERVER
                                    stores: S3 (encryptedPhoto)
                                    stores: DB (encryptedPhotoKey as Bytes)
                                    never stores: photoKey or userPEK
```

---

## Session Token Flow

```
Login success:
  signAccessToken(userId) → JWT RS256, exp: 15 minutes
  issueRefreshToken(userId) → 40-byte hex, stored in Redis (7d TTL)

Access token use:
  Client: Authorization: Bearer <jwt>
  Server: verifyAccessToken() → userId
  Server: request.userId injected for downstream handlers

Refresh rotation:
  consumeRefreshToken(oldToken):
    1. Fetch from Redis
    2. DELETE old token
    3. Create new refresh token
    4. Return { userId, newRefreshToken }
  → Old token invalidated atomically; replay yields null
```

---

## Audit Log Privacy

```
Stored in audit_log:
  • action (string, e.g. "login_success")
  • user_id (UUID — opaque, not PII by itself)
  • ip_hash (HMAC-SHA256 of IP — cannot reverse to IP)
  • metadata (JSON — never contains phone, name, medical data)
  • created_at

Explicitly excluded from logs (Fastify redact config):
  req.headers.authorization
  req.body.phone
  req.body.password
  req.body.code / otpCode / totpCode
  req.body.refreshToken
```

---

## Data Minimization Summary

| Data type | What is stored | What is NOT stored |
|---|---|---|
| Phone number | HMAC-SHA256 hash | Raw number |
| Medical status | AES-256-GCM ciphertext | Plaintext |
| Location | Fuzzy lat/lng (±500m) + city | Exact GPS |
| Photos | Per-photo AES-256-GCM ciphertext | Plaintext |
| IP address | HMAC-SHA256 hash | Raw IP |
| Messages | Signal Protocol ciphertext (planned) | Plaintext |
| Password | Random hex placeholder (GAP — see SECURITY_GAP_ANALYSIS.md) | Argon2id hash not yet implemented |
| TOTP secret | Raw bytes (GAP — should be KMS-encrypted) | — |
