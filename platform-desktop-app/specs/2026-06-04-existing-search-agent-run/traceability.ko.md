# 추적: 기존 검색 에이전트 실행

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-PDA-066 | `SearchAgentWorkChatPanel`, `run-search-agent` command item | readiness test, browser smoke |
| REQ-PDA-067 | `renderSearchAgentPrompt` | TypeScript check, readiness token |
| REQ-PDA-068 | `RuntimeLaunchRequest`, `start_cli_adapter_session(taskKind)`, `research_insight_agent` | Rust `cargo check`, task-run readiness assertions |
| REQ-PDA-069 | Agents 화면에서 work chat panel을 Agent Factory보다 먼저 렌더링 | browser smoke, source review |
| REQ-PDA-070 | Desktop quick start, command palette entry | browser smoke, readiness token |
| REQ-PDA-071 | `SearchAgentChatMessage`, `agent-chat-thread`, `작업 시작` composer | browser smoke, readiness token |

## 관련 파일

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
