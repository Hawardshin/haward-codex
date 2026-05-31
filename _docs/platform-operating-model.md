# Platform Operating Model

## Goal

이 저장소는 단일 앱 하나가 아니라, 에이전트 구축 플랫폼과 관련된 여러 프로젝트를 계속 만들고 추적하는 monorepo로 운영한다.

## Core Projects

- `agent-platform/`: 에이전트 구축 플랫폼의 중심 프로젝트
- future root-level folders: 독립 실험, 도구, 에이전트, 서비스

## Operating Loop

1. Capture the user's intent as a project requirement, rule, or artifact.
2. Use `_ops/index.md` and `_ops/prompts/00-router.md` to select the operating path.
3. Decide whether the work belongs to an existing project or a new root-level project.
4. Implement or document the smallest useful change.
5. Prefer Python for agent implementation unless another runtime is clearly better.
6. Evaluate mature open-source options before building core infrastructure from scratch.
7. For planning that depends on external facts, use web search and at least one other search channel to derive insights before execution.
8. Save important planning processes under `_history/plans/YYYY/`.
9. Promote repeated work into a template, tool, skill, prompt, or workflow.
10. Record important context in `_history/`.
11. Refresh `_ops/maps/` when navigational structure changes.
12. Summarize completed work.
13. Check prior internal work and strong references relevant to the task.
14. Capture reusable internet research or external references.
15. Evaluate the completed work against the initial instruction.
16. Rework real gaps and evaluate again.
17. Commit the coherent change set and push it.

## Capability Promotion

Promote work only when it will reduce future effort.

| Pattern | Promote to |
| --- | --- |
| Same folder or file structure repeated | Template |
| Same command, conversion, validation, or generation repeated | Tool |
| Same multi-step reasoning or domain workflow repeated | Skill |
| Same visual artifact style repeated | HTML template |
| Same user preference or operating instruction repeated | Persistent rule |
| Same prompt or work sequence repeated | `_ops` prompt or workflow |
| Same close-out quality check repeated | Evaluation agent |
| Same external reference useful for future work | Research note |
| Same search-to-insight-to-plan pattern repeated | Planning agent |
| Same need to explain planning decisions later | Plan history template |

## Context Compression

When the active conversation becomes long, the agent should move durable state into repository files:

- project status and commands into the project `README.md`
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

Prefer mature open-source projects when they reduce maintenance cost and fit the task constraints.
