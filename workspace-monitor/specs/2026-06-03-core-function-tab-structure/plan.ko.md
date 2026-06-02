# 계획: 핵심 기능 탭 구조

## 작업 모드

- 선택 모드: `standard`
- 이유: 화면 정보구조와 프로젝트 요구사항을 바꾸는 의미 있는 구현이지만, 새 정책이나 cross-workspace governance 계약을 변경하지 않는다.
- view mode: `superadmin_developer`
- install mode: 해당 없음
- resource risk: 낮음. 새 long-running runtime, stream, timer, cache, source scan을 만들지 않는다.

## 근거

- VA.gov Design System은 tabs를 관련 섹션을 관리 가능한 단위로 나누는 패턴으로 설명하고, page-level navigation 대체로 쓰지 말라고 한다.
- Red Hat Design System은 primary navigation이 고수준 구조와 가장 중요한 행동을 조직한다고 설명한다.
- Equinor Design System은 tabs가 같은 위계의 관련 콘텐츠 사이 이동에 적합하다고 설명한다.

## 구현 순서

1. 섹션 metadata에 `shortLabel`, `purpose`, `group`을 추가한다.
2. 핵심 기능 rail과 기능군별 grouped tabs를 `MonitorShell`에 추가한다.
3. Overview `Core Functions` 패널을 추가한다.
4. 반응형 CSS와 hover/active 상태를 추가한다.
5. 요구사항, traceability, validation 기록을 갱신한다.
6. 테스트, typecheck, build, customer bundle 검증을 실행한다.
