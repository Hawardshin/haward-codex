# Plan: Unified Ops Timeline

## Scope

- `workspace-monitor` snapshot collector
- `workspace-monitor` snapshot types
- Overview and History UI
- Collector/readiness tests
- Requirements, validation, history, and evaluation records

## Steps

1. Check web-first references for unified observability.
2. Inspect the current `documents`, `historyDays`, `tasks`, and `collaborationBoard` collection structure.
3. Preserve existing structures while adding the higher-level `unifiedOps` aggregate.
4. Add `Unified Ops` panels to Overview and History.
5. Reinforce collector tests and desktop readiness string checks.
6. Verify with collect/check/test/build/perf/static smoke.
7. Record requirements/spec/history/evaluation, then commit and push.

## Risks and Mitigation

- Large snapshot growth: cap `unifiedOps.events` at 160.
- Language filters hiding monitoring events: do not hide `monitor` sourceType events by language mode.
- Loss of drill-down views: keep History/Agents/Desktop tabs and add only a higher-level panel.
- Missing visual validation: if Browser MCP tools are unavailable, use static response and built-output string checks and record the limitation.
