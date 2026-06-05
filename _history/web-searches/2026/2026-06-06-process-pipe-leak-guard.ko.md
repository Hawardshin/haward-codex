# 웹 검색 기록: 프로세스/파이프 누수 방지

## 검색 시각

- 2026-06-06 KST

## 질의

- `Rust std::process ChildStdin ChildStdout pipe deadlock wait drop official docs`
- `Tokio process Command kill_on_drop child stdout memory leak official docs`
- `Tauri v2 async command process management sidecar official docs`
- `portable-pty rust process pipe close drop documentation`
- `Rust CommandExt process_group official docs`
- `libc kill process group SIGKILL Rust official docs macOS`
- `portable-pty kill wait child process issue GitHub`
- `Rust std process pipe deadlock wait stdout stderr Stack Overflow`
- `Tokio process kill_on_drop process group pipe discussion GitHub issue`

## 확인한 출처

- Rust std process docs: `https://doc.rust-lang.org/stable/std/process/index.html`
- Rust `Child` docs: `https://doc.rust-lang.org/std/process/struct.Child.html`
- Rust Unix `CommandExt` docs: `https://doc.rust-lang.org/std/os/unix/process/trait.CommandExt.html`
- portable-pty docs: `https://docs.rs/portable-pty/latest/portable_pty/`
- portable-pty `Child` docs: `https://docs.rs/portable-pty/latest/portable_pty/trait.Child.html`
- Tauri v2 Rust command boundary: `https://v2.tauri.app/develop/calling-rust/`
- Tauri issue signal for spawned descendants not killed by child kill: `https://github.com/tauri-apps/tauri/issues/4949`
- Stack Overflow pipe deadlock examples for stdout/stderr: `https://stackoverflow.com/questions/49062707/capture-both-stdout-stderr-via-pipe`, `https://stackoverflow.com/questions/64398866/why-does-bufreader-hang-when-reading-from-stderr`

## 구현 영향

- Rust docs confirm child stdio is explicit pipe ownership and child lifecycle must be waited or killed/waited by the parent.
- `CommandExt::process_group` gives a Unix/macOS mechanism to isolate child process trees without adding a sidecar supervisor.
- portable-pty child handles expose kill/wait but PTY master/writer handles still need explicit drop paths.
- Tauri/GitHub issue and Stack Overflow signals support the risk model: killing only the immediate child or reading pipes in the wrong order can leave descendants, blocked pipes, or hung readers.

## 약한 출처 처리

- Stack Overflow and GitHub issues were used as risk/adoption signals, not as standalone implementation proof.
- Final implementation decisions use Rust std, Unix process extension docs, and portable-pty docs as stronger sources.
