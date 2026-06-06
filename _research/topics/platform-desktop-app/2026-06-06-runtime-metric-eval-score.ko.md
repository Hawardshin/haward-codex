# Runtime Metric EVAL Score 연구 노트

## 목적

`platform-desktop-app`의 EVAL 탭이 문서/계약 기반 점수뿐 아니라 현재 desktop process의 CPU/RAM/cache metric을 반영하도록 만든다.

## 핵심 근거

- Tauri는 webview renderer와 Rust core process boundary를 가진다. 운영체제 자원과 process 관리 책임은 Rust 쪽에서 다루는 것이 desktop app 장점에 맞다.
- Tauri shell plugin은 external process/sidecar 제어를 공식 기능으로 제공하지만, 이번 slice는 새 process를 띄우지 않고 기존 Rust command snapshot을 확장하는 쪽이 lifecycle risk가 작다.
- OpenTelemetry process semantic conventions는 process memory, virtual memory, CPU utilization, thread count 같은 metric 이름을 제공한다. 앱 내부 report가 이 이름을 흉내 내면 후속 collector 연결이 쉬워진다.
- Long task 측정은 browser performance API와 Playwright smoke로 확장 가능하지만, 이번 구현은 native resource snapshot을 우선 연결한다.

## 적용 결정

- `DesktopResourceSnapshotReport`에 `semanticMetrics` 배열을 추가한다.
- `MonitorShell`이 `DesktopRuntimePanel`의 snapshot을 공유 state로 끌어올려 `EvaluationReportPanel`에 전달한다.
- EVAL 점수는 runtime telemetry가 있을 때 RAM headroom, CPU headroom, workspace cache 상태를 반영한다.
- UI에는 `data-eval-runtime-telemetry`와 `data-runtime-metric` 계약을 둬 static check와 Browser smoke에서 확인 가능하게 한다.

## 제한

- 현재 snapshot은 polling 기반 단일 값이며 persistence/time-series가 아니다.
- 실제 user-perceived tab transition latency는 별도 measurement hook과 long task/interaction timing 연결이 필요하다.

## 참고 링크

- https://tauri.app/concept/process-model/
- https://v2.tauri.app/plugin/shell/
- https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
- https://opentelemetry.io/docs/specs/semconv/system/process-metrics/
