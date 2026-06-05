# 리소스 점검: 네이티브 PTY 터미널 런타임

## 리소스 위험

- OS child process: PTY shell process.
- File descriptor/handle: PTY master reader/writer.
- Thread: PTY reader thread.
- Timer: renderer native PTY polling interval, xterm input flush timer.
- Observer: xterm host `ResizeObserver`.
- Memory: bounded PTY output scrollback.

## 완화

- Rust `PtySessionStore`를 기존 `SessionStore`와 분리했다.
- `cancel_native_pty_terminal`은 child kill/wait 후 writer를 drop한다.
- finished session cleanup은 기존 retention 정책을 재사용한다.
- reader thread는 `join_finished_reader`로 완료 시 join한다.
- PTY output은 `MAX_SESSION_OUTPUT_BYTES`를 넘으면 truncate 상태만 유지한다.
- xterm component cleanup에서 data disposable, resize observer, flush timer, terminal instance를 dispose한다.
- PTY polling에는 in-flight guard를 둬 500ms interval이 겹치지 않게 했다.

## 검증

- `cargo check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.
- 정적 DOM smoke에서 PTY tab/CSS rule 확인.

## 남은 리스크

- 실제 설치 앱에서 PTY를 시작해 셸 프롬프트와 resize를 수동 확인하는 clean-machine smoke는 후속 release validation에 남아 있다.
