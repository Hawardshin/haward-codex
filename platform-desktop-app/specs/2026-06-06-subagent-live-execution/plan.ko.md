# Plan: Subagent Live Execution

1. 웹 우선 조사로 subagent delegation과 process/session event 기준을 재확인한다.
2. 이전 `subagent-tool-use` 구현과 task-run persistence를 확인한다.
3. Rust/Tauri에 `start_subagent_tool_execution` command와 plan/tool 검증 helper를 추가한다.
4. 기존 `create_cli_session`에 `subagent_tool_execution` metadata를 넘긴다.
5. Desktop Runtime에 `선택 툴 실행` action과 실행 결과 요약을 추가한다.
6. static contract, Rust unit/feature map, renderer tests/check/build를 검증한다.
7. Browser preview로 버튼과 결과 UI 계약을 smoke한다.
8. resource/omission/evaluation 기록 후 commit/push한다.
