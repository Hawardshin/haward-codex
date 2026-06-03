# Desktop Workspace Host 요청 추적

## 요청

- 사용자는 현재 흐름이 git clone 후 해당 폴더에서 작업하는 방식에 특화되어 있으며, 그 기능을 설치형 데스크톱 앱 안으로 녹여야 한다고 지시했다.

## 처리

- 설치형 앱이 workspace import, repository clone, active workspace selection, workspace state persistence를 소유하도록 Tauri command와 app-data state를 추가했다.
- Source Editor와 CLI session/task pipeline의 working directory resolution을 app-selected workspace 우선으로 변경했다.
- Workspace Monitor Runtime 화면에 Workspace Host 패널을 추가해 import/clone/status/state path/managed root/Git 상태를 볼 수 있게 했다.
- runtime contract, readiness, service readiness, requirements, specs, validation, traceability를 갱신했다.

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/specs/2026-06-03-desktop-workspace-host/`
- `_history/web-searches/2026/2026-06-03-desktop-workspace-host.ko.md`
- `_history/evaluations/2026/2026-06-03-desktop-workspace-host-omission-result.json`
- `_history/evaluations/2026/2026-06-03-desktop-workspace-host-resource-result.json`
- `_history/evaluations/2026/2026-06-03-desktop-workspace-host-evaluation-result.json`

## 검증

- Rust format/check, Workspace Monitor check/test/customer build/perf budget, platform desktop tests/readiness/runtime contract/service readiness, config contract checks, Browser static smoke를 통과했다.

## 남은 범위

- native folder picker, full Git branch/commit/pull/push UI, private credential/SSH key 관리, public clean-machine workspace smoke는 별도 후속 범위다.
