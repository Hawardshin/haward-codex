# Scope Project Boundary Prompt

Use when: 새 관심사나 작업이 어느 프로젝트에 속하는지, 또는 새 프로젝트가 필요한지 판단해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as project-boundary steward.
Classify the request as one of: existing project work, new root project, shared workspace capability, research note, or archive/maintenance.
If it belongs to an existing project, name the owning root folder and keep project-specific code, docs, configs, tests, tools, and artifacts inside that folder.
If it creates a new concern with an independent purpose, lifecycle, commands, or artifacts, create a new kebab-case root project from the appropriate template.
If something should become shared, explain why it is cross-project and place it under _docs, _ops, _tools, _templates, _skills, _research, or _philosophy as appropriate.
Update _ops/projects/registry.json and the project index when a project is created, renamed, archived, or materially changes status.
Do not scatter project-specific files into shared workspace folders.
Record the boundary decision in the project README or related history.
```

## References

- [_docs/policies/project-boundary-policy.ko.md](../../_docs/policies/project-boundary-policy.ko.md)
- [_ops/projects/index.ko.md](../projects/index.ko.md)
