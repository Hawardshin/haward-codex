# Web Search Record: Desktop CLI Session / Source Editor MVP

## Search Purpose

Before extending the desktop supervisor beyond health checks into pipe-based execution sessions, stdin/defer/cancel, and scoped source editing, I checked official references for Tauri command scopes, shell plugin permissions, xterm.js, and Monaco Editor.

## Queries

- `Tauri v2 shell plugin spawn sidecar permissions official docs`
- `Tauri v2 shell plugin scope permissions official docs`
- `xterm.js React FitAddon official docs terminal emulator`
- `Monaco Editor React Next.js integration official docs`

## Sources Checked

| Source | Type | Checked Point | Plan Impact |
| --- | --- | --- | --- |
| `https://v2.tauri.app/security/scope/` | official docs | Tauri command scope must be enforced by the command implementer. | Even without the shell plugin, backend commands must enforce workspace path scope and allowlists. |
| `https://v2.tauri.app/plugin/shell/` | official docs | The shell plugin needs spawn/execute/stdin-write permissions and scopes. | This slice avoids plugin installation/permission expansion and uses Rust `Command` allowlist pipes instead. |
| `https://v2.tauri.app/develop/sidecar/` | official docs | Sidecar execution needs separate permissions and packaging decisions. | Long-running supervisor sidecars remain deferred until installation audit. |
| `https://xtermjs.org/docs/` | official docs | xterm.js is a web terminal emulator, not a PTY by itself. | The current implementation uses pipe output UI; PTY/xterm stays behind dependency audit. |
| `https://xtermjs.org/docs/guides/using-addons/` | official docs | Addons such as FitAddon extend the terminal UI. | Kept as UI candidates only; no install in this slice. |
| `https://github.com/microsoft/monaco-editor` | official repo | Monaco is a browser editor surface candidate. | This slice implements a dependency-free textarea scoped editor; Monaco remains follow-up. |

## Plan Impact

- Do not add shell plugin permissions.
- Enforce adapter allowlist, cwd scope, output bound, timeout, and stdin bound inside Tauri commands.
- Allow source writes only for workspace-relative paths and block `_private/`, `outputs/`, paths outside the workspace, and symlink escapes.
- Create backups before saving.

## Uncertainty

- Rust compilation is still unverified because Rust is not installed.
- Pipe-based execution can be limited for CLIs that require a PTY.
- Real adapter prompt/auth behavior requires smoke tests on machines where each CLI is installed.
