# OSINT tools kit — DeepDive + Phone OSINT Framework for Claude Code

Reproducible, hardened local install of two third-party OSINT tools with explicit-invocation Claude Code skills.
Nothing in this folder contains credentials, investigation results or client data.

| Tool | Upstream | Pinned commit | Python |
|---|---|---|---|
| DeepDive | https://github.com/Sinndarkblade/deepdive | `5626f4d6a21caf6a13a62b2a53145641c87ff151` | 3.12+ (uses PEP 701 f-strings) |
| Phone OSINT Framework | https://github.com/aegisceo/phone-osint-framework | `acd577a375a397d228b28c84a8c1a9e2d6e3c89d` | 3.11 (undetected-chromedriver needs distutils; pinned pandas/lxml) |

## Install

```bash
bash install.sh                 # Linux/macOS, or Git Bash on Windows
# optional: TOOLS_DIR=/d/tools OSINT_CASES_DIR=/d/osint-cases bash install.sh
```
Uses `uv` if present, otherwise `py -3.x` (Windows) or `python3.x`. Existing clones are never overwritten; existing skills are backed up. Refuses to install inside the RafterX vault.

Layout: `~/tools/{deepdive,phone-osint-framework,bin}` · per-case data `~/osint-cases/<case-id>/{deepdive,phone-osint}/` · skills `~/.claude/skills/{deepdive,phone-osint}/`.

## Use (Claude Code — restart it after install)

```
/deepdive status
/deepdive start <case-id> [investigation-id]      → http://localhost:8766/board
/deepdive new <case-id> <subject>                 (Claude researches; graph + provenance.jsonl + board)
/deepdive expand <case-id> <investigation-id> <entity-id>
/deepdive stop
/phone-osint check                                (key names only)
/phone-osint validate +9725XXXXXXXX               (offline)
/phone-osint run <case-id> +9725XXXXXXXX          (network; requires stated authorisation)
/phone-osint web <case-id>                        → http://127.0.0.1:5000 ; /phone-osint web-stop
```
Terminal equivalents: `~/tools/bin/deepdive …`, `~/tools/bin/phone-osint …`.

## Configuration (optional; everything installs without it)

- DeepDive server AI features: choose a provider at http://localhost:8766/settings → `~/.deepdive/settings.json`
  (template: `~/.deepdive/settings.template.json`). Options: OpenAI-compatible API key (OpenAI/DeepSeek/Groq), Anthropic API key, or local Ollama.
  A Claude subscription is **not** an API key. The upstream `claude`-CLI provider is only used if explicitly selected.
- Phone framework: `~/tools/phone-osint-framework/config/.env` (created blank, mode 600). Keys: NUMVERIFY_API_KEY, SERPAPI_KEY, GOOGLE_API_KEY + GOOGLE_CSE_ID, TWILIO_SID + TWILIO_AUTH_TOKEN, HUNTER_API_KEY, HAVEIBEENPWNED_API_KEY, WHITEPAGES_API_KEY, SHODAN_KEY, OPENCELLID_API_KEY. Optional external binary: PhoneInfoga.

## Local patches (see `patches/`, every hunk marked `LOCAL PATCH`)

DeepDive
1. Removed Tor auto-start that ran `sudo -S systemctl start tor` with a **hardcoded password**.
2. No implicit fallback to the `claude` CLI with `--permission-mode bypassPermissions`; default provider is `none`.
3. Cross-origin POSTs rejected (upstream sends `Access-Control-Allow-Origin: *`, so any website could change settings or trigger `/plugins/install` → `git clone`); WebSocket restricted to localhost origins.
4. Fixed upstream `IndentationError` in `core/views/settings.py` (server could not start).
5. `DEEPDIVE_INVESTIGATIONS_DIR` env var → per-case storage outside the app directory.
6. Missing dependency `ddgs` (code imports `ddgs`, requirements list `duckduckgo-search`) — handled in lock file.
7. Launcher sets `PYTHONPATH` (upstream `python3 server/app.py` fails with `No module named 'server'`).

Phone OSINT Framework
1. Web UI: upstream `debug=True, host='0.0.0.0'` (Werkzeug debugger = remote code execution) → `debug=False, host='127.0.0.1'`.
2. `PHONE_OSINT_RESULTS_DIR` env var → per-case results; web UI reads the same directory.
3. Web UI spawns the running venv interpreter instead of a hardcoded `venv/` path.
4. Bundled `chromedriver*.zip` binaries are not used; Selenium Manager resolves a driver for the installed Chrome.

## Known limitations

- Phone framework upstream tests: 30/48 pass; 18 fail because the tests were not updated for the v2.0 API (e.g. `PhoneValidator.validate` no longer exists) — not an install fault.
- The phone framework has no offline/dry-run mode; `run` always contacts external services and scrapes (Google dorking, TruePeopleSearch with CAPTCHA evasion, social/breach sources). Much of it is US-centric.
- DeepDive entity ids are normalised names, so same-name different people merge. The skill helper flags every merge and supports explicit ids.
- DeepDive `bridge.py` prepends `/usr/lib/python3/dist-packages` to `sys.path` for web search (upstream; harmless on Windows).

## Stop / uninstall

```bash
~/tools/bin/deepdive stop ; ~/tools/bin/phone-osint web-stop
rm -rf ~/tools/deepdive ~/tools/phone-osint-framework ~/tools/bin/deepdive ~/tools/bin/phone-osint \
       ~/.claude/skills/deepdive ~/.claude/skills/phone-osint ~/.deepdive
# ~/osint-cases holds case data — archive it before deleting.
```
