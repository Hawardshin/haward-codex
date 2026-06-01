# Request-To-Outcome Trace: View Mode Selection

## Request

- ID: `UR-2026-06-02-016`
- Summary: Separate user and developer views and allow selecting a superadmin-focused development mode for now.

## Requirements

- `REQ-WS-061`
- `REQ-WM-011`

## Result

- Added the shared `view_mode` concept.
- Kept `superadmin_developer` as the default.
- Added a top-level Workspace Monitor selector for `User View`, `Developer View`, and `Super Admin Dev`.
- Kept `view_mode` separate from `install_mode` and `work_mode`.
- Documented that UI hiding is not a security boundary.

## Artifacts

- `agent-platform/configs/access/view-mode-registry.json`
- `agent-platform/src/agent_platform/view_modes.py`
- `agent-platform/tests/test_view_modes.py`
- `agent-platform/configs/agents/view-mode-router-agent.json`
- `agent-platform/docs/view-mode-router-agent.en.md`
- `_docs/policies/view-mode-policy.en.md`
- `_ops/workflows/73-view-mode-selection.md`
- `_ops/prompts/103-view-mode-selection.md`
- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/app/globals.css`

## Verification

- `check-view-modes`: see evaluation report
- `agent-platform` unit tests: see evaluation report
- `workspace-monitor` collect/test/check/build: see evaluation report

## Evaluation

- `_history/evaluations/2026/2026-06-02-view-mode-selection.en.md`

## Commit

- To be recorded after close-out
