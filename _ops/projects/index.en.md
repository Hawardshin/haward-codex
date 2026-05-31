# Project Index

Source data: [registry.json](registry.json)

| Project | Status | Type | Purpose | Boundary |
| --- | --- | --- | --- | --- |
| `agent-platform/` | active | core-platform | Central agent-building platform project | Shared platform capabilities live here; domain experiments should become separate root projects |

## Operating Rules

- If a new interest has an independent purpose and artifacts, create a new root project.
- Keep project-specific files inside the owning project folder.
- Promote to `_tools/`, `_templates/`, `_docs/`, or `_ops/` only when reuse crosses projects.
- Update this index and `registry.json` when projects are created or their status changes.
