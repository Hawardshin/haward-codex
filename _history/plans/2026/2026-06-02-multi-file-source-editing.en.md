# Multi-File Source Editing Plan

## Goal

Let the Desktop tab open multiple workspace-scoped files at once and review draft changes through a draft queue and diff surface before saving.

## Decisions

- Do not install a new editor dependency.
- Keep the existing Tauri `read_workspace_text_file` and `write_workspace_text_file` security boundaries.
- Add a React `SourceDraftEntry` queue for open files, dirty files, and backup results.

## Steps

1. Extend Source Review state from one file to a multi-draft queue.
2. Add direct path open, indexed file browser, dirty queue, save current, save all, revert, and close UI.
3. Link requirements, specs, and readiness tests to the new feature.
4. Run TypeScript, tests, build, performance budget, and visual smoke checks.
5. Record omission, resource, grounding, and evaluation artifacts.

## Deferred

- Monaco Editor integration waits for dependency, license, and security audit.
- PTY/xterm source-affecting autonomous task supervision remains later spec work.
