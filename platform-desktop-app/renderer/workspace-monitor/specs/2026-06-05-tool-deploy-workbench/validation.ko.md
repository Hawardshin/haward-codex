# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과

## Browser smoke

- in-app Browser desktop: Tools 화면에서 `툴 배포` mode를 열고 `data-tool-deploy-workbench` 표시를 확인했다.
- in-app Browser desktop: target 3개, release/preflight/guardrails/rollback 영역, action 4개를 확인했다.
- in-app Browser desktop: AgentCore Gateway target 선택 후 `--tool-schema-file`, credential, rollback 문구 전환을 확인했다.
- in-app Browser desktop: 수평 overflow 0을 확인했다.
- Playwright mobile 390x844: target/canvas/action 영역이 모두 한 열로 접히고 수평 overflow 0임을 확인했다.

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-tool-deploy-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-tool-deploy-mobile.png`
