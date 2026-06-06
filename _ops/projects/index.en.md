# Project Index

Source data: [registry.json](registry.json)
Root structure policy: [root-structure-policy.json](root-structure-policy.json)
AI assistant runtime adapters: [../assistant-runtimes/adapter-registry.json](../assistant-runtimes/adapter-registry.json)

| Project | Status | Type | Purpose | Boundary |
| --- | --- | --- | --- | --- |
| `agent-platform/` | active | core-platform | Central agent-building platform project | Shared platform capabilities live here; domain experiments should become separate root projects |
| `presentation-agent/` | active | domain-agent-project | Dedicated project for presentation assets, references, and skills | Presentation references, assets, conversion tools, and artifacts stay in this project |
| `platform-desktop-app/` | active | installable-desktop-product | Installable desktop productization project | OS-specific install, distribution, update, privacy, secret review, and the Next.js renderer UI stay in this project |
| `vscode-agent-workbench/` | active | source-hard-fork-workbench | Hard-fork workbench for adapting VS Code Code - OSS into Agent Workspace Code | Keep the full source clone local-only; track commits, patches, validation, and records in this project |

## Root Folder Logical Layers

| Layer | Folders | Meaning |
| --- | --- | --- |
| Project plane | `agent-platform/`, `presentation-agent/`, `platform-desktop-app/`, `vscode-agent-workbench/` | Root projects with independent purpose and lifecycle |
| Operations control plane | `_ops/`, `_docs/`, `_requirements/`, `_specs/`, `_history/` | Workflows, policies, requirements, specs, evaluations, and history |
| Knowledge and reuse plane | `_philosophy/`, `_research/`, `_skills/`, `_templates/`, `_tools/`, `_archive/` | Reusable knowledge, tools, templates, skills, philosophy, and archived projects |
| Runtime adapter plane | `.claude/`, `.cursor/`, `.agents/` | Thin adapters for AI coding tools |
| Protected local plane | `_private/` | Sensitive files and private scratch. AI default access is denied |
| Generated local plane | `outputs/` | Temporary output. Durable artifacts move into project `artifacts/` |

## Operating Rules

- If a new interest has an independent purpose and artifacts, create a new root project.
- For new coding projects, first inspect a dry-run plan with `_tools/coding-project-bootstrap/`, and use `--register` only for root projects.
- Keep project-specific files inside the owning project folder.
- Promote to `_tools/`, `_templates/`, `_docs/`, or `_ops/` only when reuse crosses projects.
- `_private/` and `outputs/` are local-only ignored folders, not projects or knowledge-base sources. In particular, AI agents must not directly read or index `_private/` contents by default.
- `.claude/`, `.cursor/`, and `.agents/` are runtime adapter folders, not projects.
- Explain durable project top-level folders in `registry.json` `project_specific_home`.
- After changing root folders, project registry, project top-level folders, reserved folder rules, or generated-output rules, run `python3 _tools/structure-audit/src/structure_audit.py --check`.
- Update this index and `registry.json` when projects are created or their status changes.
