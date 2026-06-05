# 요구사항: Native Resource Telemetry

## 사용자 요구

사용자는 “다 해”라고 지시했고, 이전 맥락상 데스크톱 앱의 장점을 살려 CPU/RAM/운영체제 자원을 실제로 사용하고 탭/소스 워크벤치 성능을 끝까지 개선하라는 의미로 해석한다.

## 기능 요구사항

- Rust/Tauri runtime은 현재 앱 프로세스의 memory, virtual memory, CPU usage, PID, task count를 보고해야 한다.
- Rust/Tauri runtime은 system memory, CPU threads, available parallelism, workspace cache memory budget, preload limit, warmup/cache 상태를 같이 보고해야 한다.
- Workspace Monitor source workbench는 native snapshot을 사용자에게 보이는 상태 strip에 표시해야 한다.
- Service readiness registry와 checker는 native resource telemetry를 독립 readiness group으로 다뤄야 한다.
- 기존 workspace OS cache, resident tab, lazy boundary, performance audit 계약은 유지한다.

## 비기능 요구사항

- telemetry polling은 visible/active runtime surface에서만 실행해야 한다.
- hidden surface에서 불필요한 polling을 늘리지 않는다.
- 새 dependency를 추가하지 않는다. 기존 `sysinfo`/`rayon` 경계 안에서 구현한다.
- implementation 후 renderer test/check, Rust check, desktop test/check, internal package build를 실행한다.

## 제외

- Apple Developer ID signing, notarization, signed updater endpoint, clean-machine smoke는 자격증명/외부 release infrastructure가 필요하므로 이번 로컬 구현에서 완료라고 주장하지 않는다.
