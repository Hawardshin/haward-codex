# 계획: 앱형 Command Controls

## 작업 모드

- 선택 모드: `standard`
- 이유: Workspace Monitor의 meaningful UI 상호작용과 요구사항을 바꾸지만 새 정책, 설치, 서버 저장소, cross-workspace runtime 계약을 추가하지 않는다.
- view mode: `superadmin_developer`
- install mode: 해당 없음
- resource risk: 낮음. keyboard listener는 cleanup되고, localStorage 외 새 장기 리소스를 만들지 않는다.

## 근거

- Grafana는 command palette를 전역 검색과 주요 action 실행에 사용한다.
- Basis Design System은 복잡한 데이터 화면에서 saved/persisted view가 반복 설정 전환에 유용하다고 설명한다.
- UAE Design System은 actions/input이 사용자의 flow와 state 변화를 일으키는 표준화된 요소라고 설명한다.

## 구현 순서

1. command item 타입, pinned section storage key, default pinned sections를 정의한다.
2. `MonitorShell`에 command palette open/query, pinned, recent state를 추가한다.
3. keyboard listener, focus, recent update, localStorage persistence lifecycle을 추가한다.
4. command item list와 실행 함수를 구성한다.
5. `app-control-bar`와 command palette dialog를 렌더링한다.
6. CSS와 responsive rules를 추가한다.
7. 요구사항, 히스토리, 검증, 평가 기록을 갱신한다.
