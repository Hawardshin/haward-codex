# Plan Record: View Mode Selection

## Selected Modes

- `work_mode`: `governance`
- Reason: The change updates shared platform rules, requirements, settings registry, monitor UI, and memory bootstrap.
- `view_mode`: `superadmin_developer`
- Reason: The repository owner is actively building the platform, and the user explicitly requested a superadmin-focused development mode selector for now.

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-02-view-mode-selection.en.md`
- Requirements change: `_requirements/changes/2026-06-02-view-mode-selection.en.md`
- Requirements review: `_requirements/reviews/2026-06-02-view-mode-selection.en.md`

## Execution Plan

1. Add `view_mode` as a registry separate from `install_mode` and `work_mode`.
2. Add registry validation CLI and unit tests.
3. Make Workspace Monitor snapshot and UI read the registry.
4. Update policy, workflow, prompt, persistent instructions, memory bootstrap, and AGENTS.
5. Save specs, history, evaluation, and request trace.
6. Run Python, Next.js, and operations validation.

## Plan Changes

- None.
