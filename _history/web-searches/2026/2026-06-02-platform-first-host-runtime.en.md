# Platform-First Host Runtime Web Search

- Date: 2026-06-02
- Request summary: Shift the product so the platform runs first and tools such as Codex, Gemini CLI, and Claude Code CLI run on top of it.
- Work-mode impact: `governance`

## Queries

- `Tauri v2 sidecar command plugin process official docs`
- `Tauri v2 shell plugin sidecar official docs`
- `Claude Code CLI official docs setup`
- `Google Gemini CLI official GitHub`

## Checked Sources

- Tauri Shell plugin: `https://v2.tauri.app/plugin/shell/`
- Tauri sidecar / external binaries: `https://v2.tauri.app/develop/sidecar/`
- Claude Code CLI docs: `https://code.claude.com/docs/en/cli-usage`
- Google Gemini CLI official repository: `https://github.com/google-gemini/gemini-cli`

## Plan Impact

- Tauri shell/sidecar docs support the need for explicit permission and lifecycle boundaries when the platform launches local commands or sidecars.
- Claude Code and Gemini CLI remain guest adapter targets, not product hosts.
- Missing/auth/version CLI issues should become `capability_missing` or setup-later status for that adapter lane, not platform failure.

## Uncertainty

- Public-ready Tauri packaging, signing, notarization, and sidecar bundling claims remain gated by Rust/Tauri installation audit and OS-specific smoke tests.
