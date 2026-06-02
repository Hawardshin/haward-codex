# Plan: Unified Ops Timeline

- Work mode: `governance`
- Owning project: `workspace-monitor/`
- view_mode: `superadmin_developer`

## Plan

1. Run web-first intake and memory bootstrap.
2. Read the current snapshot collector, snapshot types, and Overview/History UI.
3. Shrink the broad request to `unifiedOps` snapshot plus Overview/History UI plus tests.
4. Add requirement `REQ-WM-018` and project spec artifacts.
5. Verify with collect/test/check/build/perf/static smoke.
6. Record omission/resource/grounding/evaluation, then commit and push.

## Large-Scope Decomposition

- Include: `workspace-monitor/scripts/collect-workspace.mjs`, `workspace-monitor/lib/snapshot.ts`, `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css`, related tests, and specs.
- Exclude: real-time telemetry backend, OpenTelemetry SDK, external observability SaaS, and removing existing tabs.
- Merge gate: test/check/build/perf/static smoke pass.
