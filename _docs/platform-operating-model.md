# Platform Operating Model

## Goal

이 저장소는 단일 앱 하나가 아니라, 에이전트 구축 플랫폼과 관련된 여러 프로젝트를 계속 만들고 추적하는 monorepo로 운영한다.

## Core Projects

- `agent-platform/`: 에이전트 구축 플랫폼의 중심 프로젝트
- future root-level folders: 독립 실험, 도구, 에이전트, 서비스

## Operating Loop

1. Capture the user's intent as a project requirement, rule, or artifact.
2. Decide whether the work belongs to an existing project or a new root-level project.
3. Implement or document the smallest useful change.
4. Prefer Python for agent implementation unless another runtime is clearly better.
5. Evaluate mature open-source options before building core infrastructure from scratch.
6. Promote repeated work into a template, tool, or skill.
7. Record important context in `_history/`.
8. Commit the coherent change set and push it.

## Capability Promotion

Promote work only when it will reduce future effort.

| Pattern | Promote to |
| --- | --- |
| Same folder or file structure repeated | Template |
| Same command, conversion, validation, or generation repeated | Tool |
| Same multi-step reasoning or domain workflow repeated | Skill |
| Same visual artifact style repeated | HTML template |
| Same user preference or operating instruction repeated | Persistent rule |

## Context Compression

When the active conversation becomes long, the agent should move durable state into repository files:

- project status and commands into the project `README.md`
- decisions into `docs/`
- session history into `_history/YYYY/YYYY-MM-DD.md`
- reusable procedures into `_templates/`, `_tools/`, or `_skills/`

The goal is that future work can resume from the repository without needing the full chat history.

## Technology Preference

Python is the default implementation language for agents, orchestration, automation, evaluation, and backend utilities.

Use other runtimes when they are a better fit for the surface being built:

- HTML/CSS/JavaScript for browser-native artifacts and frontend UI
- Node.js when the existing project is already Node-based or the ecosystem fit is materially better
- shell scripts only for small glue tasks

Prefer mature open-source projects when they reduce maintenance cost and fit the task constraints.
