# Traceability

| Requirement | Artifact | Verification |
| --- | --- | --- |
| REQ-WM-012 | `workspace-monitor/scripts/collect-workspace.mjs` | `npm test`, snapshot source count |
| REQ-WM-012 | `workspace-monitor/lib/snapshot.ts` | `npm run check` |
| REQ-WM-012 | `workspace-monitor/components/MonitorShell.tsx` | `npm run build` |
| REQ-WM-012 | `workspace-monitor/app/globals.css` | UI build |
| REQ-WM-012 | `agent-platform/configs/access/view-mode-registry.json` | `check-view-modes` |

## Evidence

- Node.js `fs` official docs
- Next.js Static Exports official docs
- Shiki install docs
- Monaco Editor docs

## Note

The Source tab is a read-only browser, not a code editor. Before public deployment, review the `sourceFiles` snapshot scope.
