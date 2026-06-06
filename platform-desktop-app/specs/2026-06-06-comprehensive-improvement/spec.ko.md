# 종합 개선 Cockpit Spec

## 목표

`workspace-monitor`의 EVAL 탭에 종합 개선 cockpit를 추가해 넓은 개선 요구를 하나의 평가 surface와 검증 계약으로 만든다.

## 기능

- 종합 점수: 7개 개선 차원의 평균으로 계산한다.
- 위험 lane 수: 위험 상태인 차원 개수를 표시한다.
- 최우선 개선: 가장 낮은 점수의 차원을 표시한다.
- 차원 카드: stable ID, 점수, evidence, next action을 표시한다.
- 우선순위 카드: 낮은 점수 3개를 P1-P3로 표시한다.

## 개선 차원

- `desktop-performance`
- `ux-control-clarity`
- `native-resource-lifecycle`
- `eval-evidence`
- `release-packaging`
- `open-source-leverage`
- `automation-continuity`

## 데이터 소스

- 현재 snapshot documents, stats, unified events, open-source reference registry.
- 기존 tool signal matcher.
- 기존 evaluation, web-search, work-summary, request-trace, timing, requirement/spec 문서 분류.

## UI 원칙

- 새 탭을 만들지 않고 기존 EVAL 탭 안에서 동작한다.
- 8px radius 이하 카드, restrained shadow, mixed accent colors, stable grid를 사용한다.
- 긴 문구는 wrap하고 카드 크기는 grid constraint로 안정화한다.

## 검증 계약

- `scripts/check-comprehensive-improvement-contract.mjs`는 panel token, dimension ID, CSS class, package check 연결을 검사한다.
- `tests/tool-studio.test.mjs`는 EVAL surface와 CSS 및 package script 연결을 검사한다.
