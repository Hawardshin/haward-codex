# 작업 평가: 모델별 프롬프팅 전략

## 평가 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요구사항: `REQ-WS-044`
- 평가 입력: `_history/evaluations/2026/2026-06-01-model-adaptive-prompting-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-01-model-adaptive-prompting-grounding.json`

## 초기 지시 대비 결과

사용자는 좋은 모델과 안 좋은 모델의 좋은 사용법이 다르며, 비추론/약한 모델은 2번 연속 요청을 보내면 성능이 높아질 수 있다는 원칙을 반영하라고 요청했다.

반영 결과:

- `REQ-WS-044`로 모델별 프롬프팅 전략을 기준선화했다.
- `ai-usage-gap-profile.json`에 `model_capability_profiles`와 `model_adaptive_prompting_policy`를 추가했다.
- 약한/비추론/불확실 모델의 2-pass 전략을 비용/지연 허용, 고분산 작업, 비교/병합 가능 조건으로 제한했다.
- 추론/강한 모델은 중복 호출보다 명확한 목표, 맥락, 제약, 성공 기준, 검증 경로를 우선하도록 했다.
- 반복 호출 일치는 사실 증명이 아니라 agreement signal이며 별도 검증이 필요하다는 boundary를 명시했다.

## 확인한 근거

- Self-consistency, Self-Refine, Reflexion 논문
- OpenAI reasoning best practices
- Microsoft Foundry prompt engineering guidance
- 기존 `ai-usage-gap-profile.json`과 질문/지시 품질 gate 문서

## 검증

- JSON syntax: 통과
- Config contract: 통과
- Memory bootstrap: 통과
- Docs audit: 통과
- Naming audit: 통과
- Structure audit: 통과
- Workspace index/task board freshness: 통과
- Workspace health governance: 통과
- Grounding check: `ready_to_publish`
- Work evaluator: `ready_to_close`
- Work timer: `ready`
- `git diff --check`: 통과

## 남은 개선 후보

- 모델별 비용/지연 threshold와 evaluator routing을 별도 config로 분리할 수 있다.
- 2-pass 결과를 자동 비교하는 작은 helper나 evaluator prompt를 만들 수 있다.
