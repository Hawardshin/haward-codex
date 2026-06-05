# 요청-결과 추적: Native Resource Telemetry

## 요청

사용자는 남은 작업 전체를 계속 구현하라고 지시했다.

## 결과

- 실제 Rust/Tauri process/system resource telemetry를 앱에 추가했다.
- OS cache 상태뿐 아니라 현재 app RAM/CPU 상태를 source workbench에서 볼 수 있다.
- readiness gate가 native resource telemetry를 별도 그룹으로 추적한다.

## 구현 파일

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/configs/service-readiness-registry.json`
- `platform-desktop-app/scripts/check-service-readiness.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 잔여

- public signing/notarization/updater/clean-machine smoke는 별도 release infrastructure 필요.
