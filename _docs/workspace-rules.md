# Workspace Rules

## Purpose

이 저장소는 개인 에이전트 구축 플랫폼과 관련 실험, 도구, 서비스 프로젝트를 한 곳에서 추적하기 위한 monorepo 작업 공간이다.

## Root Directory Policy

루트의 일반 폴더는 프로젝트로 간주한다.

예약 폴더는 `_` 접두어를 사용한다.

| Folder | Purpose |
| --- | --- |
| `_docs/` | 저장소 전체 문서, 규칙, 의사결정 기록 |
| `_history/` | 날짜별 작업 로그와 컨텍스트 압축 요약 |
| `_ops/` | 운영 허브, 프롬프트 라우터, 워크플로, 저장소 맵 |
| `_skills/` | git으로 추적할 커스텀 Codex 스킬 원본 |
| `_templates/` | 새 프로젝트 기본 템플릿 |
| `_tools/` | 여러 프로젝트에서 재사용하는 로컬 도구와 스크립트 |
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

Project-specific visual or generated outputs should live under `artifacts/`.

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
- Include the commit hash after committing when practical.
- Use the history log to preserve context when a conversation becomes too long.

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
- `_ops/coordination/` is the first stop for active agents and parallel work.
- Reusable prompts live in `_ops/prompts/`.
- Reusable workflows live in `_ops/workflows/`.
- Repository and prompt maps live in `_ops/maps/`.
- Run `_tools/workspace-index` after navigational structure changes.
- Run `_tools/task-board` after coordination status changes.

## Evaluation Policy

- Meaningful work should pass an evaluation step before close-out.
- Evaluation starts with a completed-work summary and reference check.
- The evaluator compares the initial instruction with the actual result, changed files, and verification.
- The evaluator should consider relevant prior internal work, official docs, mature open-source projects, or other strong references.
- If gaps are found, they become follow-up actions and the work returns to implementation.
- The default evaluator is `work-evaluator-agent` in `agent-platform/configs/agents/`.
- Final evaluation reports are stored under `_history/evaluations/YYYY/`.
