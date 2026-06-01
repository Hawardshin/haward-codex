@AGENTS.md

## Claude Code Adapter

This repository uses tool-agnostic operating principles with thin runtime adapters.

- Read `_docs/tool-agnostic-agent-operating-model.ko.md` and `_ops/assistant-runtimes/adapter-registry.json` when translating repository rules into Claude Code behavior.
- Treat `AGENTS.md` as the current canonical repository instruction source, but do not assume every tool name in it is a Claude Code feature.
- Use `.claude/rules/` for Claude-specific scoped rules. Keep Claude-specific files concise and point back to shared repository policies instead of duplicating them.
- If a rule cannot be enforced by Claude Code instructions alone, record the limitation and use repository verification commands, hooks, settings, or human approval where available.

