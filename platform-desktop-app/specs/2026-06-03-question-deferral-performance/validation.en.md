# Question Deferral Performance Validation

## Commands

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `rg` static token check
- `git diff --check`

## Limits

- Native compile and benchmarks cannot run until the Rust toolchain is available.
- If browser automation tools are not exposed, static output checks are used instead.
