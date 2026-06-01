# Requirement Review: CLI Pipeline Orchestration

- Review date: 2026-06-02
- Requirement: `REQ-WS-058`
- Status: approved

## Review

The user request extends the existing `REQ-WS-053` CLI adapter boundary. `REQ-WS-053` says external CLIs should be replaceable adapters, but it does not fully define multi-CLI execution graphs, pipes, fan-in merge, cancellation, and cleanup.

## Acceptance

| Item | Result | Note |
| --- | --- | --- |
| No conflict with existing requirements | Pass | Adds a pipeline graph contract above the adapter registry. |
| Enforceable | Pass | `check-cli-pipeline` and the evaluator's conditional `cli_pipeline_targets` gap can verify it. |
| Safety | Pass | Requires argv/process graphs, allowlists, timeouts, output bounds, and cleanup instead of shell strings. |
| Traceability | Pass | Pipeline input includes source provenance, plan evidence, verification, and rollback. |

## Decision

Add `REQ-WS-058` to the shared workspace/platform requirements baseline.
