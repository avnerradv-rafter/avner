---
name: deepdive
description: DeepDive OSINT link-analysis graph (local install). Start/stop the loopback DeepDive board, or build a provenance-tracked entity graph for a case from web research. Explicit use only.
disable-model-invocation: true
argument-hint: "<status|start|stop|new|expand|board|summary|list> <case-id> [subject | investigation-id [entity]]"
---

# DeepDive (local, adapted from upstream skills/deepdive.md @ 5626f4d)

Arguments: `$ARGUMENTS`

Installed paths (do NOT auto-install, do NOT pip install into system Python):
- App: `~/tools/deepdive` — interpreter `~/tools/deepdive/.venv/bin/python` (Python 3.12+ required)
- Launcher: `~/tools/bin/deepdive`
- Graph helper: `~/.claude/skills/deepdive/scripts/dd_graph.py`, always invoked as `~/tools/bin/deepdive graph ...` (selects the venv interpreter on Linux/macOS/Windows Git Bash)
- Case data: `~/osint-cases/<case-id>/deepdive/<investigation-id>/` (override with `OSINT_CASES_DIR`)

Case and investigation ids must match `^[A-Za-z0-9][A-Za-z0-9._-]*$`. If the case id is missing, ask for it — never mix cases.

## Sub-commands

| Invocation | Action |
|---|---|
| `/deepdive status` | `~/tools/bin/deepdive status` |
| `/deepdive start <case> [inv]` | `~/tools/bin/deepdive start <case> [inv]` — refuses if ports 8765/8766 are busy; reuses the running server instead of starting a duplicate |
| `/deepdive stop` | `~/tools/bin/deepdive stop` |
| `/deepdive list <case>` | `$G list --case <case>` |
| `/deepdive new <case> <subject>` | Skill-mode investigation (below) |
| `/deepdive expand <case> <inv> <entity-id>` | Expand one node (below) |
| `/deepdive board <case> <inv>` | `$G board ...` → prints `board_3d.html` path |
| `/deepdive summary <case> <inv>` | `$G summary ...` |

Where `G` = `~/tools/bin/deepdive graph`.

## Two modes — keep them distinct

1. **Server mode** (`start`): the web board at http://localhost:8766/board. Its AI research/chat needs a provider configured at http://localhost:8766/settings (stored in `~/.deepdive/settings.json`). With no provider it returns "no AI provider configured" — report that; do not configure a key yourself and do not select the `claude` CLI provider on the user's behalf.
2. **Skill mode** (`new` / `expand`): Claude Code itself does the searching (WebSearch/WebFetch) and records results through the helper. No DeepDive provider key needed.

## Skill mode — /deepdive new <case> <subject>

1. Confirm the case id and that the research is authorised for that matter. Do not upload client documents to any external service.
2. `$G init --case <case> --subject "<subject>" --type <person|company|...>` → note `investigation_dir`.
3. Run these five WebSearch angles (upstream workflow):
   `"<subject>" background overview`, `"<subject>" funding investors financial`, `"<subject>" directors officers partners`, `"<subject>" lawsuit investigation court`, `"<subject>" headquarters offices location`.
   Add Israeli-relevant angles when appropriate (e.g. Hebrew spelling of the name).
4. Pipe one JSON object to `$G add --case <case> --inv <inv>` on stdin:
   ```json
   {"entities":[{"name":"...","type":"person","id":"optional_disambiguated_id","source_url":"https://...","retrieved_at":"ISO-8601 (optional, default now)","claim_status":"source_claim","attributes":{"role":"..."}}],
    "connections":[{"source":"<entity id>","target":"<entity id>","relationship":"director_of","confidence":0.7,"source_url":"https://...","claim_status":"source_claim","time_period":"2019-2022"}],
    "findings":["..."], "searches":["queries actually run"]}
   ```
   - `claim_status`: `source_claim` (what a source says; needs `source_url` or `document_ref`), `inferred` (your inference; needs `basis`), `verified` (independently confirmed against a primary record; needs source + `verified_by`).
   - Confidence: 0.9 primary record · 0.7 reputable report · 0.4 allegation/unconfirmed.
   - Entity id = normalised name. Two different people with the same name WILL merge — pass an explicit `id` (e.g. `david_cohen__haifa_contractor`) when there is any doubt. The helper flags every merge as "CHECK SAME-NAME MERGE".
   - Items without the required source are rejected; report rejections, do not invent sources.
5. `$G board ...` then `$G summary ...`. Do not auto-open a browser; give the path.

## /deepdive expand <case> <inv> <entity-id>

Run 3 targeted searches on the entity, add results with `depth = parent depth + 1`, include `"mark_investigated": "<entity-id>"` in the JSON, then `board` + `summary`. A node reached from two independent paths is a lead to check, not a finding.

## Report format (every run)

- Output locations: graph JSON, `provenance.jsonl`, `board_3d.html` (absolute paths).
- Stats and connections by `claim_status`.
- Three separate sections: **Source claims** (with URLs + retrieval time) · **Inferred connections** (with basis) · **Independently verified facts**.
- Leads to expand (top pending nodes) and any same-name merge warnings.
- State plainly: a generated graph, gap detection, fuzzy name match or cross-link is an investigative lead, **not proof of identity or of any fact**.
