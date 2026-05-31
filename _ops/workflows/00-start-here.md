# Start Here Workflow

## Purpose

작업마다 탐색 순서를 다시 정하지 않도록 기본 순서를 고정한다.

## Sequence

1. Check git status.
2. Run [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before planning or file edits.
3. Read [_ops/index.md](../index.md).
4. Check [_ops/coordination/board.ko.md](../coordination/board.ko.md) when parallel work may exist.
5. Select a prompt from [_ops/prompts/00-router.md](../prompts/00-router.md).
6. Read relevant philosophy from `_philosophy/` when the task touches durable worldview or operating principles.
7. Decide the owning project or shared workspace folder; use [_ops/workflows/25-project-boundary-management.md](25-project-boundary-management.md) when unclear.
8. Read the target project README and relevant docs.
9. If planning depends on external facts or current information, run [_ops/workflows/55-research-insight-planning.md](55-research-insight-planning.md).
10. Implement the smallest useful change inside the owning project or shared folder.
11. Verify with tests, checks, or rendered artifacts.
12. If the final output contains factual claims, run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md).
13. Evaluate completed work against the initial instruction.
14. Rework if the evaluator finds gaps, then evaluate again.
15. Update history and maps.
16. Commit and push immediately.

## Rule

If this sequence becomes too broad for a repeated task, split that task into a dedicated workflow file.
