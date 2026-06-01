# Plan: Runtime Language Direction

## Evidence Summary

- Rust official docs emphasize memory efficiency, no garbage collector/runtime, and safety.
- Go official materials explain language design for large-scale software engineering, builds, dependencies, readability, and tooling.
- Tauri official docs provide a small desktop/mobile binary direction using the system webview.
- Wails official docs provide a desktop app candidate combining a Go backend and web technologies.
- Electron official docs describe resource usage and security-aware performance considerations.

## Execution Order

1. Add `REQ-WS-051`.
2. Create the language decision registry.
3. Write the runtime language selection policy in Korean and English.
4. Update the desktop distribution registry and packaging strategy with Go/Wails/local service comparison and language direction.
5. Connect the new registry/policy to memory bootstrap.
6. Create research, history, and evaluation records.
7. Verify, commit, and push.

## Risks And Responses

- Risk: Rust/Go preference leads to unnecessary rewrites.
- Response: Require measured bottlenecks and prototype measurements before migration.
- Risk: Tauri and Wails are confused as equal desktop shell defaults.
- Response: Keep Tauri-first for the shell while making Go the first candidate for local services/CLIs.
