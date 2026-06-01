# Web Search Record: Tool-Agnostic AI Assistant Operating Principles

## Search Purpose

- Verify external evidence for turning Codex-centered operating rules into reusable principle templates that also work with Claude Code, Cursor, Antigravity, or another AI assistant.
- Confirm how each tool discovers project-level instruction or rule files, then decide whether a shared-principles plus runtime-adapter structure is appropriate.

## Queries

- `Claude Code project instructions CLAUDE.md official documentation`
- `Cursor rules project instructions .cursor/rules official documentation`
- `Google Antigravity agent instructions project rules documentation`
- `OpenAI Codex AGENTS.md repository instructions official documentation`
- `site:cursor.com/docs rules .cursor/rules Project Rules Cursor`
- `site:antigravity.google/docs rules workflows .agents/rules markdown official`
- `site:antigravity.google/docs projects isolated settings security policies official`
- `OpenAI Codex AGENTS.md official documentation`
- `Cursor project rules .cursor/rules mdc alwaysApply official docs`
- `Google Antigravity .agents/rules workspace rules official`
- `Antigravity IDE .agents rules workspace global rules docs`

## Checked Sources

| Source | URL | What Was Checked | Reliability | Applied Decision |
| --- | --- | --- | --- | --- |
| Claude Code memory documentation | https://code.claude.com/docs/en/memory | Claude Code uses project memory and `CLAUDE.md` for persistent instructions. | High, official documentation | Add `CLAUDE.md` and `.claude/rules/` as thin adapters |
| Cursor rules documentation | https://docs.cursor.com/context/rules | Cursor uses project rules under `.cursor/rules`, with rule metadata such as globs and always-apply behavior. | High, official documentation | Add `.cursor/rules/workspace-operating-principles.mdc` |
| Google Antigravity IDE rules documentation | https://antigravity.google/docs/ide-rules?hl=sv | Antigravity supports workspace/project rules and agent instruction files for agent behavior. | High, official documentation | Add `.agents/rules/workspace-operating-principles.md` |
| Google Antigravity projects documentation | https://www.antigravity.google/docs/projects | Antigravity manages isolated project/workspace settings and policies. | High, official documentation | Classify runtime adapter roots as tool settings, not projects |
| AGENTS.md format | https://agents.md/ | `AGENTS.md` is a public instruction format usable by coding agents. | Medium-high, public format documentation | Keep `AGENTS.md` as the Codex entrypoint and adapter to shared principles |

## Weak Or Deferred Sources

- Unofficial blog posts and Q&A pages were not used directly because the decision depends on tool-specific rule discovery behavior, where official docs are stronger.
- The Antigravity rule documentation was verified through an official URL with a locale parameter. The product and documentation URL shape may change, so the registry records the source for future freshness checks.

## Plan Impact

- Do not duplicate policy source text into every assistant runtime file. Use `_docs/operating-models/tool-agnostic-agent-operating-model.*.md` and `_ops/assistant-runtimes/adapter-registry.json` as the shared source of truth.
- Keep `AGENTS.md`, `CLAUDE.md`, `.claude/rules/`, `.cursor/rules/`, and `.agents/rules/` as thin adapters that point back to the shared principles.
- Add `.claude`, `.cursor`, and `.agents` to root structure audit as `runtime_adapter` folder classes, not projects.
- Extend `workspace-monitor` so runtime adapter and assistant operating principle template documents are visible in the repository dashboard.

## Uncertainty

- Rule discovery behavior can change as these tools evolve.
- When the repository is actually used from another assistant runtime, the adapter registry should be rechecked against that tool's latest official documentation.
- Instruction files are context, not enforcement; critical rules still need config contracts, audits, tests, and human review.

## Public Decision Summary

Tool-specific rule files are useful, but copying the same operating policy into each tool would create divergence. The shared policy and principles should live in `_docs/`, `_ops/`, `_requirements/`, `_specs/`, `_history/`, and `agent-platform/configs/`; Codex, Claude, Cursor, and Antigravity files should remain thin adapters that tell each runtime where to read the shared policy.
