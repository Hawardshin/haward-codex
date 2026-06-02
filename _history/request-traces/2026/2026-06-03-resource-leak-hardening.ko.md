# 요청-결과 추적: 런타임 리소스 누수 하드닝

## 요청

- 요청 ID: `UR-2026-06-03-019`
- 요약: 메모리 누수나 유사한 런타임 리소스 누수를 보고 필요한 작업을 한다.

## 결과

- Rust CLI supervisor의 완료 session retention/prune을 추가했다.
- child process cancel/timeout/error 경로에서 `kill()` 뒤 `wait()`를 호출하도록 보강했다.
- session cleanup에서 join 가능한 reader thread handle을 회수한다.
- `SnapshotLoader` fetch abort와 Desktop runtime panel mounted-ref guard를 추가했다.

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/specs/2026-06-03-resource-leak-hardening/`
- `_history/evaluations/2026/2026-06-03-resource-leak-hardening-resource-input.json`

## 검증

- resource guard: `resource_ready`
- 최종 검증 결과는 `_history/evaluations/2026/2026-06-03-resource-leak-hardening-evaluation-input.json`에 연결한다.
