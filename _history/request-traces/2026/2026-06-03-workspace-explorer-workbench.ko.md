# 요청-결과 추적: 작업공간 Explorer Workbench

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-043`
- 소유 프로젝트: `platform-desktop-app/`
- 렌더러: `platform-desktop-app/renderer/workspace-monitor/`
- 작업 모드: `quick`

## 요청 요약

사용자는 파일시스템을 앱으로 끌어와 그 위에 파일을 올려 처리하는 느낌이 UI에 없고, VS Code 왼쪽 Explorer 같은 역할이 필요하다고 지적했다. 기존 사용성이 너무 불편하므로 VS Code식 구조 도입을 고려해 실제 화면을 개선하라고 요청했다.

## 결과

- `파일/코드` 화면을 `filesystem-workbench-shell`로 감싸고 좌측 `workspace-explorer-pane`, 우측 `filesystem-editor-pane` 구조로 바꿨다.
- Explorer pane에 `작업공간 Explorer`, `파일을 이 플랫폼으로 올리기` dropzone, 작업공간 상태, 파일 검색, 파일/폴더 count, 파일 트리, 빈 workspace placeholder를 추가했다.
- `WorkspaceSourceFile.path`를 디렉터리 트리로 변환하는 `buildWorkspaceExplorerTree`와 recursive `WorkspaceExplorerDirectoryView`를 추가했다.
- 기존 source panel 안의 `source-file-browser`는 숨겨 파일 목록이 두 군데에서 중복되지 않게 했다.
- 오른쪽 editor panel heading은 `파일시스템을 끌어와서 처리하기`로 바꿔 작업공간 Explorer와 editor의 관계가 보이게 했다.
- readiness script와 Node test가 Explorer shell/token을 검증하게 했다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/public/workspace-snapshot.json`
- `platform-desktop-app/renderer/workspace-monitor/src/generated/workspace-snapshot.json`
- `platform-desktop-app/artifacts/2026-06-03-workspace-explorer-workbench/filesystem-explorer-workbench.png`
- `_history/web-searches/2026/2026-06-03-workspace-explorer-workbench.ko.md`
- `_history/evaluations/2026/2026-06-03-workspace-explorer-workbench.ko.md`

## 검증

- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `git diff --check`: passed before records
- Browser static-build smoke: activity rail 1개, desktop sidebar 0개, Explorer pane 1개, 내부 `source-file-browser` hidden, shell 2열 layout, dropzone/tree text 확인

## 잔여 위험

- Customer static build는 source payload를 제거하므로 실제 파일 트리는 Tauri runtime의 `list_workspace_text_files`가 반환할 때 채워진다. 정적 smoke에서는 Explorer 빈 상태와 layout을 검증했다.
- 이 변경은 VS Code OSS 자체를 통째로 임베드한 것이 아니라, 현재 제품 renderer 위에 VS Code식 Explorer/workbench 구조를 적용한 것이다. 더 깊은 VS Code/Theia 통합은 별도 dependency/license/security/install audit가 필요한 후속 slice다.
