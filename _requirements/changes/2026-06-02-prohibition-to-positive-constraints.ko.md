# 금지형 지시 변환 요구사항 변경

## 변경 요약

- 새 요구사항: `REQ-WS-078`
- 사용자 요청: “AI는 금지를 이해하지 못한다.”
- 변경 의도: 금지형 지시를 그대로 믿지 않고, 긍정형 행동 목표와 검증 가능한 실행 계약으로 바꾼다.

## 변경 내용

- `agent-platform/configs/usage/ai-usage-gap-profile.json`에 `prohibition_rewrite_contract`를 추가한다.
- `_philosophy/agent-operating-philosophy.ko.md`에 “금지는 행동 목표가 아니다” 원칙을 추가한다.
- `_ops/workflows/59-bridge-ai-usage-gap.md`와 `_ops/prompts/89-bridge-ai-usage-gap.md`에서 금지형 지시를 변환하도록 한다.
- `philosophy-traceability.json`에 새 철학 원칙을 실행/검증 대상과 연결한다.

## 근거

- OpenAI prompt guidance는 “무엇을 하지 말라”만 말하지 말고 “무엇을 할지”를 말하라고 권장한다.
- negation benchmark 논문들은 LLM이 부정/금지 문장을 일관되게 처리하지 못할 수 있음을 보여준다.
