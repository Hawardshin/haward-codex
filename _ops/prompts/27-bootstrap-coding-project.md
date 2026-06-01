# Bootstrap Coding Project Prompt

Use when: 새 코딩 프로젝트나 프로젝트 내부 코딩 모듈을 기술별 구조로 준비해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Prepare a new coding project or project-local coding module using the workspace coding-project-bootstrap workflow.
First classify ownership: root project versus nested module inside an existing project.
List available blueprints with _tools/coding-project-bootstrap.
Choose the smallest matching blueprint from generic, python-agent, python-cli, next-app, react-vite, spring-boot, or c-library.
Run a dry-run plan and inspect target paths, generated files, official-doc checklist, and registry behavior.
If the plan is accepted, apply it with --apply. Use --register only for a root-level project at <workspace>/<project-name>.
Do not install dependencies during bootstrap. If installation is needed later, create an installation audit record first.
After creation, read the generated README.md and configs/project-context.json.
Before source-code implementation, run coding-research-agent for the selected stack and record official docs, stack versions, architecture options, folder semantics, and high-signal issue/discussion sources.
Update project registry, maps, workspace monitor snapshots, request history, requirement/spec artifacts, evaluation, commit, and push.
```
