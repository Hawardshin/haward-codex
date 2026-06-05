# 프로세스/파이프 누수 방지 스펙

## 목표

`platform-desktop-app`의 CLI adapter session, bounded command runner, native PTY terminal이 동일한 lifecycle 원칙을 갖도록 한다. 세션이 종료되거나 store에서 제거되거나 Rust struct가 drop될 때 child process, stdin/stdout/stderr pipe, PTY writer/master, reader thread가 남지 않아야 한다.

## 구현 대상

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/src-tauri/Cargo.toml`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`

## 런타임 계약

- `CliSession`은 Drop guard를 가진다.
- `NativePtySession`은 Drop guard를 가진다.
- CLI command spawn은 Unix에서 새 process group을 설정한다.
- timeout, error, store lock failure, session cleanup은 child kill만 하지 않고 kill/wait 또는 process group kill/wait를 수행한다.
- finished session cleanup은 reader thread가 즉시 완료되지 않으면 짧은 grace wait 후 pipe opener가 남았다고 보고 cleanup을 강화한다.

## 설계

- `configure_process_group`은 Unix에서 `CommandExt::process_group(0)`을 호출해 child를 새 process group leader로 만든다.
- `kill_child_process_tree`는 Unix에서 negative pid signal로 process group에 `SIGKILL`을 보낸 뒤 child kill fallback을 호출한다.
- `kill_and_wait_child`는 process tree kill 후 `wait`를 호출해 zombie를 피한다.
- `finalize_finished_cli_session_runtime`은 stdin을 drop하고 stdout/stderr reader thread를 grace join한다.
- `dispose_cli_session_runtime`은 아직 finished가 아니면 kill/wait 후 finished marking을 수행하고 finalize를 호출한다.
- `NativePtySession.master`는 `Option`으로 바꾸어 finished/cancel/drop에서 PTY master를 명시적으로 drop할 수 있게 한다.
- `finalize_finished_native_pty_runtime`은 writer/master drop과 reader grace join을 담당한다.

## 리스크

- process group kill은 Unix/macOS에만 적용된다. Windows process tree cleanup은 별도 job object 전략이 필요하다.
- natural exit 뒤에도 stdout/stderr reader가 닫히지 않는 경우, descendant process가 pipe를 잡고 있을 가능성이 있어 process group kill을 시도한다.
- reader thread join은 UI command handler를 오래 막지 않도록 250ms grace로 제한한다.
