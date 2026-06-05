# 작업 요약: 네이티브 PTY 터미널 런타임

## 완료

- Rust `portable-pty` dependency를 추가했다.
- Tauri runtime에 native PTY start/list/poll/write/resize/cancel command를 추가했다.
- `RuntimeTerminalDrawer`에 xterm 기반 `PTY` tab을 추가했다.
- `MonitorShell`에 PTY 세션 상태, polling, input, resize, cancel 연결을 추가했다.
- 기존 pipe-first CLI supervisor는 task-run/decision inbox 경로로 유지했다.
- product gap registry, runtime contract, architecture docs, readiness checks를 새 구현 상태로 갱신했다.
- 내부 패키징 빌드로 `.app`와 `.dmg`를 생성하고 서명/DMG 검증을 통과했다.

## 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 주의

- 공개 배포 readiness는 기존과 같이 Developer ID signing, notarization, updater, clean-machine smoke가 남아 있다.
