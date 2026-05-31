# Parallel Work Planner Agent

`parallel-work-planner-agent` checks whether work can be split into multiple safe lanes. It is designed to improve speed without creating hidden dependencies, concurrent edits to the same files, or expensive rework.

## Principles

- Parallelization is a validated choice, not the default.
- Each task needs `task_id`, `dependencies`, `touch_paths`, `output_targets`, and `verification_steps`.
- Tasks in the same batch must not have overlapping `touch_paths`.
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
- `dependencies`: ordering relationships between tasks
- `touch_paths`: files or folders each task will touch
- `output_targets`: completed artifacts
- `verification_steps`: lane-level checks
- `shared_resources`: shared state such as git index, remote branch, or coordination status
- `conflict_controls`: file ownership, locks, branch/worktree, or handoff rules
- `coordination_targets`: where status will be recorded
- `merge_strategy`: how lane outputs will be combined
- `rollback_plan`: how failed lanes are isolated and recovered

## Statuses

- `ready_to_parallelize`: an independent batch exists and no blocking gaps or conflicts were found.
- `sequential_required`: no gaps exist, but no independent batch exists.
- `rework_required`: dependencies, conflicts, verification, or coordination controls are incomplete.

## When To Use

- The user is concerned about speed or asks for parallel work.
- Research, code, docs, and validation can be split into independent lanes.
- Multiple agents or sessions may work at the same time.

If the task is small or repeatedly touches the same files, reducing governance overhead through `quick` or `ship_first` is usually better than parallelizing.
