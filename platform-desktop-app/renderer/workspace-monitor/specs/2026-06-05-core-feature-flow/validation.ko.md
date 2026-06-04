# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build:customer`

## Browser smoke

- Overview `build-tool` 클릭 후 Tool Studio 이동
- `[data-task-flow-step='venv']` 클릭 후 `[data-tool-studio-mode='environment']` 확인
- `[data-task-flow-step='deploy']` 클릭 후 `[data-tool-studio-mode='deploy']` 확인
- 현재 step에 `aria-current='step'` 표시
- desktop/mobile 수평 overflow 0

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-core-flow-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-core-flow-mobile.png`
