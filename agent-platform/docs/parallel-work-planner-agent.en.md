# Parallel Work Planner Agent

`parallel-work-planner-agent` checks whether work can be split into multiple safe lanes. It is designed to improve speed without creating hidden dependencies, concurrent edits to the same files, or expensive rework.

## Principles

- Parallelization is a validated choice, not the default.
- Each task needs `task_id`, `dependencies`, `touch_paths`, `output_targets`, and `verification_steps`.
- Tasks in the same batch must not have overlapping `touch_paths`.
- When multiple research lanes run in the same batch, define `merge_gates` as fan-in points.
- Downstream implementation must depend on the merge task's synthesis output, not on partial research files.
- Shared resources and conflict controls are recorded in `shared_resources` and `conflict_controls`.
- Active lanes and status should be visible through `_ops/coordination/status.json` and the generated board.
- After all lanes finish, run final merge verification once.

## CLI

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json
```

## Input Fields

- `objective`: the overall goal to parallelize
- `work_mode`: selected work mode
- `tasks`: candidate parallel work items
- `merge_gates`: fan-in points that wait for parallel lanes and merge their outputs
- `dependencies`: ordering relationships between tasks
- `touch_paths`: files or folders each task will touch
- `output_targets`: completed artifacts
- `verification_steps`: lane-level checks
- `shared_resources`: shared state such as git index, remote branch, or coordination status
- `conflict_controls`: file ownership, locks, branch/worktree, or handoff rules
- `coordination_targets`: where status will be recorded
- `merge_strategy`: how lane outputs will be combined
- `rollback_plan`: how failed lanes are isolated and recovered
- `wait_for`: upstream lanes a merge gate waits for
- `merge_task_id`: task that synthesizes upstream lanes and releases downstream work
- `merge_outputs`: synthesis outputs
- `acceptance_checks`: criteria that must pass before downstream release

## Statuses

- `ready_to_parallelize`: an independent batch exists and no blocking gaps or conflicts were found.
- `sequential_required`: no gaps exist, but no independent batch exists.
- `rework_required`: dependencies, conflicts, verification, or coordination controls are incomplete.

## Parallel Research Synthesis

Research can fan out into official documentation, community signals, and open-source reference lanes. Implementation should not start from partial lane notes. A merge task such as `research-synthesis` waits for all research lanes, resolves contradictions and uncertainty, records accepted evidence, and only then releases the next batch.

## When To Use

- The user is concerned about speed or asks for parallel work.
- Research, code, docs, and validation can be split into independent lanes.
- Multiple agents or sessions may work at the same time.

If the task is small or repeatedly touches the same files, reducing governance overhead through `quick` or `ship_first` is usually better than parallelizing.
