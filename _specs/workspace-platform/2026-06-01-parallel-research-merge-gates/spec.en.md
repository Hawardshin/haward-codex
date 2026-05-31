# Spec: Parallel Research Merge Gates

## Goal

Create a fan-out/fan-in structure where multiple research lanes run in parallel, then all outputs are waited on, synthesized, and used to release downstream implementation.

## Requirements

- `REQ-WS-024`
- Parallel research lanes write separate `touch_paths`.
- If two or more research lanes appear in the same batch, `merge_gates` are required.
- A merge gate's `merge_task_id` must depend on every `wait_for` task.
- Downstream implementation depends on the merge task output, not partial research notes.

## Implementation Scope

- Add `ParallelMergeGate` and merge gate checks to `parallel_work.py`
- Update the default template to parallel research lanes plus `research-synthesis`
- Update tests and docs

## Out Of Scope

- Actual parallel executor
- Remote agent orchestration
- Automatic conflict resolution
