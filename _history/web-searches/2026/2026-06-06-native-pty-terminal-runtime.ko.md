# 웹 검색 기록: 네이티브 PTY 터미널 런타임

## 검색 시각

- 2026-06-06 KST

## 질의

- `Tauri v2 command shell sidecar process official docs`
- `xterm.js terminal fit addon official docs performance`
- `node-pty terminal emulator pseudo terminal official docs`
- `Rust portable-pty crate terminal pty docs`

## 확인한 출처

- Tauri v2 Shell/plugin reference: `https://v2.tauri.app/reference/javascript/shell/`
- xterm.js docs: `https://xtermjs.org/docs/`
- Microsoft node-pty repository: `https://github.com/microsoft/node-pty`
- portable-pty docs/crate metadata: `https://docs.rs/portable-pty/`, `cargo info portable-pty`

## 구현 영향

- Tauri shell/plugin은 command invocation에는 유용하지만, 앱 내부 live terminal fidelity에는 PTY lifecycle과 renderer terminal emulator가 따로 필요하다고 판단했다.
- xterm.js는 ANSI rendering, cursor, scrollback, raw input event surface를 제공하므로 `<pre>` 출력보다 적합하다고 판단했다.
- node-pty는 Electron/Node 계열의 강한 reference지만, 현재 Tauri Rust backend에는 Node sidecar보다 Rust `portable-pty`가 프로젝트 경계에 맞다.
- `portable-pty` 0.9.0은 MIT license, native PTY open/spawn/read/write/resize/kill API를 제공해 Rust runtime 구현 대상으로 선택했다.

## 약한 출처 처리

- 블로그/커뮤니티 튜토리얼은 구현 결정 근거로 사용하지 않았다.
