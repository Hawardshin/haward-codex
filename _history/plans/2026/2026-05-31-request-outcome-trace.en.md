# 2026-05-31 Plan Record: Request-To-Outcome Trace

## Initial Instruction Summary

The user said documentation should continue to show what requests existed, what work happened, and what each request meant.

## Research

- Ran web search first.
- Checked requirements traceability matrix and changelog practices.
- Decided that requests and outcomes should be connected in a separate table using stable request IDs.

## Plan

1. Add `_history/request-traces/`.
2. Connect the 35 accumulated 2026-05-31 request summaries to outcomes, artifacts, evaluations, and commits.
3. Add bilingual request trace policy and templates.
4. Add `request_trace_targets` to `work-evaluator-agent`.
5. Add trace updates to start/close workflows and persistent instructions.
6. Update search records, research notes, work summary, detailed history, and evaluation reports.

## Public Decision

Request summaries and work summaries alone do not show the connection quickly enough. A separate trace layer lets the user inspect request, result, evidence, evaluation, and commit in one row.

## Done Criteria

- `_history/request-traces/2026/2026-05-31.ko.md` and `.en.md` exist.
- Evaluation input requires `request_trace_targets`.
- Tests and evaluation pass.
- The change is committed and pushed.
