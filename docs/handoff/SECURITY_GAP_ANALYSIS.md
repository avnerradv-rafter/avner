# SECURITY_GAP_ANALYSIS.md — STAY POSITIVE / SafeConnect

**Audit date:** 2026-11-26  
**Methodology:** Read-only source audit against requirements in CLAUDE.md

---

## Summary

| Requirement | Status | Evidence |
|---|---|---|
| Zero-Knowledge medical data | ✅ IMPLEMENTED | `encryptMedicalData()` — client-side key derivation; server stores blobs only |
| AES-256-GCM field encryption | ✅ IMPLEMENTED | `encryption-lib/src/index.ts` |
| Argon2id password hashing | ❌ GAP | `passwordHash` stored as random hex placeholder; `argon2` package not installed |
| JWT RS256 (2048-bit) | ✅ IMPLEMENTED | `token.service.ts` — ephemeral keys in dev, KMS expected in prod |
| TOTP mandatory 2FA | ✅ IMPLEMENTED | `totp.service.ts` using `otpauth` |
| Rate limiting | ✅ IMPLEMENTED | Per-route limits + global `@fastify/rate-limit` |
| Input validation | ✅ IMPLEMENTED | Zod schemas on all 8 endpoints |
| Auth middleware | ✅ IMPLEMENTED | `auth.middleware.ts` JWT RS256 verify |
| Audit logging | ✅ IMPLEMENTED | `audit.middleware.ts` → Prisma `AuditLog` |
| No PII in logs | ✅ IMPLEMENTED | Fastify `redact` config covers phone, passwords, tokens |
| SQL injection protection | ✅ IMPLEMENTED | Prisma parameterized queries by design |
| XSS protection | 🟡 PARTIAL | No mobile UI yet; API returns JSON only (safe) |
| CORS configured | ✅ IMPLEMENTED | `@fastify/cors` with `env.CORS_ORIGIN` |
| No secrets in code | ✅ IMPLEMENTED | All secrets via env vars; `.env.example` committed |
| Phone hashing (HMAC-SHA256) | ✅ IMPLEMENTED | `hashPhone()` in encryption-lib |
| Location fuzzing (~500m) | ✅ IMPLEMENTED | `fuzzLocation()` in encryption-lib |
| Photo envelope encryption | ✅ IMPLEMENTED | Per-photo key wrapped by user PEK |
| E2E messaging (Signal Protocol) | ❌ NOT STARTED | Schema has `SignalPreKey` model; no implementation |
| Screenshot protection | ❌ NOT STARTED | Phase 3 |
| Panic button / decoy mode | ❌ NOT STARTED | Phase 3 |
| TLS 1.3 | ❌ NOT STARTED | Infrastructure not provisioned |
| TOTP secret KMS encryption | ❌ GAP | Currently stored as raw bytes in `users.totp_secret` |
| Refresh token rotation | ✅ IMPLEMENTED | Single-use tokens; invalidated on consumption |
| GDPR right to deletion | ✅ IMPLEMENTED | 30-day scheduled deletion with TOTP confirmation |

---

## Critical Gaps (must fix before any user-facing launch)

### GAP-1: Argon2id NOT implemented
**Risk:** HIGH  
**Location:** `auth.service.ts:52` — `passwordHash` is `crypto.randomBytes(32).toString('hex')`, a placeholder.  
**Required fix:** When client derives encryption key from passphrase, store `argon2.hash(passphrase)` as `passwordHash`. Install `argon2` package. Currently there is no server-side password verification at all.

### GAP-2: TOTP secret stored unencrypted in DB
**Risk:** MEDIUM-HIGH  
**Location:** `auth.service.ts:48` — `Buffer.from(totpSecret, 'utf8')` stored raw.  
**Code comment says:** `TODO Phase 2: encrypt with server key before storage`  
**Required fix:** Encrypt `totpSecret` with `SERVER_ENCRYPTION_KEY` (AES-256-GCM) before storing.

### GAP-3: No user enumeration protection in login flow
**Risk:** LOW (partially mitigated)  
**Location:** `auth.routes.ts:111` — login returns `requestId: 'not-found'` for non-existent users, which is semantically different from a real requestId. A timing attack could distinguish real vs. fake OTP sends.  
**Required fix:** Send a real (fake) OTP to a throwaway Redis key with identical timing for non-existent users.

### GAP-4: Signal Protocol messaging — schema only
**Risk:** HIGH for messaging feature  
**Status:** `SignalPreKey` model exists in Prisma but zero implementation. Any messaging UI will send plaintext until this is built.

---

## Items Meeting Security Requirements

- Phone numbers never stored; only HMAC-SHA256 hash
- IP addresses hashed before audit log storage (`hashIP()`)
- OTP: cryptographically secure via `crypto.randomInt`, timing-safe comparison, 5-attempt lockout, 10-min TTL
- Refresh tokens: opaque 40-byte hex, single-use rotation
- Access tokens: 15-minute lifetime, RS256 signed
- All medical data fields: `Bytes` (encrypted blobs) in DB schema
- PII redaction confirmed in Fastify logger config
- Prisma prevents SQL injection by construction
