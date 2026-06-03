# Plan: Workspace Monitor Performance Budget

## Mode

- work_mode: `standard`
- view_mode: `superadmin_developer`
- Large-scope handling: the request asks for broad code analysis, so this slice samples representative bottlenecks and limits implementation to initial bundle size and search responsiveness.

## Sequence

1. Check official web references for Next.js lazy loading, bundle optimization, and React deferred rendering.
2. Sample build output and source import graph to identify the largest bottleneck.
3. Remove the static snapshot import and switch to a loader plus dynamic `MonitorShell`.
4. Restrict source-content scanning to the Source tab.
5. Add a performance-budget script.
6. Verify with check/test/build/perf/static smoke.

## Measurements

- Before largest JS chunk: `6,224,897 bytes`
- Target: largest JS chunk `< 1,000,000 bytes`
- After measurement: `227,537 bytes`
