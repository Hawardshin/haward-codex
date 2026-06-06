# 2026-06-06 runtime metric EVAL score 요구사항

## 배경

이전 종합 개선 cockpit은 성능, UI, 기능, 사용성, 디자인, 네이티브 자원 활용을 한 화면에서 비교하도록 만들었다. 다만 점수 source가 아직 정적 계약과 문서 근거 중심이라, desktop process가 실제로 사용하는 CPU/RAM/cache 상태를 점수에 반영해야 한다.

## 요구사항

- REQ-RMES-001: Rust/Tauri runtime snapshot은 process memory, virtual memory, CPU usage, runtime, task/thread count를 renderer로 전달해야 한다.
- REQ-RMES-002: runtime snapshot은 후속 telemetry collector와 맞물릴 수 있도록 semantic metric 이름을 포함해야 한다.
- REQ-RMES-003: EVAL 탭은 runtime telemetry가 있을 때 desktop performance와 native resource lifecycle 점수에 실제 metric을 반영해야 한다.
- REQ-RMES-004: Tauri invoke가 없는 static/browser preview 환경에서도 UI가 깨지지 않고 fallback 상태를 보여야 한다.
- REQ-RMES-005: runtime telemetry surface는 static contract check, unit/integration test, Browser smoke로 검증 가능해야 한다.
- REQ-RMES-006: 구현 후 `check`, `test`, `build`, `package:internal`을 자동 실행한다.

## 비요구사항

- 이번 slice에서 새 external EVAL runner를 설치하지 않는다.
- 이번 slice에서 telemetry persistence DB를 만들지 않는다.
- 이번 slice에서 모든 탭 transition latency를 time-series로 저장하지 않는다.

## 수용 기준

- `DesktopResourceSnapshotReport`에 `semanticMetrics`가 포함된다.
- `EvaluationReportPanel`이 `runtimeTelemetry` prop을 받아 점수와 evidence에 반영한다.
- EVAL UI에 `data-eval-runtime-telemetry`와 `data-runtime-metric` 계약이 존재한다.
- contract check와 tests가 semantic process metric token을 확인한다.
- renderer build와 internal package가 통과한다.
