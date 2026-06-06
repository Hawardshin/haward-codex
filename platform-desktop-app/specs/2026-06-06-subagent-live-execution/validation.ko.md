# Validation: Subagent Live Execution

## 완료

- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml subagent_cli_execution_prompt_keeps_manager_boundaries`: 통과
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml runtime_feature_map_groups_commands_by_native_capability`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과
- `corepack pnpm -w run desktop:renderer:build`: 통과, customer bundle audit 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과, developer snapshot 복원
- `corepack pnpm --dir platform-desktop-app run check`: 통과, public release signing/updater/clean-machine smoke warning은 기존 public gate로 유지
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-06-subagent-live-execution.json`: `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-06-subagent-live-execution.json`: `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-06-subagent-live-execution-input.json`: `ready_to_close`
- Browser smoke:
  - `http://127.0.0.1:3224/#section-desktop`
  - `data-terminal-agent-bridge="pty-to-agent"` 표시 확인
  - `data-terminal-agent-action="plan-subagents"` 버튼 표시 및 browser preview에서 disabled 확인
  - `data-terminal-agent-action="execute-subagent"` 버튼 표시 및 browser preview에서 disabled 확인
  - `data-desktop-action-feedback="execute-subagent-tools"` 표시 확인
  - dev server 종료 후 `lsof -nP -iTCP:3224 -sTCP:LISTEN` listener 없음 확인

## 남은 검증

- `git diff --check`

## 알려진 경계

- Browser preview는 Tauri command를 직접 실행할 수 없다. 실제 process execution은 desktop runtime에서 확인해야 한다.
- 이번 slice는 저장된 plan의 단일 tool 실행만 지원한다. 병렬 실행, 자동 merge, patch 적용은 후속 slice다.
