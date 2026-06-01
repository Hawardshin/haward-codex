# Project Index

Source data: [registry.json](registry.json)
Root structure policy: [root-structure-policy.json](root-structure-policy.json)
AI assistant runtime adapters: [../assistant-runtimes/adapter-registry.json](../assistant-runtimes/adapter-registry.json)

| Project | Status | Type | Purpose | Boundary |
| --- | --- | --- | --- | --- |
| `agent-platform/` | active | core-platform | Central agent-building platform project | Shared platform capabilities live here; domain experiments should become separate root projects |
| `presentation-agent/` | active | domain-agent-project | Dedicated project for presentation assets, references, and skills | Presentation references, assets, conversion tools, and artifacts stay in this project |
| `workspace-monitor/` | active | repository-monitoring-site | Next.js monitoring site for visualizing repository history, projects, agents, requirements, and documents | UI, snapshot generation, and deployment settings stay in this project while source documents are read from shared folders |

## Operating Rules

- If a new interest has an independent purpose and artifacts, create a new root project.
- For new coding projects, first inspect a dry-run plan with `_tools/coding-project-bootstrap/`, and use `--register` only for root projects.
- Keep project-specific files inside the owning project folder.
- Promote to `_tools/`, `_templates/`, `_docs/`, or `_ops/` only when reuse crosses projects.
- `_private/` and `outputs/` are local-only ignored folders, not projects or knowledge-base sources.
- `.claude/`, `.cursor/`, and `.agents/` are runtime adapter folders, not projects.
- Explain durable project top-level folders in `registry.json` `project_specific_home`.
- After changing root folders, project registry, project top-level folders, reserved folder rules, or generated-output rules, run `python3 _tools/structure-audit/src/structure_audit.py --check`.
- Update this index and `registry.json` when projects are created or their status changes.
