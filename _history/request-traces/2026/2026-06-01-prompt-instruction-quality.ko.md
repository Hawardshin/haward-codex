# 요청-결과 추적: 질문/지시 품질 게이트

## 요청

질문과 지시를 잘해야 하며, 편향적이거나 잘못된 지시는 흔한 실패 원인이고, LLM은 확률론적 기계이므로 제대로 질문해야 제대로 답이 나온다는 원칙을 플랫폼에 반영하라는 요청.

## 연결

- 사용자 요청: `UR-2026-06-01-032`
- 요구사항: `REQ-WS-043`
- 스펙: `_specs/workspace-platform/2026-06-01-prompt-instruction-quality/`
- 웹 검색: `_history/web-searches/2026/2026-06-01-prompt-instruction-quality.ko.md`
- 리서치 노트: `_research/topics/agent-planning/2026-06-01-prompt-instruction-quality.ko.md`
- 평가: `_history/evaluations/2026/2026-06-01-prompt-instruction-quality.ko.md`
- 시간 기록: `_history/work-timings/2026/2026-06-01-prompt-instruction-quality.json`

## 결과

- `ai-usage-gap-profile.json`을 질문/지시 품질 gate의 source of truth로 강화했다.
- 지속 지시, 운영 모델, workflow, prompt, router, index, memory bootstrap에 실행 전 지시 재작성 규칙을 연결했다.
- 편향/유도형/출력 계약 없는 지시는 중립적이고 검증 가능한 task brief로 바꾸도록 문서화했다.

## 커밋

- pending
