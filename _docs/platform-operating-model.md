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
4. Promote repeated work into a template, tool, or skill.
5. Record important context in `_history/`.
6. Commit the coherent change set.

## Capability Promotion

Promote work only when it will reduce future effort.

| Pattern | Promote to |
| --- | --- |
| Same folder or file structure repeated | Template |
| Same command, conversion, validation, or generation repeated | Tool |
| Same multi-step reasoning or domain workflow repeated | Skill |
| Same visual artifact style repeated | HTML template |

## Context Compression

When the active conversation becomes long, the agent should move durable state into repository files:

- project status and commands into the project `README.md`
- decisions into `docs/`
- session history into `_history/YYYY/YYYY-MM-DD.md`
- reusable procedures into `_templates/`, `_tools/`, or `_skills/`

The goal is that future work can resume from the repository without needing the full chat history.
