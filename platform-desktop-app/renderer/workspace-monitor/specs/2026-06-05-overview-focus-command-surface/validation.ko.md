# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과
- `corepack pnpm --filter workspace-monitor run perf:budget` 통과

## Browser smoke

- in-app Browser desktop에서 Overview의 `data-home-focus-command`, `data-home-focus-card`, `data-home-navigation-dock` 표시를 확인했다.
- desktop에서 focus command가 작업 dock과 status strip보다 먼저 표시되고, 추천 card intent가 `build-tool`, flow step 3개, target intent 6개, 수평 overflow 0임을 확인했다.
- Playwright mobile 390x844에서 focus command/dock/status strip 표시, card intent `build-tool`, flow step 3개, target intent 6개, body/viewport 폭 390px, 수평 overflow 0, primary action 높이 48px를 확인했다.

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-overview-focus-command-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-overview-focus-command-mobile.png`
