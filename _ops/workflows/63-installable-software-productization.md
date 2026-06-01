# Installable Software Productization Workflow

## Purpose

Use this workflow when the platform should become software that a user installs, such as a desktop application or OS-specific installer.

## Inputs

- User productization request
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- Existing setup install modes in `agent-platform/configs/installations/install-mode-registry.json`
- Target OS list
- UI/runtime candidates such as `workspace-monitor` and `agent-platform`

## Sequence

1. Run web-first intake and record the search.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` when project boundaries, release policy, or durable distribution rules change.
4. Confirm boundary:
   - Repository setup belongs to `install_mode`.
   - End-user installer packaging belongs to `platform-desktop-app/`.
5. Open `platform-desktop-app/configs/desktop-distribution-registry.json` and `platform-desktop-app/configs/user-flow-registry.json`.
6. Confirm the installable app can reach first value through open/create/demo workspace, workspace boundary review, view mode selection, readiness scan, and dashboard arrival.
7. Compare at least two framework or packaging routes before installing dependencies:
   - Tauri
   - Electron
   - native packaging-only
8. Decide whether this turn is:
   - productization structure only
   - prototype implementation
   - release packaging
9. If installing dependencies, follow `_ops/workflows/58-installation-record.md` first.
10. Record release gates:
   - signing
   - notarization where applicable
   - installer format
   - update path
   - uninstall and rollback
   - privacy/security/license review
   - install/first-run/update smoke tests
11. Update project-local requirements/specs and shared navigation if durable structure changed.
12. Validate configs, structure, docs, naming, maps, board, grounding, and evaluator outputs.

## Output Contract

- target product boundary
- selected or deferred desktop framework decision
- compared routes and trade-offs
- packaging targets by OS
- release gates
- first-run user flow and optional setup deferral behavior
- dependency installation status
- installation audit targets if installation occurred
- privacy and secret-handling rules
- validation commands and results

## Rule

Do not call a prototype production-ready just because it runs locally. Installable software needs trust, recovery, update, and uninstall behavior.
