# 작업 요약: Rust Runtime Feature Split

날짜: 2026-06-06

Tauri Rust runtime에 기능별 source root `src-tauri/src/features/`를 추가하고, app shell, CLI orchestration, native process control, workspace host, provider accounts, diagnostics/data, agent factory, decision inbox로 나눴다. 새 read-only command `get_rust_runtime_feature_map`은 기능별 module, command, risk boundary, follow-up을 반환한다.

Desktop Runtime diagnostics에는 Rust module count와 command count를 표시한다. 기존 command는 이동하지 않고 유지해 regression을 줄였고, 다음 source 이동의 기준선을 마련했다.
