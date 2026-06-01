# 모델별 프롬프팅 전략 요구사항 검토

## 검토 대상

- 요구사항: `REQ-WS-044`
- 변경 기록: `_requirements/changes/2026-06-01-model-adaptive-prompting.ko.md`
- 관련 설정: `agent-platform/configs/usage/ai-usage-gap-profile.json`

## 검토 결과

채택한다.

## 판단

사용자 지시는 durable 운영 규칙에 해당한다. 다만 “두 번 요청하면 항상 더 좋다”로 일반화하면 비용, 지연, 모델 특성, 검증 부재 문제가 생긴다. 따라서 요구사항은 다음 조건으로 제한한다.

- 모델이 약한/비추론/불확실한 경우
- 작업이 reasoning, 설계, 분류, 요약, 비평처럼 결과 편차가 큰 경우
- 비용과 지연이 허용되는 경우
- 비교/병합과 근거 검증을 수행할 수 있는 경우

강한 추론 모델은 공식 문서상 일반 모델과 prompting 접근이 다를 수 있으므로, 중복 호출보다 명확한 task framing과 검증을 우선한다.

## 검증 기준

- 요구사항 기준선에 `REQ-WS-044`가 추가되어야 한다.
- `ai-usage-gap-profile.json`에 `model_capability_profiles`와 `model_adaptive_prompting_policy`가 포함되어야 한다.
- workflow/prompt/persistent instructions/memory bootstrap이 새 규칙을 참조해야 한다.
- 최종 평가에서 반복 호출이 사실 증명이 아니라는 boundary가 확인되어야 한다.
