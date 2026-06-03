# Plan: Workspace Monitor View Mode Selector

1. Make the snapshot collector read `agent-platform/configs/access/view-mode-registry.json`.
2. Add `viewModeCatalog` to snapshot types.
3. Add a segmented selector to the top of `MonitorShell`.
4. Filter tabs by the selected mode's `allowedSections`.
5. Hide internal config/spec/evaluation documents by default in user mode.
6. Keep responsive CSS stable.
7. Validate with `npm run collect`, `npm test`, `npm run check`, and `npm run build`.
