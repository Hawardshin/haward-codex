# Spec: Mode and Function Switchboard

## Purpose

The workspace monitor shall show view mode, language mode, work mode, install mode, desktop session mode, task pipe presets, CLI adapters, and monitor sections in one place. From Overview, the user should see what modes exist, where each one is selected, and open or select the actionable items.

## Scope

- Generate `modeFunctionCatalog` in the snapshot.
- Include groups, options, defaults, selector locations, source files, and desktop runtime flags.
- Add a `Mode & Function Switchboard` panel to Overview.
- Select view/language options directly from the panel.
- Route desktop session, task pipe, and CLI adapter options to Desktop.
- Route monitor section options to the selected section.
- Show registry locations for work/install options.

## Non-Goals

- Do not persist work/install mode as browser client state.
- Do not auto-install CLI adapters.
- Do not treat client-side mode selection as a security boundary.

## Acceptance Criteria

- `workspace-snapshot.json` includes `modeFunctionCatalog.summary` and 8 groups.
- Overview renders `Mode & Function Switchboard` and `모드와 기능 선택 위치`.
- Desktop readiness tests check the switchboard UI tokens.
- `npm run collect`, `npm test`, `npm run check`, and `npm run build` pass.
