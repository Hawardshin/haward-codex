# Runtime Language Direction Plan

## Request

Find a good direction for efficient languages such as Rust and Go for the platform and installable software.

## Work Mode

- `governance`

## Evidence

- Rust official materials: memory efficiency, no runtime/garbage collector, and safety.
- Go official materials: large-scale software engineering, builds, dependencies, readability, and tooling.
- Tauri official materials: small desktop/mobile binaries using system webview.
- Wails official materials: desktop app with Go backend and web technologies.
- Electron official materials: resource and security-aware performance.

## Plan

1. Add requirement `REQ-WS-051`.
2. Create `language-decision-registry.json`.
3. Add Korean and English runtime language policies.
4. Update `platform-desktop-app` with Go local service/Wails comparison and language direction.
5. Connect the new runtime direction to memory bootstrap.
6. Create research, summary, evaluation, and timing records.
7. Verify, commit, and push.
