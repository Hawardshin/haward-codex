# 스펙: Native Resource Telemetry

## 목표

데스크톱 앱이 실제 OS 자원을 쓰고 있는지 앱 내부에서 볼 수 있도록 Rust/Tauri native resource snapshot을 추가하고, UI와 readiness gate에 연결한다.

## 언어/런타임 선택

- 옵션 A: Rust/Tauri command + existing `sysinfo`. 이미 workspace cache가 Rust에서 CPU/RAM budget을 사용하고 있고, 프로세스/시스템 telemetry를 같은 authority에서 읽을 수 있어 선택했다.
- 옵션 B: renderer `performance.memory`/browser API. Chromium/WebView 차이가 있고 프로세스 전체/OS memory를 신뢰성 있게 다루기 어렵다.
- 옵션 C: external `ps`/`top` command. OS별 parsing과 permission 차이가 커서 app runtime contract로 부적합하다.

## 아키텍처 선택

- 옵션 A: `get_desktop_resource_snapshot` Tauri command를 추가하고 MonitorShell에서 active surface interval로 갱신한다. 기존 invoke pattern과 상태 strip UI를 재사용하므로 선택했다.
- 옵션 B: long-running native telemetry daemon. 장기 관측에는 유리하지만 현재 요구는 UI 가시성과 readiness gate라 과하다.
- 옵션 C: package/build-time만 검사. 런타임 자원 사용을 보여주지 못한다.

## 설계

- Rust report는 `DesktopResourceSnapshotReport`로 직렬화한다.
- command는 `get_current_pid`, `ProcessRefreshKind`, `ProcessesToUpdate`를 사용해 현재 앱 프로세스 memory/CPU를 샘플링한다.
- CPU usage는 짧은 interval 두 번 refresh해 값을 안정화한다.
- report는 workspace cache snapshot과 warmup status를 같이 포함한다.
- MonitorShell은 `DesktopResourceSnapshotReport` type과 `desktopResourceSnapshot` state를 가진다.
- runtime init `Promise.all`과 active surface interval에서 snapshot을 갱신한다.
- source workbench state strip에 `앱 RAM/CPU` 항목을 추가한다.
- `service-readiness-registry.json`, `check-service-readiness.mjs`, readiness tests는 `native_resource_telemetry` group/token을 요구한다.

## 수용 기준

- Rust `cargo check`가 통과한다.
- Workspace Monitor TypeScript, test, check가 통과한다.
- Platform desktop test/check가 통과한다.
- `service-readiness-registry.json` config contract check가 통과한다.
- `package:internal`이 `.app`와 `.dmg`를 생성하고 검증한다.

## 제한

- CPU usage는 샘플링 시점의 근사값이다.
- public release blocker는 telemetry 구현과 별개로 signing/notarization/updater/smoke 전까지 유지한다.
