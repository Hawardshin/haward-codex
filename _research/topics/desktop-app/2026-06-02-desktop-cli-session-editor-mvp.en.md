# Desktop CLI Session / Source Editor MVP Research

## Summary

This implementation chooses a pipe-based MVP with direct allowlist and scope enforcement inside Tauri commands, instead of jumping to full PTY or shell plugin integration.

## Evidence

- Tauri command scope documentation says command implementers must enforce scopes.
- Tauri shell plugin and sidecars require permission and packaging decisions, so they remain deferred until installation audit.
- xterm.js is a terminal UI candidate but not a PTY.
- Monaco Editor is a source editor candidate but is not installed before dependency audit.

## Language Options

| Option | Strength | Weakness |
| --- | --- | --- |
| Rust/Tauri command | Matches the current scaffold and can enforce native process/file boundaries. | Rust toolchain is missing, so compile verification is delayed. |
| Node sidecar | Pairs naturally with node-pty/xterm. | Adds sidecar packaging, permission, lifecycle, and signing burden. |
| Python sidecar | Fits the existing agent-platform validation layer. | Interactive terminal/PTY and desktop packaging need separate design. |

Selection: Rust/Tauri command, because it matches the current scaffold and can implement allowlisted process and scoped file boundaries without installing the shell plugin.

## Architecture Options

| Option | Strength | Weakness |
| --- | --- | --- |
| Pipe session MVP | Adds stdout/stderr/stdin/cancel without installing dependencies. | Limited for CLIs that require a PTY. |
| Tauri shell plugin | Uses the official plugin and permission model. | Needs permission scope and installation audit. |
| PTY sidecar | Closer to real terminal UX. | Higher dependency, cleanup, packaging, signing, and rollback risk. |

Selection: Pipe session MVP. PTY sidecar/xterm comparison remains the next step.

## Code References

- Existing `platform-desktop-app/src-tauri/src/lib.rs` health-check command
- Existing `workspace-monitor/components/MonitorShell.tsx` Desktop tab
- Official Tauri command/scope documentation

## Limits

- Rust compile is still unverified.
- Real installed-CLI smoke tests are needed.
- The textarea editor is not a Monaco replacement; it is a safe bridge MVP before dependency audit.
