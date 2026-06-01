# 스펙: 비차단 역질문

## 목적

`REQ-WS-047`을 반영해 사용자 답변 대기 상태가 전체 작업 중단으로 번지지 않도록 한다.

## 요구사항

- `REQ-WS-047`

## 동작 원칙

- `clarification_needed` 또는 역질문이 발생하면 먼저 의존성을 나눈다.
- 답변 없이는 결정할 수 없는 항목은 `blocked_decision`으로 둔다.
- 답변과 무관한 작업은 `unblocked_work`로 계속 진행한다.
- 진행 중 사용한 가정, 기본값, 보류 항목을 기록한다.
- 답변이 오면 `resume_action`에 따라 영향받은 부분만 수정한다.

## 변경 대상

- 요구사항 기준선과 변경/검토 기록
- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_docs/operating-models/ai-usage-gap-operating-model.*.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/instructions/persistent-instructions.*.md`
- `AGENTS.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_ops/workflows/38-spec-source-reconciliation.md`
- `_docs/policies/spec-driven-development-policy.*.md`
- 운영 index/router와 히스토리/평가 기록

## 수용 기준

- AI usage gap profile에 `global_pause_on_clarification`, `non_blocking_progress`, `non_blocking_clarification_policy`가 존재한다.
- workflow와 prompt가 pending answer를 `blocked_decision`, `unblocked_work`, `assumptions`, `resume_action`으로 출력하도록 요구한다.
- durable instructions와 AGENTS가 전체 작업 중단 금지 규칙을 포함한다.
- config contract, memory bootstrap, docs/naming/structure audit, grounding, evaluator, work timer가 통과한다.
