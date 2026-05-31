# 2026-05-31 Requirement Change Record: Spec-Driven Structure

## Change Summary

The user clarified that the existing requirements management structure should resemble spec-driven development. This adds a layer that turns requirements into specs, plans, task lists, validation records, and traceability before implementation.

## Changes

| ID | Change | Impact | Status |
| --- | --- | --- | --- |
| RC-2026-05-31-004 | Added `_specs/` as the shared spec-driven artifact location. | workspace rules, start/close workflows, evaluation input | accepted |
| RC-2026-05-31-005 | Added `REQ-WS-013` for spec-driven operation. | future implementation should check spec targets before close-out | accepted |
| RC-2026-05-31-006 | Added `spec_targets` to `work-evaluator-agent`. | missing specs become a blocking gap | accepted |

## Impact Assessment

- Startup should check or create relevant specs after requirements.
- Close-out evaluation should include `spec_targets`.
- Project-specific specs live under the owning project's `specs/`.
