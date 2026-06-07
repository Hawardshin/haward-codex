# 계획 근거

- 날짜: 2026-06-07
- 계획 대상: 앱 자동 업데이트 기능 보강.

## 근거

- 공식 Tauri updater 문서는 updater가 서명된 artifact와 업데이트 확인/설치 흐름을 요구한다고 설명한다.
- 로컬 스크립트에는 updater public config와 manifest 생성 경로가 있었지만, 앱 런타임에서 사용자가 실행할 수 있는 update check/install 명령은 없었다.
- Service Readiness는 update channel 상태를 보여주고 있었으므로, 같은 표면에 실행 액션과 결과를 붙이는 것이 기존 UI 정보 구조에 가장 작게 맞는 변경이다.

## 검증 근거

- `cargo check`로 실제 updater crate API와 Rust 타입을 확인한다.
- `workspace-monitor run check`로 TS 타입과 UI 계약을 확인한다.
- `platform-desktop-app run check/test`로 readiness/runtime/customer bundle 계약을 확인한다.
- 내부 패키징 명령으로 실제 Tauri build 경로를 확인한다.
