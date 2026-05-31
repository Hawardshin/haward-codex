# Request-To-Outcome Traces

This folder tracks how user requests turned into work outcomes. `_history/user-requests/` stores "what the user asked"; this folder stores "what happened because of that request, where the artifacts are, how it was evaluated, and which commit carried it."

## Purpose

- Keep requests and outcomes connected.
- Let future workers inspect intent, status, artifacts, evaluation, and commits in one table.
- Avoid repeating the same explanation or re-making the same decision.
- Let the evaluator treat missing request traces as a blocking close-out gap.

## Path Convention

```text
_history/request-traces/YYYY/YYYY-MM-DD.ko.md
_history/request-traces/YYYY/YYYY-MM-DD.en.md
```

## Required Fields

- Request ID
- Request summary
- Outcome
- Status
- Key artifacts
- Evaluation/verification
- Commit
- Follow-up management

## Close-Out Rule

Meaningful work must include `request_trace_targets` in `work-evaluator-agent` input. Missing targets are blocking gaps.
