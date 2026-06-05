# 요청-결과 추적: Agents Detail Single Workspace

- 날짜: 2026-06-05
- 요청 요약: UI 개선을 끝까지 계속한다.
- 이번 결과: Agents 세부 기능을 한 화면에 모두 쌓지 않고, 선택된 하나의 세부 작업면만 렌더링하게 바꿨다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-agent-detail-single-workspace/`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-detail-switcher-mobile.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-detail-builder-mobile.png`

## 검증

- test, tsc, check, build, perf:budget
- in-app Browser smoke
- mobile Playwright smoke
