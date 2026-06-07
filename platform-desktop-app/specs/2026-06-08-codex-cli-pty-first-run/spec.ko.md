# Codex CLI PTY first-run spec

## 목적

플랫폼이 Codex CLI 같은 TUI 기반 게스트 CLI를 실제 PTY로 실행하도록 하여, 사용자가 CLI 탭에서 첫 실행을 시작할 수 있게 한다.

## 범위

- Rust Tauri command surface에 `start_cli_adapter_pty_session` 추가
- 어댑터 command resolution 보강
- provider env 전달을 포함한 PTY 세션 생성
- MonitorShell 실행 경로에서 TUI CLI 어댑터를 PTY로 라우팅
- RuntimeTerminalDrawer 터미널 표면 분리
- readiness/check/test source aggregation 갱신

## 제외

- 모든 기존 대형 TypeScript 파일의 전면 분리
- 공개 배포 signing/notarization/updater credential 구성
- 새 오픈소스 설치

## 결정

- pipe session은 자동화/기록용으로 유지한다.
- Codex/Claude/Gemini/OpenCode/Claw Code처럼 TUI가 핵심인 어댑터는 PTY 세션을 기본 실행 경로로 쓴다.
- Rust `lib.rs`는 `include!` 기반 물리 분리로 먼저 축소한다. 이는 대규모 visibility 재설계를 피하면서 컴파일 동작을 보존하기 위한 중간 구조다.
