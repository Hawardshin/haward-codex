# 스펙: Responsive Workflow Layout

## 목표

- Workspace Monitor가 전체 화면에서만 겨우 맞는 고정 높이 앱처럼 동작하지 않게 한다.
- 첫 화면에는 핵심 작업 선택과 현재 상태만 남기고, 보조 정보는 기본 접힘으로 둔다.
- 화면 폭이 줄어도 버튼 위치가 흔들리거나 수평 스크롤이 생기지 않게 한다.
- 900px, 720px, 540px, 390px처럼 실제 창을 줄인 상태에서도 주요 섹션이 한 기능 단위로 세로 재배치되어야 한다.

## 요구사항

- shell은 `100dvh` 내부 고정 스크롤 대신 페이지 reflow를 허용한다.
- titlebar actions는 한 줄에 압축하지 않고 다음 줄로 자연스럽게 내려간다.
- home의 제품 구조, 운영 흐름, 최근 기록/옵션은 progressive disclosure로 묶는다.
- 핵심 rail, status row, action row, feature detail은 고정 열 수 대신 `auto-fit` 기반으로 재배치한다.
- 960px 이하에서는 titlebar, toolbar, agent/source/runtime/workbench grid가 한 열로 접혀야 한다.
- 420px 이하에서는 activity rail navigation을 두 줄 구조로 내려 주요 섹션 버튼이 가로 스크롤에 숨지 않아야 한다.
- 버튼, nav, Explorer, source toolbar, search/select 입력의 보이는 클릭/입력 타깃은 44px 이상이어야 한다.
- 초기 client shell은 대형 snapshot과 MonitorShell을 동기 import하지 않고 public JSON fetch와 lazy import로 진입해야 한다.

## 제외

- Source editor 내부의 코드 편집 canvas 고정 영역
- terminal drawer와 filesystem workbench처럼 작업 특성상 내부 스크롤이 필요한 영역
