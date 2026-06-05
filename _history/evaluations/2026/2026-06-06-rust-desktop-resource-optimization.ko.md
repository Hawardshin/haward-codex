# 평가: Rust 데스크톱 자원 최적화

## 판정

요청 충족. 단순 렌더 최적화가 아니라 Rust/Tauri 프로세스에서 CPU parallelism과 OS memory telemetry를 사용하도록 source workspace cache 경로를 바꿨고, 내부 패키징 빌드까지 완료했다.

## 증거

- `rayon` 기반 bounded parallel worker pool 추가.
- `sysinfo` 기반 total/available/used memory, memory budget report 추가.
- preload 상한을 2,048 files / 512MB hard cap으로 확장하고 available memory 기반 budget을 적용.
- renderer UI에 worker 수, free RAM, CPU 병렬 수, native duration 표시.
- readiness와 workspace-monitor test가 새 Rust resource contract를 확인.

## 검증

- `cargo info rayon@1.12.0`: license/rust-version 확인.
- `cargo info sysinfo@0.39.3`: license/rust-version 확인.
- `cargo tree --manifest-path platform-desktop-app/src-tauri/Cargo.toml -i sysinfo -e features`: 통과.
- `cargo tree --manifest-path platform-desktop-app/src-tauri/Cargo.toml -i rayon -e features`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.

## 평가 입력

- `installation_occurred`: true
- `installation_record_targets`: `_history/installations/2026/2026-06-06-rust-desktop-resource-optimization-rust-crates.ko.md`
- `resource_risk_occurred`: true
- `resource_check_targets`: `_history/resource-checks/2026/2026-06-06-rust-desktop-resource-optimization.json`
- `omission_check_targets`: `_history/omission-checks/2026/2026-06-06-rust-desktop-resource-optimization.json`

## 남은 리스크

- file watcher는 아직 없다.
- 실제 사용자 workspace의 탭 전환 체감 latency는 새 native telemetry를 보며 추가 측정해야 한다.
