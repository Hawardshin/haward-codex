# Evaluation: Native Pipe Runtime Tools

## 결과

- 상태: complete
- 요청: 파이프와 터미널 직접 제어에 필요한 강력한 네이티브 도구/기능 추가.
- 구현: `os_pipe@1.2.3` project-local Rust dependency를 추가하고, Rust/Tauri command `run_native_pipe_probe`로 producer stdout을 consumer stdin에 직접 OS pipe로 연결하는 bounded probe 실행 계층을 추가했다.

## 주요 산출물

- `platform-desktop-app/src-tauri/Cargo.toml`
- `platform-desktop-app/src-tauri/Cargo.lock`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `_history/installations/2026/2026-06-06-native-pipe-runtime-tools-os-pipe.ko.md`
- `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-cli-pipeline.json`
- `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-resource.json`
- `_history/evaluations/2026/2026-06-06-native-pipe-runtime-tools-omission.json`

## 검증

- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml native_pipe_probe_connects_producer_stdout_to_consumer_stdin`: 통과.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `pnpm --dir platform-desktop-app test`: 통과.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor collect && pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `pnpm --dir platform-desktop-app check`: 통과.
- `check-cli-pipeline`: `pipeline_ready`.
- `check-resources`: `resource_ready`.
- `check-omissions`: `coverage_ready`.
- `check-config-contract ../_ops/installations/registry.json`: `self_documenting`.
- `pnpm --dir platform-desktop-app package:internal`: 통과.

## 리스크/주의

- `run_native_pipe_probe`는 첫 실행 기반이다. 장기 multi-lane supervisor UI, persistent task-run artifact promotion, per-adapter permission UI는 후속 slice다.
- public release readiness는 기존처럼 Developer ID signing, notarization, signed updater, clean-machine smoke가 남아 있다.
- generated snapshot 파일은 package/collect 검증으로 갱신됐지만 이번 기능 커밋에서는 제외한다.

## 평가

요청 범위는 충족됐다. `portable-pty`는 기존 interactive terminal 기반으로 유지하고, `os_pipe`로 명시적 OS pipe process graph 실행 기반을 보강했다. 구현은 shell string을 만들지 않고 argv/cwd/timeout/output-bound/process cleanup 계약을 갖는다.
