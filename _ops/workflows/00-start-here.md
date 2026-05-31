# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Check git status.
2. Read [_ops/index.md](../index.md).
3. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
4. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
5. Read the target project README and relevant docs.
6. Implement the smallest useful change.
7. Verify with tests, checks, or rendered artifacts.
8. Evaluate completed work against the initial instruction.
9. Rework if the evaluator finds gaps, then evaluate again.
10. Update history and maps.
11. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file.
