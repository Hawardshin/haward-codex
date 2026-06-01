# View Mode Policy

## Purpose

This repository separates what a user sees, what a developer sees, and what the repository owner sees in a superadmin development view.

- `view_mode` controls what the UI and operations screens show.
- `install_mode` controls the setup scope for using or improving the platform.
- `work_mode` controls planning, evidence, verification, and evaluation strictness.

## Modes

### `user`

User view focuses on stable projects, history, documentation, and artifacts.

- Prioritize projects and work summaries.
- Hide or collapse requirements, internal settings, governance docs, and test/verification details by default.
- Before public deployment, sensitive data must be removed at snapshot generation time.

### `developer`

Developer view is for people improving a project or platform feature.

- Show requirements, specs, tests, agent inventory, and implementation docs.
- Keep superadmin publication and operations overrides out of the default work surface.
- Keep `work_mode` evaluation gates intact.

### `superadmin_developer`

Superadmin development view is the current default.

- Because the repository owner is still building the platform itself, projects, history, requirements, specs, agents, operations settings, and public-readiness checks should be visible together.
- This mode is an owner/operator lens. It does not mean authentication or authorization is implemented.
- Before public deployment, snapshot redaction and publication review are mandatory.

## Source Of Truth

- View mode registry: `agent-platform/configs/access/view-mode-registry.json`
- CLI validation:
  - `PYTHONPATH=src python3 -m agent_platform.cli check-view-modes configs/access/view-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli list-view-modes configs/access/view-mode-registry.json`
  - `PYTHONPATH=src python3 -m agent_platform.cli show-view-mode configs/access/view-mode-registry.json superadmin_developer`
- Monitor UI: `workspace-monitor/components/MonitorShell.tsx`
- Snapshot collector: `workspace-monitor/scripts/collect-workspace.mjs`

## Security Interpretation

- Hiding something in the UI is not a security boundary.
- For private-to-public transitions or multi-user deployments, authorization must be enforced by snapshot collection, server routing, authentication and authorization, and tests, not only client filtering.
- OWASP Authorization Cheat Sheet guidance on least privilege, deny by default, and checking every request is the future access-control baseline.
- NIST RBAC is a starting vocabulary for roles and permissions; attribute-based conditions should be considered where needed.

## Rules

- Choose `view_mode` when a screen or dashboard needs a user, developer, or superadmin lens.
- Choose `install_mode` for installation, running, deployment, or development environment setup.
- Let `work_mode` decide work artifacts and evaluation strictness.
- The current default view mode is `superadmin_developer`.
- When a public user view becomes necessary, design collector-level publication filters before adding only UI filters.
