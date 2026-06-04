# 요청-결과 추적: Source Loading Performance

## 요청

- summary: 코드 불러오기 쪽이 느린 문제를 해결한다.
- user_request_summary: `_history/user-requests/2026/2026-06-05-source-loading-performance.ko.md`

## 결과

- Desktop runtime surface에서 불필요하게 source catalog scan이 실행되던 경로를 Source surface로 제한했다.
- Source surface에서 왼쪽 Explorer와 오른쪽 flat file browser가 같은 파일 목록을 중복 렌더링하던 구조를 제거했다.
- Source surface 기본 view를 editor로 전환해 파일 선택은 Explorer가 담당하고 오른쪽은 코드 편집/저장 결과에 집중한다.
- Explorer tree는 최상위만 기본 expanded로 두고 하위 directory는 사용자가 펼칠 때 렌더링한다.
- source filter는 deferred value로 처리한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/WorkspaceExplorerPane.tsx`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-source-loading-performance/`

## 검증

- passed: `pnpm run check`
- passed: `pnpm test`
- passed: `pnpm exec next build`
- passed: `pnpm run perf:budget`
- passed: localhost smoke on `http://localhost:3211`

## Commit

- planned_message: `fix(source): speed up code loading surface`
