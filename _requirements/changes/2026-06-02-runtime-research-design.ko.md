# 런타임 조사/설계 요구사항 변경

## 변경 개요

- 날짜: 2026-06-02
- 출처 요청: `UR-2026-06-02-007`
- 추가 요구사항: `REQ-WS-052`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 효율적인 언어 방향을 정할 때 조사도 당연히 하고, 그런 과정을 설계해야 한다고 요청했다.

## 변경 내용

`REQ-WS-052`를 추가해 런타임/언어 선택을 조사 → 후보 설계 → ADR-style 결정 기록 → prototype measurement plan → 설치/구현 gate로 연결한다.

- 공식 문서와 표준을 factual anchor로 사용한다.
- ADR/RFC/architecture review 참고를 설계 기록 근거로 사용한다.
- 유지보수되는 오픈소스 구현과 이슈/토론 신호를 risk/adoption signal로 사용한다.
- 최소 두 후보 설계를 비교하고, blast radius가 작지 않으면 결정 기록을 남긴다.
- 성능이나 packaging이 이유라면 prototype measurement plan 없이는 구현으로 넘어가지 않는다.

## 근거

- ADR 관련 자료는 중요한 architecture decision을 context/consequence와 함께 기록하는 관행을 설명한다.
- Thoughtworks는 lightweight ADR을 evolutionary architecture에서 future maintainer와 oversight를 위한 기록 방식으로 소개한다.
- Google Cloud architecture framework는 architecture documentation이 future design decisions를 돕는다고 설명한다.
