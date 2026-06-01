# 모델별 프롬프팅 전략 요구사항 변경

## 변경 개요

- 날짜: 2026-06-01
- 출처 요청: `UR-2026-06-01-033`
- 추가 요구사항: `REQ-WS-044`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 좋은 모델과 안 좋은 모델의 좋은 사용법이 다르며, 특히 추론 모델이 아닌 약한 모델은 같은 요청을 두 번 연속 보내는 방식이 더 높은 성능을 보인다고 말했다.

## 변경 내용

`REQ-WS-044`를 추가해 모델 capability별 프롬프팅 전략을 공통 운영 규칙으로 승격한다.

- 약한/비추론/불확실 모델: 비용과 지연이 허용되고 작업 편차가 큰 경우 두 번의 독립 시도 또는 초안-비평-수정 loop를 실행한다.
- 비교/병합: 두 결과를 그대로 더하지 않고, 수렴점과 충돌점, 누락된 요구사항, 근거 있는 부분을 비교한다.
- 강한/추론 모델: 불필요한 중복 호출보다 목표, 맥락, 제약, 성공 기준, 검증 경로를 명확히 한다.
- 반복 호출 결과: 사실 증명이 아니라 agreement signal로만 취급하고, 출처/테스트/도구/evaluator/인간 판단으로 검증한다.

## 근거

- Self-consistency 연구는 여러 reasoning path를 샘플링해 일관된 답을 선택하는 방식이 일부 reasoning benchmark에서 성능을 높일 수 있음을 보였다.
- Self-Refine과 Reflexion 계열 연구는 초안, 피드백, 재시도 loop가 여러 작업에서 결과를 개선할 수 있음을 보여준다.
- OpenAI와 Microsoft의 reasoning model 문서는 reasoning model과 일반 모델이 서로 다른 prompting 접근을 요구한다고 설명한다.

## 영향

- `agent-platform/configs/usage/ai-usage-gap-profile.json`이 모델별 prompt/retry 전략의 source of truth가 된다.
- `_ops/workflows/59-bridge-ai-usage-gap.md`와 `_ops/prompts/89-bridge-ai-usage-gap.md`는 gap 진단 시 모델 capability를 함께 분류한다.
- 지속 지시와 메모리 부트스트랩은 이 규칙을 future session에서 잊지 않도록 참조한다.
