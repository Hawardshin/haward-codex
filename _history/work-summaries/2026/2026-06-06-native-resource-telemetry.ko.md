# 작업 요약: Native Resource Telemetry

## 완료

- Rust/Tauri `get_desktop_resource_snapshot` command를 추가했다.
- report는 현재 app process memory, virtual memory, CPU usage, PID, task count, system memory, CPU threads, workspace cache/warmup 상태를 포함한다.
- MonitorShell source workbench에 `앱 RAM/CPU` 상태를 추가했다.
- active runtime surface에서 10초 간격으로 native snapshot을 갱신한다.
- service readiness registry/check/test에 `native_resource_telemetry` group을 추가했다.

## 검증

- TypeScript check, Rust cargo check, Workspace Monitor test/check, Platform desktop test/check, shared config contract check 통과.
- `package:internal` 통과: `.app`와 `.dmg` 생성, codesign verify, DMG verify 완료.
- Built output performance audit 통과: section repeat p95 796.4ms, button feedback p95 51.4ms.
