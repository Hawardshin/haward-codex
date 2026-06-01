# Spec: Tool-Agnostic AI Assistant Operating Principles

## Requirement

- `REQ-WS-028`

## Problem

The repository currently operates in Codex, but the user wants the same principles to be usable from Claude Code, Cursor, Antigravity, or another preferred assistant tool. If policy is locked to a single tool entrypoint such as `AGENTS.md`, the operating rules can diverge or disappear when another tool is used.

## Goals

- Split shared operating principles into tool-agnostic documents.
- Add thin runtime adapters for Codex, Claude Code, Cursor, and Antigravity.
- Audit runtime adapter roots as a distinct structure class rather than projects.
- Provide a generic assistant principle template for future tools.
- Let workspace monitor discover adapter and template documents.

## Non-Goals

- Do not remove Codex operating rules.
- Do not install a tool-specific plugin or extension.
- Do not run end-to-end tests inside actual Claude Code, Cursor, or Antigravity environments.

## Acceptance Criteria

- `_docs/tool-agnostic-agent-operating-model.ko.md` and `.en.md` exist.
- `CLAUDE.md`, `.claude/rules/`, `.cursor/rules/`, and `.agents/rules/` point back to shared principles.
- `_ops/assistant-runtimes/adapter-registry.json` passes the self-documenting config contract.
- `_ops/projects/root-structure-policy.json` and `structure-audit` recognize runtime adapter roots.
- The memory bootstrap manifest includes the adapter registry and tool-agnostic model as anchors.
- The `workspace-monitor` snapshot includes runtime adapter and assistant principle template documents.
