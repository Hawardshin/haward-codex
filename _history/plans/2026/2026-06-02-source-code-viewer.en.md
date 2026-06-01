# Source Code Viewer Plan

## Request Summary

The user asked to make source code viewable in the installable/monitoring program.

## Work Mode

- `governance`

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-02-source-code-viewer.en.md`
- Research note: `_research/topics/workspace-monitor/2026-06-02-source-code-viewer.en.md`
- Internal references:
  - `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`
  - `agent-platform/configs/access/view-mode-registry.json`
  - `platform-desktop-app/configs/user-flow-registry.json`

## Plan

1. Compare source viewer implementation options.
2. Select a dependency-free read-only viewer.
3. Add a source-root-allowlisted `sourceFiles` snapshot.
4. Add the `source` section to Developer/Superadmin view modes.
5. Add Source tab filters and code viewer to Workspace Monitor.
6. Update requirements, specs, history, and evaluation.
7. Verify with tests, typecheck, build, workspace health, and evaluator.

## Decisions

- Source code is displayed read-only.
- Review `sourceFiles` snapshot scope before public deployment.
- Reconsider Monaco/Shiki later if editing or advanced highlighting becomes necessary.
