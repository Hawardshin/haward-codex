# Evaluate And Rework Workflow

## Purpose

작업 결과가 초기 사용자 지시와 어긋나지 않았는지 확인하고, 차이가 있으면 다시 작업으로 돌린다.

## Sequence

1. Capture the initial instruction and the actual result summary.
2. Summarize the completed work in plain language.
3. Check prior internal work, repository examples, official docs, mature open-source projects, or other strong references before evaluation.
4. Capture reusable internet research or external references when useful.
5. List changed files, verification results, and references checked.
6. Run or simulate `work-evaluator-agent` using [../prompts/70-evaluate-work.md](../prompts/70-evaluate-work.md).
7. If the evaluator returns `rework_required`, convert each gap into a follow-up action.
8. Complete the follow-up action.
9. Evaluate again.
10. Save the final evaluation report under `_history/evaluations/YYYY/`.
11. Continue close-out only when there are no blocking gaps and the evaluation report file exists.

## Python Command

From `agent-platform/`, provide a JSON input matching `configs/evaluation/work-evaluation-template.json`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Rule

Do not treat evaluation as a final report only. If the evaluator finds a real gap, reflect it into the work and run the relevant checks again.

Reference research is part of evaluation. If no useful reference exists, record where you checked and why it did not apply.

The final evaluation must not exist only in chat output. Save it as a Markdown file before commit.
