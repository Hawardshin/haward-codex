# Research Note: Desktop CLI Supervisor MVP

## Summary

This implementation is the smallest practical MVP for starting real CLI subprocess execution without installing the Tauri shell plugin or PTY dependencies. The safe first step is PATH detection plus stdin-free bounded `--version` probes for allowlisted commands.

## Evidence

- Tauri config docs describe `withGlobalTauri` as the switch for injecting `window.__TAURI__`.
- Tauri command docs show frontend-to-Rust invocation through `invoke`.
- Tauri shell plugin docs require scoped execute/spawn/stdin-write permissions, so direct shell plugin use needs a later permission and installation audit.
- xterm.js and Monaco remain candidates for later interactive terminal and source editor work, but were not installed in this change.

## Implementation Decision

- Rust backend commands: `list_cli_adapters`, `run_cli_adapter_health`, `run_all_cli_adapter_health`.
- UI surface: `workspace-monitor` Desktop tab.
- Execution limits: command allowlist, PATH detection, timeout, max output, stdin null, and decision-prompt candidate detection.
- Fallback: browser-only runs degrade to an unavailable Tauri runtime state.

## Limits

- Rust compile/smoke verification was not run because Rust is not installed in the current environment.
- Real long-running CLI tasks, PTY, stdin writes, cancellation UI, and persisted run artifacts remain future work.
