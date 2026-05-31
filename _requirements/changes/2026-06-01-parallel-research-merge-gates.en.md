# Requirement Change: Parallel Research Merge Gates

## Change ID

- `REQ-CHANGE-2026-06-01-PARALLEL-RESEARCH-MERGE-GATES`

## Background

The user noted that work can stall or create problems when one lane finishes before others, and asked for a structure where research can run in parallel and then be merged.

## Change

- Add `REQ-WS-024`.
- Require `merge_gates` when multiple research lanes run in the same batch.
- A merge gate has `wait_for`, `merge_task_id`, `merge_outputs`, and `acceptance_checks`.
- Downstream implementation must depend on the merge task's synthesis output, not partial research notes.

## Verification

- `plan-parallel-work` treats parallel research lanes without a merge gate as a gap.
- The planner checks that the merge task depends on every `wait_for` task.
- The template runs official-docs, community-signal, and open-source research lanes before `research-synthesis`, then implementation.
