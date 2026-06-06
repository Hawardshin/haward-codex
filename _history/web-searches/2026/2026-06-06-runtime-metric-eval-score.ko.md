# 2026-06-06 runtime metric EVAL score 웹 검색 기록

## 요청

- 사용자가 미뤄둔 작업 진행을 요청했다.
- 이전 완료 기록의 잔여 위험 중 "종합 점수가 실제 runtime metric과 약하게 연결되어 있음"을 다음 구현 slice로 선택했다.

## 검색 쿼리

- `Tauri v2 state manager commands process lifecycle official docs`
- `Tauri v2 shell plugin process sidecar official docs`
- `Playwright performance long tasks web vitals official docs`
- `OpenTelemetry semantic conventions process metrics official docs`

## 확인한 출처

- Tauri process model: https://tauri.app/concept/process-model/
- Tauri shell plugin: https://v2.tauri.app/plugin/shell/
- MDN PerformanceLongTaskTiming: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
- OpenTelemetry process metrics semantic conventions: https://opentelemetry.io/docs/specs/semconv/system/process-metrics/

## 약한 출처와 제외

- 개인 블로그의 Electron/Tauri 성능 비교 글은 환경별 편차가 커서 구현 근거로 쓰지 않았다.
- 벤치마크 수치만 있는 홍보성 글은 현재 앱의 실제 process metric 연결 문제를 해결하지 못해 제외했다.

## 계획 영향

- Tauri의 process boundary를 유지하되 Rust command에서 process memory, CPU, task count를 샘플링해 renderer 평가 탭에 전달한다.
- OpenTelemetry의 process metric 명명 관례를 참고해 `process.memory.usage`, `process.memory.virtual`, `process.cpu.utilization`, `process.thread.count` 형태의 semantic metric을 report에 포함한다.
- Browser 환경에서는 Tauri invoke가 없을 수 있으므로 fallback preview row를 유지하고, 실제 desktop runtime에서는 native sampled metric으로 전환한다.

## 불확실성

- 이번 slice는 현재 process snapshot 기반이다. 탭 전환 latency, long task, 지속적인 time-series 저장은 후속 telemetry runner가 필요하다.
- OS별 process task/thread 의미는 `sysinfo` 제공 값에 의존하므로 cross-platform 비교에는 normalization이 더 필요하다.

## 공개 결정 요약

실제 OS resource를 쓰라는 기존 요구를 EVAL surface에 반영하기 위해, 브라우저 추정 점수만 두지 않고 Rust/Tauri runtime snapshot을 종합 개선 점수의 입력으로 연결한다.
