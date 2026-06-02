# 웹 검색 기록: CLI task-run store 구현

- 날짜: 2026-06-03
- 요청: 스펙만 만들지 말고 계획한 설치형 플랫폼 기능을 실제로 구현
- 쿼리:
  - `Rust std process Command Stdio stdin stdout stderr documentation`
  - `Tauri v2 command invoke state official documentation`
  - `Tauri v2 capabilities permissions documentation`
  - `Rust std fs read_to_string remove_dir_all official documentation`
  - `Rust std fs read_dir metadata official documentation`

## 확인한 강한 출처

- Rust `std::process::Command`: `stdin`, `stdout`, `stderr`를 `Stdio`로 설정하고 `spawn`으로 child process handle을 얻는 공식 API를 확인했다. <https://doc.rust-lang.org/std/process/struct.Command.html>
- Rust `std::process`: child process I/O를 pipe로 구성하고 `Child`에서 접근하는 공식 모델을 확인했다. <https://doc.rust-lang.org/stable/std/process/index.html>
- Tauri capabilities: 앱 window/webview 권한을 capability로 제한한다는 Tauri v2 보안 모델을 확인했다. <https://v2.tauri.app/fr/reference/acl/capability/>

## 구현 영향

- 외부 AI CLI는 플랫폼 내부 로직이 아니라 `Command` + `Stdio::piped` 기반 guest process lane으로 유지했다.
- CLI stdout/stderr는 runtime 메모리 상태에만 두지 않고 `record.json`, `stdout.log`, `stderr.log`로 분리 저장하게 했다.
- active polling 중 파일 쓰기 비용을 줄이기 위해 task-run persist signature가 변할 때만 record/log를 다시 쓰도록 했다.
- 저장된 record/log 열람은 bounded preview로 제한했다.
- 오래된 task-run 정리는 `remove_dir_all`을 쓰되 task-run store 내부 canonical path만 대상으로 삼았다.

## 불확실성

- Rust toolchain이 이 환경에 설치되지 않아 실제 Tauri compile/build 검증은 하지 못했다. readiness/static/TypeScript/build 검증으로 대체했다.
