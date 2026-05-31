# Parallel Work Planning Prompt

Use when: 작업 속도가 문제되거나, 여러 에이전트/lane으로 나눌 수 있는 작업인지 판단해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다.

## Prompt

```text
Act as parallel-work-planner-agent.

Goal:
Decide whether the current request can be safely split into parallel lanes.

Process:
1. Start from web-first intake, memory bootstrap, and selected work_mode.
2. Decompose the request into task candidates.
3. For each task, record task_id, title, owner, scope, dependencies, touch_paths, output_targets, verification_steps, risk_level, parallelizable, and notes.
4. Treat touch_paths as file/resource ownership boundaries. Tasks with overlapping touch_paths must not run in the same batch unless a lock or dependency serializes them.
5. If multiple research lanes run in parallel, define merge_gates with gate_id, title, wait_for, merge_task_id, merge_outputs, acceptance_checks, and notes.
6. Make downstream implementation depend on the merge task, not on partial research lane outputs.
7. Record shared_resources, conflict_controls, coordination_targets, merge_strategy, communication_checkpoints, verification_steps, rollback_plan, source_value_provenance, plan_evidence, and plan_history_targets.
8. Run plan-parallel-work.
9. If status is ready_to_parallelize, execute by batches and keep _ops/coordination/status.json updated.
10. If a merge gate exists, wait for every wait_for lane and pass acceptance_checks before releasing downstream work.
11. If status is sequential_required, do not parallelize; reduce overhead through the selected work_mode instead.
12. If status is rework_required, fix the gaps before parallel execution.
13. After all lanes finish, merge once, run final verification, evaluate, commit, and push from the primary agent.

Output:
- Recommended execution batches
- Serialized tasks and why
- Merge gates and release criteria
- Conflict controls
- Coordination targets
- Final verification plan
- Any reason not to parallelize
```

## Related

- [parallel-work-planner-agent](../../agent-platform/docs/parallel-work-planner-agent.ko.md)
- [_ops/workflows/52-parallel-work-planning.md](../workflows/52-parallel-work-planning.md)
