# Plan Record: Workspace Monitor

## Request

- Build a monitoring site that visualizes repository history, Markdown documents, projects, and agent status.
- Implement it with Next.js so it can be deployed to Vercel after the repository is made public.

## Work Mode

- `standard`
- Reason: this is a new root project implementation requiring requirements, specs, installation, validation, and history artifacts, but it does not change shared operating rules.

## Project Boundary

- New project: `workspace-monitor/`
- Owned scope: Next.js UI, snapshot generator, generated data, Vercel docs, monitor-specific requirements/specs/tests.
- Shared sources: `_history/`, `_ops/`, `_requirements/`, `_specs/`, and existing project docs/specs.

## Decisions

- Use App Router plus static export.
- `scripts/collect-workspace.mjs` reads repository documents and creates a JSON snapshot.
- The UI imports only `src/generated/workspace-snapshot.json`.
- Markdown previews use a limited escaping-based renderer.
- Public deployment docs include a snapshot review step.

