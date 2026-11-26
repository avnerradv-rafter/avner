# SafeConnect — HIV Dating App

## Project Overview

SafeConnect is a privacy-first dating application for people living with HIV and those open to dating them. **Security and privacy are non-negotiable requirements** — a data breach could literally endanger users' lives, freedom, and livelihoods.

## Core Principles (NEVER violate these)

1. **Zero-Knowledge Architecture** — Medical data is client-side encrypted only. The server NEVER has keys to decrypt medical information.
2. **E2E Encryption for Messages** — All chat uses Signal Protocol. Server stores only ciphertext.
3. **Data Minimization** — Store the absolute minimum. Hash phone numbers, fuzz locations, encrypt profile fields.
4. **Safety Features are NEVER Paywalled** — Panic button, screenshot protection, account wipe, block/report, encrypted messaging = always free.
5. **No Ads, No Data Sales, No Third-Party Tracking** — Ever.

## Tech Stack

- **Mobile:** React Native + Expo (iOS & Android)
- **Backend:** Node.js + TypeScript + Fastify
- **Database:** PostgreSQL (profiles, matches) + Redis (sessions, rate limiting)
- **Messaging:** WebSocket + Signal Protocol (libsignal-protocol-typescript)
- **Encryption:** AES-256-GCM (field-level), Argon2id (passwords), TLS 1.3
- **Infrastructure:** AWS EU (Frankfurt) or Hetzner Germany
- **ORM:** Prisma
- **Auth:** JWT (RS256) + TOTP (2FA mandatory)

## Project Structure

```
safeconnect/
├── apps/
│   ├── mobile/          # React Native + Expo
│   └── api/             # Fastify backend
├── packages/
│   ├── shared-types/
│   ├── encryption-lib/
│   └── ui-components/
├── infrastructure/
├── docs/
└── CLAUDE.md
```

## Development Priorities

### Phase 1 — Foundation (Current)
1. Project scaffolding (monorepo with Turborepo)
2. Authentication service (phone + OTP + TOTP)
3. Encryption library (AES-256-GCM field-level, client-side medical encryption)
4. Database schema (Prisma)
5. Basic profile CRUD with encryption

### Phase 2 — Core Features
6. Discovery/matching algorithm
7. Signal Protocol messaging integration
8. Photo encryption pipeline
9. Basic safety features (block, report)

### Phase 3 — Safety & Polish
10. Panic button / decoy mode
11. Screenshot prevention
12. AI content moderation
13. Contact blocking (hash-based)
14. Disappearing messages

### Phase 4 — Community
15. Anonymous forum
16. Resource library
17. Premium features

## Coding Standards

- TypeScript strict mode everywhere
- ESLint + Prettier
- All crypto operations must use audited libraries (no custom crypto)
- Every API endpoint must have: rate limiting, input validation (zod), auth middleware, audit logging
- All database queries must use parameterized queries (Prisma handles this)
- No secrets in code — use environment variables / Vault
- Test coverage: minimum 80% for encryption-lib, 70% for services

## Security Checklist (for every PR)

- [ ] No PII logged (no phone numbers, names, or medical data in logs)
- [ ] No secrets committed (check .env, API keys, etc.)
- [ ] Input validation on all endpoints
- [ ] Rate limiting configured
- [ ] Auth middleware applied
- [ ] Encryption used for sensitive fields
- [ ] SQL injection protection (Prisma parameterized queries)
- [ ] XSS protection (sanitize all user input displayed in UI)
- [ ] CORS configured correctly
- [ ] No unnecessary data in API responses

## Environment Variables

```env
DATABASE_URL=postgresql://user:pass@host:5432/safeconnect
REDIS_URL=redis://host:6379
JWT_PRIVATE_KEY=<RSA private key>
JWT_PUBLIC_KEY=<RSA public key>
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
SERVER_ENCRYPTION_KEY=<AES-256 key from KMS>
FIELD_ENCRYPTION_KEY=<AES-256 key from KMS>
SMS_PROVIDER_API_KEY=<Twilio or similar>
S3_BUCKET=safeconnect-media
S3_REGION=eu-central-1
NODE_ENV=development
PORT=3000
API_URL=https://api.safeconnect.app
```

## Key Files Reference

- `docs/PRD.md` — Full product requirements document
- `docs/SECURITY.md` — Security architecture & threat model
- `docs/PRIVACY_POLICY.md` — Privacy policy (EN + HE)
- `docs/TERMS_OF_SERVICE.md` — Terms of service
- `docs/DPIA.md` — Data Protection Impact Assessment
