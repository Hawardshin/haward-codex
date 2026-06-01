# Plan Record: Tool-Agnostic AI Assistant Operating Principles

## Work Mode

- `governance`

## Request Summary

- Turn the current Codex-centered repository operating rules into a principle template usable from Claude Code, Antigravity, Cursor, or another assistant tool preferred by the user.

## Rationale

- Official documentation shows each assistant tool uses different project instruction or rule files.
- Copying the policy source into several tool-specific files would create divergence, so shared principles plus thin runtime adapters are needed.
- Critical rules should not rely only on instruction files; they need audits, config contracts, memory bootstrap, and evaluation.

## Execution Plan

1. Record web search and requirement changes.
2. Create the tool-agnostic operating model and adapter registry.
3. Add Codex, Claude Code, Cursor, and Antigravity adapters.
4. Update root structure policy, structure audit, memory bootstrap, and workspace monitor.
5. Run verification and evaluation, then commit and push.

## Outputs

- `_docs/operating-models/tool-agnostic-agent-operating-model.en.md`
- `_ops/assistant-runtimes/adapter-registry.json`
- `CLAUDE.md`
- `.claude/rules/workspace-operating-principles.md`
- `.cursor/rules/workspace-operating-principles.mdc`
- `.agents/rules/workspace-operating-principles.md`
- `_templates/assistant-operating-principles/`
- `_specs/workspace-platform/2026-06-01-tool-agnostic-agent-principles/`
