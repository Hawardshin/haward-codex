# Request Trace: Source Code Viewer

## Request

- The user asked to make source code viewable in the installable/monitoring program.

## Result

- Added a `sourceFiles` catalog to the Workspace Monitor snapshot.
- Made the `Source` tab visible only in Developer/Superadmin view modes.
- Added project, language, and search filters plus a read-only code viewer.
- Added README guidance to review `sourceFiles` before public deployment.

## Artifacts

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `agent-platform/configs/access/view-mode-registry.json`
- `workspace-monitor/specs/2026-06-02-source-code-viewer/`
- `_history/web-searches/2026/2026-06-02-source-code-viewer.en.md`

## Verification

- Verification is recorded in `_history/evaluations/2026/2026-06-02-source-code-viewer.en.md`.

## Commit

- Recorded in the final response after close-out.
