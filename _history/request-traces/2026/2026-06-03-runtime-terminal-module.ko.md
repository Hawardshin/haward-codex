# 요청 추적: Runtime Terminal Module

## 요청

- 요청 ID: `UR-2026-06-03-047`
- 요약: 대공사를 계속 진행하고 부족한 부분을 개선한다.

## 구현

- `RuntimeTerminalDrawer.tsx`를 추가해 하단 다중 CLI 터미널 drawer, launcher, run-board strip, process graph, session launcher, session list/output/input UI를 분리했다.
- `MonitorShell.tsx`는 terminal drawer에 필요한 state와 action props를 전달하고 runtime command/polling/decision 로직을 유지한다.
- `check-readiness.mjs`와 `readiness.test.mjs`가 새 workbench component source를 포함하도록 갱신했다.
- 다크 테마에서 `settings-controlled-summary`가 고정 밝은 표면으로 보이는 문제를 theme variable 기반 표면으로 수정했다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 17 tests 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 17 tests 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과
- `git diff --check`: 통과
- Browser smoke: 전역 `터미널` 클릭으로 `작업 실행` 섹션 전환, `terminal-drawer.open` 1개, `process-graph` 1개, `session-launcher` 1개 확인. `접기` 후 `terminal-drawer.closed` 1개와 `terminal-drawer-launcher` 1개 확인.
- Screenshot: `platform-desktop-app/artifacts/2026-06-03-runtime-terminal-module/runtime-terminal-drawer-open.png`

## 결과

- `slice-03-runtime-terminal-module` 완료.
- 다음 slice는 `slice-04-agent-factory-module`이다.
