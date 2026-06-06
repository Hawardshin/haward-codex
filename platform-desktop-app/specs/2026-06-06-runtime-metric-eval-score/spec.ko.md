# 스펙: runtime metric EVAL score

## 목표

Workspace Monitor EVAL 탭이 현재 desktop process의 native runtime metric을 받아 종합 개선 점수에 반영한다. 사용자가 탭 이동 지연과 OS 자원 활용 부족을 지적했을 때, 평가 화면이 실제 RAM/CPU/cache 상태를 근거로 보여야 한다.

## 설계 결정

- Rust `DesktopResourceSnapshotReport`에 `semanticMetrics`를 추가한다.
- metric 이름은 후속 collector 연결을 고려해 `process.memory.usage`, `process.memory.virtual`, `process.cpu.utilization`, `process.thread.count`를 사용한다.
- `MonitorShell`이 `DesktopRuntimePanel` 내부 snapshot을 공유 state로 끌어올려 EVAL panel에 넘긴다.
- EVAL 점수는 memory headroom, CPU headroom, workspace cache status를 합산해 `nativeRuntimeScore`를 만든다.
- browser/static preview에서는 Tauri invoke가 없어도 fallback row를 보여준다.

## 언어/런타임 선택

- 옵션 A: Rust/Tauri snapshot 확장. 기존 sysinfo 기반 telemetry와 desktop process authority를 재사용할 수 있어 선택했다.
- 옵션 B: renderer-only performance API. browser long task에는 유리하지만 OS memory/process metric에는 약해 미선택.
- 옵션 C: 별도 sidecar telemetry process. 분리성은 좋지만 pipe/process lifecycle 부담이 커서 이번 slice에서는 미선택.

## 아키텍처 선택

- 옵션 A: parent shell state lift. `DesktopRuntimePanel`이 이미 refresh 책임을 갖고 있으므로 snapshot callback만 추가한다. 선택.
- 옵션 B: 전역 store/context. 장기적으로 telemetry surface가 많아지면 좋지만 현재 범위에는 과하다.
- 옵션 C: EVAL panel에서 직접 Tauri command 호출. 호출 중복과 lifecycle ownership이 흐려져 미선택.

## 폴더 구조 선택

- 옵션 A: 기존 component/test/script 위치에 좁게 확장한다. 현재 변경이 기존 EVAL cockpit과 runtime panel 계약에 붙어 있어 선택했다.
- 옵션 B: 새 telemetry feature module을 만든다. persistence/time-series가 생길 때 분리한다.

## 수용 기준

- Rust report에 semantic process metric 배열이 직렬화된다.
- EVAL panel이 runtime telemetry available/fallback 상태를 명시한다.
- static contract script가 telemetry 계약 token을 확인한다.
- readiness와 workspace-monitor tests가 새 source token을 보호한다.
- `package:internal`이 통과한다.

## 근거

- Tauri process model: https://tauri.app/concept/process-model/
- Tauri shell plugin: https://v2.tauri.app/plugin/shell/
- MDN PerformanceLongTaskTiming: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
- OpenTelemetry process metrics: https://opentelemetry.io/docs/specs/semconv/system/process-metrics/

## 제한

- 이 작업은 snapshot 기반이다. 실제 탭 전환 latency와 long task time-series는 후속으로 측정한다.
- CPU utilization은 `sysinfo` process CPU usage를 0..1 ratio로 변환한 값이다.
