# Spec: Workspace Monitor

## Goal

Build a Next.js monitoring site that visualizes repository history, agent/task status, projects, requirements, specs, evaluations, and Markdown documents. It should work locally while the repository is private and be deployable to Vercel after the repository is made public.

## Requirements

- `REQ-WM-001` - `REQ-WM-006`

## Behavior

- `scripts/collect-workspace.mjs` reads repository documents and writes `src/generated/workspace-snapshot.json`.
- The Next.js UI reads only the snapshot JSON and renders statically.
- The main screen provides Overview, Projects, History, Documents, Requirements, and Agents sections.
- Search and category filters narrow documents.
- Markdown is shown as escaped HTML previews.
- Deployment docs include snapshot public-scope and sensitive-data checks before Vercel publication.

## Acceptance Criteria

- `npm run collect`, `npm test`, `npm run check`, and `npm run build` pass.
- The local browser shows the main sections and non-empty document previews.
- `workspace-monitor/` is registered in the project registry.
- Installation record and lock file are preserved.

## Non-Goals

- Real-time push alerts, auth, database, or GitHub OAuth
- Complete Markdown spec rendering
- Automatically converting the private repository to public

