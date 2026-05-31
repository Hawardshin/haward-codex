# Platform Operating Model

## Goal

이 저장소는 단일 앱 하나가 아니라, 에이전트 구축 플랫폼과 관련된 여러 프로젝트를 계속 만들고 추적하는 monorepo로 운영한다.

## Core Projects

- `agent-platform/`: 에이전트 구축 플랫폼의 중심 프로젝트
- future root-level folders: 독립 실험, 도구, 에이전트, 서비스

## Operating Loop

1. Capture the user's intent as a project requirement, rule, or artifact.
2. Run web search first using `_ops/workflows/05-web-first-intake.md`.
3. Run `memory-bootstrap-agent` and read required hot anchors from `agent-platform/configs/memory/bootstrap-manifest.json`.
4. Use `_ops/index.md` and `_ops/prompts/00-router.md` to select the operating path.
5. Decide whether the work belongs to an existing project or a new root-level project.
6. Keep project-specific work inside the owning project folder and register root projects under `_ops/projects/`.
7. Keep foundational philosophy in `_philosophy/` and execution rules in `_docs/` or `_ops/`.
8. Implement or document the smallest useful change.
9. Prefer Python for agent implementation unless another runtime is clearly better.
10. Evaluate mature open-source options before building core infrastructure from scratch.
11. For planning that depends on external facts, use `research-insight-planner-agent` with `agent-platform/configs/research/research-agent-profile.json`.
12. Treat research as an answer-engine pipeline: query understanding, retrieval, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review.
13. For coding research, use `coding-research-agent` to record reference configs, concrete code references, standard post-research answers, and diverse source types before implementation.
14. If mature open source is the right fit, install it in the owning project or tool scope and record install command, dependency tracking, installation audit record, security/license review, verification, and rollback.
15. For shared settings, keep references and structure rules inside the config file and run `config-contract-agent`.
16. Save important planning processes under `_history/plans/YYYY/`.
17. Promote repeated work into a template, tool, skill, prompt, or workflow.
18. Record important context in `_history/`.
19. Refresh `_ops/maps/` when navigational structure changes.
20. Summarize completed work.
21. Check prior internal work and strong references relevant to the task.
22. Capture reusable internet research or external references.
23. Ground factual claims with `hallucination-guard-agent` before publishing final outputs.
24. Evaluate the completed work against the initial instruction.
25. Rework real gaps and evaluate again.
26. Commit the coherent change set and push it.

## Capability Promotion

Promote work only when it will reduce future effort.

| Pattern | Promote to |
| --- | --- |
| Same folder or file structure repeated | Template |
| Same command, conversion, validation, or generation repeated | Tool |
| Same multi-step reasoning or domain workflow repeated | Skill |
| Same visual artifact style repeated | HTML template |
| Same user preference or operating instruction repeated | Persistent rule |
| Same foundational worldview behind operating rules | Philosophy document |
| Same prompt or work sequence repeated | `_ops` prompt or workflow |
| Same close-out quality check repeated | Evaluation agent |
| Same external reference useful for future work | Research note |
| Same search-to-insight-to-plan pattern repeated | Planning agent |
| Same source-grounded answer-engine pattern repeated | Core research agent profile |
| Same coding research close-out questions repeated | Coding research agent |
| Same need to explain planning decisions later | Plan history template |
| Same need to block unsupported factual claims | Hallucination guard agent |
| Same need to start every instruction with web search | Web-first intake workflow |
| Same need to avoid forgetting durable settings | Memory bootstrap manifest and agent |
| Same need to make settings explain their references and rules | Config contract agent |
| Same open-source installation decision repeated | Open-source installation policy and candidate record |

## Context Compression

When the active conversation becomes long, the agent should move durable state into repository files:

- project status and commands into the project `README.md`
- foundational worldview into `_philosophy/`
- decisions into `docs/`
- session history into `_history/YYYY/YYYY-MM-DD.md`
- planning process into `_history/plans/YYYY/`
- reusable procedures into `_templates/`, `_tools/`, or `_skills/`

The goal is that future work can resume from the repository without needing the full chat history.

## Technology Preference

Python is the default implementation language for agents, orchestration, automation, evaluation, and backend utilities.

Use other runtimes when they are a better fit for the surface being built:

- HTML/CSS/JavaScript for browser-native artifacts and frontend UI
- Node.js when the existing project is already Node-based or the ecosystem fit is materially better
- shell scripts only for small glue tasks

Prefer mature open-source projects when they reduce maintenance cost and fit the task constraints. If installation is needed, use project-local or tool-local scope by default and record install commands, dependency files, installation audit records, security/license review, verification, and rollback before installation. Actual installs must be indexed in `_ops/installations/registry.json`.
