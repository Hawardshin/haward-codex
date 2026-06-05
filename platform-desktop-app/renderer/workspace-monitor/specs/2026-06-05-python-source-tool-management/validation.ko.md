# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과
- `corepack pnpm --filter workspace-monitor run perf:budget` 통과

## Browser smoke

- in-app Browser desktop에서 Tools 화면의 `툴 만들기` mode와 `data-tool-python-source-manager` 표시를 확인했다.
- in-app Browser desktop에서 source target 4개, pyproject, entry point, checklist, init command, action 3개, 수평 overflow 0을 확인했다.
- visual QA 중 checklist가 3열로 좁아져 한국어가 세로로 깨지는 문제를 발견했고, checklist를 한 열로 바꾼 뒤 재검증했다.
- cache-busting URL 재검증에서 desktop source manager layout은 `217.031px 196.359px`, checklist item 최소 폭 174px, 최대 높이 48px, 수평 overflow 0이었다.
- Playwright mobile 390x844에서 source manager 1열 접힘, checklist 1열, body/viewport 폭 390px, 수평 overflow 0, action 높이 48px를 확인했다.

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-python-source-tool-management-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-python-source-tool-management-mobile.png`
