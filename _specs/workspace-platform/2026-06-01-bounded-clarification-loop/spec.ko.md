# 스펙: 제한된 역질문 루프

## 요구사항

- `REQ-WS-046`

## 문제

모호한 지시는 AI 결과 품질을 크게 떨어뜨린다. 하지만 모든 모호함을 긴 질문 목록으로 되돌리면 작업 속도가 느려지고 플랫폼의 자동화 목적과 충돌한다. 에이전트는 필요한 경우 사람에게 역질문해야 하지만, 질문은 결과를 바꾸는 핵심 불확실성에 제한하고 빠르게 실행 가능한 task brief로 수렴해야 한다.

## 목표

- 모호한 지시를 `vague_intent`, `no_output_contract`, `clarification_loop_risk`로 분류할 수 있게 한다.
- 질문은 보통 1회, 많아도 2회 이내로 제한한다.
- 한 round의 질문은 최대 3개로 제한하고 결정 영향 순서로 정렬한다.
- 질문 후에도 모호하면 합리적 가정, 추천 기본값, 선작업 후 확인, 명시적 보류 중 하나로 수렴한다.
- 기존 질문/지시 품질 gate, workflow, prompt, persistent instructions, memory bootstrap에 반영한다.

## 비목표

- 모든 모호한 요청을 사용자 질문으로 되돌리지 않는다.
- 질문지나 discovery interview를 기본값으로 만들지 않는다.
- 고위험/비가역 결정에서 임의로 추측해 진행하지 않는다.

## 설계

- `ai-usage-gap-profile.json`에 `bounded_clarification_policy`를 추가한다.
- workflow와 prompt에 `clarification_loop_risk`와 `bounded_clarification` intervention을 추가한다.
- persistent instructions와 AGENTS에 질문 예산과 수렴 규칙을 추가한다.
- memory bootstrap이 새 정책을 warm anchor로 유지하게 한다.
- 요구사항/스펙/히스토리/평가를 연결한다.

## 수용 기준

- `REQ-WS-046`이 requirements baseline에 존재한다.
- `ai-usage-gap-profile.json`이 config contract를 통과한다.
- workflow/prompt가 질문 예산, 최대 질문 수, 수렴 전략을 명시한다.
- persistent instructions와 AGENTS가 다음 세션에도 적용 가능한 durable rule을 가진다.
- grounding/evaluator가 통과한다.
