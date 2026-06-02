# Plan: Mode and Function Switchboard

## Selected Approach

1. Normalize existing registries and UI presets during snapshot collection.
2. Render groups and options from the snapshot in React.
3. Wire directly selectable modes to UI state, and route location-oriented items to their section or source display.
4. Prevent regressions with collector, unit, readiness, and build checks.

## Rationale

- Apple HIG and Fluent use navigation and segmented controls as explicit selection surfaces.
- WAI-ARIA tabs and landmarks patterns emphasize clear navigation structure and current regions.
- This repository already separates view/language/work/install/CLI registries, so composing a catalog is smaller and more maintainable than adding a new runtime.

## Risks and Mitigations

- Risk: work/install modes could be mistaken for persisted browser runtime state.
- Mitigation: show selector locations and source paths, and do not store those modes as browser state.
- Risk: long descriptions or paths could break the layout.
- Mitigation: use responsive grids and `overflow-wrap`.
