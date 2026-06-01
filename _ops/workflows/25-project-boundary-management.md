# Project Boundary Management Workflow

## Purpose

여러 관심사와 프로젝트가 늘어날 때, 무엇이 어느 프로젝트에 속하는지와 무엇을 공통 자산으로 둘지 결정한다.

## Sequence

1. Read [_docs/policies/project-boundary-policy.ko.md](../../_docs/policies/project-boundary-policy.ko.md).
2. Read [_ops/projects/root-structure-policy.json](../projects/root-structure-policy.json) when the request may affect root folders.
3. Classify the request as existing project, new root project, shared workspace capability, research note, local-only scratch, generated output, or archive/maintenance.
4. If it belongs to an existing project, read that project's `README.md`.
5. If it needs a new project, create a root `kebab-case` folder from `_templates/project/` or `_templates/python-agent-project/`.
6. Keep project-specific code, configs, docs, tests, tools, and artifacts inside the owning project folder.
7. Promote only cross-project assets to `_docs/`, `_ops/`, `_tools/`, `_templates/`, `_skills/`, `_research/`, or `_philosophy/`.
8. Treat `_private/` and `outputs/` as local-only ignored folders, not durable knowledge or project artifacts.
9. Update `_ops/projects/registry.json`, `_ops/projects/index.ko.md`, and `_ops/projects/index.en.md` when project status or boundaries change.
10. Add durable project top-level folders to that project's `project_specific_home`; generated folders should instead be covered by `generated_output_dirs` and `.gitignore`.
11. Run `python3 _tools/structure-audit/src/structure_audit.py --check` after root folder, registry, project top-level folder, local-only, or generated-output rule changes.
12. Record meaningful boundary decisions in `_history/YYYY/YYYY-MM-DD.md` and, when relevant, the project `README.md`.
13. Refresh `_ops/maps/`.

## Rule

Project-specific work should not leak into shared folders. Shared folders exist to support many projects, not to hide ownership.
