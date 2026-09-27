---
title: OSINT tools — DeepDive & Phone OSINT (integration note)
type: tooling-note
status: draft — adapt to vault conventions [vault not inspected at install time]
---

# OSINT tools — integration with Rafter X

**Location:** apps live outside the vault (`%USERPROFILE%\tools`), case data in `%USERPROFILE%\osint-cases\<case-id>\`. The vault stores notes and links only, never raw tool output or API keys.

## Rules
1. **One case, one folder.** `<case-id>` = the vault's case identifier. Never run two cases on the same DeepDive server session.
2. **Original evidence is read-only.** Tool output (`provenance.jsonl`, `complete_results.json`, `investigation.log`, reports) is kept as produced. Analysis goes in a separate file.
3. **Provenance for every item:** source URL or document reference, retrieval timestamp (UTC), the tool/module, and who verified it.
4. **Three categories, never merged:**
   - *Source claim*: what a specific source states.
   - *Inferred connection*: analyst or AI inference, with its stated basis.
   - *Independently verified fact*: confirmed against a primary record (registry extract, court file, official document).
5. **Not proof of identity:** a generated graph, cross-link, gap, fuzzy name match, people-search hit or breach-record match is a lead only.
6. **No client documents to external providers.** DeepDive file ingestion and AI providers send content to the selected provider. Use only material cleared for that, or a local Ollama model.
7. **Authorisation first:** record the legal basis for each phone or person lookup in the case note before running it.

## Case note stub
- Case: [[<case-id>]]
- Tool / run: DeepDive `<investigation-id>` | Phone OSINT `<timestamp>_<number>`
- Output path: `…\osint-cases\<case-id>\…`
- Authorisation / legal basis:
- Source claims → | Inferred → | Verified →
