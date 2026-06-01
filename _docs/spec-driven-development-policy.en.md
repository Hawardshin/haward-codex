# Spec-Driven Development Policy

## Purpose

Implement user requests and requirements through explicit specs, implementation plans, task lists, validation records, and traceability instead of jumping directly to code.

## Principles

- Requirements define what is needed.
- Specs define what will be built and which conditions it must satisfy.
- Plans define how it will be implemented and verified.
- Task lists define execution order.
- Validation records confirm whether implementation matches the spec.
- Traceability links request, requirement, spec, tasks, files, evaluation, and commit.
- If an active spec is ambiguous or differs from current source, tests, or artifacts, run `_ops/workflows/38-spec-source-reconciliation.md` before implementation and classify issues as `update_spec`, `update_source`, `ask_user`, or `defer`.
- For `ask_user` issues, send or surface a `clarification_needed` alert and do not edit the related spec or source until the user answer is recorded.

## When To Apply

Create or update spec-driven artifacts for:

- new features, agents, tools, or projects
- operating rule or evaluation loop changes
- user requirement changes
- structure, data flow, API, UI, or test strategy changes
- multi-file or multi-step work

For tiny typo fixes, simple link changes, or obvious one-line fixes, updating an existing spec trace can be enough.

## Required Artifacts

- `spec.*.md`
- `plan.*.md`
- `tasks.*.md`
- `validation.*.md`
- `traceability.*.md`

## Paths

- Shared workspace/platform specs: `_specs/<scope>/YYYY-MM-DD-<slug>/`
- Project-specific specs: `project-name/specs/YYYY-MM-DD-<slug>/`

## Evaluation Rule

Meaningful work includes `spec_targets` in evaluation input. Missing targets are blocking gaps.

## Related Files

- [_specs/README.en.md](../_specs/README.en.md)
- [_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.en.md](../_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.en.md)
- [_templates/spec-driven/spec.en.md](../_templates/spec-driven/spec.en.md)
- [_ops/workflows/36-spec-driven-development.md](../_ops/workflows/36-spec-driven-development.md)
- [_ops/workflows/38-spec-source-reconciliation.md](../_ops/workflows/38-spec-source-reconciliation.md)
- [agent-platform/docs/spec-driven-planner-agent.en.md](../agent-platform/docs/spec-driven-planner-agent.en.md)
- [agent-platform/docs/spec-reconciliation-agent.en.md](../agent-platform/docs/spec-reconciliation-agent.en.md)
