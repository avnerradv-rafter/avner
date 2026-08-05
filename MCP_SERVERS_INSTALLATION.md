# MCP Server Installation

This document records the installation of three production-ready MCP (Model Context Protocol) servers registered in Claude Code on **2026-08-05**: Browser Automation, PDF Reader/OCR, and Agent Knowledge (persistent memory).

All three are registered at **user scope**, so they are available across every project in this environment, not just this repository.

## Summary

| Category | Server | Publisher | Package | GitHub Stars | Last commit (as of install) |
|---|---|---|---|---|---|
| Browser Automation | [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Microsoft (official) | `@playwright/mcp` | ~35.8k | 2026-08-04 |
| PDF Reader / OCR | [pdf-mcp](https://github.com/jztan/pdf-mcp) | jztan (community) | `pdf-mcp` (PyPI) | ~94 | 2026-08-04 |
| Agent Knowledge | [Memory (Knowledge Graph)](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) | Model Context Protocol project (official) | `@modelcontextprotocol/server-memory` | 89.2k (monorepo) | 2026-07-29 |

## Selection rationale

### 1. Browser Automation → `microsoft/playwright-mcp`

Clear-cut choice, no real competitor at the "official + mature" tier:

- Published and maintained directly by Microsoft under the `microsoft` GitHub org, Apache-2.0 licensed.
- ~35.8k stars, 569+ commits, commits landing daily (last one the day of installation).
- Drives Chromium/Firefox/WebKit via the accessibility tree rather than screenshots, which is the current best-practice approach for LLM-driven browser automation (faster, more deterministic, no vision model required).
- Alternatives considered: `executeautomation/mcp-playwright` (community fork, far smaller and less active) — rejected in favor of the official Microsoft implementation per the "prefer official" instruction.

### 2. PDF Reader / OCR → `jztan/pdf-mcp`

No server in this category is published by Anthropic/the MCP core team as a genuine production server, so this required weighing community options:

- **`@modelcontextprotocol/server-pdf`** (`modelcontextprotocol/ext-apps`, `examples/pdf-server`) is the closest thing to an "official" option, but it lives in the `examples/` directory of the `ext-apps` repo, is explicitly documented as a teaching example ("What This Example Demonstrates"), has **no OCR support**, and its interactive/annotation tool is documented as unsuitable for multi-instance production deployments. Disqualified on both "production-ready" and "OCR" requirements.
- **`jztan/pdf-mcp`** was selected instead: genuine OCR via Tesseract, hybrid semantic+keyword search (BM25 + RRF) for working through large PDFs without blowing the context window, table/image/chart extraction, multi-column and CJK layout support, SQLite caching, Docker images for amd64/arm64, CI/CD pipeline, 0 open issues, MIT license, and commits landing daily (last one the day of installation, including OCR-cache bug fixes).
- Other candidates surveyed (`sandraschi/ocr-mcp`, various `mcp_pdf_reader` forks) were smaller, single-purpose, or showed materially less maintenance activity.

### 3. Agent Knowledge → `modelcontextprotocol/servers` — Memory (Knowledge Graph)

- The official reference server maintained inside `modelcontextprotocol/servers`, the canonical MCP servers monorepo (89.2k stars, 11.4k forks) backed by the Model Context Protocol project/Anthropic.
- Implements persistent, cross-session agent memory as a knowledge graph (entities, relations, observations) with search/read/mutate tools — the standard "agent knowledge" building block referenced throughout the MCP ecosystem.
- Actively maintained: dependency bumps, CI/OIDC publishing changes, and new features (e.g. exposing the graph as an MCP Resource) landing within the week of installation.

## Dependencies installed

| Dependency | Purpose | Install command |
|---|---|---|
| Node.js 22 / npm / npx | Runs `playwright` and `memory` servers on demand via `npx -y` | Already present in environment |
| `uv` / `uv tool` | Isolated Python environment for `pdf-mcp` (avoids system package conflicts) | Already present in environment |
| `tesseract-ocr` (system package) | OCR engine used by `pdf-mcp` for scanned/image-based PDFs | `apt-get install -y tesseract-ocr` |
| `pdf-mcp` (PyPI, v2.0.0) | The PDF/OCR MCP server binary | `uv tool install pdf-mcp` |

`pip install pdf-mcp` was attempted first but failed on a pre-existing Debian-managed `PyJWT` conflict; `uv tool install pdf-mcp` was used instead, which installs into an isolated virtual environment and avoids touching system site-packages.

Playwright and the memory server are launched on demand via `npx -y <package>@latest`, so no separate install step was needed beyond having Node/npm available — `npx` fetches and caches the package on first run.

## Registration

Registered in Claude Code at user scope (`-s user`), so they're available in every project:

```bash
claude mcp add -s user playwright -- npx -y @playwright/mcp@latest

claude mcp add -s user pdf-mcp -- /root/.local/bin/pdf-mcp

claude mcp add -s user memory \
  -e MEMORY_FILE_PATH=/root/.claude/memory/memory.jsonl \
  -- npx -y @modelcontextprotocol/server-memory
```

Config is stored in `~/.claude.json` under the top-level `mcpServers` key (user scope, not the per-project `projects.<path>.mcpServers` key).

The memory server's knowledge-graph data persists at `/root/.claude/memory/memory.jsonl` (JSONL, one entity/relation per line), configured via `MEMORY_FILE_PATH`.

## Verification — `claude mcp list`

```
$ claude mcp list
Checking MCP server health…

playwright: npx -y @playwright/mcp@latest - √ Connected
pdf-mcp: /root/.local/bin/pdf-mcp  - √ Connected
memory: npx -y @modelcontextprotocol/server-memory - √ Connected
```

All three servers show as connected.

## Health checks

Beyond `claude mcp list`'s connectivity check, each server was independently health-checked with a real MCP protocol handshake (`initialize` → `notifications/initialized` → `tools/list`) over stdio, confirming each server not only starts but correctly speaks MCP and exposes its expected tool surface:

| Server | serverInfo | Tools exposed |
|---|---|---|
| `playwright` | `Playwright 1.62.0-alpha` | 24 tools, e.g. `browser_close`, `browser_resize`, `browser_console_messages`, `browser_handle_dialog`, `browser_evaluate`, `browser_file_upload`, `browser_drop`, `browser_find`, … |
| `pdf-mcp` | `pdf-mcp 2.0.0` | 13 tools, e.g. `pdf_info`, `pdf_read_pages`, `pdf_read_all`, `pdf_search`, `pdf_get_toc`, `pdf_corpus_warm`, `pdf_corpus_overview`, `pdf_corpus_search`, … |
| `memory` | `memory-server 0.6.3` | 9 tools: `create_entities`, `create_relations`, `add_observations`, `delete_entities`, `delete_observations`, `delete_relations`, `read_graph`, `search_nodes`, … |

All three passed cleanly — no errors, no timeouts, valid JSON-RPC responses with the expected tool schemas.

## Managing these servers

```bash
claude mcp list                    # list + connectivity check
claude mcp get <name>               # detailed info for one server
claude mcp remove <name> -s user    # uninstall
```

## Notes / caveats

- `pdf-mcp`'s OCR path depends on the system `tesseract` binary being present (installed above); without it, OCR-specific tools will fail on scanned PDFs while plain text extraction still works.
- Playwright's underlying browser binaries are fetched by `npx`/the Playwright package on first real use; if browser launch fails in a fresh environment, run `npx playwright install chromium` (or the relevant browser) once.
- All three are registered as **stdio** servers spawned by Claude Code itself — no standalone daemon/process to manage separately.
