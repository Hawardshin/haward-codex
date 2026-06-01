# Evaluate And Rework Workflow

## Purpose

작업 결과가 초기 사용자 지시와 어긋나지 않았는지 확인하고, 차이가 있으면 다시 작업으로 돌린다.

## Sequence

1. Capture the initial instruction and the actual result summary.
2. Capture the selected `work_mode`; if missing, default to `standard`.
3. Read `agent-platform/configs/workflows/work-mode-registry.json` to determine which targets are blocking, and run `check-work-modes` when mode policy, evaluator targets, or close-out strictness changed.
4. Summarize the completed work in plain language.
5. Check prior internal work, repository examples, official docs, mature open-source projects, or other strong references before evaluation.
6. Validate any reused knowledge-base content with [_ops/workflows/65-validate-knowledge-reference.md](65-validate-knowledge-reference.md).
7. Capture reusable internet research or external references when useful.
8. Run [_ops/workflows/70-hallucination-prevention.md](70-hallucination-prevention.md) when the final output contains factual claims.
9. List changed files, verification results, references checked, grounding checks, source provenance targets, plan evidence targets, web search record targets, user request summary targets, requirements targets, spec targets, skill targets and validation targets when skill work occurred, request trace targets, work summary targets, timing summary targets, deferred improvement targets, context archive targets when archiving occurred, and installation record targets when installation occurred.
10. For non-`quick` modes, include `mode_selection_record_targets`.
11. If a plan guided the work, link its `_history/plans/YYYY/` file.
12. Confirm the user-readable summary exists under `_history/work-summaries/YYYY/` when the mode requires it.
13. Run or simulate `work-evaluator-agent` using [../prompts/70-evaluate-work.md](../prompts/70-evaluate-work.md).
14. If the evaluator returns `rework_required`, convert each gap into a follow-up action.
15. Complete the follow-up action.
16. Evaluate again.
17. Save the final evaluation report under `_history/evaluations/YYYY/`.
18. Continue close-out only when there are no blocking gaps and the evaluation report file exists.

## Python Command

From `agent-platform/`, provide a JSON input matching `configs/evaluation/work-evaluation-template.json`:

```bash
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

## Rule

Do not treat evaluation as a final report only. If the evaluator finds a real gap, reflect it into the work and run the relevant checks again.

Reference research is part of evaluation. If no useful reference exists, record where you checked and why it did not apply.

Factual grounding is part of evaluation. If the final output contains factual claims, record the `hallucination-guard-agent` result in `grounding_checks`.

The evaluator input must include `work_mode`. Missing target fields are blocking according to `agent-platform/configs/workflows/work-mode-registry.json`.

The evaluator input must include `mode_selection_record_targets` for `standard`, `ship_first`, `research`, and `governance`. This prevents work modes from staying prompt-only.

In `quick` mode, full-loop target gaps are non-blocking improvements unless the user or another rule makes them mandatory.

In `ship_first` mode, `references_checked`, `mode_selection_record_targets`, and `web_search_record_targets` are blocking. If `improvement_ideas` are present, `deferred_improvement_targets` is also blocking.

In `research` mode, `references_checked`, `source_provenance_targets`, `plan_evidence_targets`, `mode_selection_record_targets`, and `web_search_record_targets` are blocking.

In `standard` and `governance` modes, web search records, user request summaries, requirements targets, spec targets, source provenance, plan evidence, mode selection records, request traces, work summaries, and timing summaries are blocking.

In `research` mode, timing summaries are blocking so slow source collection or synthesis phases stay visible.

When skill work occurred, the evaluator input must include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets`. Missing skill source or validation targets are blocking gaps.

If context archiving occurred, the evaluator input must include `context_archiving_occurred=true` and `context_archive_targets`. Missing archive targets are blocking gaps.

The final evaluation must not exist only in chat output. Save it as a Markdown file before commit.

When a saved plan guided the work, the final evaluation should link the relevant `_history/plans/YYYY/` plan history file.

If installation occurred, the evaluator input must include `installation_occurred=true` and `installation_record_targets`. Missing installation records are blocking gaps.
