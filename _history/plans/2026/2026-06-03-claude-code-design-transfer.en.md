# Plan: Claude Code Public Design Transfer

## Work Mode

- Selected: `governance`
- Reason: this changes source boundaries, platform behavior, registry, Workspace Monitor UI, readiness, and evaluation.

## Memory Bootstrap

- Command: `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- Result: `ready_to_bootstrap`

## Large Scope Decomposition

- Broad request: bring multiple Claude Code design insights into the platform.
- Slice: public-source design-transfer registry, Workspace Monitor Overview exposure, and validation.
- Excluded: leaked/non-public material, requiring Claude Code CLI, auto-installation, and MCP/hook/worktree runtime implementation.

## Touch Paths

- `platform-desktop-app/configs/claude-code-design-transfer-registry.json`
- `platform-desktop-app/docs/architecture/claude-code-design-transfer.*.md`
- `platform-desktop-app/docs/requirements/2026-06-03-claude-code-design-transfer.*.md`
- `platform-desktop-app/specs/2026-06-03-claude-code-design-transfer/`
- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/tests/collector.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- generated snapshot files

## Merge Gate

- The registry must be self-documenting.
- Workspace Monitor build must include `claudeCodeDesignTransfer`.
- Tauri build must still generate the local `.app` and DMG.
