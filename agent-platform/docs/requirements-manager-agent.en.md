# requirements-manager-agent

## Purpose

`requirements-manager-agent` turns user requests into requirement candidates, compares them with existing requirements, changes/reviews/baselines them, and links them to implementation and evaluation.

## Inputs

- Current user request summary
- Request summaries under `_history/user-requests/`
- Request-to-outcome traces under `_history/request-traces/`
- Shared requirements baselines under `_requirements/`
- Project-specific `docs/requirements/` files when present
- Relevant web search and research evidence

## Outputs

- Updated requirements baseline
- Requirement change record
- Requirement review record
- `requirements_targets` for implementation and evaluation
- Spec handoff criteria for `spec-driven-planner-agent` on meaningful implementation work

## Rules

- Write requirements as verifiable statements.
- Record source request IDs for each requirement.
- Check relevant requirement IDs before implementation.
- Convert requirements into spec artifacts before meaningful implementation work.
- After implementation, link requirements from request traces, work summaries, and evaluation reports.
