# Traceability: Native Provider and Terminal Action Reliability

| Requirement | Source targets | Verification |
| --- | --- | --- |
| REQ-NAR-001 | `src-tauri/src/lib.rs`, `src-tauri/Cargo.toml` | `cargo check`, provider action smoke |
| REQ-NAR-002 | `src-tauri/src/lib.rs`, `renderer/workspace-monitor/lib/clipboard.mjs`, `RuntimeTerminalDrawer.tsx` | `clipboard.test.mjs`, terminal action smoke |
| REQ-NAR-003 | `src-tauri/capabilities/default.json` | package build/capability compile |
| REQ-NAR-004 | `scripts/smoke-terminal-provider-actions.mjs` | `corepack pnpm --filter workspace-monitor run smoke:terminal-provider-actions` |
| REQ-NAR-005 | `MonitorShell.tsx`, `RuntimeTerminalDrawer.tsx` | Playwright smoke and existing UI tests |
