# 요구사항: 팝업 스크롤 잘림 방지

날짜: 2026-06-06

## 사용자 요구
- 스크롤 때문에 팝업이 보이지 않는 현상을 고친다.

## 요구사항
- REQ-PSC-001: Dropdown, context menu, file picker 같은 팝업은 스크롤 컨테이너 내부 overflow에 잘리지 않아야 한다.
- REQ-PSC-002: 팝업은 viewport 안에 남는 높이를 기준으로 최대 높이를 제한하고, 필요할 때 팝업 내부에서만 스크롤해야 한다.
- REQ-PSC-003: 팝업 레이어는 설정 모달, 작업 화면, 스크롤 pane보다 위에 떠야 한다.
- REQ-PSC-004: 소스 파일 선택, 공통 선택 메뉴, Tool Studio primary/action/context menu에 같은 팝업 계약을 적용한다.
- REQ-PSC-005: 명령 팔레트, 설정 모달, 운영 센터, 터미널 드로어 같은 큰 오버레이는 스크롤/애니메이션되는 작업면 내부 fixed 기준에 묶이지 않고 실제 앱 root/viewport 기준에서 떠야 한다.
- REQ-PSC-006: 모달성 오버레이는 열릴 때 내부의 의도된 초기 요소로 focus를 이동하고, `Tab`/`Shift+Tab`을 내부에 가두며, `Escape`로 닫혀야 한다.
- REQ-PSC-007: 닫힌 drawer형 오버레이는 pointer와 keyboard 접근이 차단되어야 하며, 열린 drawer는 transition/containing-block 잔상 때문에 화면 밖 위치에 고정되지 않아야 한다.

## 범위
- 포함: workspace monitor renderer CSS, MonitorShell dropdowns/modals, ToolStudioPanel menus, RuntimeTerminalDrawer, 회귀 테스트.
- 제외: 새로운 메뉴 라이브러리 도입, native OS 팝오버 API 전환, 전체 화면 layout 재설계.

## 수용 기준
- 작은 viewport와 스크롤된 화면에서도 대표 팝업이 viewport 안에 표시된다.
- 팝업 content는 portal wrapper 아래에서 렌더링된다.
- 팝업은 `z-index` token, Radix available-height, 내부 `overflow:auto`, `overscroll-behavior: contain`을 가진다.
- workspace-monitor 테스트와 check, desktop app 테스트/check/package가 통과한다.
- 1280x720 데스크톱 뷰포트에서 설정, 명령 팔레트, 운영 센터, 터미널 드로어가 backdrop 기준 `top=0,left=0,bottom=viewportHeight`를 만족하고 주요 surface rect가 viewport 안에 남는다.
