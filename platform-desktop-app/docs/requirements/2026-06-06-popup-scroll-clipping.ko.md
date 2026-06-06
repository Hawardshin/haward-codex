# 요구사항: 팝업 스크롤 잘림 방지

날짜: 2026-06-06

## 사용자 요구
- 스크롤 때문에 팝업이 보이지 않는 현상을 고친다.

## 요구사항
- REQ-PSC-001: Dropdown, context menu, file picker 같은 팝업은 스크롤 컨테이너 내부 overflow에 잘리지 않아야 한다.
- REQ-PSC-002: 팝업은 viewport 안에 남는 높이를 기준으로 최대 높이를 제한하고, 필요할 때 팝업 내부에서만 스크롤해야 한다.
- REQ-PSC-003: 팝업 레이어는 설정 모달, 작업 화면, 스크롤 pane보다 위에 떠야 한다.
- REQ-PSC-004: 소스 파일 선택, 공통 선택 메뉴, Tool Studio primary/action/context menu에 같은 팝업 계약을 적용한다.

## 범위
- 포함: workspace monitor renderer CSS, MonitorShell dropdowns, ToolStudioPanel menus, 회귀 테스트.
- 제외: 새로운 메뉴 라이브러리 도입, native OS 팝오버 API 전환, 전체 화면 layout 재설계.

## 수용 기준
- 작은 viewport와 스크롤된 화면에서도 대표 팝업이 viewport 안에 표시된다.
- 팝업 content는 portal wrapper 아래에서 렌더링된다.
- 팝업은 `z-index` token, Radix available-height, 내부 `overflow:auto`, `overscroll-behavior: contain`을 가진다.
- workspace-monitor 테스트와 check, desktop app 테스트/check/package가 통과한다.
