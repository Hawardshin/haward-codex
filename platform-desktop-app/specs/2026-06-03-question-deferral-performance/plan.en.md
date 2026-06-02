# Question Deferral Performance Plan

## Selected Optimizations

- Backend: limit session report and auto-deferral question scanning to the latest 32KB tail of stdout and stderr.
- Frontend: prevent active session polling overlap, throttle inbox refreshes to four seconds, and reuse existing objects for equivalent reports.
- Frontend: calculate idle elapsed-time render signatures in five-second buckets.

## Validation

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- close-out evaluator plus resource/grounding/cli-pipeline checks
