# 2026-05-31 Requirement Change Record: Requirements Management

## Change Summary

Added a requirements management layer so user requests can become requirements, be reviewed and changed over time, and drive implementation.

## Changes

| Change ID | Description | Impact | Status |
| --- | --- | --- | --- |
| RC-2026-05-31-001 | Added `_requirements/` as the shared requirements management location. | workspace rules, start/close workflows, evaluation input | accepted |
| RC-2026-05-31-002 | Added `REQ-WS-005` for the requirements lifecycle. | future implementation should check requirement targets before close-out | accepted |
| RC-2026-05-31-003 | Added `requirements_targets` to `work-evaluator-agent`. | missing requirements now become a blocking gap | accepted |

## Impact Analysis

- Startup should check the relevant requirements baseline.
- Close-out should include requirements baseline, change, or review targets in evaluation input.
- Project-specific feature requirements should live under the owning project's `docs/requirements/`.

## Review Result

- Approval status: accepted
- Review file: `_requirements/reviews/2026-05-31-workspace-platform.en.md`
