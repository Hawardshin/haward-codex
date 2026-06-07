# Work Summary: product split handoff

2026-06-08에 `platform-desktop-app`와 `agent-tool-desktop-app`의 역할을 코드 경계로 분리했다.

`platform-desktop-app`에서는 `agents`/`tools` 탭이 더 이상 Tool Studio, Agent Detail, AgentCore Builder를 직접 lazy-load하지 않는다. 대신 `SeparatedOperationsHandoffPanel`을 렌더링하고, Tauri command `open_agent_tool_desktop_app`로 peer desktop app을 실행한다.

`agent-tool-desktop-app`는 제품 경계, handoff, agent factory, tool registry, Ollama/local model ops, provider direct runs, AgentCore runtime lifecycle, runtime gates, return-summary workflow를 표시하는 developer desktop shell로 강화했다.

검증은 `workspace-monitor` test/check/build, customer renderer build, Rust `cargo check`, agent-tool desktop test까지 통과했다.
