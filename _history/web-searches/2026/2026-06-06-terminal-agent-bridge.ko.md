# Web Search: Terminal Agent Bridge

날짜: 2026-06-06

## 요청

터미널 연결 기능과 에이전트 기능을 제대로 연결한다.

## 검색

- `VS Code terminal shell integration API official documentation pty terminal extension API`
- `xterm.js attach addon official documentation terminal websocket pty`
- `node-pty official GitHub pseudoterminal process documentation`
- `portable-pty Rust crate official documentation pseudo terminal`
- `Tauri v2 commands official documentation invoke Rust commands`

## 확인 출처

- xterm.js Addons: https://xtermjs.org/docs/guides/using-addons/
- xterm.js Terminal API: https://xtermjs.org/docs/api/terminal/classes/terminal/
- portable-pty crate docs: https://docs.rs/portable-pty/
- Tauri Calling Rust: https://v2.tauri.app/develop/calling-rust/
- VS Code Terminal Shell Integration: https://code.visualstudio.com/docs/terminal/shell-integration

## 계획 영향

- xterm.js는 renderer terminal surface와 addon layer에 맞고, OS PTY 생성 authority는 Rust/native side에 둔다.
- 이미 `portable_pty`와 Tauri commands가 있으므로 새 Rust supervisor 대신 기존 command를 묶는 renderer bridge가 첫 slice에 적합하다.
- VS Code terminal integration처럼 터미널 상태/작업 맥락을 product UI에서 보여주는 방향이 맞다.

## 불확실성

- Browser preview는 Tauri runtime이 없으므로 실제 PTY spawn은 desktop app/runtime에서 추가 smoke가 필요하다.
