# Plan Record: Parallel Work Planning Structure

## Request

- Create a structure for parallel processing when work speed may become a bottleneck.

## Research And Evidence

- Web search checked Airflow DAG/task dependencies, Prefect task state dependencies, Dagster asset dependencies, and GitHub Actions `needs` dependencies.
- Internal checks used work mode routing, coordination board, spec-driven lifecycle, and evaluator requirements.

## Execution Plan

1. Create `REQ-WS-023` and spec-driven artifacts.
2. Implement a Python planner that represents work units with `task_id`, `dependencies`, `touch_paths`, `output_targets`, and `verification_steps`.
3. Treat same-batch touch path overlaps, cycles, unknown dependencies, and missing coordination/merge/rollback fields as gaps.
4. Add the `plan-parallel-work` CLI and unit tests.
5. Update operating prompt/workflow, agent spec, template, memory anchor, coordination status, history, and evaluation.

## Decisions

- Parallelization is an execution structure on top of the selected work mode, not a separate work mode.
- Build only a planning checker for now, not an execution engine.
- Final commit and push are performed once by the primary agent after merge verification.
