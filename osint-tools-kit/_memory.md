# CURRENT STATE

## STATUS
- DeepDive + Phone OSINT Framework: installed and verified in cloud container only (ephemeral). NOT yet installed on Avner's Windows PC.
- Portable kit committed: branch `claude/deepdive-phone-osint-local-bree3m`, draft PR avnerradv-rafter/avner#8.
- PR #8 CI `Deno / test` red: "No test modules found" — pre-existing on `main` (repo has no Deno tests); explained in PR comment with proposed fix. No review threads.

## FILES
- `osint-tools-kit/install.sh` — authoritative installer (Linux/macOS/Git Bash); idempotent; tested in clean HOME.
- `osint-tools-kit/patches/*.patch` — local security/bug patches (`LOCAL PATCH` markers).
- `osint-tools-kit/bin/{deepdive,phone-osint}` — launchers.
- `osint-tools-kit/skills/{deepdive,phone-osint}/SKILL.md` + `skills/deepdive/scripts/dd_graph.py`.
- `osint-tools-kit/rafterx/OSINT-Tools-Integration.md` — vault note (not yet placed in C:\RafterX).
- `osint-tools-kit/README.md`.

## FACTS
- DeepDive pinned `5626f4d6a21caf6a13a62b2a53145641c87ff151`; requires Python ≥3.12 (PEP 701 f-strings).
- Phone OSINT pinned `acd577a375a397d228b28c84a8c1a9e2d6e3c89d`; Python 3.11.
- Install paths: `~/tools/<app>/.venv`; case data `~/osint-cases/<case-id>/`; skills `~/.claude/skills/`.
- URLs: DeepDive http://localhost:8766/board (WS 8765); Phone UI http://127.0.0.1:5000.
- Phone upstream tests 30/48 pass; 18 fail due to stale tests vs v2.0 API.
- Selenium driver not verified (container proxy blocked driver download).

## DECISIONS
- Skills use `disable-model-invocation: true`; all calls go through launchers.
- DeepDive default provider `none`; claude-CLI provider only if explicitly chosen.
- Phone `run` only after stated authorisation per case; results never treated as proof of identity.
- Tools/data kept outside the RafterX vault.

## OPEN
- Run `bash osint-tools-kit/install.sh` on Windows (Git Bash) and restart Claude Code.
- Copy RafterX note into C:\RafterX, adapt to vault conventions.
- Optional keys: DeepDive AI provider; phone `config/.env` API keys.
- Fix `.github/workflows/deno.yml` (separate change) so CI can pass.
- Auto check-ins on PR #8 blocked by auto-mode classifier — Avner confirmation required to continue monitoring outside auto mode.
