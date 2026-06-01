# Tool-Agnostic Agent Operating Model

## Purpose

This document defines repository operating principles so they can be reused from Claude Code, Cursor, Google Antigravity, Codex, or another AI coding tool the user prefers.

## Core Principles

- Shared principles live under `_docs/`, `_ops/`, `_requirements/`, `_specs/`, `_history/`, and `agent-platform/configs/`.
- Runtime-specific files are adapters that import, reference, or briefly summarize shared principles.
- Runtime adapters are not the policy source of truth. Shared documents and settings are.
- Instruction files provide context that guides behavior; they are not security enforcement.
- Critical rules need backing from tests, structure audits, config checks, permissions, or human review.
- Before adding a new tool, verify its official documentation for instruction loading, permissions, sandboxing, memory, and rule scoping.

## Current Adapters

| Tool | Adapter | Role |
| --- | --- | --- |
| Codex | `AGENTS.md` | Current default repository instruction entrypoint |
| Claude Code | `CLAUDE.md`, `.claude/rules/` | Imports `AGENTS.md` and adds thin Claude-specific rules |
| Cursor | `.cursor/rules/workspace-operating-principles.mdc` | Applies shared operating principles as a Cursor Project Rule |
| Google Antigravity | `.agents/rules/workspace-operating-principles.md` | Applies shared operating principles as an Antigravity Workspace Rule |
| Generic tool | `_templates/assistant-operating-principles/` | Template for creating a new runtime adapter |

## Adding A New Tool

1. Check official documentation for instruction file paths, rule format, activation, permissions, and security settings.
2. Add a runtime entry to `_ops/assistant-runtimes/adapter-registry.json`.
3. If a new root dot-directory is needed, add it to `_ops/projects/root-structure-policy.json` `runtime_adapter_dirs`.
4. Make the adapter reference shared policy; do not fork policy by copying it.
5. Run `structure-audit`, `check-config-contract`, and `check-memory-bootstrap`.

## Avoid

- Do not duplicate the same long policy in `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, and `.agents/rules`.
- Do not assume Codex-specific tool names or sandbox behavior exist in other tools.
- Do not treat Claude Code, Cursor, or Antigravity instruction files as security enforcement.
- Do not commit tool-local personal settings or secrets.

## Verification

```bash
python3 _tools/structure-audit/src/structure_audit.py --check
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/assistant-runtimes/adapter-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

