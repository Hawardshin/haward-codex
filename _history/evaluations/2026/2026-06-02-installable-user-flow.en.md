# Work Evaluation: Installable App User Flow

## Initial Instruction

The user asked to design the user flow so the installable program becomes easy to use.

## Result Summary

- Added `platform-desktop-app/configs/user-flow-registry.json` to manage first run, workspace chooser, view mode, readiness scan, dashboard, task timeline, decision inbox, settings, and failure recovery in one place.
- Added `platform-desktop-app/docs/user-flow.en.md` and `platform-desktop-app/docs/first-run-onboarding.en.md`.
- Added `platform-desktop-app/artifacts/user-flow-map.html` as a browser-readable flow map.
- Added `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.en.md` and `platform-desktop-app/specs/2026-06-02-installable-user-flow/`.
- Added `_ops/workflows/74-desktop-user-flow-design.md` and `_ops/prompts/104-desktop-user-flow-design.md`, and linked the existing installable software workflow, prompt, and policy.
- Updated persistent instructions, AGENTS, memory bootstrap, coordination board, work summary, and request trace.

## References Checked

- Apple Human Interface Guidelines: Onboarding
- Microsoft Fluent 2: Onboarding
- Tauri v2 Distribute
- Tauri v2 Updater
- Electron Forge
- Electron utilityProcess
- Existing internal references: desktop distribution registry, view mode registry, CLI adapter registry

## Verification

- JSON checks passed for `user-flow-registry.json`, `desktop-distribution-registry.json`, `bootstrap-manifest.json`, and `status.json`.
- `check-config-contract`: passed
- `check-memory-bootstrap`: passed
- `docs-audit`: passed
- `workspace-index`: maps updated
- `task-board`: boards updated
- `workspace-monitor`: `npm run collect`, `npm test`, `npm run check`, `npm run build` passed
- `agent-platform`: 150 unit tests passed
- `naming-audit`: passed
- `workspace-health`: 20 checks passed
- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## Evaluation

The initial instruction is satisfied. This change does not implement a real Tauri/Electron app; it creates the user-flow and operating criteria that must guide implementation. Real desktop shell work, installer smoke tests, and usability tests remain future implementation improvements.

## Follow-Up Improvements

- Before a Tauri-first prototype, create an installation audit and framework decision record.
- After a real desktop shell exists, add workspace chooser, first-run, screenshot, and installer smoke tests.
- Add a usability checklist for time-to-first-dashboard and optional setup deferral.
