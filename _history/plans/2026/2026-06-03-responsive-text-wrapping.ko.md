# Plan Record: Responsive Text Wrapping

## Scope Classification

- Work mode: `ship_first`
- View mode: `superadmin_developer`
- Install mode context: `developer`
- Owner: `platform-desktop-app/`

## Slices

1. Reduce over-broad text break policy introduced by responsive button work.
2. Preserve long-token overflow safety for code, paths, logs, and state values.
3. Add readiness/test/browser QA gates so the regression is visible.

## Merge Gates

- CSS must not use `overflow-wrap: anywhere` in global button or generic button label rules.
- Build/check/test must pass.
- Browser QA must show no horizontal overflow at mobile width.
