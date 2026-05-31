# Evaluate And Rework Workflow

## Purpose

작업 결과가 초기 사용자 지시와 어긋나지 않았는지 확인하고, 차이가 있으면 다시 작업으로 돌린다.

## Sequence

1. Capture the initial instruction and the actual result summary.
2. List changed files and verification results.
3. Run or simulate `work-evaluator-agent` using [../prompts/70-evaluate-work.md](../prompts/70-evaluate-work.md).
4. If the evaluator returns `rework_required`, convert each gap into a follow-up action.
5. Complete the follow-up action.
6. Evaluate again.
7. Continue close-out only when there are no blocking gaps.

## Python Command

From `agent-platform/`, provide a JSON input matching `configs/evaluation/work-evaluation-template.json`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Rule

Do not treat evaluation as a final report only. If the evaluator finds a real gap, reflect it into the work and run the relevant checks again.
