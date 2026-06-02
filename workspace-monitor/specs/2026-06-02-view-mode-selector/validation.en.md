# Validation: Workspace Monitor View Mode Selector

## Verification Plan

- `npm run collect`
- `npm test`
- `npm run check`
- `npm run build`

## Acceptance Criteria

- `src/generated/workspace-snapshot.json` includes `viewModeCatalog`.
- The default mode is `superadmin_developer`.
- The top selector exposes all three modes.
- `user` mode reduces internal operations and implementation documents from the default surface.
- `superadmin_developer` mode keeps the full operations view.
