# 요청 추적: Workspace Explorer Module

## 요청

- 요청 ID: `UR-2026-06-03-046`
- 요약: 대공사를 계속 진행하고 부족한 부분을 개선한다.

## 구현

- `WorkspaceExplorerPane.tsx`를 추가해 `파일/코드` 화면의 Explorer pane, dropzone, file search, meta strip, empty tree, recursive directory/file renderer를 분리했다.
- Explorer tree builder와 directory count 계산을 새 component module로 이동했다.
- `MonitorShell.tsx`는 `WorkspaceExplorerPane`에 상태와 action props를 전달하고 editor/runtime command state를 유지한다.
- `check-readiness.mjs`와 `readiness.test.mjs`가 새 workbench component source를 포함하도록 갱신했다.
- 브라우저 스모크 중 확인한 밝은 상태 카드/dropzone/toolbar/empty state를 테마 변수 기반 표면색으로 수정했다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 17 tests 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 17 tests 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- Browser smoke: Explorer pane 1개, tree 1개, dropzone 1개, 내부 file browser hidden, activity rail 1개, desktop sidebar 0개, 다크 표면색 확인
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-workspace-explorer-module/workspace-explorer-module.png`

## 결과

- `slice-02-workspace-explorer-module` 완료.
- 다음 slice는 `slice-03-runtime-terminal-module`이다.
