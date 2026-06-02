# Spec: App-Like Command Controls

## Purpose

Workspace Monitor should behave more like a real application: many functions should be quick to find and execute. A core rail and grouped tabs help, but repeated movement gets slower as features grow, so the UI needs a global command palette plus pinned and recent quick controls.

## Scope

- Add an `app-control-bar` with a command palette trigger, pinned sections, and recent sections.
- The command palette searches and runs sections, view modes, language modes, document category filters, and key quick actions.
- Pinned sections persist in browser `localStorage`, while unavailable storage degrades silently.
- Recent sections live in current session state.
- The keyboard listener is registered on mount and removed on unmount.
- Sections disallowed by the current view mode are hidden from pinned/recent controls.

## Non-Goals

- Do not add a server store or remote user settings store.
- Do not replace customer snapshot redaction with client-side UI hiding.
- Do not install a separate command palette library.
- Do not split every panel module in this slice.

## Acceptance Criteria

- `app-control-bar` renders the command trigger, pinned controls, and recent controls.
- The command palette can run section, view, language, category, and quick action commands.
- The keyboard event listener has cleanup.
- Local storage failure does not break the app.
- `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, customer bundle validation, and static export smoke pass.
