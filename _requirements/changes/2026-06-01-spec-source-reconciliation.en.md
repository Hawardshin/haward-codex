# Spec/Source Reconciliation Requirement Change

## Change Summary

- Date: 2026-06-01
- Change ID: `REQ-CHANGE-2026-06-01-SPEC-SOURCE-RECONCILIATION`
- Related request: `UR-2026-06-01-013`
- Added requirement: `REQ-WS-030`
- Status: applied

## User Intent

When a project spec is ambiguous or differs from current source, the AI should not guess and modify either side. It should record the evidence, decide whether the spec or source should change, and ask answerable clarification questions through an alert when user intent is needed.

## Change

- Record comparison evidence from specs, source, tests, or artifacts first.
- Classify each issue as `update_spec`, `update_source`, `ask_user`, or `defer`.
- `ask_user` issues must include stable question IDs, options, answer format, and decision impact.
- Do not change the related spec or source until the user answer is recorded.
- Use the `clarification_needed` notification event.

## Evidence

- ISO/IEC/IEEE 29148 covers requirements engineering processes and information items across the lifecycle.
- IBM requirements traceability guidance describes linking requirements to implementation/test artifacts and using traceability for impact analysis.

## Impact

- `agent-platform` planning CLI
- Notification settings
- Spec-driven workflow and prompt router
- Memory bootstrap anchors
- Future project-level spec/source review procedures
