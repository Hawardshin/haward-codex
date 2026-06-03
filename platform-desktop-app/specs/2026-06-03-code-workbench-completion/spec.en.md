# Spec: Desktop Code Workbench Completion

## Purpose

The Desktop source editor must not stop at embedding Monaco. The installable platform needs a code workbench that lets code work finish inside the platform through a runtime workspace file index, open editors, editor commands, diff review, settings, and platform handoff.

## Scope

- The Tauri backend scans the current workspace at runtime and returns editable text files.
- The scanner skips `_private`, `outputs`, `.git`, `node_modules`, build outputs, and symlink escapes, with scan and return limits.
- Workspace Monitor Source Review prefers runtime file refresh and degrades to the snapshot catalog when Tauri is unavailable.
- Multiple open files are managed through an open editor tab strip with per-tab dirty state and close actions.
- The Monaco editor command toolbar provides undo, redo, find, replace, format, edit/diff mode, wrap, and settings.
- Diff mode uses Monaco DiffEditor to compare base content with draft content.
- The editor settings popup controls word wrap, minimap, and diff review.

## Non-Goals

- Do not implement a VS Code extension host or language server in this slice.
- Do not implement Git stage/commit UI in this slice.
- Do not allow access to files outside the workspace or direct editing of `_private`/`outputs`.

## Acceptance Criteria

- Tauri command `list_workspace_text_files` is registered and detected by readiness/test.
- Source Review renders `Refresh Files`, `Open Editors`, the editor command toolbar, `Editor Settings`, and `Diff Review`.
- `workspace-monitor` TypeScript check/test/build/customer build/perf budget pass.
- `platform-desktop-app` readiness/test and Rust check pass.
- Browser smoke confirms the Source Review workbench renders with horizontal overflow 0.
