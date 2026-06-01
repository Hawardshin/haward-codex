# Rust/Go Runtime Direction Research

## Question

Where should Rust, Go, Python, TypeScript/Next.js, and Electron fit when building this platform and installable software?

## Sources Checked

- Rust official site: Rust emphasizes fast, memory-efficient systems programming without a runtime or garbage collector, plus memory/thread safety.
- Rust Book concurrency chapter: ownership and type systems help manage memory safety and concurrency problems.
- Go official docs: Go is positioned as a compiled, statically typed, concise/efficient language with tooling and PGO paths.
- Go at Google: Go was designed for large-scale software engineering problems around builds, dependencies, readability, and tooling.
- Tauri official docs: Tauri uses the system webview to support small desktop/mobile binaries.
- Wails official docs: Wails is a desktop app candidate using a Go backend with web technologies.
- Electron official performance docs: Electron requires resource, responsiveness, and security-aware performance management.
- Python official Extending/Embedding docs: Python can stay as the orchestration layer while native extension or embedding boundaries are introduced.

## Judgment

The platform should use a hybrid structure instead of one language everywhere.

- Python remains best for agent workflows, research, and evaluation ecosystem.
- TypeScript/Next.js fits the existing `workspace-monitor` and Vercel-ready UI.
- Rust/Tauri fits small desktop shells, native command boundaries, security-sensitive operations, and stable hot paths.
- Go fits local daemons, file watchers, operational CLIs, and network bridges.
- Electron remains a fallback when JavaScript desktop ecosystem depth and Chromium consistency matter more.

## Plan Impact

- Add component-specific defaults and decision gates to `agent-platform/configs/runtime/language-decision-registry.json`.
- Keep `platform-desktop-app` Tauri-first while adding Go local service/Wails comparison.
- Do not move to Rust or Go for performance without measurements and prototype results.

## Limits

- This research sets direction. Actual choices still need local prototypes measuring cold start, memory, binary/installer size, build time, and indexing/search latency.
- Reddit/community opinions were treated only as signals, not decision proof.
