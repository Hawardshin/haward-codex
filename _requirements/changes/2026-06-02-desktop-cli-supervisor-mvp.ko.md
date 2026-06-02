# 요구사항 변경: Desktop CLI Supervisor MVP

## 변경

- `PDA-REQ-018`: allowlist된 AI CLI의 PATH 탐지와 stdin 없는 bounded health/version check를 첫 실제 supervisor 구현으로 추가했다.
- `PDA-REQ-019`: Tauri runtime이 없는 브라우저에서 Desktop UI가 안전하게 fallback해야 한다는 요구사항을 추가했다.
- `PDA-UX-013`: Desktop 탭이 runtime, CLI availability/version, health check, decision prompt, source editing readiness를 보여야 한다는 요구사항을 추가했다.

## 이유

사용자가 실제 구현 진행을 요청했으므로 multi-CLI 계약을 첫 실행 가능한 MVP로 전환해야 했다.

## 비범위

- interactive PTY/stdin supervisor
- dependency installation
- source-affecting CLI task execution
