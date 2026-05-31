# Parallel Work Planning Structure

## Summary

Parallelization for speed is not just starting multiple tasks at once. Work should be represented like a DAG, with tasks and dependencies made explicit, and file/resource conflicts removed from same-batch execution.

## Reusable Rules

- Each task has `task_id`, `dependencies`, `touch_paths`, `output_targets`, and `verification_steps`.
- Independent batches contain tasks whose dependencies are satisfied and whose `touch_paths` do not overlap.
- `shared_resources` records shared state such as git index, remote branch, and coordination status.
- `conflict_controls` records file ownership, locks, branch/worktree rules, or handoff rules.
- Parallel lanes are recorded in `_ops/coordination/status.json`, then the board is regenerated.
- Final commit/push is performed by the primary agent after merge verification, not by separate lanes.

## References

- Airflow tasks: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html
- Airflow DAGs: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html
- Prefect tasks: https://docs.prefect.io/v3/concepts/tasks
- Dagster asset dependency example: https://docs.dagster.io/getting-started/what-why-dagster
- GitHub Actions `needs`: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds

## Caution

Parallelization does not reduce verification. Work touching the same files or shared resources must not run in parallel without a dependency or lock.
