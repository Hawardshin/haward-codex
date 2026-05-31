# Spec: Spec-Driven Operating Loop

## Metadata

- Spec ID: `SPEC-WS-SDD-001`
- Status: `baseline`
- Scope: shared workspace, `agent-platform/`
- Source request: `UR-2026-05-31-037`
- Related requirement: `REQ-WS-013`
- Created: 2026-05-31

## Goal

Create an operating structure similar to spec-driven development, where user requests and requirements move through a spec, implementation plan, task list, validation record, and traceability before implementation.

## Scope

Included:

- Shared `_specs/` layer
- Project-specific `project-name/specs/` rule
- Spec-driven policy, prompt, workflow, and templates
- `spec-driven-planner-agent`
- Required `spec_targets` checks in `work-evaluator-agent`
- Links to history, requirements, request traces, and work summaries

Excluded:

- Installing an external spec-driven tool
- Direct adoption of GitHub Spec Kit or Kiro
- Automatic code generation pipeline

## Acceptance Criteria

| ID | Criteria |
| --- | --- |
| AC-SDD-001 | WHEN meaningful work changes expected behavior, operating rules, project structure, platform capability, or implementation criteria THEN relevant spec artifacts SHALL be created or updated under `_specs/` or the owning project's `specs/`. |
| AC-SDD-002 | WHEN a spec is created THEN `spec`, `plan`, `tasks`, `validation`, and `traceability` artifacts SHALL be linked. |
| AC-SDD-003 | WHEN work closes THEN `work-evaluator-agent` input SHALL include `spec_targets`. |
| AC-SDD-004 | WHEN a spec changes requirements THEN `_requirements/` baseline/change/review records SHALL be updated. |
| AC-SDD-005 | WHEN project-specific functionality is built THEN the spec SHALL live under the owning project's `specs/`. |

## Success State

- Operating docs make the spec-driven flow discoverable.
- New work checks or creates specs after requirements.
- Close-out evaluation treats missing `spec_targets` as blocking gaps.
