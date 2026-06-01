# Plan: Tool-Agnostic AI Assistant Operating Principles

## Work Mode

- `governance`

## Rationale

- The user request changes durable operating principles that should survive across assistant tools.
- Web search confirmed that Claude Code, Cursor, and Antigravity use different project instruction or rule files.
- Existing repository rules are Codex-centered, but the underlying operating principles should remain tool-agnostic.

## Steps

1. Research tool-specific official docs and public instruction formats.
2. Add shared principle documents and a runtime adapter registry.
3. Add Claude Code, Cursor, and Antigravity adapter files, then update `AGENTS.md` and README.
4. Teach root structure policy and `structure-audit` to classify runtime adapter roots.
5. Update memory bootstrap, persistent instructions, project boundary, and repository governance docs.
6. Add adapter and template documents to workspace monitor snapshot sources.
7. Record requirements, specs, history, web search records, evaluation, and run verification.
