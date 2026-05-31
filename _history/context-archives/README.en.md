# Context Archives

This folder stores compressed resume packets created when the conversation context becomes long enough that a future session should continue from repository documents instead of chat memory.

## Purpose

- Do not let a long chat become the only source of project state.
- Compress stable decisions, requirements, current state, remaining tasks, and verification results.
- Link back to source documents, history, evaluation reports, commits, and web search records instead of copying raw detail.
- Do not store raw internal reasoning or temporary logs.

## Path Convention

```text
_history/context-archives/YYYY/YYYY-MM-DD-<slug>.ko.md
_history/context-archives/YYYY/YYYY-MM-DD-<slug>.en.md
```

## When To Create

- The conversation is long enough that important context may be lost in a future response.
- Multiple tasks have accumulated and a single resume packet is needed.
- Project direction, work order, or remaining tasks exist only in chat.
- A context compaction transition or session close-out needs handoff material.

## Required Content

- Current work goal
- Recent completed decisions and changes
- Documents and files that must be read
- Current verification state
- Remaining tasks and next actions
- Project ownership boundaries
- Related web search records, plan records, evaluation reports, and commits
- What was not preserved and why

## Usage Sequence

1. Read the latest `_history/work-summaries/` summary first.
2. Read the relevant context archive packet.
3. Open only the packet's `Must Read` files first.
4. Follow linked history, evaluations, research notes, and commits only when detail is needed.
5. When using an old packet, run `knowledge-skeptic-agent` for freshness, conflicts, and omissions.

## Evaluation Rule

When context archiving actually occurred, `work-evaluator-agent` input must include `context_archiving_occurred=true` and `context_archive_targets`.
