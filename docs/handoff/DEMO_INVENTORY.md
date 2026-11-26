# DEMO_INVENTORY.md — STAY POSITIVE / SafeConnect

**Audit date:** 2026-11-26

---

## Available Demo Assets

### 1. `apps/api/src/demo.ts` — Auth Flow Demo Script

**Type:** Node.js script (TypeScript)  
**Runs without:** PostgreSQL, Redis, Twilio (all mocked/in-memory)  
**Last verified:** Commit `e955f3c`

**Demonstrates:**
1. Encryption library — AES-256-GCM round-trip, auth tag tamper detection
2. Field encryption — profile field encrypt/decrypt
3. Medical data zero-knowledge — client-side derive + encrypt + decrypt
4. Phone hashing — normalization and consistency
5. Location fuzzing — 500m radius privacy
6. Photo envelope encryption — per-photo key wrapped by user PEK
7. Auth flow simulation — OTP generation (console), TOTP secret/URI, JWT tokens, refresh rotation

**Run command:**
```bash
cd apps/api && npx ts-node src/demo.ts
```
(Requires `ts-node` install in dev; otherwise `npm run build && node dist/demo.js`)

**Investor demo value:** HIGH  
Shows zero-knowledge architecture working end-to-end without any infrastructure.

---

### 2. `hebrew_to_mp3_converter.html` — Unrelated File

**Type:** HTML  
**Status:** Pre-existing in repo, unrelated to SafeConnect / STAY POSITIVE  
**Location:** `/hebrew_to_mp3_converter.html` (repo root)  
**Action:** No action needed; ignore in product demos.

### 3. `hebrew-to-mp3-converter.jsx` — Unrelated File

**Type:** React JSX  
**Status:** Pre-existing in repo, unrelated  
**Location:** `/hebrew-to-mp3-converter.jsx` (repo root)

---

## Missing Demo Assets (to build)

### A. Investor / Hospital / Nonprofit Presentation

**Status:** NOT BUILT  
**Priority:** HIGH (user requested: "הכי מאובטחת שיש שאוכל להציגה בפני משקיעים, בתי חולים, עמותות")  
**Suggested format:**
- Interactive HTML presentation with STAY POSITIVE branding
- Sections: Problem / Mission → Zero-Knowledge Architecture → Encryption Demo → Security Roadmap → Phase 1 completion proof

### B. API Swagger / OpenAPI Spec

**Status:** NOT BUILT  
**Priority:** MEDIUM  
**Fastify can auto-generate** via `@fastify/swagger` + `@fastify/swagger-ui`

### C. Mobile UI Mockups

**Status:** NOT BUILT  
**Priority:** MEDIUM (Phase 1 mobile is skeleton only)  
**Suggested tool:** Figma or React Native screens

### D. CI Passing Badge

**Status:** NOT WIRED (`.github/workflows/deno.yml` exists but is unrelated to the Node.js project)  
**Priority:** HIGH before investor presentation

---

## Demo Script Execution (from prior session)

The demo was run successfully in an earlier session. Output confirmed:

- `encrypt/decrypt` ✅ round-trip
- `encryptField/decryptField` ✅ field-level
- `encryptMedicalData` ✅ zero-knowledge, wrong-password throws
- `hashPhone` ✅ consistent, normalized
- `fuzzLocation` ✅ within 500m, never exact
- `encryptPhoto` ✅ envelope encryption
- Auth simulation ✅ OTP → TOTP → JWT → refresh rotation → logout

All 7 sections passed without infrastructure dependencies.
