# 검증: 런타임 리소스 누수 하드닝

## 명령

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml --check`
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml`
- `cargo build --manifest-path platform-desktop-app/src-tauri/Cargo.toml`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run monitor:build`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-resource-leak-hardening-resource-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-resource-leak-hardening-omission-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-resource-leak-hardening-evaluation-input.json`

## 결과

- `npm --prefix workspace-monitor test`: 통과, 16개 테스트 pass.
- `npm --prefix workspace-monitor run check`: 통과.
- `cargo fmt --manifest-path platform-desktop-app/src-tauri/Cargo.toml --check`: 통과.
- `cargo test --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `cargo build --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `npm --prefix workspace-monitor run build`: 통과.
- `npm --prefix workspace-monitor run perf:budget`: 통과, largest initial chunk 227537 bytes.
- `npm --prefix platform-desktop-app test`: 통과, 13개 테스트 pass.
- `npm --prefix platform-desktop-app run monitor:build`: 통과, customer bundle audit pass.
- `npm --prefix platform-desktop-app run check`: 통과.
- `npm --prefix workspace-monitor run check:intent-map`: 통과.
- `npm --prefix workspace-monitor run check:intent-map:customer`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-resource-leak-hardening-resource-input.json`: `resource_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-resource-leak-hardening-omission-input.json`: `coverage_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-resource-leak-hardening-evaluation-input.json`: `ready_to_close`.
