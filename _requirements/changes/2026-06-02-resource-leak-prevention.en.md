# 2026-06-02 Resource Leak Prevention Requirement Change

## User Request

- "Memory leaks need attention in this kind of platform."

## Requirement Change

- Add `REQ-WS-057`.
- The platform treats memory leaks and runtime resource leaks as reliability risks.
- Work that touches long-running agents, servers, browser automation, subprocesses, workers, queues, caches, streams, large-data processing, file handles, network connections, timers, or subscriptions sets `resource_risk_occurred=true` in evaluator input.
- Such work leaves `resource_check_targets` with resource risks, lifecycle cleanup paths, measurement evidence, or accepted-risk rationale.

## Implementation Impact

- Add `resource-guard-agent` and the `check-resources` CLI.
- Make `work-evaluator-agent` block close-out when `resource_risk_occurred=true` but `resource_check_targets` is missing.
- Connect the conditional resource leak gate from the work mode registry, workflows, and prompts.
- Add the durable rule to memory bootstrap and persistent instructions.

## Verification Criteria

- `agent-platform` unit tests pass.
- `check-resources` passes for the template and the task-specific check.
- Evaluator tests prove missing resource targets become blocking gaps when resource risk occurred.
- `check-work-modes`, memory bootstrap, docs audit, and config contract pass.
