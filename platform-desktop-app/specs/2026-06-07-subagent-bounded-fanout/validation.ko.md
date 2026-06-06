# Validation: Subagent Bounded Fan-Out

## 완료

- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml subagent_cli_fanout_prompt_keeps_merge_gate_boundaries`: 통과
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml subagent_fanout_tool_selection_rejects_unknown_tools`: 통과
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml runtime_feature_map_groups_commands_by_native_capability`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 90 tests
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과, developer snapshot 갱신
- `corepack pnpm -w run desktop:renderer:build`: 통과, customer bundle 생성
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 통과, developer snapshot 복원
- `corepack pnpm --dir platform-desktop-app run check`: 통과, 기존 public release warning만 유지
- Browser smoke `http://127.0.0.1:3224/#section-desktop`: 통과
  - `[data-terminal-agent-bridge="pty-to-agent"]`: 존재
  - `[data-terminal-agent-action="fanout-subagents"]`: 존재
  - `[data-desktop-action-feedback="fanout-subagent-tools"]`: 존재
  - 버튼 문구: `첫 2개 묶음 실행`
  - preview 환경에서는 native runtime과 plan이 없어 disabled 상태가 정상이다.
- `PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-07-subagent-bounded-fanout-cli-pipeline.json`: 통과, `pipeline_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-07-subagent-bounded-fanout.json`: 통과, `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-07-subagent-bounded-fanout.json`: 통과, `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-07-subagent-bounded-fanout-input.json`: 통과, `ready_to_close`
- `git diff --check`: 통과

## 알려진 경계

- Browser preview는 Tauri command를 직접 실행하지 못하므로 UI contract만 smoke한다.
- 실제 packaged runtime smoke는 별도 내부 앱 실행 환경에서 더 강하게 닫을 수 있다.
