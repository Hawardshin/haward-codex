# Multi-File Source Editing Web Search

- Date: 2026-06-02
- Request summary: Implement a broader file-editing experience for the installable desktop app.
- Work-mode impact: `governance`

## Queries

- `Monaco Editor official documentation dispose models worker integration`
- `Tauri v2 official filesystem permissions scope documentation`
- `GitHub Desktop official documentation review changes diff commit`
- `Visual Studio Code official source control diff editor documentation`

## Checked Sources

- Monaco Editor docs: `https://microsoft.github.io/monaco-editor/`
- Tauri v2 filesystem/security docs: `https://v2.tauri.app/plugin/file-system/`
- GitHub Desktop docs on reviewing changes: `https://docs.github.com/en/desktop/making-changes-in-a-branch/reviewing-changes-in-github-desktop`
- VS Code source control docs: `https://code.visualstudio.com/docs/sourcecontrol/overview`

## Plan Impact

- Monaco remains the right long-term editor surface candidate, but this slice did not add dependencies without installation audit.
- Tauri file access should remain workspace-relative with deny boundaries, so the renderer did not gain arbitrary filesystem access.
- GitHub Desktop and VS Code change-review patterns informed the draft queue, dirty state, current save, save all, revert, and backup-result placement.

## Uncertainty

- Real macOS Tauri WebView smoke for file commands remains gated by Rust/Tauri developer installation audit.
