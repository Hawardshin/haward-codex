# 2026-06-08 Codex CLI PTY first-run 작업 요약

Codex CLI가 터미널에서는 보이지만 플랫폼 CLI 탭에서는 어댑터가 설정되지 않았다고 보이는 문제를 해결했다. 원인은 GUI 앱 PATH와 로그인 셸 PATH 차이, 그리고 TUI CLI를 pipe-only session으로 시작하는 구조였다.

이번 변경은 AI CLI 어댑터용 PTY launch command를 추가하고, MonitorShell에서 Codex/Claude/Gemini/OpenCode/Claw Code를 PTY로 시작하도록 연결한다. Rust 런타임 command resolver는 일반 설치 위치와 로그인 셸 fallback을 확인한다.

구조적으로 `src-tauri/src/lib.rs`를 31줄 진입점으로 줄이고 구현을 `lib_parts`로 분리했다. 터미널 드로어 UI도 `runtime-terminal` 하위 모듈로 분리했다.
