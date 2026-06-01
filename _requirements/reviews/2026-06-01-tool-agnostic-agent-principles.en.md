# Requirement Review: Tool-Agnostic AI Assistant Operating Principles

## Review Target

- `REQ-WS-028`

## Review Result

- Status: approved
- Work mode: `governance`
- Scope: workspace root, `_docs/`, `_ops/assistant-runtimes/`, `_templates/assistant-operating-principles/`, `_tools/structure-audit/`, `workspace-monitor/`

## Review Notes

- The user asked for this environment to become a principle template usable from Claude Code, Antigravity, Cursor, or another preferred tool, not only Codex.
- `AGENTS.md` already carries many operating rules, so copying the full rule set into each tool-specific file would be hard to maintain.
- Official documentation shows each tool uses different project instruction or rule locations and formats; a shared source of truth plus tool-specific adapters is the maintainable structure.
- When another tool is actually introduced, the registry should be rechecked against that tool's latest official documentation.

## Approved Acceptance Criteria

- A tool-agnostic operating model document exists.
- Codex, Claude Code, Cursor, and Antigravity adapter files point to shared principles.
- A self-documenting runtime adapter registry exists.
- Root structure audit and memory bootstrap recognize the runtime adapter structure.
- Workspace monitor can discover adapter and template documents.
