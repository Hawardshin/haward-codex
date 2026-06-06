# Plan: Native OS Action Bridge

1. 공식 문서로 Tauri opener와 Rust process command 경계를 확인한다.
2. Rust request/report 구조와 `run_native_os_action` 명령을 추가한다.
3. 작업공간 path guard와 OS별 external terminal command plan을 추가한다.
4. Quick Start에 사용자-facing OS action 버튼을 추가한다.
5. runtime contract, readiness, Node/Rust 테스트를 갱신한다.
6. Rust/renderer/desktop 검증과 내부 패키징을 실행한다.
