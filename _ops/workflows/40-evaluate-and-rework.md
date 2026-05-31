# Evaluate And Rework Workflow

## Purpose

작업 결과가 초기 사용자 지시와 어긋나지 않았는지 확인하고, 차이가 있으면 다시 작업으로 돌린다.

## Sequence

1. Capture the initial instruction and the actual result summary.
2. Summarize the completed work in plain language.
3. Check prior internal work, repository examples, official docs, mature open-source projects, or other strong references before evaluation.
4. Validate any reused knowledge-base content with [_ops/workflows/65-validate-knowledge-reference.md](65-validate-knowledge-reference.md).
5. Capture reusable internet research or external references when useful.
6. Run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md) when the final output contains factual claims.
7. List changed files, verification results, references checked, grounding checks, web search record targets, work summary targets, context archive targets when archiving occurred, and installation record targets when installation occurred.
8. If a plan guided the work, link its `_history/plans/YYYY/` file.
9. Confirm the user-readable summary exists under `_history/work-summaries/YYYY/`.
10. Run or simulate `work-evaluator-agent` using [../prompts/70-evaluate-work.md](../prompts/70-evaluate-work.md).
11. If the evaluator returns `rework_required`, convert each gap into a follow-up action.
12. Complete the follow-up action.
13. Evaluate again.
14. Save the final evaluation report under `_history/evaluations/YYYY/`.
15. Continue close-out only when there are no blocking gaps and the evaluation report file exists.

## Python Command

From `agent-platform/`, provide a JSON input matching `configs/evaluation/work-evaluation-template.json`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Rule

Do not treat evaluation as a final report only. If the evaluator finds a real gap, reflect it into the work and run the relevant checks again.

Reference research is part of evaluation. If no useful reference exists, record where you checked and why it did not apply.

Factual grounding is part of evaluation. If the final output contains factual claims, record the `hallucination-guard-agent` result in `grounding_checks`.

The evaluator input must include `web_search_record_targets` for meaningful work. Missing public search records are blocking gaps.

If context archiving occurred, the evaluator input must include `context_archiving_occurred=true` and `context_archive_targets`. Missing archive targets are blocking gaps.

The final evaluation must not exist only in chat output. Save it as a Markdown file before commit.

When a saved plan guided the work, the final evaluation should link the relevant `_history/plans/YYYY/` plan history file.

The evaluator input must include `work_summary_targets` for meaningful work. Missing user-readable summary targets are blocking gaps.

If installation occurred, the evaluator input must include `installation_occurred=true` and `installation_record_targets`. Missing installation records are blocking gaps.
