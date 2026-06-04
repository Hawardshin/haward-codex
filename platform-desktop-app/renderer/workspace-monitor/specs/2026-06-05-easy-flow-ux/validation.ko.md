# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build:customer`

## Browser smoke

- Overview `build-tool` 클릭 후 `#section-tools`로 이동
- `[data-task-handoff='build-tool']` 1개 표시
- `.task-flow-rail li` 3개 표시
- desktop 단계: `소스 선택`, `입력과 venv 확인`, `검증 후 배포`
- desktop 수평 overflow 0
- 390px mobile 단계 레일 1열 표시, 수평 overflow 0

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-easy-flow-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-easy-flow-mobile.png`
