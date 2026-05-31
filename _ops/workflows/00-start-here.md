# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Check git status.
2. Read [_ops/index.md](../index.md).
3. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
4. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
5. Read relevant philosophy from `_philosophy/` when the task touches durable worldview or operating principles.
6. Decide the owning project or shared workspace folder; use [_ops/workflows/25-project-boundary-management.md](25-project-boundary-management.md) when unclear.
7. Read the target project README and relevant docs.
8. If planning depends on external facts or current information, run [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md).
9. Implement the smallest useful change inside the owning project or shared folder.
10. Verify with tests, checks, or rendered artifacts.
11. Evaluate completed work against the initial instruction.
12. Rework if the evaluator finds gaps, then evaluate again.
13. Update history and maps.
14. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file.
