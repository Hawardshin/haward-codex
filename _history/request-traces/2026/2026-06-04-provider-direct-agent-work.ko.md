# Request Trace: Provider Direct Agent Work

## Request

- `UR-2026-06-04-007`

## 요구 및 해석

- 사용자는 연결된 Gemini, Claude, ChatGPT 계정이 단순 로그인/연결 상태가 아니라 실제 작업 실행에 사용되어야 한다고 요구했다.
- 구현 해석: 검색 에이전트 작업 채팅에서 연결된 provider account와 model을 선택하고, 외부 CLI 없이 provider API를 직접 호출해 작업 결과를 만들며, 그 결과를 task-run store에 저장한다.

## Implementation Targets

- `platform-desktop-app/src-tauri/Cargo.toml`
- `platform-desktop-app/src-tauri/Cargo.lock`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/configs/service-readiness-registry.json`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- `platform-desktop-app/scripts/check-service-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-04-provider-direct-agent-work.*.md`
- `platform-desktop-app/specs/2026-06-04-provider-direct-agent-work/`
- `_history/installations/2026/2026-06-04-provider-direct-api-reqwest.ko.md`
- `_ops/installations/registry.json`

## Outcome

- `run_provider_agent_task` Tauri command를 추가했다.
- OpenAI, Anthropic, Gemini direct API 호출 함수를 provider별로 분리했다.
- Search Agent Work Chat에 provider account selector, model input, direct/fallback status를 추가했다.
- 연결된 provider credential이 있으면 작업 채팅의 `작업 시작`이 provider API 직접 실행을 우선한다.
- 직접 실행 결과는 채팅 메시지로 표시되고 task-run store에 저장된다.
- provider 직접 실행 실패 또는 계정 미연결 시 optional CLI lane으로 fallback한다.

## Validation Targets

- `cargo check`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- JSON parse checks
- Config contract checks
- `git diff --check`
- Browser smoke for Search Agent Work Chat provider controls

## Artifacts

- Screenshot: `outputs/provider-direct-agent-controls-smoke.png`
- Web search record: `_history/web-searches/2026/2026-06-04-provider-direct-agent-work.ko.md`
- Installation record: `_history/installations/2026/2026-06-04-provider-direct-api-reqwest.ko.md`
