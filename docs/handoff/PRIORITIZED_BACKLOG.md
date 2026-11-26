# PRIORITIZED_BACKLOG.md — STAY POSITIVE / SafeConnect

**Audit date:** 2026-11-26  
**Methodology:** Gaps from FEATURE_MATRIX.json + SECURITY_GAP_ANALYSIS.md, ordered by risk and investor-readiness

---

## Priority 0 — Security Fixes (BEFORE any user data)

| ID | Task | File | Effort |
|---|---|---|---|
| SEC-1 | Implement Argon2id password hashing | `auth.service.ts:52`, install `argon2` | Small |
| SEC-2 | Encrypt TOTP secret with server KMS key before DB storage | `auth.service.ts:48-49` | Small |
| SEC-3 | Fix login user enumeration — send fake OTP with identical timing for non-existent users | `auth.routes.ts:111` | Small |

---

## Priority 1 — Phase 1 Completion

| ID | Task | Description | Effort |
|---|---|---|---|
| P1-1 | Product rename: SafeConnect → STAY POSITIVE | Update CLAUDE.md, all `@safeconnect/*` packages, TOTP issuer, SMS body | Small |
| P1-2 | Profile CRUD API | `/api/v1/profile` — create, read, update with encrypted fields | Medium |
| P1-3 | API service test suite | Jest for auth, token, OTP, TOTP services (target ≥70% coverage) | Medium |
| P1-4 | Wire GitHub Actions CI for Node.js | The existing `deno.yml` is unrelated; need Node.js test + lint workflow | Small |
| P1-5 | Docker Compose for local dev | PostgreSQL + Redis containers; currently in-memory only | Small |
| P1-6 | Prisma migration baseline | `prisma migrate dev --name init` with DATABASE_URL set | Small |
| P1-7 | Key generation script production-ready | `infrastructure/scripts/generate-keys.sh` — verify and document | Small |

---

## Priority 2 — Investor / Hospital Presentation

| ID | Task | Description | Effort |
|---|---|---|---|
| DEMO-1 | STAY POSITIVE investor deck | Interactive HTML artifact — problem, architecture, demo, roadmap | Medium |
| DEMO-2 | Swagger/OpenAPI spec | `@fastify/swagger` integration on `/api/v1/docs` | Small |
| DEMO-3 | Architecture diagram | Visual zero-knowledge flow for non-technical audience | Small |

---

## Priority 3 — Phase 2: Core Features

| ID | Task | Description |
|---|---|---|
| P2-1 | Signal Protocol messaging | `libsignal-protocol-typescript` integration; use existing `SignalPreKey` schema |
| P2-2 | WebSocket server | Real-time message delivery |
| P2-3 | Discovery algorithm | Location-based matching with fuzzy distance; never exact GPS |
| P2-4 | Photo upload pipeline | S3 upload with client-side envelope encryption before upload |
| P2-5 | Block / report flows | Use existing `Block` and `Report` Prisma models |

---

## Priority 4 — Phase 3: Safety & Polish

| ID | Task | Description |
|---|---|---|
| P3-1 | Panic button / decoy mode | Emergency screen wipe; dummy app overlay |
| P3-2 | Screenshot prevention | React Native `ScreenCapture` API |
| P3-3 | AI content moderation | On-device or server-side image classification |
| P3-4 | Contact blocking | Hash contacts list → check against `ContactBlock` table |
| P3-5 | Disappearing messages | TTL field already in `Message.expiresAt`; needs enforcement job |

---

## Priority 5 — Phase 4: Community

| ID | Task | Description |
|---|---|---|
| P4-1 | Anonymous forum | Zero-knowledge post authorship |
| P4-2 | Resource library | HIV/health information hub |
| P4-3 | Premium features | Non-safety premium tier |

---

## Notes

- Safety features (panic, screenshot, block, report, encrypted messaging) must remain **FREE** per CLAUDE.md Core Principle #4.
- Infrastructure target is **AWS EU Frankfurt or Hetzner Germany** (GDPR jurisdiction).
- All Phase 2+ messaging must use Signal Protocol — no plaintext fallback allowed.
