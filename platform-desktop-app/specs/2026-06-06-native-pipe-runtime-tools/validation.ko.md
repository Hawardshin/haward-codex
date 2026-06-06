# Validation: Native Pipe Runtime Tools

## 예정 검증

- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`
- `pnpm --dir platform-desktop-app test`
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor collect && pnpm --dir platform-desktop-app/renderer/workspace-monitor check`
- `pnpm --dir platform-desktop-app package:internal`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-cli-pipeline.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-resource.json`

## 결과

- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml native_pipe_probe_connects_producer_stdout_to_consumer_stdin`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과, 1 Rust unit test.
- `pnpm --dir platform-desktop-app test`: 통과, 27 tests.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 88 tests.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor collect && pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `pnpm --dir platform-desktop-app check`: 통과. Public release signing/notarization/updater/clean-machine smoke는 기존 public gate로 남아 있음.
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ../_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-cli-pipeline.json`: `pipeline_ready`.
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-resource.json`: `resource_ready`.
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-omission.json`: `coverage_ready`.
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: `self_documenting`.
- `pnpm --dir platform-desktop-app package:internal`: 통과. Rust test/build, Tauri release build, `.app`/`.dmg`, `codesign --verify --deep --strict`, `hdiutil verify` 포함.

## 산출물

- 내부 `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 주의

- package pipeline에서 generated workspace snapshot 파일이 갱신됐지만 이번 기능 커밋의 직접 source 범위에서는 제외한다.
- public release readiness는 Developer ID signing, notarization, signed updater, clean-machine smoke가 아직 blocker/warning으로 남아 있다.
