# 작업 평가: 질문/지시 품질 게이트

## 결론

- 상태: 통과
- 작업 모드: `governance`
- 재작업 필요: 없음

## 초기 요청 대비 결과

- 요청은 질문/지시 품질, 편향적 지시의 위험, LLM의 확률적 성격, "제대로 질문해야 제대로 답이 나온다"는 원칙을 플랫폼에 반영하는 것이었다.
- 결과는 `REQ-WS-043`, `ai-usage-gap-profile.json`, 지속 지시, 운영 모델, workflow, prompt, router, memory bootstrap, 스펙/히스토리/평가 산출물로 반영됐다.
- 모호하거나 편향적이거나 결론을 유도하거나 출력 계약이 없는 지시는 실행 전 중립적이고 검증 가능한 task brief로 재작성하도록 했다.

## 확인한 근거

- OpenAI, Anthropic, Microsoft 공식 prompt guidance
- NIST AI RMF Generative AI Profile 및 bias guidance
- Stanford CS224N language modeling 자료
- 내부 근거: `agent-platform/configs/usage/ai-usage-gap-profile.json`, `_ops/workflows/59-bridge-ai-usage-gap.md`, `_ops/prompts/89-bridge-ai-usage-gap.md`

## 검증

- JSON 유효성 통과
- config contract 통과
- memory bootstrap 통과
- docs/naming/structure audit 통과
- workspace index/task board freshness 통과
- workspace governance health 통과
- grounding/evaluator/work-timer 통과
- `git diff --check` 통과

## 남은 개선 후보

- 반복 사용이 많아지면 prompt-brief validator CLI를 만든다.
- 실제 요청이 더 쌓이면 domain별 before/after prompt 예시를 추가한다.
