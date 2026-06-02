# Large Scope Decomposition Spec

## 요구사항

- `REQ-WS-073`

## 목표

범위가 너무 크거나 파일 후보가 너무 많은 요청을 바로 구현하지 않고, source inventory, 제외 기준, 대표 샘플, slice, 실행 전략, merge gate, 검증 계획으로 줄이는 공통 플랫폼 gate를 만든다.

## 범위

- large-scope decomposition profile 추가
- `large-scope-decomposer-agent` spec 추가
- 정책, workflow, prompt 추가
- `AGENTS.md`, persistent instructions, prompt router, memory bootstrap 연결
- 요구사항, 히스토리, 평가 기록 연결

## 비범위

- 새 장기 실행 worker 구현
- IDE나 코드 검색 엔진 설치
- 실제 대규모 리팩토링 자동 실행
- 모든 프로젝트에 dependency graph tool을 강제 설치

## 핵심 결정

- 병렬 작업과 분리한다. 큰 범위 분해가 먼저이고, 병렬 계획은 slice 이후의 선택지다.
- 모든 파일을 읽는 것을 기본값으로 삼지 않는다.
- 대표 샘플은 이해를 위한 도구이고, 검증은 targeted/affected/global checks로 보완한다.
- 생성/파생/벤더 파일은 기본 제외하고 필요할 때만 샘플링한다.

## 수용 기준

- profile은 `check-config-contract`를 통과한다.
- agent spec은 `inspect-agent`로 읽힌다.
- memory bootstrap에서 warm anchor로 발견된다.
- workflow와 prompt router가 새 흐름을 가리킨다.
- persistent instructions와 `AGENTS.md`에 병렬 계획보다 앞선 pre-gate가 명시된다.
- 요구사항, 계획, 요청 추적, 평가 기록이 연결된다.
