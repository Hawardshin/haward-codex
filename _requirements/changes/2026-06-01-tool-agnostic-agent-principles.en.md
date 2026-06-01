# Requirement Change: Tool-Agnostic AI Assistant Operating Principles

## Change ID

- `REQ-WS-028`

## Source Request

- `UR-2026-06-01-011`

## Change

- The repository's AI assistant operating principles must not depend on Codex-only syntax or files.
- Shared principles live in `_docs/`, `_ops/`, `_requirements/`, `_specs/`, `_history/`, and `agent-platform/configs/`.
- `AGENTS.md`, `CLAUDE.md`, `.claude/rules/`, `.cursor/rules/`, and `.agents/rules/` are runtime adapters pointing back to shared principles.
- Runtime adapter directories are not registered root projects; `_ops/projects/root-structure-policy.json` classifies them separately.
- When another assistant tool is introduced, first check `_ops/assistant-runtimes/adapter-registry.json` and `_templates/assistant-operating-principles/`.

## Rationale

- Claude Code, Cursor, and Antigravity use different project instruction or rule files.
- Copying the shared policy into each tool-specific file would create divergence.
- Instruction files provide context, not enforcement, so critical operating principles also need audits, config contracts, memory bootstrap, and evaluation.

## Verification

- The adapter registry must pass the self-documenting config contract.
- Root structure audit must classify `.claude`, `.cursor`, and `.agents` as `runtime_adapter`.
- The memory bootstrap manifest must load the tool-agnostic operating model and adapter registry as anchors.
- The workspace monitor snapshot must include runtime adapter and template documents.
