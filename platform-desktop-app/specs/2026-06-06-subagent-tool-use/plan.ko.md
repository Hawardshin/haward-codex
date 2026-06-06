# Plan: Subagent Tool Use

1. 웹 우선 조사로 subagent/handoff/tool 공식 기준을 확인한다.
2. `agent-platform`의 manager-as-tools planner와 desktop task-run store를 확인한다.
3. Tool Studio registry에 subagent delegation playbook과 ladder를 추가한다.
4. Rust command `run_subagent_tool_plan`과 task-run persistence를 추가한다.
5. Desktop Runtime 버튼과 최근 결과 요약을 추가한다.
6. static tests, config contract, orchestration planner, Rust/TS checks, Browser smoke를 실행한다.
7. omission/resource/evaluation 기록 후 commit/push한다.
