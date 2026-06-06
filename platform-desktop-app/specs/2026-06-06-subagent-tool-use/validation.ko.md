# Validation: Subagent Tool Use

## 현재 완료

- `node -e JSON.parse(...)`: registry JSON 파싱 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/tool-usage-integration-registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli plan-agent-orchestration configs/orchestration/manager-tool-plan-template.json`: `ready_to_orchestrate`
- `PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm -w run desktop:renderer:build`: 통과, customer bundle audit 통과
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml runtime_feature_map_groups_commands_by_native_capability`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과
- `corepack pnpm --dir platform-desktop-app run check`: 통과, public release 관련 기존 외부 credential warning만 유지
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-06-subagent-tool-use.json`: `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-06-subagent-tool-use.json`: `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-06-subagent-tool-use-input.json`: `ready_to_close`
- Browser smoke:
  - `http://127.0.0.1:3224/#section-tools`
  - `subagent-delegation-loop` button 표시 확인
  - click 후 detail panel에 `multi_agent_v1.spawn_agent`, `multi_agent_v1.wait_agent`, `multi_agent_v1.close_agent`, `agent-platform:plan-agent-orchestration` 표시 확인
  - `http://127.0.0.1:3224/#section-desktop`
  - `data-terminal-agent-action="plan-subagents"` 버튼 표시, Tauri runtime 없는 browser preview에서는 disabled 확인
  - dev server 종료 후 `lsof -nP -iTCP:3224 -sTCP:LISTEN` listener 없음 확인

## 남은 검증

- `git diff --check`
- commit/push

## 알려진 경계

- Browser preview는 Tauri command를 직접 실행할 수 없다. 실제 `run_subagent_tool_plan` 실행은 desktop runtime에서 수행된다.
- 이번 slice는 subagent plan 생성과 task-run 기록까지이며, autonomous subagent execution runtime은 만들지 않는다.
