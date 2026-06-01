# Workspace Operating Principles

This Claude Code rule adapts shared repository behavior to Claude Code. It should stay thin.

- Canonical repository rules live in `AGENTS.md`.
- Tool-agnostic principles live in `_docs/tool-agnostic-agent-operating-model.ko.md`.
- Runtime mapping lives in `_ops/assistant-runtimes/adapter-registry.json`.
- Before substantial work, follow the same sequence used by this repository: web-first intake, memory bootstrap, work mode selection, project boundary check, requirements/specs when required, implementation, verification, evaluation, commit, and push.
- Keep Claude-specific memory or rule files as adapters only; do not fork durable policy here.
- Prefer concise rules and path-scoped rules when instructions become too large.

