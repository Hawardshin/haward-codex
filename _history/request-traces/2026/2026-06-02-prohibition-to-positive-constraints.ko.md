# 요청-결과 추적: 금지형 지시 변환

## 요청 요약

- 사용자는 “AI는 금지를 이해하지 못한다”고 지적했다.

## 결과

- `REQ-WS-078`을 추가했다.
- `ai-usage-gap-profile.json`에 `prohibition_rewrite_contract`를 추가했다.
- 철학 문서에 “금지는 행동 목표가 아니다” 원칙을 추가했다.
- philosophy traceability registry에 새 원칙의 source, execution, validation target을 연결했다.
- persistent instructions, memory bootstrap, workflow, prompt에 금지형 지시를 긍정 행동 계약과 검증 게이트로 바꾸는 규칙을 반영했다.

## 주요 산출물

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_philosophy/agent-operating-philosophy.ko.md`
- `agent-platform/configs/governance/philosophy-traceability.json`
- `_docs/operating-models/ai-usage-gap-operating-model.ko.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_specs/workspace-platform/2026-06-02-prohibition-to-positive-constraints/`

## 평가

- `_history/evaluations/2026/2026-06-02-prohibition-to-positive-constraints.ko.md`
