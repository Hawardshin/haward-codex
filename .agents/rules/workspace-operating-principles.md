# Workspace Operating Principles

Activation: Always On

This Antigravity rule adapts shared repository behavior to Antigravity. It should stay thin.

- Canonical repository rules live in `AGENTS.md`.
- Tool-agnostic principles live in `_docs/operating-models/tool-agnostic-agent-operating-model.ko.md`.
- Runtime mapping lives in `_ops/assistant-runtimes/adapter-registry.json`.
- Keep project settings, worktree choices, and command permissions aligned with the current task risk.
- Use isolated worktrees for parallel or high-risk work when available.
- Do not duplicate durable policy in `.agents/rules`; point back to shared repository docs.
- Follow repository workflow: web-first intake, memory bootstrap, work mode selection, project boundary check, requirements/specs when required, implementation, verification, evaluation, commit, and push.
