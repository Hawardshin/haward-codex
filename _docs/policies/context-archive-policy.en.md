# Context Archive Policy

## Purpose

When the agent believes the active context is becoming saturated, it should compress stable state first and continue future work from repository documents instead of chat memory.

This policy is not a rule to preserve the entire long conversation. It stores a compact `context archive packet` containing the facts, decisions, file locations, verification state, and remaining work needed to resume, without copying raw chat or private reasoning.

## Core Principles

- When the agent detects context saturation risk, it should archive first instead of waiting for the user to ask.
- Durable context lives under `_history/context-archives/YYYY/`.
- Current project state should also be reflected in the relevant project `README.md`, `_history/YYYY/YYYY-MM-DD.md`, `_history/work-summaries/`, and `_ops/coordination/`.
- An archive packet is a resume index. Detailed evidence should be linked through docs, evaluation reports, research notes, and commits.
- Do not store raw internal reasoning, unnecessary intermediate logs, or sensitive information.
- When relying on an older archive packet, run `knowledge-skeptic-agent` for freshness, conflicts, and omissions.

## Saturation Signals

- Requirements, decisions, file locations, or remaining work exist only in chat.
- Several recent tasks accumulated and the next session would not know where to start.
- The agent repeatedly reconstructs prior context before responding.
- Chat state has become more accurate than repository documents.
- Starting a new task without summarizing would create a meaningful omission risk.

## Standard Procedure

1. Create the web search record first. Even for operating rules, record web search results and internal document checks.
2. Check the latest `memory-bootstrap-agent` result and hot/warm anchors.
3. Extract only stable facts, decisions, changed files, verification results, and remaining tasks.
4. Update the relevant project README and operating docs.
5. Create `_history/context-archives/YYYY/YYYY-MM-DD-<slug>.ko.md` and an English companion when useful.
6. Link the resume path from `_history/YYYY/YYYY-MM-DD.md`, `_history/work-summaries/`, and `_ops/coordination/status.json`.
7. If context archiving actually occurred, include `context_archiving_occurred=true` and `context_archive_targets` in the evaluation input.
8. Verify, commit, and push.

## Archive Packet Fields

- Current work goal
- Current state summary
- Recent completed decisions and changes
- Must-read files
- Remaining work
- Verification state
- Web search record, plan record, work summary, evaluation report, and commit links
- What was not preserved and why
- Resume instructions

## Related Files

- [_history/context-archives/README.en.md](../../_history/context-archives/README.en.md)
- [_templates/context-archive/context-archive.en.md](../../_templates/context-archive/context-archive.en.md)
- [_ops/prompts/50-compress-context.md](../../_ops/prompts/50-compress-context.md)
- [_ops/workflows/45-context-archive.md](../../_ops/workflows/45-context-archive.md)
- [_docs/operating-models/context-management.md](context-management.md)
- [agent-platform/configs/memory/bootstrap-manifest.json](../../agent-platform/configs/memory/bootstrap-manifest.json)
