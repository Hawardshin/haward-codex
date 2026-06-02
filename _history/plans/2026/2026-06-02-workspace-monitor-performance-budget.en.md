# Plan Record: Workspace Monitor Performance Budget

## Request Summary

The user asked to analyze the code broadly, improve speed, and keep it fast.

## Scope Reduction

- Do not refactor the whole repository.
- Sample representative bottlenecks through build output and import graph.
- This slice focuses on Workspace Monitor initial JavaScript size and search responsiveness.

## Execution Plan

1. Run web-first intake and memory bootstrap.
2. Measure the largest Workspace Monitor build output chunk.
3. Remove the static snapshot import.
4. Apply public JSON fetch plus dynamic `MonitorShell` import.
5. Reduce search rendering cost.
6. Add the `perf:budget` regression check.
7. Run check/test/build/perf/static smoke.

## Result

- Before largest JS chunk: `6,224,897 bytes`
- After largest JS chunk: `227,537 bytes`
