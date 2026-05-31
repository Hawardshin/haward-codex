# 2026-05-31 Context Archive: Context Archive Policy

## Current Work Goal

Strengthen the repository so the agent can proactively summarize/archive long context and resume future work from documents.

## Current State Summary

- Web-first intake, memory bootstrap, work summaries, evaluation reports, and web search records already exist.
- This change adds `_history/context-archives/` as the resume packet layer.
- When context archiving occurs, `work-evaluator-agent` now checks `context_archive_targets`.

## Recent Completed Decisions And Changes

| Item | Summary | Evidence |
| --- | --- | --- |
| Archive location | `_history/context-archives/YYYY/` stores context resume packets. | `_history/context-archives/README.ko.md` |
| Templates | Added Korean and English context archive templates. | `_templates/context-archive/` |
| Policy | Documented saturation signals, standard procedure, and what not to preserve. | `_docs/context-archive-policy.ko.md` |
| Workflow | Added context archiving procedure under `_ops/workflows/45-context-archive.md`. | `_ops/workflows/45-context-archive.md` |
| Evaluation | Missing `context_archive_targets` becomes a gap when archiving occurred. | `agent-platform/src/agent_platform/evaluation/work_evaluator.py` |

## Must Read Files

| Priority | File | Reason |
| --- | --- | --- |
| 1 | `_docs/context-archive-policy.ko.md` | Criteria and procedure for context archiving |
| 2 | `_history/context-archives/README.ko.md` | Archive packet storage rules |
| 3 | `_ops/workflows/45-context-archive.md` | Execution sequence |
| 4 | `_ops/prompts/50-compress-context.md` | Prompt-level compression instruction |
| 5 | `agent-platform/docs/work-evaluator-agent.md` | Evaluation input requirements |

## Remaining Work

| Order | Task | Owning Location | Status |
| --- | --- | --- | --- |
| 1 | Run verification | `agent-platform/`, `_tools/` | Done |
| 2 | Save evaluation report | `_history/evaluations/2026/` | Done |
| 3 | Commit and push | git | Pending |

## Verification State

- Passed: web search, initial memory bootstrap check, 51 unit tests, JSON validation, memory bootstrap, config contract, map/task board check, `git diff --check`, knowledge validation, grounding, work evaluation
- Remaining verification: commit and push

## Links

- Web search record: `_history/web-searches/2026/2026-05-31-context-archive-policy.en.md`
- Plan record: `_history/plans/2026/2026-05-31-context-archive-policy.en.md`
- Work summary: `_history/work-summaries/2026/2026-05-31.en.md`
- Evaluation report: `_history/evaluations/2026/2026-05-31-context-archive-policy.en.md`
- Related commit: update after commit

## Not Preserved

- Raw internal reasoning: not stored
- Temporary logs: only verification summaries go into the evaluation report
- Sensitive information: none

## Resume Instructions

1. Read `_history/work-summaries/2026/2026-05-31.ko.md` first for the day's work flow.
2. Open only this packet's `Must Read Files` first.
3. Re-run `git status`, memory bootstrap, and map checks when current state matters.
4. Use `knowledge-skeptic-agent` before relying on old content for important decisions.
