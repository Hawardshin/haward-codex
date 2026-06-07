# 2026-06-08 Codex CLI PTY first-run 계획

1. 웹 검색과 공식 문서 확인으로 CLI/TUI/PTY 전제를 검증한다.
2. 로컬 `codex` 설치와 PATH 상태를 확인한다.
3. Tauri Rust runtime에 어댑터 PTY command를 추가한다.
4. GUI PATH와 로그인 셸 PATH 차이를 흡수하는 resolver를 구현한다.
5. MonitorShell에서 Codex류 AI CLI를 PTY로 시작하도록 라우팅한다.
6. Rust와 터미널 TypeScript 파일을 500줄 이하 구조로 분리한다.
7. readiness/test/build를 새 구조에 맞춘다.
8. 검증 기록, 평가, 누락/리소스 점검을 저장한다.
