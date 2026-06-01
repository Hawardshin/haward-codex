# 계획 기록: 질문/지시 품질 게이트

## 초기 지시 요약

사용자는 질문과 지시를 잘해야 하며, 편향적이거나 잘못된 지시는 흔한 실패 원인이라고 했다. LLM은 확률론적 기계이므로 제대로 질문해야 제대로 답이 나온다는 원칙을 플랫폼에 반영하라고 요청했다.

## 작업 모드

- `governance`

## 검색 질문

- OpenAI/Anthropic/Microsoft prompt engineering best practice
- NIST generative AI bias risk
- Stanford language modeling probabilistic next-word framing

## 계획

1. 공식 prompt guidance와 bias/language modeling 근거를 확인한다.
2. 기존 AI 사용 격차 구조와 겹치지 않게 `REQ-WS-043`을 추가한다.
3. `ai-usage-gap-profile.json`을 질문/지시 품질 gate의 source of truth로 유지한다.
4. 지속 지시, 운영 모델, router, workflow, prompt, memory bootstrap에서 실행 전 재작성 규칙을 찾을 수 있게 한다.
5. 스펙/히스토리/평가/시간 기록을 남기고 검증 후 커밋/push한다.

## 계획 근거

- 명확한 지시와 출력 형식은 공식 prompt guidance의 공통 권고다.
- bias는 NIST 문서에서 측정/관리 대상 risk로 취급된다.
- language model 확률적 mental model은 지시 wording, context, 예시, 순서가 결과에 영향을 준다는 운영 원칙의 근거가 된다.
