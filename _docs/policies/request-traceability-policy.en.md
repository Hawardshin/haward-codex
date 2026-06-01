# Request-To-Outcome Traceability Policy

## Purpose

Connect user requests, completed work, artifacts, evaluations, and commits. This policy exists so a future worker can answer "what was requested, what happened, and what did that request mean" from repository documents.

## Principles

- Trace meaning summaries, not full raw prompt text.
- Give each request a stable request ID.
- Link request summary, outcome, key files, evaluation report, and commit in one row.
- Mark in-progress or partial requests with status and follow-up management.
- Include `request_trace_targets` in close-out evaluation input for meaningful work.
- For important decisions based on older traces, check related history and the user's latest instruction.

## Status Values

- `completed`: the request has been implemented as of the current trace.
- `partial`: some work was done, but follow-up is needed.
- `superseded`: a later request or policy replaced it.
- `deferred`: the request is recorded but not yet implemented.

## Related Files

- [_history/request-traces/README.en.md](../../_history/request-traces/README.en.md)
- [_history/user-requests/README.en.md](../../_history/user-requests/README.en.md)
- [_history/work-summaries/README.en.md](../../_history/work-summaries/README.en.md)
- [_templates/request-trace/request-trace.en.md](../../_templates/request-trace/request-trace.en.md)
- [agent-platform/docs/work-evaluator-agent.md](../../agent-platform/docs/work-evaluator-agent.md)
