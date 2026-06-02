# Plan: Core Function Tab Structure

## Work Mode

- Selected mode: `standard`
- Reason: This is meaningful UI information architecture and requirement work, but it does not change a new policy or cross-workspace governance contract.
- View mode: `superadmin_developer`
- Install mode: not applicable
- Resource risk: low. No new long-running runtime, stream, timer, cache, or source scan is introduced.

## Evidence

- VA.gov Design System describes tabs as a way to divide related sections into manageable panels and warns against using tabs as page-level navigation.
- Red Hat Design System describes primary navigation as the place for high-level structure and important user actions.
- Equinor Design System describes tabs as suitable for related content at the same hierarchy.

## Implementation Order

1. Add `shortLabel`, `purpose`, and `group` metadata to monitor sections.
2. Add the core function rail and grouped section tabs to `MonitorShell`.
3. Add an Overview `Core Functions` panel.
4. Add responsive CSS plus hover and active states.
5. Update requirements, traceability, and validation records.
6. Run tests, typecheck, build, and customer bundle validation.
