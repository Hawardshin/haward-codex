# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Check git status.
2. Read [_ops/index.md](../index.md).
3. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
4. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
5. Read the target project README and relevant docs.
6. If planning depends on external facts or current information, run [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md).
7. Implement the smallest useful change.
8. Verify with tests, checks, or rendered artifacts.
9. Evaluate completed work against the initial instruction.
10. Rework if the evaluator finds gaps, then evaluate again.
11. Update history and maps.
12. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file.
