# 요구사항 변경: 질문/지시 품질 게이트

## 변경

- `REQ-WS-043` 추가

## 배경

사용자는 AI를 제대로 쓰려면 질문과 지시를 잘해야 하며, 편향적이거나 잘못된 지시는 결과를 왜곡할 수 있다고 지적했다. 또한 LLM은 확률론적 기계이므로 제대로 질문해야 제대로 답이 나온다는 원칙을 플랫폼에 반영해야 한다고 요청했다.

## 요구사항

모호하거나 편향적이거나 결론을 유도하는 지시, 출력 계약이 없는 지시, LLM을 결정론적 진실 기계로 보는 지시는 실행 전에 중립적이고 검증 가능한 task brief로 재작성한다. 재작성에는 목표, 맥락, 제약, 출력 형식, 성공 기준, 반대 근거, 검증 경로가 포함되어야 한다.

## 영향

- `agent-platform/configs/usage/ai-usage-gap-profile.json`의 질문/지시 품질 규칙을 강화한다.
- `_ops/workflows/59-bridge-ai-usage-gap.md`와 `_ops/prompts/89-bridge-ai-usage-gap.md`를 지시 재작성 게이트로 사용한다.
- 지속 지시, 운영 모델, prompt router, memory bootstrap에서 이 규칙을 찾을 수 있게 한다.
