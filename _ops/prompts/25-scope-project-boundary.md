# Scope Project Boundary Prompt

Use when: 새 관심사나 작업이 어느 프로젝트에 속하는지, 또는 새 프로젝트가 필요한지 판단해야 할 때.

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

- [_docs/project-boundary-policy.ko.md](../../_docs/project-boundary-policy.ko.md)
- [_ops/projects/index.ko.md](../projects/index.ko.md)
