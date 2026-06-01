# Runtime Language Direction Requirement Change

## Change Overview

- Date: 2026-06-02
- Source request: `UR-2026-06-02-006`
- Added requirement: `REQ-WS-051`
- Work mode: `governance`

## User Request Summary

The user asked to find a good direction for efficient software languages such as Rust and Go when building this platform and installable software.

## Change

`REQ-WS-051` adds component-boundary and measured-bottleneck based runtime selection.

- Python: default for agent logic, research, and evaluation
- TypeScript/Next.js: default for monitor, dashboards, and HTML UI
- Rust/Tauri: first candidate for desktop shell, native command boundaries, and stable hot paths
- Go: first candidate for local daemons, file watchers, and operational CLIs
- Electron/Node: JavaScript desktop fallback

## Evidence

- Rust official materials position Rust around no runtime/garbage collector, memory efficiency, and safety.
- Go official materials explain large-scale software engineering, builds, dependency management, readability, and tooling as core design drivers.
- Tauri official docs position Tauri around small desktop/mobile binaries using the system webview.
- Wails official docs provide a Go backend plus web technology desktop app route.
- Electron official docs emphasize performance and security together.
