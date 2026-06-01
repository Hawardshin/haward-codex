# Create Project Prompt

Use when: 새 루트 프로젝트를 만들어야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Create a new root-level project folder using kebab-case.
For coding projects, prefer _ops/prompts/27-bootstrap-coding-project.md and _tools/coding-project-bootstrap so the generated project has technology-aware structure, project-context, and optional registry registration.
For Python agent projects, start from _templates/python-agent-project/.
For general projects, start from _templates/project/.
Create README, docs, artifacts, and tests; add src when the project needs code.
Define the project boundary in the README: what belongs inside, what stays shared, and what is out of scope.
Register the project in _ops/projects/registry.json and update _ops/projects/index.ko.md and _ops/projects/index.en.md.
Update _ops/maps/ and _history/, then commit and push immediately.
```
