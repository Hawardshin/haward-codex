# 계획: Native Resource Telemetry

## 단계

1. web-first intake로 Tauri updater/signing/sysinfo/process telemetry 자료를 확인한다.
2. 기존 Rust workspace cache와 readiness 구조를 확인한다.
3. 새 dependency 없이 `sysinfo` 기반 resource snapshot command를 추가한다.
4. MonitorShell type/state/refresh/display를 추가한다.
5. service readiness registry/check/test에 native resource telemetry group을 추가한다.
6. 요구사항/스펙/히스토리/evaluation 기록을 남긴다.
7. renderer/Rust/platform 검증과 internal package build를 실행한다.
8. snapshot을 재수집하고 commit/push한다.

## 롤백 경계

- UI 표시가 문제를 만들면 MonitorShell 표시와 polling effect만 되돌릴 수 있다.
- Rust snapshot command가 특정 OS에서 문제가 있으면 readiness group은 유지한 채 command 내부를 system-only fallback으로 줄일 수 있다.
- public release blocker 로직은 이번 변경과 분리되어 있으므로 롤백 범위에 넣지 않는다.
