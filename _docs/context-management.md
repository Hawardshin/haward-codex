# Context Management

## Goal

긴 대화가 프로젝트 상태의 유일한 저장소가 되지 않도록 한다.

Detailed context archiving rules live in:

- Korean: [context-archive-policy.ko.md](context-archive-policy.ko.md)
- English: [context-archive-policy.en.md](context-archive-policy.en.md)

## Durable Context

Persist the following information in repository files:

- project purpose and status
- important user preferences
- architectural decisions
- commands needed to run, test, or verify work
- generated artifact locations
- commit hashes for meaningful milestones

## Compression Procedure

When context grows long:

1. Identify stable facts, decisions, and open tasks.
2. Update the relevant project `README.md` or `docs/` file.
3. Add a dated summary to `_history/YYYY/YYYY-MM-DD.md`.
4. Create a resume packet under `_history/context-archives/YYYY/` when the next session would otherwise need chat history.
5. Update `_history/work-summaries/` and `_ops/coordination/` when the packet changes what to read next.
6. Commit the documentation update with the related work.

## What Not to Preserve

Avoid preserving:

- temporary reasoning
- dead-end attempts unless they explain an important decision
- full command logs unless they are needed for reproducibility
- private or sensitive values

## History Entry Shape

Each entry should include:

- time or sequence
- task
- files changed
- decisions
- verification
- commit hash after commit, when available

## Archive Packet Shape

When a dedicated context archive is needed, use `_templates/context-archive/context-archive.ko.md` and include:

- current work goal
- current state summary
- must-read files
- remaining work
- verification state
- links to web search records, plans, work summaries, evaluations, and commits
