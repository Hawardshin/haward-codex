# Parallel Research Merge Gates

## Summary

Research can fan out into official documentation, community signals, and open-source reference lanes. Implementation must not depend on partial research outputs. A merge gate waits for all research lanes, produces a synthesis output, passes acceptance checks, and then releases downstream implementation.

## Reusable Rules

- Parallel research lanes write separate `touch_paths`.
- If two or more research lanes are in the same batch, `merge_gates` are required.
- `merge_task_id` must depend on every `wait_for` task.
- A merge gate records `merge_outputs` and `acceptance_checks`.
- Implementation depends on a merge task such as `research-synthesis`.

## References

- GitHub Actions `needs`: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds
- Prefect concurrent work: https://docs.prefect.io/v3/how-to-guides/workflows/run-work-concurrently
- Prefect tasks: https://docs.prefect.io/v3/concepts/tasks
- Airflow dynamic task mapping: https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html
- LangGraph branching: https://langchain-ai.github.io/langgraph/how-tos/branching/

## Application

`parallel-work-template.json` now runs `official-docs-research`, `community-signal-research`, and `open-source-reference-research` in the first batch, then passes a `research-synthesis` merge gate before implementation.
