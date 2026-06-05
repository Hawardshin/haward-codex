# 현재 플랫폼 특징과 오픈소스 Agent Platform Landscape

- 작성일: 2026-06-06
- 작업 모드: `research`
- 대상 프로젝트: `platform-desktop-app/`
- 로컬 근거: `platform-desktop-app/configs/product-feature-registry.json`, `platform-desktop-app/src-tauri/tauri.conf.json`, `platform-desktop-app/renderer/workspace-monitor/src/generated/workspace-snapshot.json`
- 외부 근거: GitHub repository metadata, 공식 문서, 프로젝트 README, 웹 검색 결과

## 요약 결론

현재 플랫폼은 단순 모니터링 화면이나 특정 CLI wrapper가 아니다. 로컬 Tauri 데스크톱 셸이 먼저 실행되고, 그 안에서 Agent Core, CLI orchestration, provider/root tool settings, task-run record, decision inbox, source/spec/validation workbench, history/evaluation learning loop를 소유하는 "Agent OS / Agent Workbench" 성격이 강하다.

오픈소스 지형을 넓게 보면 직접 경쟁군은 `OpenHands`, `Goose`, `Cline`, `Aider`, `opencode`, `OpenAI Codex`, `Gemini CLI`, `Open Interpreter` 같은 coding agent와 `ClawX`, `Accomplish`, `OpenLoaf`, `Jan`, `AnythingLLM`, `Open WebUI` 같은 로컬 데스크톱/워크벤치 제품이다. 그러나 현재 플랫폼의 차별점은 "게스트 CLI를 갈아 끼우는 실행 어댑터"와 "반복 작업을 agent/prompt/workflow/tool/skill/feature로 승격하는 학습 루프"를 같은 설치형 데스크톱 제품 안에 둔다는 점이다.

가장 큰 제품 기회는 "에이전트를 하나 더 만드는 도구"가 아니라, 여러 코딩/AI CLI와 로컬/클라우드 모델을 운영체제 자원 위에서 관리하고, 작업 상태와 결정, 검증, 히스토리, 재사용 승격을 제품의 영속 상태로 삼는 로컬 Agent Workspace Platform이다.

## 현재 플랫폼 특징

| 특징 | 현재 증거 | 의미 |
| --- | --- | --- |
| 설치형 데스크톱 셸 | Tauri product name `Agent Workspace Platform`, bundle target `app`, `dmg`, `msi`, `nsis`, min window `1280x800` | 웹 대시보드보다 데스크톱 개발 도구에 가깝다. |
| Rust/Tauri 네이티브 경계 | hidden native titlebar, transparent titlebar, hardened runtime, native command/PTY/resource telemetry 작업 이력 | 운영체제 process, pipe, memory, window resource를 직접 다루는 방향이 맞다. |
| Agent Core | `agent_factory`가 primary feature로 등록됨 | 반복 작업을 custom agent/subagent/capability로 승격하는 제작 기능이 핵심이다. |
| CLI orchestration | `agent_orchestration`과 CLI adapter registry가 primary/supporting root로 연결됨 | Codex, Claude Code, Gemini CLI, OpenCode 같은 외부 CLI는 제품 자체가 아니라 guest capability다. |
| Agent Work Environment | workspace host, runtime data, task-run records, support diagnostics | 사용자가 "지금 무슨 일이 도는지"와 "어디서 이어받는지"를 볼 수 있어야 한다. |
| Agent Development Environment | source review, diffs, requirements, specs, validation workbench | 단순 채팅 앱이 아니라 코드/문서/검증을 다루는 개발자 작업대다. |
| Root Tool Management | provider accounts, CLI adapter settings, workspace explorer, decision defaults | AI 로그인/모델/adapter/권한 설정은 독립 제품 기능으로 다뤄야 한다. |
| Work Visibility | active/blocked work, deferred decisions, task-run records | 에이전트가 멈춘 이유와 사용자가 결정해야 할 항목을 제품이 소유한다. |
| Learning & Evaluation Loop | history, timings, evaluations, web search logs, `historyInsightLoop`, `fundamentalImprovementStructure` | 반복된 시행착오를 다음 기능과 운영 규칙으로 승격하는 구조가 있다. |
| Observability/Monitoring | product registry에서 supporting layer로 정의 | 모니터링은 핵심 제품 약속이 아니라 Agent Core와 orchestration을 보조하는 운영 표면이다. |
| Customer/developer plane 분리 | customer snapshot sanitization, view mode 개념 | 내부 evidence와 고객용 제품 노출을 분리해야 한다. |

## 비교 축

| 축 | 봐야 하는 질문 | 대표 오픈소스 |
| --- | --- | --- |
| Coding agent execution | 코드 수정, 명령 실행, 브라우저/터미널 제어, 승인/rollback을 어떻게 다루는가 | OpenHands, Cline, Goose, Aider, opencode, Codex, Gemini CLI |
| Multi-agent framework | agent graph, handoff, tool, memory, tracing, guardrail을 어떻게 모델링하는가 | LangGraph, AutoGen, CrewAI, OpenAI Agents, Agno, Semantic Kernel |
| Visual/no-code builder | 사용자가 agent/workflow/tool을 어떻게 만들고 배포하는가 | Dify, Langflow, Flowise, n8n, Activepieces |
| Local-first desktop/workbench | provider, local model, files, docs, terminal, workspace를 어떻게 로컬 앱화하는가 | Jan, AnythingLLM, Open WebUI, LibreChat, LobeHub, ClawX, OpenLoaf |
| Workflow orchestration | long-running 작업, retries, scheduling, visibility, state transition을 어떻게 보장하는가 | Temporal, Conductor, Argo Workflows, Tekton, Prefect, Dagster, Kestra |
| Developer platform | 플러그인, catalog, ownership, workflow, portal을 어떻게 관리하는가 | Backstage, Windmill |
| Eval/observability | traces, prompt tests, LLM eval, cost/latency, failure analysis를 어떻게 기록하는가 | Langfuse, Phoenix, promptfoo, DeepEval, OpenLIT, Helicone, OpenTelemetry |
| Sandbox/runtime | 에이전트가 코드를 실행할 격리 환경을 어떻게 제공하는가 | E2B, OpenHands runtime, Goose/Cline local execution |

## 대량 오픈소스 조사 매트릭스

별점은 2026-06-06 조사 중 GitHub API로 확인한 항목만 기록했다. 별점은 채택/발견 신호일 뿐 품질 증거가 아니다. 일부 후반 항목은 API rate limit 때문에 검색/공식 페이지 확인만 기록했다.

### 1. Coding Agent / IDE / CLI

| 프로젝트 | 성격 | 언어 | 라이선스/API | 조사 시그널 | 현재 플랫폼 관점 |
| --- | --- | --- | --- | --- | --- |
| [OpenHands](https://github.com/OpenHands/OpenHands) | AI software engineer/dev environment | Python | NOASSERTION | 75,923 stars | editor/terminal/browser/changes lane 참고 가치가 높다. |
| [OpenAI Codex](https://github.com/openai/codex) | terminal coding agent | Rust | Apache-2.0 | 88,962 stars | Rust 기반 CLI agent와 local command boundary 참고. |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | terminal AI agent | TypeScript | Apache-2.0 | 104,977 stars | provider-native CLI guest adapter 후보. |
| [opencode](https://github.com/sst/opencode) | open-source coding agent | TypeScript | MIT | 170,465 stars | OpenCode 계열 guest CLI/UX 비교 대상. |
| [Cline](https://github.com/cline/cline) | IDE/CLI coding agent | TypeScript | Apache-2.0 | 62,810 stars | explicit approval, checkpoints, file/terminal/browser tool UX 참고. |
| [Roo Code](https://github.com/RooCodeInc/Roo-Code) | editor AI agent | TypeScript | Apache-2.0 | 24,209 stars, archived | mode/role 기반 coding agent 패턴 참고. |
| [Goose](https://github.com/block/goose) | extensible local AI agent | Rust | Apache-2.0 | 46,712 stars | 설치/실행/수정/테스트를 수행하는 local agent runtime 참고. |
| [Aider](https://github.com/Aider-AI/aider) | terminal pair programming | Python | Apache-2.0 | 45,812 stars | Git-aware coding flow와 terminal-first UX 참고. |
| [Open Interpreter](https://github.com/openinterpreter/open-interpreter) | natural language computer interface | Python | AGPL-3.0 | 63,817 stars | 로컬 컴퓨터 제어, 보안/권한 경계 참고. |
| [Continue](https://github.com/continuedev/continue) | open-source coding assistant | TypeScript | Apache-2.0 | 33,552 stars | IDE extension + CLI + checks 통합 참고. |
| [Tabby](https://github.com/TabbyML/tabby) | self-hosted coding assistant | Rust | NOASSERTION | 33,564 stars | self-hosted model/coding infra 참고. |
| [Void](https://github.com/voideditor/void) | open-source Cursor-like editor | TypeScript | Apache-2.0 | 28,817 stars, archived | AI editor shell 참고, archived라 dependency 후보는 아님. |
| [Crush](https://github.com/charmbracelet/crush) | agentic coding CLI | Go | NOASSERTION | 25,027 stars | terminal-native interaction pattern 참고. |
| [Devika](https://github.com/stitionai/devika) | agentic software engineer | Python | MIT | 19,509 stars | autonomous software engineer PoC 참고. |
| [gptme](https://github.com/gptme/gptme) | terminal agent with local tools | Python | MIT | 4,315 stars | 작은 local tool-running agent 참고. |
| [smol-ai/developer](https://github.com/smol-ai/developer) | developer agent library | Python | MIT | 12,190 stars | 간단한 developer-agent loop 참고. |
| [OpenClaude](https://github.com/Gitlawb/openclaude) | multi-provider Claude-like client | TypeScript | NOASSERTION | 28,386 stars | multi-provider client UX 참고, 사실 검증 추가 필요. |

### 2. Agent Framework / Runtime / SDK

| 프로젝트 | 성격 | 언어 | 라이선스/API | 조사 시그널 | 현재 플랫폼 관점 |
| --- | --- | --- | --- | --- | --- |
| [LangGraph](https://github.com/langchain-ai/langgraph) | resilient agent graph framework | Python | MIT | 33,985 stars | handoff, graph, state, durable execution reference. |
| [Microsoft AutoGen](https://github.com/microsoft/autogen) | agentic AI programming framework | Python | CC-BY-4.0 | 58,720 stars | multi-agent event flow와 no-code prototyping 참고. |
| [CrewAI](https://github.com/crewAIInc/crewAI) | role-based agent orchestration | Python | MIT | 52,900 stars | crew/role/task abstraction 참고. |
| [OpenAI Agents Python](https://github.com/openai/openai-agents-python) | lightweight multi-agent workflow SDK | Python | MIT | 26,942 stars | tool, guardrail, handoff, tracing primitive 참고. |
| [Agno](https://github.com/agno-agi/agno) | build/run/manage agent platforms | Python | Apache-2.0 | 40,535 stars | platform-level agent management reference. |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | LLM app SDK | C# | MIT | 28,058 stars | planner/function/plugin abstraction 참고. |
| [smolagents](https://github.com/huggingface/smolagents) | code-thinking agents | Python | Apache-2.0 | 27,722 stars | small code-agent runtime 참고. |
| [LlamaIndex](https://github.com/run-llama/llama_index) | document agent/RAG workflow | Python | MIT | 49,939 stars | data/document agent layer 참고. |
| [DSPy](https://github.com/stanfordnlp/dspy) | programmatic LM optimization | Python | MIT | 34,867 stars | prompt/program optimization loop 참고. |
| [Pydantic AI](https://github.com/pydantic/pydantic-ai) | typed agent framework | Python | MIT | 17,543 stars | typed result/schema validation reference. |
| [CAMEL](https://github.com/camel-ai/camel) | multi-agent framework | Python | Apache-2.0 | 17,122 stars | agent society/task decomposition reference. |
| [AgentScope](https://github.com/agentscope-ai/agentscope) | visible/trustable agent framework | Python | Apache-2.0 | 26,262 stars | observability-facing agent development 참고. |
| [Haystack](https://github.com/deepset-ai/haystack) | RAG/agent orchestration | Python/MDX | Apache-2.0 | 25,468 stars | pipeline/RAG/agent component reference. |
| [Mastra](https://github.com/mastra-ai/mastra) | TypeScript agent app framework | TypeScript | NOASSERTION | 24,805 stars | TS stack agent app composition 참고. |
| [TaskWeaver](https://github.com/microsoft/TaskWeaver) | code-first data analytics agent | Python | MIT | 6,164 stars, archived | code-first planning pattern 참고. |
| [Julep](https://github.com/julep-ai/julep) | serverless AI workflow/agents | Notebook | no license in API | 6,606 stars | hosted workflow-state API 참고. |
| [SmythOS SRE](https://github.com/SmythOS/sre) | cloud-native agent runtime | TypeScript | MIT | 1,276 stars | agent runtime/control plane 참고. |
| [E2B](https://github.com/e2b-dev/E2B) | secure agent sandbox | Python | Apache-2.0 | 12,484 stars | code execution sandbox 후보/참고. |

### 3. Agent App Builder / Workflow Automation

| 프로젝트 | 성격 | 언어 | 라이선스/API | 조사 시그널 | 현재 플랫폼 관점 |
| --- | --- | --- | --- | --- | --- |
| [Dify](https://github.com/langgenius/dify) | agentic workflow development platform | TypeScript | NOASSERTION | 144,052 stars | visual workflow, app publishing, dataset/provider UX 참고. |
| [Langflow](https://github.com/langflow-ai/langflow) | visual agent/workflow builder | Python | MIT | 149,266 stars | graph-based builder UX 참고. |
| [Flowise](https://github.com/FlowiseAI/Flowise) | visual AI agent builder | TypeScript | NOASSERTION | 53,374 stars | low-code node graph reference. |
| [n8n](https://github.com/n8n-io/n8n) | workflow automation with AI | TypeScript | NOASSERTION/fair-code | 191,254 stars | node automation, credentials, execution log reference. |
| [Activepieces](https://github.com/activepieces/activepieces) | AI agents + MCP + workflow automation | TypeScript | NOASSERTION | 22,578 stars | workflow automation + agent pieces reference. |
| [Windmill](https://github.com/windmill-labs/windmill) | developer platform for scripts/workflows/UIs | HTML/API | NOASSERTION | 16,661 stars | developer workflow app/platform reference. |
| [Kestra](https://github.com/kestra-io/kestra) | event-driven orchestration/scheduling | Java | Apache-2.0 | 26,969 stars | execution log, scheduling, retries, state visibility 참고. |
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | AI agent/build tools | Python | NOASSERTION | 184,789 stars | autonomous agent history and marketplace/build direction 참고. |
| [BabyAGI](https://github.com/yoheinakajima/babyagi) | early autonomous agent loop | Python | no license in API | 22,294 stars | historical minimal task loop reference. |

### 4. Local-first AI Desktop / Chat / Workspace

| 프로젝트 | 성격 | 언어 | 라이선스/API | 조사 시그널 | 현재 플랫폼 관점 |
| --- | --- | --- | --- | --- | --- |
| [Open WebUI](https://github.com/open-webui/open-webui) | local/remote AI interface | Python | NOASSERTION | 140,198 stars | Ollama/OpenAI/provider/RAG UX 참고. |
| [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | local-first AI app/agents | JavaScript | MIT | 61,117 stars | local-first workspace, docs, agents 참고. |
| [Jan](https://github.com/janhq/jan) | offline ChatGPT alternative | TypeScript | NOASSERTION | 42,882 stars | desktop local model/provider UX reference. |
| [LibreChat](https://github.com/danny-avila/LibreChat) | multi-provider ChatGPT clone with agents/MCP | TypeScript | MIT | 38,210 stars | multi-provider chat/settings/action UX 참고. |
| [LobeHub](https://github.com/lobehub/lobehub) | agent/operator chat workspace | TypeScript | NOASSERTION | 78,244 stars | agent/chat workspace product reference. |
| [Accomplish](https://github.com/accomplish-ai/accomplish) | open-source AI coworker desktop | TypeScript | MIT | 10,841 stars | desktop coworker/task UX 직접 참고. |
| [ClawX](https://github.com/ValueCell-ai/ClawX) | desktop UI for OpenClaw AI agents | TypeScript | MIT | 7,368 stars | CLI orchestration을 데스크톱 경험으로 바꾸는 직접 참고. |
| [Agentify Desktop](https://github.com/agentify-sh/desktop) | desktop app for Codex/Claude/OpenCode + MCP browser sessions | JavaScript | MPL-2.0 | 417 stars | 현 플랫폼과 매우 가까운 guest CLI desktop shell 참고. |
| [OpenLoaf](https://github.com/OpenLoaf/OpenLoaf) | local-first AI workspace desktop | TypeScript | AGPL-3.0 | 65 stars | agents, multi-model chat, docs, terminal 통합 참고. |
| [Khoj](https://github.com/khoj-ai/khoj) | personal AI/second brain assistant | Python | 검색 확인 | API rate limited | knowledge workspace/RAG 참고. |
| [Cherry Studio](https://github.com/CherryHQ/cherry-studio) | AI desktop client | TypeScript | 검색 확인 | API rate limited | multi-provider desktop UX 참고. |
| [Chatbox](https://github.com/chatboxai/chatbox) | desktop AI client | TypeScript | 검색 확인 | API rate limited | lightweight provider desktop UX 참고. |

### 5. Platform Engineering / Workflow Orchestration Adjacent

| 프로젝트 | 성격 | 직접성 | 현재 플랫폼 관점 |
| --- | --- | --- | --- |
| [Backstage](https://github.com/backstage/backstage) | internal developer portal/platform | 인접 | plugin/catalog/ownership model 참고. |
| [Temporal](https://github.com/temporalio/temporal) | durable workflow execution | 인접 | long-running agent task durability/retry semantics reference. |
| [Conductor](https://github.com/conductor-oss/conductor) | workflow orchestration | 인접 | task graph/state visibility reference. |
| [Argo Workflows](https://github.com/argoproj/argo-workflows) | Kubernetes workflow engine | 인접 | DAG, artifact, retry, workflow UI reference. |
| [Tekton Pipelines](https://github.com/tektoncd/pipeline) | CI/CD pipeline primitives | 인접 | task/pipeline/resource abstraction reference. |
| [Prefect](https://github.com/PrefectHQ/prefect) | Python workflow orchestration | 인접 | flow/task state and local/cloud control plane reference. |
| [Dagster](https://github.com/dagster-io/dagster) | data orchestrator | 인접 | asset graph, run history, observability reference. |

### 6. Eval / Observability / Tracing Adjacent

| 프로젝트 | 성격 | 직접성 | 현재 플랫폼 관점 |
| --- | --- | --- | --- |
| [Langfuse](https://github.com/langfuse/langfuse) | LLM observability/eval | 인접 | traces, prompt versioning, cost/latency, eval feedback 참고. |
| [Phoenix](https://github.com/Arize-ai/phoenix) | AI observability/evaluation | 인접 | tracing/eval/debugging surface reference. |
| [promptfoo](https://github.com/promptfoo/promptfoo) | prompt/model test harness | 인접 | regression eval and provider comparison 참고. |
| [DeepEval](https://github.com/confident-ai/deepeval) | LLM evaluation framework | 인접 | test-style LLM evaluation 참고. |
| [OpenLIT](https://github.com/openlit/openlit) | OpenTelemetry-native LLM observability | 인접 | OTEL-compatible tracing/cost metrics 참고. |
| [Helicone](https://github.com/Helicone/helicone) | LLM gateway/observability | 인접 | request logging, cost, latency, provider analytics 참고. |
| [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) | telemetry pipeline | 인접 | vendor-neutral telemetry/export boundary 참고. |

## 플랫폼별 강점 추출

| 레퍼런스군 | 강점 | 현재 플랫폼 적용 방향 |
| --- | --- | --- |
| OpenHands/Cline/Goose/Aider | coding task를 editor, terminal, browser, diff, approval, checkpoint로 나눠 보여준다. | Agent Work Environment에 작업 lane, 승인, 변경사항, takeover, rollback을 더 강하게 둔다. |
| Codex/Gemini CLI/opencode | CLI agent 자체를 빠르게 실행하고 repo context를 다룬다. | 이들은 "제품 대체"가 아니라 guest CLI adapter로 다루고, 실행 상태/기록/결정은 플랫폼이 소유한다. |
| Dify/Langflow/Flowise | agent/workflow를 사용자가 눈으로 만들 수 있게 한다. | Agent Factory에서 prompt/workflow/tool/skill/agent 승격을 선택형 wizard와 graph로 제공한다. |
| n8n/Activepieces/Windmill/Kestra | credentials, node workflow, run history, retry, scheduler가 강하다. | Root Tool Management와 task-run record에 credential boundary, run log, retry/cleanup policy를 연결한다. |
| Jan/AnythingLLM/Open WebUI/LibreChat | local model, provider, workspace, docs, RAG UX가 성숙하다. | AI 로그인/모델 설정을 텍스트 입력보다 선택형 provider account/workspace flow로 바꾼다. |
| LangGraph/AutoGen/CrewAI/OpenAI Agents | handoff, guardrail, tracing, role/task graph를 제공한다. | 내부 agent definition schema와 execution graph 설계의 reference로 삼는다. |
| Temporal/Conductor/Argo/Prefect/Dagster | durable workflow, retries, state machine, run graph가 강하다. | long-running agent tasks를 단순 React state가 아니라 run record/state transition으로 모델링한다. |
| Langfuse/Phoenix/promptfoo/OpenLIT | LLM trace/eval/cost/latency 분석이 강하다. | learning loop의 evidence/evaluation layer를 제품 기능으로 시각화한다. |

## 차별화 포지션

| 영역 | 많은 오픈소스의 위치 | 현재 플랫폼의 가능한 포지션 |
| --- | --- | --- |
| CLI agent | 한 CLI가 주인공이다. | 여러 CLI를 guest capability로 관리하는 host runtime. |
| Agent framework | 라이브러리/SDK 중심이다. | 사용자가 설정, 실행, 관찰, 검증, 승격까지 하는 데스크톱 제품. |
| No-code builder | agent/workflow를 만드는 데 강하다. | 만든 agent가 실제 repo/terminal/decision/evaluation loop에서 실행되는 운영 워크벤치. |
| Local AI desktop | chat/provider/RAG 중심이다. | 코드, 명령, 프로세스, workspace, history까지 포함한 개발자 agent workbench. |
| Workflow engine | 일반 workflow/dag에 강하다. | agent 작업의 human decision, CLI adapter, source diff, validation gate에 특화. |
| Observability | 실행 후 분석에 강하다. | 실행 전 계획, 실행 중 결정, 실행 후 평가와 capability promotion을 모두 연결. |

## 구조적 인사이트

1. 현 플랫폼은 "AI 채팅 앱"으로 가면 안 된다. Jan/Open WebUI/LibreChat과 경쟁하면 provider UI와 chat polish 싸움이 된다.
2. 현 플랫폼은 "단일 코딩 에이전트"로 가도 안 된다. Codex/Gemini CLI/opencode/Cline/Aider가 이미 강하고 빠르다.
3. 더 맞는 포지션은 "local Agent Workspace OS"다. 즉, 여러 agent/CLI/model/tool을 실행하고, 그 결과를 task-run, decision, validation, history, reusable capability로 제품화한다.
4. 데스크톱 앱의 강점은 local files, process, PTY, memory, window, background worker, OS credential/keychain, native notification, menu/shortcut을 쓸 수 있다는 점이다.
5. 사용자가 반복해서 지적한 느린 탭, 불편한 editor, 기본 버튼/dropdown, 텍스트 입력 위주의 설정 문제는 모두 "웹 대시보드처럼 만든 흔적"으로 해석할 수 있다.
6. 따라서 UI도 mobile-first website가 아니라 IDE/Desktop tool 기준으로 재정의되어야 한다. 최소 창 크기를 둔 것은 이 방향과 맞다.
7. 설정은 raw text form보다 선택형 provider/model/adapter/workspace/permission wizard가 맞다.
8. execution은 React mount 비용이 아니라 Rust/Tauri side runtime, resident cache, bounded process manager, PTY lifecycle, snapshot/cache invalidation으로 최적화해야 한다.
9. learning loop는 강한 차별점이다. 대부분의 오픈소스가 "실행" 또는 "빌더"에 집중하지만, 반복 이력을 capability로 승격하는 제품 루프는 드물다.

## 우선 딥다이브 후보

1. 직접 경쟁: OpenHands, Goose, Cline, Aider, opencode, Codex, Gemini CLI, Open Interpreter.
2. 데스크톱 셸: ClawX, Accomplish, Agentify Desktop, OpenLoaf, Jan, AnythingLLM, Open WebUI.
3. 제작/워크플로: Dify, Langflow, Flowise, n8n, Activepieces, Windmill.
4. 실행 지속성: Temporal, Conductor, Kestra, Prefect.
5. 평가/관측: Langfuse, Phoenix, promptfoo, OpenLIT.

## 다음 구현 방향 후보

| 후보 | 이유 | 참고 프로젝트 |
| --- | --- | --- |
| Guest CLI adapter cockpit | CLI별 설치 상태, 모델, 권한, 현재 run, stdout/stderr, cancel/retry를 한 화면에서 통제 | Codex, Gemini CLI, opencode, Goose, Cline |
| Resident workspace prewarm | 탭 전환 때 mount/load하지 않고 desktop runtime cache에 상주 | Tauri, IDE workbench, OpenHands |
| Agent Factory wizard | prompt/workflow/tool/skill/agent 중 무엇을 만들지 선택지 기반으로 안내 | Dify, Langflow, Flowise, CrewAI |
| Decision Inbox | 승인/질문/credential/권한/merge gate를 버튼 상태로 처리 | Cline, GitHub Copilot agent, workflow engines |
| Run Record timeline | process graph, pipe, artifacts, validation, evaluation을 run 단위로 저장 | Temporal, Conductor, Kestra, Langfuse |
| Provider Account Center | OpenAI/Anthropic/Gemini/Ollama/Local model을 로그인/키/상태/모델 선택 중심으로 구성 | Jan, Open WebUI, AnythingLLM, LibreChat |
| Evaluation cockpit | promptfoo/Langfuse/Phoenix식 평가와 비용/지연/실패 분석 | Langfuse, Phoenix, promptfoo, OpenLIT |

## 라이선스/보안 주의

- `AGPL`, `fair-code`, `NOASSERTION` 프로젝트는 제품 참고는 가능하지만 source copy, bundling, dependency adoption 전 별도 license/security audit가 필요하다.
- 별점과 커뮤니티 반응은 adoption/discovery signal이지 품질, 보안, 유지보수성의 증거가 아니다.
- desktop agent는 local file, shell, browser, credential을 만지므로 prompt injection, untrusted content, permission escalation, process leak, secret exposure를 기본 위험으로 둬야 한다.
- CLI를 필수 dependency로 만들기 전에 optional capability와 `capability_missing` fallback을 유지해야 한다.

## Source Notes

주요 공식/프로젝트 출처:

- OpenHands: https://github.com/OpenHands/OpenHands
- OpenAI Codex: https://github.com/openai/codex
- Gemini CLI: https://github.com/google-gemini/gemini-cli
- Cline: https://github.com/cline/cline
- Goose: https://github.com/block/goose
- Aider: https://github.com/Aider-AI/aider
- Dify: https://github.com/langgenius/dify
- Langflow: https://github.com/langflow-ai/langflow
- n8n: https://github.com/n8n-io/n8n
- Open WebUI: https://github.com/open-webui/open-webui
- AnythingLLM: https://github.com/Mintplex-Labs/anything-llm
- Jan: https://github.com/janhq/jan
- LangGraph: https://github.com/langchain-ai/langgraph
- AutoGen: https://github.com/microsoft/autogen
- CrewAI: https://github.com/crewAIInc/crewAI
- OpenAI Agents Python: https://github.com/openai/openai-agents-python
- Temporal: https://github.com/temporalio/temporal
- Backstage: https://github.com/backstage/backstage
- Langfuse: https://github.com/langfuse/langfuse
- Phoenix: https://github.com/Arize-ai/phoenix
- promptfoo: https://github.com/promptfoo/promptfoo

약한 출처 처리:

- SEO성 비교 글, vendor ranking page, 단순 Reddit/커뮤니티 글은 후보 발견에만 사용하고 제품 판단의 근거로 쓰지 않았다.
- GitHub API rate limit 뒤에 확인한 항목은 별점/라이선스 수치 대신 "검색 확인"으로만 표시했다.
