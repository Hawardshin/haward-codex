# Question Deferral Validation

## Required Validation

- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline ...`
- `python3 _tools/work-timer/src/work_timer.py check ...`

## Static Confirmation

- built/static output shall contain `Auto-defer questions`, `Defer detected questions`, `auto-deferred`, `pendingDecisionPrompts`, and `defer_all_cli_adapter_questions`.

## Limits

- Public macOS distribution readiness is not complete until signing/notarization are verified separately.
- If the Rust toolchain is unavailable, `cargo check` cannot run and the `platform-desktop-app run check` Rust warning is recorded.
