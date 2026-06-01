# Resource Leak Prevention Workflow

## Purpose

메모리 누수나 런타임 리소스 누수가 생길 수 있는 작업을 닫기 전에 생명주기, cleanup, 측정 근거를 확인한다.

## Sequence

1. Confirm the selected `work_mode`.
2. Decide whether `resource_risk_occurred=true` applies.
3. Treat the answer as true when the task touches long-running agents, servers, browser automation, subprocesses, workers, queues, caches, streams, large data, file handles, network connections, timers, or subscriptions.
4. If risk exists, create a resource check JSON under `_history/evaluations/YYYY/` or the owning project history folder.
5. Fill `runtime_context` with runtimes such as Python, Node, Next.js, Playwright, browser, server, worker, CLI adapter, or sidecar.
6. Fill `resource_risks` with memory and resource risks. Use `mitigated`, `accepted`, `not_applicable`, or `unresolved`.
7. Fill `lifecycle_checks` with create/open/start paths and cleanup/close/stop paths.
8. Fill `measurement_checks` with metric, tool, threshold, status, and evidence.
9. Run `PYTHONPATH=src python3 -m agent_platform.cli check-resources <input.json>` from `agent-platform/`.
10. If the result is `rework_required`, fix the gaps and run the check again.
11. Add the check input or result path to `resource_check_targets` in the final `evaluate-work` input.
12. Set `resource_risk_occurred=true` in the final `evaluate-work` input.

## Output

- Task-specific resource check JSON
- `check-resources` command result
- `resource_risk_occurred=true` and `resource_check_targets` in the final evaluation input

## Rule

Do not fake memory measurements. If a meaningful measurement is not practical for the task size, record a lifecycle cleanup proof and a rationale for why deeper profiling is deferred.
