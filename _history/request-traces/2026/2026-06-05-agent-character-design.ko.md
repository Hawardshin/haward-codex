# 요청 추적: Agent Character Design

## 요청

- 사용자는 에이전트끼리 작업하는 3D 캐릭터 UI의 캐릭터 디자인 개선을 요구했다.

## 결과

- Agents 협업 scene의 `AgentCharacter`에 visor, chest panel, status light, role halo, feet, antenna, ground shadow를 추가했다.
- Tool Studio manual Three.js 캐릭터에도 visor, chest panel, status light, role halo를 추가했다.
- `REQ-WM-072`를 requirements에 추가하고 static test 계약을 갱신했다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-agent-character-design/`
- `_history/evaluations/2026/2026-06-05-agent-character-design.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-agents-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-tools-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-agents-mobile.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-tools-mobile.png`

## 검증

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- Playwright static export desktop/mobile smoke
