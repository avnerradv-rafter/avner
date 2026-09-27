---
name: phone-osint
description: Wrapper for the locally installed Phone OSINT Framework (aegisceo/phone-osint-framework). Config check, offline number parsing, per-case investigation runs, loopback web UI. Explicit use only.
disable-model-invocation: true
argument-hint: "<check|validate|run|web|web-stop|test> [case-id] [+E164-number] [identity-json]"
---

# Phone OSINT Framework (local)

Arguments: `$ARGUMENTS`

Installed paths:
- App: `~/tools/phone-osint-framework` — interpreter `~/tools/phone-osint-framework/.venv/bin/python` (Python 3.11)
- Launcher (the only supported interface; it wraps `phone_osint_master.py <phone> [identity_json]` and `web_interface.py`): `~/tools/bin/phone-osint`
- API keys: `~/tools/phone-osint-framework/config/.env` (template `config/.env.example`). Never print its contents; `check` shows key names only.
- Results: `~/osint-cases/<case-id>/phone-osint/<timestamp>_<number>/` (`investigation_report.html`, `complete_results.json`, `investigation.log`)

The upstream CLI has no flags other than the positional phone number and optional identity JSON. Do not invent options.

## Sub-commands

| Invocation | Command | Network? |
|---|---|---|
| `/phone-osint check` | `~/tools/bin/phone-osint check` | no |
| `/phone-osint validate +972...` | `~/tools/bin/phone-osint validate <num>` — libphonenumber parse/format/region, offline | no |
| `/phone-osint test` | `~/tools/bin/phone-osint test` — upstream unit tests (mocked) | no |
| `/phone-osint run <case> <+E164> ['{"name":"..."}']` | `~/tools/bin/phone-osint run ...` | **yes** |
| `/phone-osint web <case>` | loopback UI at http://127.0.0.1:5000 (port via `WEB_PORT`) | on use |
| `/phone-osint web-stop` | stop the UI | no |

## Before `run` (mandatory)

`run` queries third-party services and scrapes public sites about a real number. Before running:
1. Confirm the case id and that the user states the lookup is authorised and lawful for that matter (for example, a court order, the client's consent, or a legitimate litigation purpose). Do not run it as a test or on a number of your own choosing.
2. Run `check` and tell the user which modules will be empty because keys are missing.
3. Warn that the TruePeopleSearch module automates a browser with CAPTCHA evasion (US data only; ToS risk) and that breach-data modules return third-party breach records.

## Reporting results

- Give the result directory and the report path.
- Split the findings into **source claims** (with the module or source name and the timestamp from `investigation.log`), **inferred links** (name hunting, email pattern generation, risk scores) and **independently verified facts** (normally none, unless checked against a primary record).
- A name returned by a people-search site, a fuzzy name match or a breach-record match is **not proof of identity**. Say so explicitly.
- Leave the raw results as they are. Do any analysis in a separate file in the same case folder.
