# 추적: Rust 데스크톱 자원 최적화

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| Rust와 OS 자원 적극 사용 | `WorkspaceResourceProfile`, `rayon` bounded thread pool, `sysinfo` memory telemetry | readiness test, workspace-monitor test, package build |
| 탭 이동 전 source data 준비 | 기존 warmup/cache 경로에 parallel preload와 expanded budget 적용 | package build와 Rust tests |
| 메모리 실제 사용 | `memory_budget_bytes`, 2,048 file / 512MB hard cap, available RAM clamp | UI telemetry test, resource check |
| CPU 사용 | `parallel_workers`, Rayon `par_iter` entry/preload path | tool-studio test native contract |
| 완료 후 빌드 | `package:internal` 실행 | `.app`/`.dmg` 생성 및 verify |

## 연결 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-rust-desktop-resource-optimization.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-rust-desktop-resource-optimization.ko.md`
- 설치 기록: `_history/installations/2026/2026-06-06-rust-desktop-resource-optimization-rust-crates.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-rust-desktop-resource-optimization.ko.md`
