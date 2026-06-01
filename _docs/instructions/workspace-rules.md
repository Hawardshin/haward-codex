# Workspace Rules

## Purpose

이 저장소는 개인 에이전트 구축 플랫폼과 관련 실험, 도구, 서비스 프로젝트를 한 곳에서 추적하기 위한 monorepo 작업 공간이다. 운영 원칙은 Codex에만 묶지 않고 Claude Code, Cursor, Antigravity 등 다른 AI assistant runtime에서도 쓸 수 있게 유지한다.

## Root Directory Policy

루트의 일반 폴더는 프로젝트로 간주한다.

예약 폴더는 `_` 접두어를 사용한다.

| Folder | Purpose |
| --- | --- |
| `_docs/` | 저장소 전체 문서, 규칙, 의사결정 기록 |
| `_philosophy/` | 에이전트와 플랫폼 운영의 근본 철학 |
| `_requirements/` | 공통 요구사항 기준선, 변경 기록, 검토 기록 |
| `_specs/` | 공통 spec-driven 산출물, 구현 계획, 작업 목록, 검증, traceability |
| `_history/` | 날짜별 작업 로그와 컨텍스트 압축 요약 |
| `_history/plans/` | 에이전트 계획 과정 기록 |
| `_ops/` | 운영 허브, 프롬프트 라우터, 워크플로, 저장소 맵 |
| `_ops/assistant-runtimes/` | AI assistant runtime adapter 레지스트리 |
| `_ops/backlog/` | 빠른 작업이나 `ship_first` 모드에서 뒤로 뺀 공통 비차단 개선 목록 |
| `_ops/projects/` | 루트 프로젝트 등록부와 경계 관리 |
| `_research/` | 인터넷 조사와 외부 레퍼런스 중 재사용 가치가 있는 내용 |
| `_skills/` | git으로 추적할 커스텀 Codex 스킬 원본 |
| `_templates/` | 새 프로젝트 기본 템플릿 |
| `_tools/` | 여러 프로젝트에서 재사용하는 로컬 도구와 스크립트 |
| `_archive/` | 중단, 폐기, 보류된 프로젝트 |

Local-only root folders are not durable repository knowledge:

| Folder | Purpose |
| --- | --- |
| `_private/` | Local private scratch state ignored by git |
| `outputs/` | Transient one-off tool output ignored by git |

Durable artifacts must live under the owning project, usually `project-name/artifacts/`.

Runtime adapter root folders are tracked but are not projects:

| Folder | Purpose |
| --- | --- |
| `.claude/` | Claude Code scoped rule adapter |
| `.cursor/` | Cursor Project Rule adapter |
| `.agents/` | Google Antigravity Workspace Rule adapter |

## Project Naming

- Use `kebab-case`.
- Prefer concrete purpose over vague labels.
- Use `experiment-` for short-lived experiments.
- Use nouns for products or services, verbs only for scripts and utilities when clearer.

Good examples:

- `agent-platform`
- `prompt-evaluator`
- `experiment-local-memory`

Avoid:

- `Project1`
- `new_agent`
- `test`

## Project README

Every project must include a `README.md` with:

- purpose
- current status
- main commands
- important decisions or constraints

Project-specific visual or generated outputs should live under `artifacts/`.

## Project Boundary Policy

- Project-specific code, docs, configs, tests, tools, and artifacts stay inside the owning project folder.
- Shared workspace folders are for cross-project operating assets, not project-local work.
- Register root projects in `_ops/projects/registry.json`.
- Classify root folder types in `_ops/projects/root-structure-policy.json`.
- List durable project top-level folders in each registry entry's `project_specific_home`.
- Keep generated folders covered by `generated_output_dirs` and `.gitignore`.
- Keep runtime adapter folders listed in `_ops/projects/root-structure-policy.json` `runtime_adapter_dirs`.
- Run `python3 _tools/structure-audit/src/structure_audit.py --check` after root or project folder structure changes.
- If a request introduces a new independent interest, lifecycle, command set, UI, dataset, or artifact stream, create a new root project.
- Promote project-local assets to shared folders only when cross-project reuse is clear.

## Commit Cadence

Commit after each coherent change set, especially after:

- adding or changing project structure
- implementing a feature
- fixing a bug
- adding tests
- updating workspace rules

Do not mix unrelated project changes in one commit unless the change is intentionally cross-project.

After each completed commit, push to `origin/main` immediately unless the user explicitly asks to hold local changes.

## History Policy

- Maintain dated work logs under `_history/YYYY/YYYY-MM-DD.md`.
- Add a log entry when a task changes repository structure, project direction, reusable capabilities, or important artifacts.
- Maintain important plan process records under `_history/plans/YYYY/`.
- Include the commit hash after committing when practical.
- Use the history log to preserve context when a conversation becomes too long.

## Requirements Management Policy

- Treat user work and instructions as requirement candidates.
- Rewrite accepted candidates as verifiable requirements with stable IDs.
- Keep shared workspace requirements under `_requirements/`.
- Keep project-specific requirements under the owning project's `docs/requirements/`.
- Record requirement changes under `_requirements/changes/` or the project-specific equivalent.
- Record requirement reviews under `_requirements/reviews/` or the project-specific equivalent.
- Before implementation, confirm the relevant requirement IDs and update or baseline them when the request changes expected behavior, rules, project structure, platform capability, or implementation criteria.
- Work must include `requirements_targets` in the close-out evaluator input when the selected work mode requires it or when durable behavior changes.

## Spec-Driven Development Policy

- Convert active requirements into spec-driven artifacts before meaningful implementation.
- Shared workspace specs live under `_specs/`.
- Project-specific specs live under the owning project's `specs/`.
- Each spec folder should contain `spec`, `plan`, `tasks`, `validation`, and `traceability` artifacts.
- Acceptance criteria should be concrete, testable, and linked to requirement IDs.
- Work must include `spec_targets` in the close-out evaluator input when the selected work mode requires it or when implementation scope is durable.

## Skill Lifecycle Policy

- Custom skill source lives under `_skills/<skill-name>/`.
- New or updated skills follow `skill-creator` guidance.
- Skill work records trigger examples, validation steps, forward-test scenarios, and improvement ideas.
- Run `quick_validate.py` and `agent-platform validate-skill` after creating or updating a skill.
- If skill work occurred, close-out evaluation must include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets`.
- Active Codex skill installation requires permission checks, installation records, and rollback path.

## Markdown vs HTML

Markdown is the default for durable text documentation.

Use or propose HTML when the output benefits from:

- browser-native layout
- tables, dashboards, or visual hierarchy
- interactive review
- standalone sharing
- UI or product specification mockups

HTML artifacts should normally be stored in `project-name/artifacts/`.

## Language Policy

- User-facing documentation and history should be Korean-first.
- Executable prompt bodies should be English.
- Important durable documents should have paired Korean and English files with `.ko.md` and `.en.md` suffixes.
- When paired documents exist, update both in the same change set.

## Operations Hub Policy

- `_ops/index.md` is the first stop for navigation.
- `_ops/assistant-runtimes/adapter-registry.json` maps shared operating principles to Codex, Claude Code, Cursor, Antigravity, and generic assistant runtimes.
- `_docs/operating-models/tool-agnostic-agent-operating-model.ko.md` is the shared policy for keeping runtime adapters thin.
- `_ops/workflows/02-select-work-mode.md` selects `quick`, `standard`, `ship_first`, `research`, or `governance` mode after web-first intake and memory bootstrap.
- `agent-platform/configs/workflows/work-mode-registry.json` defines mode criteria, evaluator target policy, and deferred improvement rules.
- `_ops/backlog/deferred-improvements.ko.md` tracks shared non-blocking improvements intentionally postponed by `ship_first` or quick work.
- `_philosophy/` stores the durable worldview behind agent behavior and operating rules.
- `_ops/coordination/` is the first stop for active agents and parallel work.
- Reusable prompts live in `_ops/prompts/`.
- Reusable workflows live in `_ops/workflows/`.
- Repository and prompt maps live in `_ops/maps/`.
- Run `_tools/workspace-index` after navigational structure changes.
- Run `_tools/structure-audit` after root folder, project registry, durable project top-level folder, reserved folder, runtime adapter folder, local-only folder, or generated-output rule changes.
- Run `_tools/task-board` after coordination status changes.

## Context Archive Policy

- When context saturation risk appears, create a context archive packet under `_history/context-archives/YYYY/`.
- Use [_docs/policies/context-archive-policy.ko.md](context-archive-policy.ko.md) and `_ops/workflows/45-context-archive.md`.
- Context archive packets are resume indexes, not raw chat transcripts.
- Store stable state, must-read files, remaining tasks, verification state, and links to web search records, plans, evaluations, and commits.
- If context archiving occurred, include `context_archiving_occurred=true` and `context_archive_targets` in evaluation input.

## Web-First Work Policy

- Every new user instruction starts with web search before planning, repository exploration, or file edits.
- Every reusable prompt execution under `_ops/prompts/` starts with web search and follows `_ops/prompts/README.ko.md`.
- Use [_docs/policies/web-first-work-policy.ko.md](web-first-work-policy.ko.md) and `_ops/workflows/05-web-first-intake.md` for the intake sequence.
- Meaningful work saves a public web search record under `_history/web-searches/YYYY/`.
- Search records include queries, checked sources, weak sources ignored, plan impact, uncertainty, and a public decision summary instead of raw internal reasoning.
- If search results are irrelevant, record that and proceed with repository-local verification.
- If web search fails, record the failure and strengthen local verification before final claims.
- Save only reusable search findings under `_research/`.

## Source Collection Policy

- For research or planning work, collect broad high-authority source bundles, not only the first few search results.
- Include official/primary sources, papers, standards, open-source repositories, international tech blogs, analysis articles, community/social signals, and contrary examples when relevant.
- Treat popularity signals such as likes, shares, comments, GitHub stars, Hacker News points, Reddit activity, and LinkedIn reactions as discovery or adoption signals, not standalone factual proof.
- Use [_docs/policies/source-collection-policy.ko.md](source-collection-policy.ko.md) for source bundle targets and evaluation criteria.

## Open-Source Installation Policy

- If mature open source is the right fit, install it in the owning project or tool scope when needed.
- Record install command, dependency tracking path, security review, license review, verification, and rollback before installation.
- Avoid global installs unless the need and removal path are documented and required permission is granted.
- Use [_docs/policies/open-source-installation-policy.ko.md](open-source-installation-policy.ko.md) for installation rules.

## Evaluation Policy

- Meaningful work should pass an evaluation step before close-out.
- Evaluation starts with a completed-work summary and reference check.
- The evaluator compares the initial instruction with the actual result, changed files, and verification.
- The evaluator should consider relevant prior internal work, official docs, mature open-source projects, or other strong references.
- When factual claims are present, run `hallucination-guard-agent` and include the grounding result in evaluation.
- Include `work_mode` in evaluation input.
- Include `web_search_record_targets`, `user_request_summary_targets`, `requirements_targets`, `spec_targets`, `request_trace_targets`, and `work_summary_targets` when the selected work mode makes them blocking.
- In `quick` mode, missing full-loop targets are non-blocking improvements unless another rule or the user makes them mandatory.
- In `ship_first` mode, postponed improvement ideas require `deferred_improvement_targets`.
- If skill work occurred, include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets` in evaluation input.
- If gaps are found, they become follow-up actions and the work returns to implementation.
- The default evaluator is `work-evaluator-agent` in `agent-platform/configs/agents/`.
- Final evaluation reports are stored under `_history/evaluations/YYYY/`.

## Research Capture Policy

- Reusable internet research and external references live under `_research/`.
- Research notes should include source URLs, access dates, summaries, reliability, applicability, and related work.
- Capture only findings that are likely to reduce future work or improve future decisions.

## Search Insight Planning Policy

- Important plans should not rely only on the model's internal probabilistic guess.
- Use `research-insight-planner-agent` when planning depends on external facts, current information, multiple references, or prior repository knowledge.
- Treat `research-insight-planner-agent` as a core Perplexity-style answer engine, backed by `agent-platform/configs/research/research-agent-profile.json`.
- Record the answer-engine stages and citation requirements before treating research as plan-ready.
- Use web search plus at least one other channel, then turn evidence into insights, plan steps, and validation steps.
- Rank sources and verify that citations support the exact claims they are attached to.
- Save the planning process under `_history/plans/YYYY/` and link it from the final evaluation when it guided the work.

## Knowledge Validation Policy

- Knowledge-base content is not automatically authoritative.
- Use `knowledge-skeptic-agent` before relying on `_research`, `_docs`, `_history`, or old project docs for important decisions.
- Resolve freshness, source quality, contradiction, and applicability gaps before using the knowledge as evidence.

## Hallucination Prevention Policy

- Separate factual claims from opinions, recommendations, plans, and preferences.
- Ground factual claims with files, commands, tests, official docs, papers, web sources, datasets, or tool results.
- Use `hallucination-guard-agent` before publishing final outputs that contain factual claims.
- Remove, verify, or caveat unsupported claims before final response.
- Record access dates for external or freshness-sensitive evidence.
- High-risk factual outputs require at least two independent non-inference evidence sources.
