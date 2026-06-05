# 추적성: Smooth Redesign Maintenance

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| PDA-REQ-040 | `lib/motion.ts`, `MonitorShell.tsx`, `app/globals.css` | static test, `perf:buttons`, tab audit, Playwright smoke |
| PDA-REQ-040 | Tool Studio icon button min width | Playwright smoke, `check`, `test` |
| PDA-REQ-041 | `collect-workspace.mjs` bounded admin preview metadata | `check-history-payload.mjs`, generated snapshot payload check |
| PDA-REQ-041 | `lib/snapshot.ts` document metadata type | TypeScript check |
| PDA-REQ-042 | `timeline-docs` bounded scroll pane CSS | `check-scroll-containers.mjs`, `audit-monitor-surfaces.mjs` |
| PDA-REQ-042 | Agent chat context summary target size | `audit-monitor-surfaces.mjs`, static test |
| PDA-REQ-042 | Operator Center section browser audit | `audit-monitor-surfaces.mjs`, package `audit:surfaces` |
| Korean copy cleanup | `OperatorCenterDialog.tsx`, `MonitorShell.tsx` | static test, Playwright Operator Center smoke |
