# Resource Leak Prevention Prompt

## Purpose

메모리 누수나 리소스 누수 위험이 있는 작업을 종료하기 전에 resource check를 만들 때 사용한다.

## Prompt

```text
Create a memory and resource leak prevention check for the completed task.

Inputs:
- Initial user instruction summary
- Selected work_mode
- Runtime context
- Changed files and runtime paths
- Long-running processes, browser automation, workers, caches, streams, large data, subprocesses, file handles, network connections, timers, or subscriptions touched
- Verification commands and results
- Any accepted or deferred resource risks

Return a JSON-compatible resource check with:
- task
- work_mode
- runtime_context
- resource_risks: risk_id, category, description, required, status, mitigation, evidence, rationale
- lifecycle_checks: check_id, resource, create_path, cleanup_path, required, status, evidence, rationale
- measurement_checks: check_id, metric, tool, threshold, required, status, evidence, rationale
- notes

Rules:
- Mark a required risk mitigated only when mitigation and evidence exist.
- Mark accepted or not_applicable risks with rationale.
- Required lifecycle checks must identify both create/open/start and cleanup/close/stop paths.
- Required measurements must name metric, tool, threshold, status, and evidence.
- If measurement is impractical for a small change, explain why and record what lifecycle proof was used instead.
- The result must be usable with agent-platform check-resources.
```
