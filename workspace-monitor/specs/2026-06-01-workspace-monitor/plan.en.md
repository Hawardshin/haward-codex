# Implementation Plan: Workspace Monitor

## Evidence

- Next.js App Router official docs support `app/` routing and static export.
- Vercel official docs support repository-based deployment with the Next.js framework preset.
- Public deployment requires sensitive-data review, so the app uses a generated snapshot instead of reading repository files at runtime.

## Strategy

1. Register `workspace-monitor/` as a new root project.
2. Manually scaffold a Next.js App Router project.
3. Add `scripts/collect-workspace.mjs` to read `_history`, `_ops`, `_requirements`, `_specs`, and project docs/specs into a snapshot.
4. Render stats, projects, agents/tasks, recent history, and a document explorer from the snapshot.
5. Generate Markdown previews with a limited escaping-based renderer to reduce raw HTML injection risk.
6. Document Vercel deployment and pre-publication checks.
7. Preserve dependency installation records, lock file, tests/build/browser verification, and evaluation.

## Risks

- Public deployment can expose private snapshot content. README and deployment docs include a pre-publication review.
- Vercel parent-repository access can differ. The generated snapshot is committed and collection is best-effort before build.
- The Markdown renderer is not a complete Markdown implementation. The first version targets readable previews.

