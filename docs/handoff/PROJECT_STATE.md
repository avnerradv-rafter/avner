# PROJECT_STATE.md — STAY POSITIVE / SafeConnect

**Audit date:** 2026-11-26  
**Auditor:** Claude (T2 session, `session_016QyCHtnot5Lb9hAxnSDrGJ`)  
**ELBAK tier:** T2 — Linux cloud container, shell available, Mac runner NOT present

---

## Repository Identity

| Field | Value |
|---|---|
| Remote | `avnerradv-rafter/avner` |
| Active branch | `claude/hiv-dating-app-7vVqr` |
| Base branch | `main` |
| Working tree | **CLEAN** — no uncommitted changes |
| Commits on branch | 10 total (8 SafeConnect + 2 pre-existing) |

---

## Commit Log (newest first)

```
e955f3c Add auth flow demo script
da57478 Phase 1: Auth service, encryption tests, and dependency fixes
3985f79 Add mobile app skeleton, shared packages, infra scaffolding, and update .gitignore
b8e9e23 Add API server foundation: Fastify server + Prisma schema with all models
6dce52d Add documentation stubs: PRD, Security, Privacy Policy, ToS, DPIA
b3b9c1b Add encryption library: AES-256-GCM, field encryption, medical data zero-knowledge
795488c Add root monorepo config for SafeConnect
ae84aa4 Add Deno workflow for linting and testing
bf1c996 Add HTML file for Hebrew to MP3 converter with OCR functionality
a298bdc Create Hebrew to MP3 Converter component
```

The last two commits (`bf1c996`, `a298bdc`) are **pre-existing unrelated files** in the repo root (`hebrew_to_mp3_converter.html`, `hebrew-to-mp3-converter.jsx`). They are not part of the SafeConnect / STAY POSITIVE project.

---

## Product Name Inventory

| Name | Where used | Status |
|---|---|---|
| **SafeConnect** | CLAUDE.md, all `@safeconnect/*` packages, `server.ts` console log, SMS body, TOTP issuer | **CURRENT canonical** in code |
| **STAY POSITIVE** | User's rename directive (2026-11-26) | **NEW canonical** — not yet applied to code |
| **HeyBloom** | User's earlier context | **NOT FOUND anywhere in codebase** — zero occurrences |

**Action required:** A rename pass is needed to update CLAUDE.md product name, all `@safeconnect/*` package names, the TOTP issuer string, the SMS message body, and the `server.ts` log line. This must be done in a separate authorized commit.

---

## File Count by Category

| Category | Count |
|---|---|
| TypeScript source (`.ts`) | 15 |
| Test files (`.test.ts`) | 1 |
| Prisma schema | 1 |
| Documentation stubs | 5 |
| Config files (JSON/JS) | 8 |
| Infrastructure scripts | 1 |
| Unrelated pre-existing files | 2 |
| **Total tracked files** | **~40** |
