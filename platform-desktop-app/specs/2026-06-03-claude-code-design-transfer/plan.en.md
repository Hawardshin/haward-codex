# Claude Code Public Design Transfer Plan

## Mode Selection

- Selected mode: `governance`
- Reason: the change affects durable platform behavior, source boundaries, a self-documenting registry, Workspace Monitor operations, readiness, and evaluation.
- Web-first: official Claude Code docs were checked first.
- Memory bootstrap: `check-memory-bootstrap` returned `ready_to_bootstrap`.

## Large Scope Decomposition

- Broad trigger: the user asked to bring many Claude Code insights into the platform.
- Bounded slice: this change includes only a public-source design-transfer registry and Workspace Monitor exposure.
- Excluded: leaked/non-public material, actual connector/hook/worktree runtime implementation, CLI auto-installation, and public installer release claims.
- Representative files: `workspace-monitor/scripts/collect-workspace.mjs`, `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/lib/snapshot.ts`, `platform-desktop-app/scripts/check-readiness.mjs`, `platform-desktop-app/README.md`.

## Sequence

1. Record public sources and source boundary in the web-search record.
2. Write requirements and spec artifacts.
3. Add the self-documenting registry.
4. Connect collector, types, UI, readiness, and tests.
5. Record validation, omission, grounding, and evaluation.
6. Commit and push.
