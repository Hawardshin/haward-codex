# Plan: Subagent Bounded Fan-Out

1. 웹 우선 조사로 subagent fan-out, permissions, process lifecycle 기준을 확인한다.
2. 이전 single-lane execution 구현과 task pipeline 구현을 읽는다.
3. Rust에 `SubagentToolFanoutInput/Report`와 `start_subagent_tool_fanout` command를 추가한다.
4. plan record에서 tool list를 한 번 읽고, requested tool names를 검증한다.
5. fan-out lane prompt와 process cap을 추가한다.
6. Renderer에 첫 2개 묶음 실행 button, result card, pipeline report 연결을 추가한다.
7. static tests, Rust unit tests, check/build, browser smoke를 수행한다.
8. resource/CLI pipeline/omission/evaluation 기록 후 commit/push한다.
