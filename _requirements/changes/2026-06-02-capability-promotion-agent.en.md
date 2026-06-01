# Requirement Change: Capability Promotion Agent

## Request

- User request summary: The user wanted black-box-like handling where the platform adds useful features by itself while doing many kinds of work.
- Request ID: `UR-2026-06-02-028`

## Change

- Added `REQ-WS-070`.
- Defined that the platform can detect repetition, bottlenecks, omissions, validation failures, and manual rework, then create feature/capability candidates.
- Limited the design to bounded black-box processing that preserves observations, candidates, risk, validation, rollback, evaluation, and commit/push traces.

## Impact

- Adds `capability-promotion-agent`.
- Makes `capability-promotion-registry.json` the source of truth for self-improvement candidates.
- Routes high-risk changes to human checkpoints.

## Validation Plan

- config contract
- agent inspect/list
- agent orchestration check
- memory bootstrap check
- omission/grounding/evaluation
