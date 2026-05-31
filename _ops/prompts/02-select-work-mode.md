# Select Work Mode Prompt

Use when: 작업을 시작한 뒤 전체 루프를 얼마나 강하게 돌릴지 정해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Read agent-platform/configs/workflows/work-mode-registry.json.
Classify the user request into exactly one work_mode: quick, standard, ship_first, research, or governance.
Use the lightest mode that covers risk, durability, source needs, verification needs, and the user's explicit intent.
If the user selected a mode, honor it unless safety, unsupported factual claims, install audit rules, or durable repository risk requires a stronger mode.
Record the selected work_mode, the reason, required close-out targets, and any intentionally deferred improvement targets.
For ship_first mode, if improvement ideas are postponed, add or update a deferred improvement target before close-out.
Return the selected mode and the next workflow steps.
```

## Checklist

- `agent-platform/configs/workflows/work-mode-registry.json`
- `_ops/workflows/02-select-work-mode.md`
- `work_mode` in evaluator input
- `_ops/backlog/deferred-improvements.ko.md` when `ship_first` defers improvement
