# Request Trace: Workbench Split Density

- 요청 ID: `UR-2026-06-03-054`
- 사용자 요청 요약: 직전 desktop app UX 개선을 계속 진행하라고 요청했다.
- 해석: 과한 UI/긴 scroll/웹앱 같은 구조 개선의 다음 slice로, terminal drawer와 Workspace Explorer의 split density를 개선한다.

## Outcome

- 하단 다중 CLI 터미널 내부를 `terminal-drawer-sidebar`와 `terminal-drawer-main`으로 분리했다.
- terminal status, process graph, view switcher는 왼쪽 rail로 이동했고 session start/list/output/events content는 main pane에 남겼다.
- terminal 주요 카피를 한국어 우선으로 정리했다.
- Workspace Explorer 상단 permission/action/state/search 영역의 padding과 hierarchy를 낮춰 file tree 공간을 늘렸다.
- readiness/test가 새 split drawer structure token을 검증하도록 바꿨다.

## Artifacts

- `platform-desktop-app/docs/requirements/2026-06-03-workbench-split-density.ko.md`
- `platform-desktop-app/specs/2026-06-03-workbench-split-density/`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## Verification

- TypeScript check: 통과
- Platform tests: 통과
- Platform check: 통과
- Customer build: 통과
- Final platform check: 통과
