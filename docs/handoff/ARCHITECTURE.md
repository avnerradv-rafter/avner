# ARCHITECTURE.md — STAY POSITIVE / SafeConnect

**Audit date:** 2026-11-26

---

## Monorepo Layout

```
safeconnect/                   ← root package "safeconnect"
├── apps/
│   ├── api/                   ← @safeconnect/api  (Fastify, Node.js)
│   │   ├── prisma/schema.prisma
│   │   └── src/
│   │       ├── config/        ← env.ts, prisma.ts, redis.ts
│   │       ├── middleware/    ← auth.middleware.ts, audit.middleware.ts
│   │       ├── routes/        ← auth.routes.ts
│   │       ├── services/      ← auth, otp, totp, token
│   │       ├── server.ts
│   │       └── demo.ts
│   └── mobile/                ← @safeconnect/mobile  (React Native + Expo)
│       └── app.json
├── packages/
│   ├── encryption-lib/        ← @safeconnect/encryption-lib  (pure Node crypto)
│   ├── shared-types/          ← @safeconnect/shared-types
│   └── ui-components/         ← @safeconnect/ui-components
├── infrastructure/
│   └── scripts/generate-keys.sh
├── docs/                      ← PRD, SECURITY, PRIVACY_POLICY, ToS, DPIA
├── turbo.json                 ← Turborepo pipeline
└── package.json               ← npm workspaces root
```

---

## Tech Stack (Verified Installed)

| Layer | Technology | Version / Notes |
|---|---|---|
| Monorepo | Turborepo | `turbo.json` present |
| Backend runtime | Node.js + TypeScript | strict mode |
| Backend framework | Fastify | `@fastify/cors`, `@fastify/rate-limit` |
| ORM | Prisma | Schema complete; DB not provisioned in dev |
| Cache / sessions | Redis | With in-memory fallback for dev |
| Password hashing | Argon2id | Listed in CLAUDE.md; `argon2` package TBD |
| Encryption | AES-256-GCM | Implemented in `encryption-lib` |
| Key derivation | PBKDF2-SHA512 | 600,000 iterations; `deriveKey()` in lib |
| Auth tokens | JWT RS256 | 15m access / 7d refresh rotation |
| 2FA | TOTP (otpauth) | SHA1, 6-digit, 30s, ±1 window |
| OTP delivery | Twilio SMS | Dev: console log; Prod: Twilio API |
| Mobile | React Native + Expo | Skeleton only |
| Validation | Zod | All endpoints |
| Testing | Jest + ts-jest | encryption-lib only |
| Infrastructure | AWS EU / Hetzner DE | Planned; not provisioned |

---

## API Endpoints (Phase 1 — Implemented)

Base path: `/api/v1/auth`

| Method | Path | Rate limit | Auth | Description |
|---|---|---|---|---|
| POST | `/register` | 5/15m | None | Start registration — sends OTP |
| POST | `/register/verify-otp` | 10/15m | None | Verify OTP → create user, return TOTP URI |
| POST | `/register/confirm-totp` | 10/15m | None | Confirm TOTP → issue tokens |
| POST | `/login` | 10/15m | None | Start login — sends OTP |
| POST | `/login/verify` | 10/15m | None | OTP + TOTP → issue tokens |
| POST | `/token/refresh` | 30/15m | None | Rotate refresh token |
| POST | `/logout` | global | JWT | Invalidate refresh token |
| DELETE | `/account` | 3/1h | JWT | Schedule 30-day GDPR deletion |
| GET | `/health` | None | None | Health check |

---

## Database Schema (11 Prisma Models)

`User` → `Profile` → `Photo`  
`User` → `MedicalProfile`  
`User` × `User` → `Match` → `Message`  
`User` → `SignalPreKey`  
`User` × `User` → `Block`  
`User` × `User` → `Report`  
`User` → `ContactBlock`  
`User` → `AuditLog`

All sensitive fields stored as `Bytes` (encrypted). Phone stored as HMAC-SHA256 hash only. Location stored as fuzzy decimal (±~500m). Messages stored as `Bytes ciphertext` (Signal Protocol ready).

---

## Encryption Architecture

```
Client device
  └─ User passphrase
       └─ PBKDF2-SHA512 (600k iter + salt)
            └─ Client Encryption Key (CEK)
                 ├─ encryptMedicalData() → AES-256-GCM blobs
                 │   (server never holds CEK)
                 └─ Photo Encryption Key (PEK)
                      └─ encryptPhoto() → per-photo key wrapped by PEK

Server
  ├─ Stores: ciphertext blobs, hashes, fuzzy coordinates
  ├─ Never stores: plaintext medical data, raw phone numbers
  ├─ TOTP secret stored as raw bytes (TODO: encrypt with server KMS key)
  └─ Audit log: hashed IPs, no PII
```

---

## Planned Routes (TODO comments in server.ts)

```
Phase 1 continued:  /api/v1/profile   (profile CRUD)
Phase 2:            /api/v1/discover
                    /api/v1/matches
                    /api/v1/messages
                    /api/v1/safety
```
