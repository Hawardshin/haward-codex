# Request Trace: Agent Chat Workbench

## Request

- `UR-2026-06-04-004`

## 요구 및 해석

- 사용자는 검색 에이전트 채팅창이 나오면 그곳에서 실제 작업이 이루어져야 한다고 했다.
- 구현 해석: 검색 에이전트 표면을 실행 폼에서 작업 채팅으로 바꾸고, 채팅 composer의 `작업 시작`이 하단 터미널 lane과 task-run store를 연결하는 시작점이 되게 한다.

## Implementation Targets

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/docs/requirements/2026-06-04-existing-search-agent-run.*.md`
- `platform-desktop-app/specs/2026-06-04-existing-search-agent-run/`

## Outcome

- `SearchAgentWorkChatPanel`이 채팅 thread, composer, 작업 컨텍스트, agent/schema 계약을 제공한다.
- `SearchAgentChatMessage` 상태가 사용자의 작업 시작과 런타임 연결 메시지를 기록한다.
- command palette와 Desktop quick start의 검색 에이전트 버튼은 작업 채팅으로 진입한다.
- `작업 시작`은 기존 `research_insight_agent` 런타임 세션을 시작하고 하단 터미널 drawer를 연다.

## Validation Targets

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- JSON parse/config contract checks
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- Browser smoke for Agents work chat
