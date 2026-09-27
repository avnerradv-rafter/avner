# Claude Code personal skills

Install a skill by copying its folder to `~/.claude/skills/` (Windows: `%USERPROFILE%\.claude\skills\`), then restart Claude Code.

| Skill | Invocation | Purpose |
|---|---|---|
| `run-skill-generator` | `/run-skill-generator [repo-path] [--name n] [--dry]` | Inspects a repo, installs/starts/verifies/stops the app, and writes a verified project skill `.claude/skills/run-<project>/SKILL.md` for launching it. |
