# 요구사항 변경: 구조적 가드레일

## 변경 요약

- 새 요구사항: `REQ-WS-079`
- 요청 요약: 사용자는 가드레일은 필요하다고 지적했다.

## 변경 내용

- 실질적 위험이 있는 작업에는 prompt 문구가 아니라 구조적 가드레일을 둔다.
- 위험 표면, 선택한 가드레일, 허용 행동, 차단 행동, fallback/escalation, 검증 증거를 기록한다.
- 낮은 위험의 되돌릴 수 있는 작업에는 가벼운 체크를 허용하고, 고위험 작업에는 더 강한 실행 경계를 요구한다.

## 반영 대상

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_philosophy/agent-operating-philosophy.ko.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/operating-models/ai-usage-gap-operating-model.ko.md`
