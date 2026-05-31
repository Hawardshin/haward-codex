# spec-driven-planner-agent

## Purpose

`spec-driven-planner-agent` turns requirements into implementable specs, plans, task lists, validation records, and traceability, then keeps implementation and evaluation aligned to those specs.

## Inputs

- Current user request summary
- Relevant requirements targets
- Existing request-to-outcome traces
- Web search records and research notes
- Project boundary

## Outputs

- `spec.*.md`
- `plan.*.md`
- `tasks.*.md`
- `validation.*.md`
- `traceability.*.md`
- `spec_targets` for evaluation input

## Rules

- Review ambiguity, conflicts, missing edge cases, and testability before implementation.
- Write acceptance criteria in verifiable form.
- Link task IDs to requirement IDs and acceptance criteria.
- After implementation, record verification results, evaluation report, commit, and push status in traceability.

## Paths

- Shared specs: `_specs/<scope>/YYYY-MM-DD-<slug>/`
- Project specs: `project-name/specs/YYYY-MM-DD-<slug>/`
