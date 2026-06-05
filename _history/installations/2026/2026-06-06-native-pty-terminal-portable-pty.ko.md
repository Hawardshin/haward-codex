# 설치 감사: portable-pty

## 요약

- 날짜: 2026-06-06
- 프로젝트: `platform-desktop-app`
- 범위: project-local Rust dependency
- 패키지: `portable-pty = "0.9.0"`
- 설치/반영 방식: `Cargo.toml` 직접 반영 후 `cargo check`로 `Cargo.lock` 생성/검증

## 설치 목적

하단 런타임 터미널에 실제 OS pseudo terminal을 제공하기 위해 Rust backend에서 PTY master/slave, child process, reader/writer, resize, cancel lifecycle을 소유한다.

## dependency record

- `platform-desktop-app/src-tauri/Cargo.toml`
- `platform-desktop-app/src-tauri/Cargo.lock`

## 보안 검토

- 글로벌 설치 없음.
- credential, browser cookie, secret storage 접근 없음.
- native process와 PTY file descriptor를 다루므로 resource lifecycle 검증 대상이다.
- PTY output은 `MAX_SESSION_OUTPUT_BYTES` bounded scrollback으로 제한한다.

## 라이선스 검토

- `cargo info portable-pty`: license `MIT`
- repository: `https://github.com/wezterm/wezterm`
- docs: `https://docs.rs/portable-pty`

## 검증

- `cargo info portable-pty`: version 0.9.0, license MIT 확인.
- `cargo check`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과. `.app`와 `.dmg` 생성, codesign/hdiutil verification 통과.

## 롤백

1. `platform-desktop-app/src-tauri/Cargo.toml`에서 `portable-pty` 제거.
2. `src-tauri/src/lib.rs`의 `PtySessionStore`와 `start_native_pty_terminal` 계열 command 제거.
3. `RuntimeTerminalDrawer`의 PTY view/xterm surface 제거.
4. `MonitorShell`의 native PTY state/polling 제거.
5. `Cargo.lock` 재생성 후 `cargo check`, workspace-monitor check, package build 재실행.
