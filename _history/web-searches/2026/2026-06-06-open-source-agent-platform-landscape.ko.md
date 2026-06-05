# 웹 검색 기록: 오픈소스 Agent Platform Landscape

## 목적

사용자가 현재 플랫폼의 특징을 뽑고 유사 오픈소스를 매우 많이 조사해 달라고 요청했다. 로컬 플랫폼 특징을 추출하기 전, 오픈소스/공식 문서 검색을 먼저 수행해 비교 축과 후보군을 넓혔다.

## 검색어

- `open source AI agent platform desktop app orchestration GitHub`
- `open source multi agent framework orchestration GitHub LangGraph AutoGen CrewAI`
- `open source AI coding agent platform CLI desktop GitHub`
- `open source internal developer platform platform engineering Backstage alternatives GitHub`
- `site:github.com open source AI coding agent CLI repository`
- `site:github.com open source AI agent desktop app repository`
- `site:github.com open source agent orchestration framework LLM repository`
- `site:github.com open source LLM observability evaluation agent repository`
- `Langfuse Phoenix promptfoo OpenTelemetry LLM observability GitHub`
- `Temporal Conductor Argo Tekton Prefect Dagster workflow orchestration GitHub`
- `Backstage Windmill developer platform workflow automation GitHub`
- `LangGraph AutoGen CrewAI OpenAI Agents Python official docs GitHub`

## 확인한 강한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| https://github.com/OpenHands/OpenHands | 오픈소스 repo | AI-driven development environment와 editor/terminal/browser/change lane 계열 | 직접 경쟁 coding agent workbench로 분류 |
| https://github.com/openai/codex | 오픈소스 repo | Rust 기반 terminal coding agent | guest CLI/Rust local execution 참고 |
| https://github.com/google-gemini/gemini-cli | 오픈소스 repo | terminal AI agent | provider-native CLI adapter 후보 |
| https://github.com/cline/cline | 오픈소스 repo | IDE/CLI coding agent, approval/checkpoint UX | 승인/rollback/권한 UI 참고 |
| https://github.com/block/goose | 오픈소스 repo | local extensible AI agent | local process/tool execution 참고 |
| https://github.com/Aider-AI/aider | 오픈소스 repo | terminal pair programming | Git-aware coding workflow 참고 |
| https://github.com/langgenius/dify | 오픈소스 repo | agentic workflow builder | Agent Factory/visual builder 참고 |
| https://github.com/langflow-ai/langflow | 오픈소스 repo | visual agent/workflow builder | graph builder UX 참고 |
| https://github.com/n8n-io/n8n | 오픈소스 repo | workflow automation + AI | credentials/run history/node workflow 참고 |
| https://github.com/open-webui/open-webui | 오픈소스 repo | Ollama/OpenAI/RAG interface | local/provider settings UX 참고 |
| https://github.com/Mintplex-Labs/anything-llm | 오픈소스 repo | local-first AI workspace | workspace/docs/agents 참고 |
| https://github.com/janhq/jan | 오픈소스 repo | offline AI desktop | desktop local model/provider UX 참고 |
| https://github.com/langchain-ai/langgraph | 오픈소스 repo/공식 docs | stateful agent graph | orchestration schema reference |
| https://github.com/microsoft/autogen | 오픈소스 repo/공식 docs | multi-agent programming framework | multi-agent event flow reference |
| https://github.com/crewAIInc/crewAI | 오픈소스 repo/공식 docs | role/task crew orchestration | Agent Factory abstraction reference |
| https://github.com/openai/openai-agents-python | 오픈소스 repo/공식 docs | tools, guardrails, handoffs, tracing | agent runtime primitive reference |
| https://github.com/temporalio/temporal | 오픈소스 repo | durable workflow engine | long-running task state/retry reference |
| https://github.com/backstage/backstage | 오픈소스 repo | developer portal/catalog | plugin/catalog/ownership reference |
| https://github.com/langfuse/langfuse | 오픈소스 repo | LLM observability/eval | learning/evaluation loop reference |
| https://github.com/Arize-ai/phoenix | 오픈소스 repo | AI observability/eval | trace/eval surface reference |
| https://github.com/promptfoo/promptfoo | 오픈소스 repo | prompt/model testing | regression eval reference |

## GitHub API metadata를 확인한 주요 항목

- `n8n-io/n8n`: 191,254 stars
- `Significant-Gravitas/AutoGPT`: 184,789 stars
- `sst/opencode`: 170,465 stars
- `langflow-ai/langflow`: 149,266 stars
- `langgenius/dify`: 144,052 stars
- `open-webui/open-webui`: 140,198 stars
- `google-gemini/gemini-cli`: 104,977 stars
- `openai/codex`: 88,962 stars
- `OpenHands/OpenHands`: 75,923 stars
- `openinterpreter/open-interpreter`: 63,817 stars
- `cline/cline`: 62,810 stars
- `microsoft/autogen`: 58,720 stars
- `crewAIInc/crewAI`: 52,900 stars
- `langchain-ai/langgraph`: 33,985 stars
- `openai/openai-agents-python`: 26,942 stars
- `accomplish-ai/accomplish`: 10,841 stars
- `ValueCell-ai/ClawX`: 7,368 stars
- `agentify-sh/desktop`: 417 stars
- `OpenLoaf/OpenLoaf`: 65 stars

별점은 채택/발견 신호로만 사용했다. 품질, 보안, 유지보수성은 별도 검증이 필요하다.

## 약한 출처/제외

- SEO 비교 글과 vendor ranking page는 후보 발견에는 참고했지만 판단 근거로 쓰지 않았다.
- Reddit, Hacker News, 블로그 코멘트는 adoption/friction signal로만 볼 수 있어 이번 문서의 주요 근거에서 제외했다.
- GitHub API rate limit 이후 항목은 별점/라이선스 수치를 확정하지 않고 "검색 확인"으로만 기록했다.

## 공개 판단 요약

오픈소스 지형은 coding agent, agent framework, visual workflow builder, local-first desktop AI app, workflow orchestration, developer platform, LLM observability로 나뉜다. 현재 플랫폼은 이 중 하나를 그대로 따라가기보다 local desktop host runtime이 guest CLI, provider/model settings, task-run records, decisions, validation, history/evaluation loop, capability promotion을 소유하는 방향이 가장 차별적이다.

## 불확실성

- GitHub 별점은 조사 시점 이후 바뀔 수 있다.
- API rate limit 때문에 일부 항목은 metadata가 누락됐다.
- 라이선스가 `NOASSERTION`이거나 AGPL/fair-code인 프로젝트는 구현 참고 전 별도 license review가 필요하다.
