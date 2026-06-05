# 기능별 오픈소스 레퍼런스 맵

- 작성일: 2026-06-06
- 대상: `platform-desktop-app/`
- 기준 기능: `platform-desktop-app/configs/product-feature-registry.json`
- 검증 방식: 웹 검색, 공식 GitHub 페이지 확인, `git ls-remote` 존재 확인

## 요약

현재 플랫폼 기능을 8개 layer로 나누면, 오픈소스 조사는 "비슷한 앱 하나"보다 기능별 reference pool을 따로 유지하는 편이 낫다. CLI orchestration은 coding agent/desktop wrapper를 봐야 하고, Agent Core는 workflow builder와 agent framework를 봐야 하며, learning/evaluation은 observability/eval 도구를 봐야 한다. 같은 프로젝트라도 기능별로 보는 포인트가 다르므로, 앞으로 구현 전에는 아래 매트릭스에서 해당 기능군의 1차 후보를 먼저 직접 탐구한다.

## 기능별 후보 매트릭스

| 기능 layer | 1차로 볼 오픈소스 | 볼 부분 | 적용 포인트 |
| --- | --- | --- | --- |
| CLI Orchestration | [OpenHands](https://github.com/OpenHands/OpenHands), [Codex CLI](https://github.com/openai/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), [opencode](https://github.com/anomalyco/opencode), [Cline](https://github.com/cline/cline), [Goose](https://github.com/aaif-goose/goose), [Aider](https://github.com/Aider-AI/aider), [CLI Agent Orchestrator](https://github.com/awslabs/cli-agent-orchestrator), [Agentify Desktop](https://github.com/agentify-sh/desktop), [ClawX](https://github.com/ValueCell-ai/ClawX), [OpenLoaf](https://github.com/OpenLoaf/OpenLoaf) | CLI session lifecycle, terminal IO, tool-call cards, approvals, checkpoint, multi-agent/task routing, provider switching | Agent CLI Cockpit, process graph, pipe/PTY split, task pipe, defer/resume, multi-lane merge gate |
| Agent Work Environment | [OpenHands](https://github.com/OpenHands/OpenHands), [OpenLoaf](https://github.com/OpenLoaf/OpenLoaf), [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm), [Jan](https://github.com/janhq/jan), [Open WebUI](https://github.com/open-webui/open-webui), [LibreChat](https://github.com/danny-avila/LibreChat), [Temporal](https://github.com/temporalio/temporal), [Kestra](https://github.com/kestra-io/kestra), [Windmill](https://github.com/windmill-labs/windmill) | workspace/project model, task/run records, local data ownership, logs/artifacts, retries, support diagnostics | Workspace Host, runtime data plane, accumulated data index, task-run retention, recovery flow |
| Agent Development Environment | [Cline](https://github.com/cline/cline), [Continue](https://github.com/continuedev/continue), [OpenHands](https://github.com/OpenHands/OpenHands), [Aider](https://github.com/Aider-AI/aider), [GitButler](https://github.com/gitbutlerapp/gitbutler), [Sourcebot](https://github.com/sourcebot-dev/sourcebot), [Monocle](https://getmonocle.sh/), [CorgReview](https://corgreview.com/) | file context, multi-file editing, diff review, code search, source index, AI-generated code review UX | Source workbench, scoped file index, draft queue, diff preview, validation handoff |
| Agent Core / Agent Factory | [Dify](https://github.com/langgenius/dify), [Langflow](https://github.com/langflow-ai/langflow), [Flowise](https://github.com/FlowiseAI/Flowise), [n8n](https://github.com/n8n-io/n8n), [Activepieces](https://github.com/activepieces/activepieces), [Windmill](https://github.com/windmill-labs/windmill), [LangGraph](https://github.com/langchain-ai/langgraph), [AutoGen](https://github.com/microsoft/autogen), [CrewAI](https://github.com/crewAIInc/crewAI), [OpenAI Agents Python](https://github.com/openai/openai-agents-python), [AgentCore Samples](https://github.com/awslabs/agentcore-samples) | agent/workflow builder, graph, tool wiring, guardrails, handoff, templates, deployment/invoke/eval lifecycle | AgentCore blueprint wizard, smallest asset promotion, prompt/workflow/tool/skill/agent creation, capability promotion trace |
| Learning & Evaluation Loop | [Langfuse](https://github.com/langfuse/langfuse), [Phoenix](https://github.com/Arize-ai/phoenix), [promptfoo](https://github.com/promptfoo/promptfoo), [DeepEval](https://github.com/confident-ai/deepeval), [OpenLIT](https://github.com/openlit/openlit), [Helicone](https://github.com/Helicone/helicone), [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) | traces, datasets, prompt/eval versioning, cost/latency, feedback loop, OpenTelemetry integration | Evaluation cockpit, work-timing bottleneck view, evidence trail, prompt regression gates, provider cost/latency records |
| Root Tool Management | [Open WebUI](https://github.com/open-webui/open-webui), [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm), [Jan](https://github.com/janhq/jan), [LibreChat](https://github.com/danny-avila/LibreChat), [LobeChat](https://github.com/lobehub/lobe-chat), [Cherry Studio](https://github.com/CherryHQ/cherry-studio), [Ollama](https://github.com/ollama/ollama), [MCP Servers](https://github.com/modelcontextprotocol/servers), [Agentify Desktop](https://github.com/agentify-sh/desktop) | provider catalogs, credential state, local model catalog, MCP server install/config, tool safety, workspace file tools | Provider Account Center, CLI adapter setup doctor, MCP manager, root tool reuse across agents and lanes |
| Work Visibility | [Temporal](https://github.com/temporalio/temporal), [Kestra](https://github.com/kestra-io/kestra), [n8n](https://github.com/n8n-io/n8n), [Windmill](https://github.com/windmill-labs/windmill), [Prefect](https://github.com/PrefectHQ/prefect), [Dagster](https://github.com/dagster-io/dagster), [Argo Workflows](https://github.com/argoproj/argo-workflows), [Conductor](https://github.com/conductor-oss/conductor), [Langfuse](https://github.com/langfuse/langfuse) | run graph, state transition, approval queue, audit log, activity timeline, retries, actor/workflow registry | Decision Inbox, task-run timeline, run status bar, blocked/unblocked lanes, decision lineage |
| Observability & Monitoring | [Backstage](https://github.com/backstage/backstage), [Grafana](https://github.com/grafana/grafana), [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector), [Langfuse](https://github.com/langfuse/langfuse), [Phoenix](https://github.com/Arize-ai/phoenix), [OpenLIT](https://github.com/openlit/openlit) | service catalog, plugin navigation, metrics/logs/traces, health checks, readiness gates | Operator Center, service readiness, support diagnostics, customer/internal view split |
| Desktop Shell / Native Runtime | [Tauri](https://github.com/tauri-apps/tauri), [xterm.js](https://github.com/xtermjs/xterm.js), [node-pty](https://github.com/microsoft/node-pty), [WezTerm](https://github.com/wezterm/wezterm), [Microsoft Terminal](https://github.com/microsoft/terminal), [Terax](https://github.com/crynta/terax-ai) | native shell boundary, PTY lifecycle, terminal rendering, process cleanup, file/IPC permissions, packaging | Rust/Tauri runtime, native PTY drawer, resource telemetry, package/release gates |

## 우선순위

1. `CLI Orchestration`, `Work Visibility`, `Root Tool Management`을 먼저 본다. 사용자가 반복해서 지적한 느린 실행/터미널/설정/의사결정 마찰과 직접 연결된다.
2. `Agent Core / Agent Factory`는 기능 확장 전에 builder/wizard 구조를 Dify/Langflow/Flowise/n8n/Windmill과 비교한다.
3. `Learning & Evaluation Loop`는 Langfuse/Phoenix/promptfoo/OpenLIT를 기준으로 trace/eval/cost/latency schema를 먼저 설계한다.
4. `Desktop Shell / Native Runtime`은 실제 OS 자원, PTY, process, package를 다룰 때마다 Tauri/xterm/node-pty/WezTerm류를 참고한다.

## 직접 탐구 후보

다음 구현 slice 전에 clone해서 source까지 볼 후보:

- CLI orchestration: `OpenHands/OpenHands`, `awslabs/cli-agent-orchestrator`, `agentify-sh/desktop`, `anomalyco/opencode`, `aaif-goose/goose`
- Root tool/provider: `open-webui/open-webui`, `Mintplex-Labs/anything-llm`, `janhq/jan`, `modelcontextprotocol/servers`
- Agent builder: `langgenius/dify`, `langflow-ai/langflow`, `FlowiseAI/Flowise`, `n8n-io/n8n`, `windmill-labs/windmill`
- Evaluation: `langfuse/langfuse`, `Arize-ai/phoenix`, `promptfoo/promptfoo`, `openlit/openlit`
- Native runtime: `tauri-apps/tauri`, `xtermjs/xterm.js`, `microsoft/node-pty`, `wezterm/wezterm`

## 검증 메모

- GitHub API 메타데이터 호출은 403으로 실패했다. 따라서 stars/license 대량 수집은 이번 기록에서 제외했다.
- 위 repo들은 공식 GitHub 페이지 또는 `git ls-remote`로 존재를 확인했다.
- `serialport/node-pty`는 존재하지 않아 `microsoft/node-pty`로 정정했다.
- 검색 결과에 나온 `OperatorBoard`, `AgenticQueue`, `OpenCovibe`, `Phasr`, `Crest` 같은 신규 제품형 사이트는 adoption/discovery 신호로만 취급하고, 구현 근거는 GitHub repo와 직접 clone 가능한 source가 있는 후보를 우선한다.

## 구현 적용 원칙

- 각 기능 변경 전 해당 기능 layer의 1차 후보 중 최소 2개 이상을 직접 비교한다.
- 오픈소스 UI를 그대로 모방하지 않고, 현재 플랫폼의 product role과 runtime boundary에 맞는 pattern만 이식한다.
- dependency 도입은 별도 installation audit와 rollback plan이 있을 때만 한다.
- source clone은 `/tmp` 같은 임시 경로에서 하고, 필요한 근거는 `_research`와 `_history/web-searches`에 URL/접근일/적용 포인트로 남긴다.
