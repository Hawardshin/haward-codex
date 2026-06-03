# Spec: Workbench Split Density

## 목표

데스크톱 앱의 workbench 밀도를 개선해 하단 터미널과 Workspace Explorer가 긴 웹 페이지처럼 보이지 않게 한다.

## 구현 범위

- `RuntimeTerminalDrawer.tsx`: terminal copy map 추가, 한국어 우선 카피 적용, drawer 내부를 `terminal-drawer-sidebar`와 `terminal-drawer-main`으로 분리
- `globals.css`: terminal drawer workbench grid, sidebar/main independent overflow, process graph vertical rail, compact Explorer controls
- `check-readiness.mjs`, `readiness.test.mjs`: split drawer 구조 token 추가

## 수용 기준

- 터미널 drawer는 상태/graph/tab이 왼쪽 rail에 있고 content는 오른쪽 main pane에 있어야 한다.
- terminal view switcher는 main content를 밀어내는 긴 horizontal bar가 아니라 sidebar control이어야 한다.
- 터미널 주요 문구는 한국어 mode에서 `실행 보드`, `작업 폴더`, `초기 입력`, `질문 보류`처럼 기능을 직접 설명해야 한다.
- Explorer 상단의 dropzone/action/state/search 영역은 기존보다 낮은 padding과 font hierarchy를 사용해야 한다.
- TypeScript, readiness test, platform check, customer build가 통과해야 한다.
