# Web Search: Native Pipe Runtime Tools

## 검색

- `Rust portable-pty crate official documentation terminal pty`
- `Rust tokio process pipe child stdin stdout official documentation`
- `Tauri v2 shell plugin official documentation process command`
- `os_pipe crate Rust official documentation pipe Stdio`
- `os_pipe Rust crates.io license repository`
- `Rust std process Stdio piped deadlock documentation`

## 확인한 출처

- https://docs.rs/portable-pty/
- https://docs.rs/tokio/latest/tokio/process/struct.Child.html
- https://v2.tauri.app/plugin/shell/
- https://docs.rs/os_pipe/latest/os_pipe/
- https://crates.io/crates/os_pipe/1.2.3
- https://doc.rust-lang.org/std/process/struct.Stdio.html

## 판단

- `portable-pty`는 이미 프로젝트에 설치되어 있어 interactive terminal의 기반으로 유지한다.
- Tauri shell plugin은 앱 권한 기반 command spawn에는 유용하지만, 이번 요구처럼 플랫폼이 pipe graph와 process cleanup을 직접 소유하는 실행 계층에는 Rust command가 더 적합하다.
- Rust 표준 `Stdio::piped()`는 단일 child stdio capture에는 충분하지만, 직접 OS pipe를 만들어 여러 child process를 연결하는 API가 필요하다. `os_pipe`는 cross-platform pipe 생성 crate이고 license는 MIT로 확인했다.
- Rust `Stdio` 문서는 stdin/stdout/stderr를 동시에 관리하지 않으면 deadlock이 날 수 있음을 경고한다. 따라서 구현은 stdout/stderr reader thread와 timeout cleanup을 포함한다.

## 계획 영향

- 전역 CLI 설치 대신 project-local Rust dependency `os_pipe@1.2.3`을 추가한다.
- shell string pipeline을 만들지 않고 argv 기반 process graph command를 추가한다.
- 리소스 체크와 CLI pipeline record를 close-out gate로 남긴다.
