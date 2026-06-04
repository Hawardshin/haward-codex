# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과

## Browser smoke

- in-app Browser desktop: Tools 화면에서 `파이썬 환경` mode를 열고 `data-tool-venv-manager` 표시를 확인했다.
- in-app Browser desktop: lifecycle step 5개, action 3개, freeze command/evidence, rebuild command/evidence, 수평 overflow 0을 확인했다.
- Playwright mobile 390x844: venv heading/steps/actions가 모두 한 열로 접히고 수평 overflow 0, action 최소 높이 48px임을 확인했다.

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-virtual-environment-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-virtual-environment-mobile.png`
