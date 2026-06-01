# Prompt Router

Use when: 작업 성격에 맞는 재사용 프롬프트를 빠르게 선택해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Route

| Situation | Use |
| --- | --- |
| 모든 새 지시를 처리하기 전에 웹 검색을 먼저 한다 | [05-web-first-intake.md](05-web-first-intake.md) |
| 새 세션에서 저장소 규칙과 설정을 잊지 않도록 메모리 anchor를 로드한다 | [01-memory-bootstrap.md](01-memory-bootstrap.md) |
| 작업 성격에 맞게 전체 루프 강도를 고른다 | [02-select-work-mode.md](02-select-work-mode.md) |
| 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 UI/운영 화면에서 나눈다 | [103-view-mode-selection.md](103-view-mode-selection.md) |
| 플랫폼을 사용하는 설치인지, 플랫폼을 개선하는 개발자 설치인지 구분한다 | [92-select-install-mode.md](92-select-install-mode.md) |
| 플랫폼을 설치형 desktop/end-user software로 제품화하거나 Tauri/Electron/MSIX/DMG/signing/notarization/update/uninstall을 검토한다 | [93-installable-software-productization.md](93-installable-software-productization.md) |
| Rust, Go, Tauri, Wails, Electron, Python, TypeScript/Next.js 같은 런타임/언어 선택을 조사하고 설계한다 | [94-runtime-language-research-design.md](94-runtime-language-research-design.md) |
| 설치형 플랫폼 또는 프로젝트가 외부 CLI를 사용하되 특정 CLI에 종속되지 않는 adapter 경계를 설계한다 | [97-cli-adapter-integration.md](97-cli-adapter-integration.md) |
| 하나의 동작이 여러 CLI 프로세스를 실행하거나 pipe/fan-out/fan-in/merge 구조를 가져야 한다 | [101-cli-pipeline-orchestration.md](101-cli-pipeline-orchestration.md) |
| 여러 에이전트를 쉽게 만들거나, 새 agent spec을 등록하거나, supervisor/router/pipeline/fan-out/handoff 오케스트레이션을 설계한다 | [102-agent-creation-orchestration.md](102-agent-creation-orchestration.md) |
| 설치형 desktop app의 사용자 플로우, 첫 실행 온보딩, workspace chooser, task timeline, decision inbox, 설정/복구 흐름을 설계한다 | [104-desktop-user-flow-design.md](104-desktop-user-flow-design.md) |
| 긴 대화, 문서, 조사 자료, 리뷰, 로그, 메모 같은 비정형 입력을 요구사항, 태스크, evidence item, 표, JSON 등 정형 기록으로 바꾼다 | [98-structure-unstructured-data.md](98-structure-unstructured-data.md) |
| 작업을 닫기 전에 빠뜨린 지시, 요구사항, 산출물, 검증이 없는지 coverage를 만든다 | [99-omission-prevention.md](99-omission-prevention.md) |
| 장시간 실행, 브라우저 자동화, worker, cache, stream, 대용량 처리, 외부 CLI 등에서 메모리/리소스 누수 위험을 확인한다 | [100-resource-leak-prevention.md](100-resource-leak-prevention.md) |
| 새 작업을 시작한다 | [10-start-work.md](10-start-work.md) |
| 새 프로젝트를 만든다 | [20-create-project.md](20-create-project.md) |
| 작업이나 관심사의 프로젝트 소유 경계를 정한다 | [25-scope-project-boundary.md](25-scope-project-boundary.md) |
| 새 코딩 프로젝트나 프로젝트 내부 코딩 모듈을 기술별 구조로 준비한다 | [27-bootstrap-coding-project.md](27-bootstrap-coding-project.md) |
| Python 에이전트나 플랫폼 기능을 만든다 | [30-build-agent.md](30-build-agent.md) |
| 사용자 요청을 요구사항으로 정의/수정/검토하고 구현 기준으로 삼는다 | [35-manage-requirements.md](35-manage-requirements.md) |
| 요구사항을 spec, plan, tasks, validation, traceability로 바꾼 뒤 구현한다 | [36-manage-spec.md](36-manage-spec.md) |
| 프로젝트 스펙이 애매하거나 현재 소스/테스트/산출물이 스펙과 다르다 | [38-reconcile-spec-source.md](38-reconcile-spec-source.md) |
| 커스텀 Codex 스킬을 생성, 수정, 검증, 개선한다 | [37-manage-skill.md](37-manage-skill.md) |
| 반복 작업을 스킬, 도구, 템플릿으로 승격한다 | [40-promote-capability.md](40-promote-capability.md) |
| 컨텍스트가 길어졌다 | [50-compress-context.md](50-compress-context.md) |
| 다음 세션이 문서만 보고 재개하도록 컨텍스트 아카이브를 만든다 | [_ops/workflows/45-context-archive.md](../workflows/45-context-archive.md) |
| 작업별 소요시간과 병목 후보를 기록한다 | [42-record-work-timing.md](42-record-work-timing.md) |
| 작업을 마무리한다 | [60-close-work.md](60-close-work.md) |
| 완료 결과를 초기 지시와 비교 평가한다 | [70-evaluate-work.md](70-evaluate-work.md) |
| 진행 중인 에이전트와 병렬 작업을 확인하거나 갱신한다 | [80-coordinate-work.md](80-coordinate-work.md) |
| 속도 개선을 위해 작업을 병렬 lane으로 나눌 수 있는지 판단한다 | [82-parallel-work-planning.md](82-parallel-work-planning.md) |
| 에이전트 운영 철학이나 세계관을 정리한다 | [_philosophy/agent-operating-philosophy.ko.md](../../_philosophy/agent-operating-philosophy.ko.md) |
| 웹/문서/저장소 검색에서 인사이트를 도출해 계획한다 | [85-research-insight-plan.md](85-research-insight-plan.md) |
| 웹 검색을 사람이 실제로 하듯 query ladder, source lane, snowballing, 좋은 출처 요약으로 확장한다 | [84-human-like-source-discovery.md](84-human-like-source-discovery.md) |
| API, 라이브러리, 버그, 아키텍처, 성능, 보안, 마이그레이션 등 코딩 조사를 완료한다 | [86-coding-research.md](86-coding-research.md) |
| 딥리서치, 긴 보고서, landscape/literature review, 여러 출처 기반 근거 보고서를 만든다 | [87-deep-research.md](87-deep-research.md) |
| AI를 잘 쓰는 사람과 못 쓰는 사람의 차이를 진단하고 간극을 줄이는 작업 구조를 만든다 | [89-bridge-ai-usage-gap.md](89-bridge-ai-usage-gap.md) |
| 질문/지시가 모호하거나 편향적이거나 결론을 유도하거나 검증 가능한 출력 계약이 없다 | [89-bridge-ai-usage-gap.md](89-bridge-ai-usage-gap.md) |
| 모호한 지시에 역질문이 필요하지만 질문 루프가 길어지지 않게 제한해야 한다 | [89-bridge-ai-usage-gap.md](89-bridge-ai-usage-gap.md) |
| 역질문 답변 대기 때문에 전체 작업이 멈추는 병목을 줄이고, `blocked_decision`만 격리한 뒤 `unblocked_work`를 계속 진행해야 한다 | [89-bridge-ai-usage-gap.md](89-bridge-ai-usage-gap.md) |
| 사람 답변/승인/선호 결정들을 한 곳에 모으고 답변이 오면 현재 작업을 checkpoint한 뒤 interrupt/resume 해야 한다 | [91-human-decision-inbox.md](91-human-decision-inbox.md) |
| 약한/비추론/불확실 모델과 추론/강한 모델의 사용 전략을 다르게 적용해야 한다 | [89-bridge-ai-usage-gap.md](89-bridge-ai-usage-gap.md) |
| 오픈소스/도구/런타임/스킬 설치를 기록한다 | [58-installation-record.md](58-installation-record.md) |
| 인터넷 조사에서 재사용 가치가 있는 내용을 문서화한다 | [90-capture-research.md](90-capture-research.md) |
| 지식 베이스 내용을 근거로 쓰기 전에 검증한다 | [95-validate-knowledge.md](95-validate-knowledge.md) |
| 최종 산출물의 사실 주장을 근거로 검증한다 | [96-ground-output.md](96-ground-output.md) |

## Operating Prompt

```text
Classify the current request using the repository's persistent rules and _ops/index.md.
Run web-first intake before planning, repository exploration, or file edits.
Run memory-bootstrap-agent after web-first intake and before local planning.
Select work_mode from agent-platform/configs/workflows/work-mode-registry.json before deciding which history, requirements, spec, and evaluation targets are blocking.

Select view_mode from agent-platform/configs/access/view-mode-registry.json when the request involves what a user, developer, or superadmin should see in a UI, dashboard, monitor, generated snapshot, or admin surface. Keep view_mode separate from install_mode and work_mode. Treat client-side hiding as a UI lens, not a security boundary.
Select install_mode from agent-platform/configs/installations/install-mode-registry.json when the request involves setup, running, deployment, or developer improvement installation. Keep install_mode separate from work_mode.
Use platform-desktop-app and _ops/prompts/93-installable-software-productization.md when the request involves end-user installable software, desktop apps, OS installer packaging, Tauri, Electron, MSIX, DMG, signing, notarization, updates, or uninstall behavior. Keep this separate from repository setup install_mode.
Use platform-desktop-app/configs/user-flow-registry.json and _ops/prompts/104-desktop-user-flow-design.md when the request involves installable app user flow, first-run onboarding, workspace chooser, task timeline, decision inbox, settings, or recovery behavior.
Use agent-platform/configs/runtime/language-decision-registry.json and _ops/prompts/94-runtime-language-research-design.md when the request involves choosing or changing Rust, Go, Tauri, Wails, Electron, Python, TypeScript/Next.js, native modules, local daemons, desktop shells, or performance-sensitive runtime boundaries.
Use agent-platform/configs/integrations/cli-adapter-registry.json and _ops/prompts/97-cli-adapter-integration.md when the request involves external CLI use, CLI adapter boundaries, command execution, bundled sidecars, optional CLI capabilities, or keeping the installable platform independent from one CLI.
Use agent-platform/configs/integrations/cli-pipeline-template.json and _ops/prompts/101-cli-pipeline-orchestration.md when one action launches multiple CLI processes, connects stdout/stderr/stdin pipes, fans out/fans in CLI work, or embeds multi-CLI orchestration in a desktop shell, monitor, local daemon, or agent workflow.
Use agent-platform/configs/orchestration/agent-orchestration-registry.json and _ops/prompts/102-agent-creation-orchestration.md when the request involves creating reusable agents, changing agent specs, or coordinating multiple agents through supervisor, router, sequential pipeline, parallel fan-out/merge, or handoff patterns.
Use agent-platform/configs/usage/unstructured-data-structuring-profile.json and _ops/prompts/98-structure-unstructured-data.md when messy or mixed-format inputs should become schema-grounded structured records with source provenance and validation.
Use _ops/prompts/99-omission-prevention.md and agent-platform check-omissions when non-quick work needs proof that required instructions, requirements, artifacts, and acceptance checks were not missed.
Use _ops/prompts/100-resource-leak-prevention.md and agent-platform check-resources when work touches long-running agents, servers, browser automation, subprocesses, workers, queues, caches, streams, large data, file handles, network connections, timers, or subscriptions.
Use agent-platform check-cli-pipeline before closing multi-process CLI orchestration work; set cli_pipeline_occurred=true and include cli_pipeline_targets in evaluator input.
Use agent-platform check-agent-orchestration before closing reusable agent creation or orchestration registry work.
Select the relevant prompt and workflow.
Derive requirement candidates from the user's request, update or review the relevant requirements baseline before implementation when the selected mode requires it or durable behavior changes, and include requirements_targets when blocking for that mode.
Create or update spec-driven artifacts before meaningful implementation when the selected mode requires it, and include spec_targets when blocking for that mode.
When active specs are ambiguous or differ from current source/tests/artifacts, run spec-reconciliation-agent, classify update_spec versus update_source versus ask_user, and surface clarification_needed questions before changing ambiguous behavior.
If custom skill work occurred, run skill-lifecycle-agent, validate the skill, record improvement ideas, and include skill_targets plus skill_validation_targets in close-out evaluation.
If the request expresses a durable worldview or operating philosophy, update _philosophy/ and link policy docs to it.
If the request creates or touches a specific project, decide the owning project folder before editing files.
If speed matters or multiple agents/lane-style tasks may run, use parallel-work-planner-agent before parallel execution and keep coordination status updated.
For research-heavy work, use research-insight-planner-agent with agent-platform/configs/research/research-agent-profile.json and record the answer-engine stages plus citation requirements.
When the task needs many sources or better search quality, use human-search-profile.json and _ops/prompts/84-human-like-source-discovery.md to build a query ladder, source lanes, snowballing paths, and selective source summaries.
When the task asks how to use AI better or reveals a repeated AI-use gap, use ai-usage-gap-profile.json and _ops/prompts/89-bridge-ai-usage-gap.md to improve task framing, bounded clarification, task fit, iteration, verification, and durable asset promotion.
When human decisions, approvals, or clarification answers should be answered later and resumed, use _ops/prompts/91-human-decision-inbox.md and _ops/coordination/human-decision-inbox.json.
When an instruction is vague, biased, leading, conclusion-seeking, missing an output contract, or assumes an LLM knows truth deterministically, rewrite it into a neutral, source-checkable task brief before execution.
When model capability matters, use model-adaptive prompting: weak/non-reasoning/uncertain models can use two-pass compare/merge loops on high-variance tasks, while strong reasoning models should get concise task framing and verification before duplicate calls.
If the request needs coding research before implementation, use coding-research-agent and answer every post-research question before coding.
If the request installs, upgrades, removes, or globally configures software, create an installation record and update _ops/installations/registry.json.
Record phase-level work timing under _history/work-timings/ when the selected mode requires timing_summary_targets.
If a reusable pattern appears, record it as a documentation, tool, template, skill, prompt, or workflow candidate.
Ground factual claims with hallucination-guard-agent before publishing final outputs that contain facts.
After the work, update the targets required by the selected mode, run the evaluator against the initial instruction with work_mode, then verify history, maps, commit, and push status.
```
