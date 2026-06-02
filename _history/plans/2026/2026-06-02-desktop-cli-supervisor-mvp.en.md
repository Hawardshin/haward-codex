# Plan: Desktop CLI Supervisor MVP

## Work Mode

- Selected: `governance`
- Reason: This changes real subprocess execution paths, UI runtime surfaces, view modes, and resource/CLI-pipeline gates for the installable app.

## Scope

- Add allowlisted CLI detection and bounded health-check commands to the Tauri backend.
- Add a Desktop tab and Tauri/browser fallback to `workspace-monitor`.
- Expose the `desktop` section in the view mode registry.
- Update and run readiness, tests, and build checks.

## Non-Scope

- Rust/Tauri dependency installation.
- Tauri dev/build execution.
- Installing shell plugin, xterm.js, Monaco, or PTY dependencies.
- stdin writes, interactive prompt handling, or source-affecting CLI execution.
- Provider auth management.

## Sequence

1. Run web-first intake and memory bootstrap.
2. Inspect the current `platform-desktop-app` and `workspace-monitor` structure.
3. Implement Rust backend commands.
4. Implement the Desktop UI tab and browser fallback.
5. Update and run readiness, tests, and build checks.
6. Close out with omission/resource/grounding/evaluation records.
