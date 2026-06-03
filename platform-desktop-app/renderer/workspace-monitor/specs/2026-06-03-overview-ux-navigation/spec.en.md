# Spec: Overview UX Navigation Improvements

## Purpose

As Workspace Monitor gains more functions, users need a shorter path from current state to next action. The top of Overview should act as a compact operating surface that exposes the selected section, attention state, next action, evidence, and runtime entry point.

## Feature Scope

- Show a state or count badge on each section tab.
- Add an `operator-strip` between the view mode selector and filter toolbar.
- The `operator-strip` shall show current section, workspace attention state, primary action, next decision/action, web search/evaluation count, and a Desktop runtime shortcut.
- Action buttons shall navigate directly to the related section.
- On mobile, operator actions shall expand to full width for easier touch interaction.

## Non-Goals

- Do not add a new data store.
- Do not treat client-side UI visibility as a security boundary.
- Do not remove the existing Overview command center, evidence panel, or mode switchboard.

## Acceptance Criteria

- Every section tab renders a badge.
- `operator-strip` renders tone-aware icon color and shortcut buttons.
- `npm run check`, `npm test`, `npm run build`, and desktop customer bundle build pass.
- Static build or browser smoke confirms `operator-strip`, `Runtime`, and `Workspace status and actions`.
