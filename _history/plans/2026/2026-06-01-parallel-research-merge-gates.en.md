# Plan Record: Parallel Research Merge Gates

## Request

- Run parallel research lanes, then wait for and merge all results before downstream work.

## Research And Evidence

- Checked GitHub Actions `needs`, Prefect concurrent work/task dependencies, Airflow dynamic task mapping, and LangGraph branching/reducer docs.
- The shared pattern is fan-out independent work followed by a fan-in step that merges results and releases downstream work.

## Execution Plan

1. Add `REQ-WS-024`.
2. Implement `ParallelMergeGate`.
3. Treat parallel research lanes without a merge gate as a gap.
4. Check that the merge task depends on every `wait_for` task.
5. Update the template and docs around `research-synthesis`.

## Decision

- Implementation does not depend on partial research lane outputs.
- Downstream implementation is released only after merge gate acceptance checks pass.
