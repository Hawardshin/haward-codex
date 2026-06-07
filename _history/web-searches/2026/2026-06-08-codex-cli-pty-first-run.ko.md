# 2026-06-08 Codex CLI PTY first-run 웹 검색 기록

## 검색어

- `OpenAI Codex CLI install official docs codex install.sh`
- `Tauri shell execute command documentation PTY xterm terminal`
- `portable-pty Rust crate documentation native_pty_system CommandBuilder`
- `xterm.js addons fit search documentation`

## 확인한 주요 출처

- OpenAI Help Center, Codex CLI getting started: https://help.openai.com/en/articles/11096431
- OpenAI Help Center, Codex CLI sign in with ChatGPT: https://help.openai.com/en/articles/11381614-api-codex-cli-and-sign-in-with-chatgpt
- portable-pty Rust docs: https://docs.rs/portable-pty/
- xterm.js addon docs: https://xtermjs.org/docs/guides/using-addons/

## 계획 영향

- Codex CLI는 터미널/TUI 중심 도구이므로 pipe-only 실행보다 PTY 실행이 첫 실행 경로에 적합하다고 판단했다.
- 기존 코드가 이미 `portable_pty`와 xterm addon을 쓰고 있어 새 오픈소스 설치 없이 기존 의존성을 활용했다.
- GUI 앱 PATH가 로그인 셸 PATH와 다를 수 있으므로 resolver에 일반 설치 위치와 로그인 셸 fallback을 추가했다.

## 약한 출처

- Reddit/커뮤니티 업데이트 글은 버전 동향 신호로만 보았고 구현 근거로 사용하지 않았다.
