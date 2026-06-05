# 요청-결과 추적: Rust 데스크톱 자원 최적화

## 요청

Rust를 최대한 활용하고 데스크톱 CPU/RAM 자원을 실제로 사용해 탭 전환과 source workspace 준비를 최적화하라는 요청.

## 결과

- Rust `WorkspaceResourceProfile` 추가.
- `rayon` bounded worker pool로 entry build와 preload read 병렬화.
- `sysinfo` 기반 memory budget과 resource telemetry 추가.
- renderer source workspace UI와 tests 업데이트.
- 내부 패키징 빌드 통과.

## 산물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-06-rust-desktop-resource-optimization.ko.md`
- `platform-desktop-app/specs/2026-06-06-rust-desktop-resource-optimization/`
- `_history/installations/2026/2026-06-06-rust-desktop-resource-optimization-rust-crates.ko.md`

## 검증

- `cargo tree --manifest-path platform-desktop-app/src-tauri/Cargo.toml -i sysinfo -e features`
- `cargo tree --manifest-path platform-desktop-app/src-tauri/Cargo.toml -i rayon -e features`
- `corepack pnpm --dir platform-desktop-app run package:internal`
