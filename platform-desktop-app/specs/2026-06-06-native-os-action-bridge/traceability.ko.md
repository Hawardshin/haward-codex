# Traceability: Native OS Action Bridge

## 요구사항 연결

- `REQ-NOS-001`: OS 파일 관리자/기본 앱/외부 터미널 직접 조작
- `REQ-NOS-002`: 작업공간 내부 경계와 protected dir 차단
- `REQ-NOS-003`: shell 문자열 대신 structured command 실행
- `REQ-NOS-004`: Desktop Quick Start에서 사용자-facing 실행

## 구현 연결

- `platform-desktop-app/src-tauri/src/lib.rs`: `run_native_os_action`, path guard, OS별 terminal command plan
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`: Quick Start native OS action buttons
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: `native_os_commands`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`: contract gate
- `platform-desktop-app/scripts/check-readiness.mjs`: readiness token gate
- `platform-desktop-app/tests/readiness.test.mjs`: desktop contract test
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`: renderer/Rust surface test
