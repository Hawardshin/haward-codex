# Project Index

Source data: [registry.json](registry.json)

| Project | Status | Type | Purpose | Boundary |
| --- | --- | --- | --- | --- |
| `agent-platform/` | active | core-platform | Central agent-building platform project | Shared platform capabilities live here; domain experiments should become separate root projects |
| `presentation-agent/` | active | domain-agent-project | Dedicated project for presentation assets, references, and skills | Presentation references, assets, conversion tools, and artifacts stay in this project |
| `workspace-monitor/` | active | repository-monitoring-site | Next.js monitoring site for visualizing repository history, projects, agents, requirements, and documents | UI, snapshot generation, and deployment settings stay in this project while source documents are read from shared folders |

## Operating Rules

- If a new interest has an independent purpose and artifacts, create a new root project.
- Keep project-specific files inside the owning project folder.
- Promote to `_tools/`, `_templates/`, `_docs/`, or `_ops/` only when reuse crosses projects.
- Update this index and `registry.json` when projects are created or their status changes.
