# Request Trace: Existing Search Agent Run

## Request

- `UR-2026-06-04-003`

## 요구 및 해석

- 사용자는 에이전트 실행을 쉽게 하고 싶고, 이미 만들어둔 검색 에이전트를 사용하고 싶다고 했다.
- 구현 해석: `agent-platform/configs/agents/research-insight-planner-agent.json`를 데스크톱 앱의 runnable preset으로 노출하고, 클릭하면 하단 터미널 lane에서 실행되게 한다.

## Implementation Targets

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/docs/requirements/2026-06-04-existing-search-agent-run.*.md`
- `platform-desktop-app/specs/2026-06-04-existing-search-agent-run/`

## Outcome

- Agents 화면 최상단에 `SearchAgentQuickRunPanel`을 추가했다.
- 검색 에이전트 입력은 목표, 검색 질문, 검색 채널, 저장 위치, 메모로 구성된다.
- `renderSearchAgentPrompt`가 기존 `research-insight-plan-template`에 맞는 초기 입력을 생성한다.
- Desktop quick start와 command palette에서도 검색 에이전트를 실행할 수 있다.
- Tauri `start_cli_adapter_session`이 optional `taskKind`를 받아 `research_insight_agent` 실행 기록을 남긴다.
- `research_insight_agent_pipe`가 검색/출처 ranking/grounding review lane을 제공한다.

## Validation Targets

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `cargo check`
- JSON parse/config contract checks
- `PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/research-insight-planner-agent.json`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- Browser smoke
