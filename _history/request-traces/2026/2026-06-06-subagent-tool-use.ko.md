# 요청 결과 추적: Subagent Tool Use

날짜: 2026-06-06

## 요청

agent/subagent를 사용할 수 있는 tool 기능.

## 결과

- `subagent-delegation-loop`를 Tool Studio source-backed playbook에 추가.
- `run_subagent_tool_plan` Tauri command 추가.
- command가 `agent-platform:plan-agent-orchestration`을 실행하고 task-run record/stdout/stderr/input을 app-data runtime store에 저장.
- Desktop Runtime bridge에 `서브에이전트 툴 계획` 버튼과 최근 결과 요약 추가.

## 주요 산출물

- `platform-desktop-app/configs/tool-usage-integration-registry.json`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/src-tauri/src/features/agent_factory.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증

- `check-config-contract`
- `plan-agent-orchestration`
- `check-agent-orchestration`
- `workspace-monitor check/test`
- `desktop:renderer:build`
- `cargo check`
- Rust feature-map test
- Playwright Browser smoke
- resource/omission guard
- evaluate-work
- platform-desktop-app check
