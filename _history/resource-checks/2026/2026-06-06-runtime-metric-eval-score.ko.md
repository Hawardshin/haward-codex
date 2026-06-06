# 2026-06-06 resource check

## Runtime risk

이 작업은 Rust/Tauri process telemetry와 renderer polling state를 다루므로 resource risk가 있다.

## 변경 사항

- 새 subprocess, sidecar, watcher, timer를 추가하지 않았다.
- 기존 `DesktopRuntimePanel` refresh path에서 snapshot callback만 parent로 전달한다.
- snapshot refresh 실패나 Tauri invoke 미사용 환경에서는 parent state를 `null`로 되돌린다.
- process metric은 `sysinfo` snapshot 값을 직렬화하고, 별도 file handle이나 stream을 보관하지 않는다.

## Lifecycle 판단

- 추가 long-running resource 없음.
- memory leak 가능성은 낮다. shared state는 최신 report 객체 1개만 보관한다.
- stale metric 위험은 catch/null propagation으로 줄였다.

## 검증

- `cargo check`: 통과.
- TypeScript/contract check: 통과.
- renderer tests 70개: 통과.
- desktop tests 24개: 통과.
- `package:internal`: 통과.
- Browser smoke는 static fallback에서 telemetry UI가 깨지지 않는지 확인했다. telemetryMode `browser-preview`, errorLogCount 0.

## 결론

resource_risk_occurred=true. 새 장기 프로세스나 pipe는 없으며 lifecycle risk는 bounded state propagation 수준이다.
