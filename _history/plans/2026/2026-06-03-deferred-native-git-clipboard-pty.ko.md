# Plan Record: Deferred Native Git, Clipboard QA, PTY Decision

## Scope Classification

- Work mode: `ship_first`
- View mode: `superadmin_developer`
- Install mode context: `developer`
- Owner: `platform-desktop-app/`

## Slices

1. Close implementable deferred gaps: native Git, clipboard QA, PTY decision.
2. Keep non-implementable gates honest: public distribution remains external, full MonitorShell componentization remains structural.
3. Validate with Rust/type/test/readiness/build/browser smoke.

## Merge Gates

- Runtime contract must include Git workspace host commands.
- Readiness must fail if native Git, clipboard QA, or PTY decision regress to partial/test gap.
- Browser smoke must show the Git workbench and terminal drawer without dark-mode white background regression.
