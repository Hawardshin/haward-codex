# Spec: Date-Indexed History And Folder Structure Map

## Goal

Make Workspace Monitor collect `_history/` documents by date and show the current repository root/docs/project folder structure in the web UI.

## Requirements

- `REQ-WM-007`
- `REQ-WM-008`
- Related request: `UR-2026-06-01-015`

## Behavior

- The collector extracts `historyDate` from `_history/**/YYYY/YYYY-MM-DD...` paths.
- The snapshot includes `historyDays`, a date-indexed history collection.
- The History UI can filter by date and history type.
- The snapshot includes `folderStructure` with root folder classes, `_docs` categories, project homes, and history source roots.
- The Structure UI shows folder boundaries and data provenance.

## Out Of Scope

- Server database or real-time event storage
- Git commit graph visualization
- Editing files from the browser
