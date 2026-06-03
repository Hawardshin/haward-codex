# 제품 Workbench 대공사 검증

## 정적 검증

- TypeScript: `corepack pnpm --filter workspace-monitor run check`
- Renderer tests: `corepack pnpm --filter workspace-monitor test`
- Desktop tests: `corepack pnpm --filter platform-desktop-app test`
- Desktop readiness: `corepack pnpm --filter platform-desktop-app run check`
- Whitespace: `git diff --check`

## 빌드 검증

- Customer renderer: `corepack pnpm --filter workspace-monitor run build:customer`
- Customer bundle audit는 `platform-desktop-app run check` 안에서 실행한다.

## Browser Smoke

- Overview에 `핵심 기능` 메인 탭 4개가 보인다.
- 기본 탭은 `파일 가져오기`다.
- `작업 실행` 탭으로 전환된다.
- `activity-rail`은 1개, `desktop-sidebar`는 0개다.
- 기본 Overview에는 raw runtime path code가 노출되지 않는다.
- path disclosure는 runtime/operator surface에서 details로만 노출된다.

## 대공사 진행 지표

- `MonitorShell.tsx`에서 user-facing surface 책임이 component로 이동한다.
- readiness token은 새 구조를 강제한다.
- screenshot artifact와 evaluation record를 남긴다.

## Slice 01 결과

- `CoreFeatureTabs.tsx`로 Overview 핵심 기능 탭 렌더링을 이동했다.
- `PathDisclosure.tsx`로 raw path details 렌더링을 공용화했다.
- 다크 테마 첫 화면에서 홈/제품 기능 카드가 고정 흰색으로 보이는 문제를 테마 변수 기반 표면색으로 수정했다.
- Browser smoke 결과: 메인 탭 4개, `작업 실행` 탭 전환, activity rail 1개, desktop sidebar 0개, 하단 터미널 drawer 진입 확인.
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-product-workbench-overhaul-slice-01/core-feature-tabs-componentized.png`

## Slice 02 결과

- `WorkspaceExplorerPane.tsx`로 파일/코드 화면의 Explorer pane, tree renderer, tree builder, dropzone, search/meta UI를 이동했다.
- `MonitorShell.tsx`는 Explorer 상태, Tauri command 호출, editor state만 보유하고 Explorer 렌더링 책임을 component에 위임한다.
- 다크 테마 `파일/코드` 화면에서 native workspace state, dropzone, command toolbar, empty state가 고정 밝은 표면으로 보이는 문제를 테마 변수 기반 표면색으로 수정했다.
- Browser smoke 결과: `workspace-explorer-pane` 1개, `workspace-explorer-tree` 1개, `workspace-dropzone` 1개, 내부 `source-file-browser` hidden, activity rail 1개, desktop sidebar 0개 확인.
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-workspace-explorer-module/workspace-explorer-module.png`

## Slice 03 결과

- `RuntimeTerminalDrawer.tsx`로 하단 다중 CLI 터미널 drawer, launcher, run-board strip, process graph, session launcher, session list/output/input UI를 이동했다.
- `MonitorShell.tsx`는 runtime state, Tauri command 호출, polling/decision 로직을 유지하고 터미널 렌더링 책임을 component에 위임한다.
- readiness script와 readiness test가 `RuntimeTerminalDrawer.tsx`를 workbench source로 읽도록 바꿨다.
- 다크 테마에서 터미널 초기화 요약 카드가 고정 밝은 표면으로 보이는 문제를 테마 변수 기반 표면색으로 수정했다.
- Browser smoke 결과: 전역 `터미널` 클릭 시 `작업 실행` 섹션으로 이동하고 `terminal-drawer.open` 1개, `process-graph` 1개, `session-launcher` 1개가 표시된다. `접기` 후 `terminal-drawer.closed` 1개와 `terminal-drawer-launcher` 1개를 확인했다.
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-runtime-terminal-module/runtime-terminal-drawer-open.png`
