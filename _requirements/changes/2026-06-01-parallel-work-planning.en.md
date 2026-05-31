# Parallel Work Planning Requirement Change

## Request Summary

The user noted that the current operating loop can be slow and asked to consider a structure for processing work in parallel.

## Requirement Change

- Add `REQ-WS-023` to the shared requirements baseline.
- Before parallel work, record `task_id`, dependencies, `touch_paths`, outputs, verification, shared resources, conflict controls, coordination targets, merge strategy, and rollback plan.
- Work touching the same files, folders, settings, generated maps, or git state must not run in the same batch without a dependency or lock.
- Parallel work status must be visible through `_ops/coordination/status.json` and generated boards.

## Evidence

- Workflow tools such as Airflow, Prefect, Dagster, and GitHub Actions make tasks, dependencies, ready work, state, and verification explicit.
- This repository shares one git workspace, so file boundaries and merge verification need explicit rules.

## Impact

- Add `parallel-work-planner-agent` and `plan-parallel-work` CLI.
- Add parallel work prompt, workflow, template, docs, and memory anchor.
