# 2026-06-08 Codex CLI PTY first-run 요구사항

## 배경

사용자가 플랫폼의 CLI 탭에서 Codex CLI가 연결된 것처럼 보이지만 실제 실행은 실패하고, PTY/TUI 기반 실행이 되지 않아 첫 실행을 시작할 수 없다고 보고했다.

## 요구사항

- `codex`, `claude`, `gemini`, `opencode` 등 대화형 AI CLI 어댑터는 pipe-only 실행이 아니라 네이티브 PTY 세션으로 시작할 수 있어야 한다.
- GUI 앱 프로세스의 `PATH`가 로그인 셸과 달라도 사용자의 일반 CLI 설치 위치를 탐색해야 한다.
- 어댑터 제공자 환경 변수는 PTY 실행에도 전달되어야 한다.
- CLI 탭의 기본 Codex quick command는 실제 TUI 진입 명령을 사용해야 한다.
- `src-tauri/src/lib.rs`는 Tauri 진입점 역할만 남기고 기능별 파일로 분리한다.
- 이번에 직접 건드린 터미널 TypeScript 표면은 가능한 한 파일당 500줄 이하로 분리한다.
- 기존 대형 TypeScript 파일 전체 분리는 별도 안전 리팩터링 대상으로 추적한다.

## 수용 기준

- Rust 컴파일과 단위 테스트가 통과한다.
- workspace monitor 타입/계약 검사와 테스트가 통과한다.
- desktop app readiness/check/test가 통과한다.
- customer renderer build와 bundle audit가 통과한다.
- Rust `lib.rs`와 새 `lib_parts/*.rs`, 터미널 드로어 분리 파일이 500줄 이하임을 확인한다.
