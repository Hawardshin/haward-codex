# Plan: App-Like Command Controls

## Work Mode

- Selected mode: `standard`
- Reason: This changes meaningful Workspace Monitor UI interaction and requirements, but does not add a new policy, installation, server store, or cross-workspace runtime contract.
- View mode: `superadmin_developer`
- Install mode: not applicable
- Resource risk: low. The keyboard listener has cleanup, and no long-lived resource beyond localStorage is introduced.

## Evidence

- Grafana uses a command palette for global search and key action execution.
- Basis Design System describes saved/persisted views as useful for repeated configurations in complex data screens.
- UAE Design System describes actions and inputs as standardized elements that change user flow or system state.

## Implementation Order

1. Define command item type, pinned-section storage key, and default pinned sections.
2. Add command palette open/query, pinned, and recent state to `MonitorShell`.
3. Add keyboard listener, focus, recent update, and localStorage persistence lifecycles.
4. Build the command item list and execution function.
5. Render `app-control-bar` and the command palette dialog.
6. Add CSS and responsive rules.
7. Update requirements, history, validation, and evaluation records.
