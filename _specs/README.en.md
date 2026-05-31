# Spec-Driven Development

This folder is the spec-driven work layer that turns requirements into implementable specs, plans, task lists, and validation records.

## Purpose

- Do not send requirements straight to code; convert them into implementable specs first.
- Link specs to design, task breakdown, implementation, and validation.
- Prevent AI implementation from relying on single-prompt guesswork.
- Separate project-specific specs from shared workspace specs.

## Path Rules

Shared workspace/platform specs:

```text
_specs/<scope>/YYYY-MM-DD-<slug>/
  spec.en.md
  plan.en.md
  tasks.en.md
  validation.en.md
  traceability.en.md
```

Project-specific specs:

```text
project-name/specs/YYYY-MM-DD-<slug>/
```

## Lifecycle

1. `intake`: collect the user request, requirements, and research.
2. `clarify`: check ambiguity, conflicts, and missing acceptance criteria.
3. `spec`: define what to build, why it matters, and success criteria.
4. `plan`: define implementation strategy, file scope, and validation strategy.
5. `tasks`: split the plan into executable task IDs.
6. `implement`: implement in task order.
7. `validate`: record tests, document review, and evaluation results.
8. `trace`: link request, requirements, spec, tasks, artifacts, evaluation, and commit.

## Required Artifacts

- `spec.*.md`: behavior, scope, and acceptance criteria
- `plan.*.md`: implementation strategy, impact scope, and validation strategy
- `tasks.*.md`: checklist with task IDs
- `validation.*.md`: verification commands and results
- `traceability.*.md`: request/requirement/spec/task/file/evaluation links

## Close-Out Rule

Meaningful work must include `spec_targets` in `work-evaluator-agent` input. Missing targets are blocking gaps.
