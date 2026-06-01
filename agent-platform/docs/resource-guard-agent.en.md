# Resource Guard Agent

## Purpose

`resource-guard-agent` checks whether platform work can create memory leaks or runtime resource leaks before close-out. It applies to long-running agents, servers, browser automation, subprocesses, workers, queues, caches, streams, large-data processing, file handles, network connections, timers, and subscriptions.

This is not a reminder to be careful. It is a conditional close-out gate. If a task has resource risk, the `work-evaluator-agent` input must set `resource_risk_occurred=true` and include `resource_check_targets`.

## Input

Use `agent-platform/configs/evaluation/resource-guard-template.json` as the base shape.

- `task`: work being checked
- `work_mode`: selected work mode
- `runtime_context`: relevant runtimes or execution environments
- `resource_risks`: memory, process, browser context, cache, worker, stream, and other leak risks
- `lifecycle_checks`: create/open/start paths and cleanup/close/stop paths
- `measurement_checks`: metrics, tools, thresholds, and evidence for RSS, heap, allocations, or peak memory
- `notes`: manual judgment, limits, and future check triggers

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-resources configs/evaluation/resource-guard-template.json
```

For real work, do not use the template as final evidence. Save a task-specific JSON file under `_history/evaluations/YYYY/` or the owning project history folder.

## Judgment

- `resource_ready`: no blocking resource gap.
- `rework_required`: a required risk is unresolved, mitigation lacks evidence, lifecycle cleanup is missing, or measurement evidence is insufficient.

`work-evaluator-agent` blocks close-out when `resource_risk_occurred=true` but `resource_check_targets` is missing.
