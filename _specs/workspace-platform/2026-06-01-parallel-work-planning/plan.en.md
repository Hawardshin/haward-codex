# Plan: Parallel Work Planning Structure

## Mode

- Work mode: `governance`
- Reason: shared operating loop, agent-platform CLI, prompts/workflows, and memory anchors are changing.

## Steps

1. Use web search to verify DAG/workflow dependency, concurrency, and job dependency patterns.
2. Create `REQ-WS-023` and spec-driven artifacts.
3. Implement `parallel_work.py` and `plan-parallel-work` CLI.
4. Add tests plus template/agent spec.
5. Update docs, prompt, workflow, memory bootstrap, and coordination board.
6. Run full verification, evaluation, commit, and push.

## Decisions

- Parallelization is an execution structure, not a new work mode.
- Do not build an execution engine yet; first add safe batch planning and conflict checks.
