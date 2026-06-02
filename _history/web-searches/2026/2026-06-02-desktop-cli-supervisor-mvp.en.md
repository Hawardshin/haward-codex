# Web Search Record: Desktop CLI Supervisor MVP

## Search Purpose

Before adding real CLI adapter detection and bounded health-check execution to the installable desktop app, I checked official references for Tauri global APIs, Tauri command invocation, and the xterm.js/Monaco candidates.

## Queries

- `Tauri v2 shell plugin Command spawn official documentation JavaScript`
- `Tauri v2 invoke command Rust frontend official documentation`
- `Tauri v2 withGlobalTauri config official invoke window __TAURI__`
- `xterm.js terminal emulator official documentation FitAddon`
- `Monaco Editor React Vite official npm package documentation GitHub`

## Checked Sources

| Source | Type | Checked | Plan Impact |
| --- | --- | --- | --- |
| `https://v2.tauri.app/reference/config/` | official docs | `app.withGlobalTauri` controls injection of `window.__TAURI__`. | Use `withGlobalTauri=true` so static `workspace-monitor` can call Tauri invoke. |
| `https://v2.tauri.app/es/develop/calling-rust/` | official docs | Frontend code can call Rust commands with `invoke()`. | Add Rust backend commands and call them through a monitor UI bridge. |
| `https://v2.tauri.app/plugin/shell/` | official docs | The shell plugin requires scoped execute/spawn/stdin-write permissions. | Limit this MVP to allowlisted Rust `std::process` health checks, without shell plugin. |
| `https://xtermjs.org/docs/guides/using-addons/` | official docs | xterm.js terminal and FitAddon usage flow. | Leave PTY/interactive terminal for a later dependency audit. |
| `https://github.com/microsoft/monaco-editor` | official repo | Monaco Editor install and browser editor surface. | Show source-editing readiness in this MVP and defer installation. |

## Plan Impact

- Do not install `@tauri-apps/api`; use a `withGlobalTauri` runtime bridge instead.
- Restrict first real execution to stdin-free bounded `--version` probes.
- Do not install shell plugin, xterm.js, Monaco, or PTY dependencies in this change.
- Browser-only runs should show an unavailable fallback in the Desktop tab.

## Uncertainty

- The current environment lacks Rust, so Tauri/Rust compile verification was not possible.
- Actual auth states and interactive prompt patterns for Claude/Gemini/Codex/OpenCode require installed CLI smoke tests.
