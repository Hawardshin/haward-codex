# Project Boundary Management Workflow

## Purpose

여러 관심사와 프로젝트가 늘어날 때, 무엇이 어느 프로젝트에 속하는지와 무엇을 공통 자산으로 둘지 결정한다.

## Sequence

1. Read [_docs/project-boundary-policy.ko.md](../../_docs/project-boundary-policy.ko.md).
2. Classify the request as existing project, new root project, shared workspace capability, research note, or archive/maintenance.
3. If it belongs to an existing project, read that project's `README.md`.
4. If it needs a new project, create a root `kebab-case` folder from `_templates/project/` or `_templates/python-agent-project/`.
5. Keep project-specific code, configs, docs, tests, tools, and artifacts inside the owning project folder.
6. Promote only cross-project assets to `_docs/`, `_ops/`, `_tools/`, `_templates/`, `_skills/`, `_research/`, or `_philosophy/`.
7. Update `_ops/projects/registry.json`, `_ops/projects/index.ko.md`, and `_ops/projects/index.en.md` when project status or boundaries change.
8. Record meaningful boundary decisions in `_history/YYYY/YYYY-MM-DD.md` and, when relevant, the project `README.md`.
9. Refresh `_ops/maps/`.

## Rule

Project-specific work should not leak into shared folders. Shared folders exist to support many projects, not to hide ownership.
