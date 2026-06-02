# Spec: Core Function Tab Structure

## Purpose

As Workspace Monitor gained more features, core functions and supporting navigation were mixed into one flat tab row. The first screen should make it immediately clear where the main functions live, while section tabs should be grouped by functional area.

## Scope

- Expose `Overview`, `Desktop`, `Intent Map`, `Agents`, and `Structure` through a core function rail.
- Replace the flat section tab row with grouped tabs for core execution, workspace, and knowledge/evidence.
- Give each tab a short label, count/status badge, and purpose tooltip.
- Add an Overview `Core Functions` panel that repeats the main function map.
- Hide sections from the core rail and grouped tabs when the selected view mode does not allow them.
- Keep mobile labels visible and switch to a one-column layout instead of hiding tab text.

## Non-Goals

- Do not add a new snapshot data contract.
- Do not treat client-side tab hiding as a customer security boundary.
- Do not rewrite the detailed feature surfaces for each section.
- Do not split large components in this slice.

## Acceptance Criteria

- The top `core-feature-rail` renders and opens the core function sections directly.
- Existing section tabs render as functional `section-tab-groups`.
- Overview shows a `Core Functions` panel.
- User view mode only shows allowed sections, while developer/superadmin show internal function tabs.
- `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, and desktop customer bundle build pass.
