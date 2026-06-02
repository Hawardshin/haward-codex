# Task Pipe Init Request Trace

- 요청 ID: `UR-2026-06-02-059`
- 요청 요약: task intake를 기준으로 다양한 CLI를 pipe 구조로 init하는 방향을 구현해 달라고 했다.
- 작업 모드: `governance`

## Outcome

- Rust/Tauri backend에 `list_cli_task_pipeline_presets`, `start_cli_task_pipeline`을 추가했다.
- Workspace Monitor Desktop 탭에 `Task Pipe Init` 패널을 추가했다.
- CLI adapter registry, desktop registry, user-flow registry, requirements, spec, readiness test를 갱신했다.

## Validation

- `npm --prefix workspace-monitor run check`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `check-config-contract`
- 추가 build/evaluator 검증은 close-out 평가에 기록한다.
