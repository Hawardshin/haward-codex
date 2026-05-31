# Workspace Rules

## Purpose

이 저장소는 개인 에이전트 구축 플랫폼과 관련 실험, 도구, 서비스 프로젝트를 한 곳에서 추적하기 위한 monorepo 작업 공간이다.

## Root Directory Policy

루트의 일반 폴더는 프로젝트로 간주한다.

예약 폴더는 `_` 접두어를 사용한다.

| Folder | Purpose |
| --- | --- |
| `_docs/` | 저장소 전체 문서, 규칙, 의사결정 기록 |
| `_templates/` | 새 프로젝트 기본 템플릿 |
| `_archive/` | 중단, 폐기, 보류된 프로젝트 |

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

## Commit Cadence

Commit after each coherent change set, especially after:

- adding or changing project structure
- implementing a feature
- fixing a bug
- adding tests
- updating workspace rules

Do not mix unrelated project changes in one commit unless the change is intentionally cross-project.

