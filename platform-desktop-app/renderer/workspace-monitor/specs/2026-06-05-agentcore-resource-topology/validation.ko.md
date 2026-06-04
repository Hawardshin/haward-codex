# 검증 기록

## 명령

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과

## Browser smoke

- in-app Browser desktop: Agents 화면에서 AgentCore Quick Builder disclosure를 열고 `[data-agentcore-resource]` 9개를 확인했다.
- in-app Browser desktop: 전체 capability 선택 후 Runtime, Memory, Gateway, Built-in Tools, Identity, Policy, Observability, Evaluations 텍스트를 확인했다.
- in-app Browser desktop: selected capability 9개, resource card 9개, 수평 overflow 0을 확인했다.
- Playwright mobile 390x844: resource card 9개, resource grid 1열, lifecycle 2열, 수평 overflow 0을 확인했다.

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agentcore-topology-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agentcore-topology-mobile.png`
