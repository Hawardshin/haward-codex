# 추적: runtime metric EVAL score

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| REQ-RMES-001 process runtime snapshot | `DesktopResourceSnapshotReport` process fields and shared snapshot state | `cargo check`, readiness test |
| REQ-RMES-002 semantic metric names | `semanticMetrics` with `process.memory.usage`, `process.cpu.utilization`, `process.thread.count` | contract check, readiness test |
| REQ-RMES-003 EVAL 점수 반영 | `nativeRuntimeScore`, runtime memory/cpu/cache scoring | workspace-monitor test, Browser smoke |
| REQ-RMES-004 preview fallback | `runtime.preview` fallback row | Browser smoke |
| REQ-RMES-005 계약 검증 | `data-eval-runtime-telemetry`, `data-runtime-metric`, CSS/test tokens | contract check and tests |
| REQ-RMES-006 build/package 자동 실행 | renderer build and `package:internal` | validation record |

## 연결 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-runtime-metric-eval-score.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-runtime-metric-eval-score.ko.md`
- 연구 노트: `_research/topics/platform-desktop-app/2026-06-06-runtime-metric-eval-score.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-runtime-metric-eval-score.ko.md`
