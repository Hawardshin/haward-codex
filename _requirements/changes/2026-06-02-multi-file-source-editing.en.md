# Multi-File Source Editing Requirement Change

- Date: 2026-06-02
- Request: Implement broader file editing capabilities.
- Change type: installable desktop app capability expansion

## Added

- `PDA-REQ-025`: The Desktop source editing MVP shall open multiple workspace-scoped files at once, manage them as a draft queue, and show dirty state, diff preview, current-file save, save-all dirty files, current draft revert, draft close, and backup save results in the same surface.
- `PDA-UX-018`: The Desktop tab source-editing surface shall provide search/direct path open, dirty file queue, diff preview, current save, save all, revert, close, and backup-result review.

## Non-Goals

- Installing Monaco Editor, xterm.js, or PTY dependencies.
- Allowing edits outside the selected workspace.
- Allowing direct edits under `_private/` or `outputs/`.
