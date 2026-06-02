# 요청-결과 추적: 사용자 의도 기반 기능 지도

## 요청

- ID: `UR-2026-06-03-015`
- 요약: 히스토리의 사용자 의도를 다시 하나씩 보며 기능을 정리해 달라는 요청.

## 결과

- 2026-05-31부터 2026-06-03까지 구조화된 의도 155개를 대상으로 삼았다.
- large-scope 원칙에 따라 모든 파일을 읽지 않고, request summaries, work summaries, 주요 registry/spec를 대표 입력으로 사용했다.
- 사용자 의도를 12개 기능 축으로 정리하고, 이미 구현된 기능과 Now/Next/Later 기능 후보를 분리했다.

## 산출물

- `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.ko.md`
- `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.en.md`
- `_history/plans/2026/2026-06-03-user-intent-feature-map.ko.md`

## 검증

- 누락 방지: `_history/evaluations/2026/2026-06-03-user-intent-feature-map-omission-input.json`
- grounding: `_history/evaluations/2026/2026-06-03-user-intent-feature-map-grounding.json`
- work evaluation: `_history/evaluations/2026/2026-06-03-user-intent-feature-map-evaluation-result.json`
