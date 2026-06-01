# Request Trace: Agent Collaboration Board

## Request

- The user requested that the UI show agents working with each other.

## Result

- Added `collaborationBoard` to the Workspace Monitor snapshot.
- Added an agent collaboration board, work lanes, agent-task-project flow, and workload strip to the Agents tab.
- Made blockers and next actions visible on task cards.

## Main Outputs

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/specs/2026-06-02-agent-collaboration-board/`

## Verification

- `npm test`
- `npm run collect`
- `npm run check`
- `npm run build`
- `evaluate-work`

## Evaluation

- `_history/evaluations/2026/2026-06-02-agent-collaboration-board.en.md`
