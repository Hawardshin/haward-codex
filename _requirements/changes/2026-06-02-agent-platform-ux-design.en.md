# 2026-06-02 Requirement Change: Agent Platform UX/Design Deep Research Improvement

## Change ID

`REQ-CHANGE-2026-06-02-UX-DESIGN`

## Background

The user asked to find design and UX elements through deep research and redesign the platform properly. The existing platform has substantial functionality and documentation, but the first view does not yet make status, next actions, evidence, and blockers immediately clear.

## Added Requirement

Add `REQ-WS-077`.

## Requirement

Platform UX and design improvements shall not be treated as visual decoration only. They shall apply deep-researched AI UX, dashboard hierarchy, system status visibility, user control, evidence trail, and decision recovery principles to `workspace-monitor` and `platform-desktop-app` first views, user flows, and validation artifacts.

## Verification Conditions

- `complete-deep-research` passes the UX research input.
- `workspace-monitor` overview includes first-viewport status, attention, evidence, and mode/language controls.
- `platform-desktop-app` user-flow artifact shows installable UX spine plus recovery and decision flow.
- `workspace-monitor` tests, typecheck, build, and screenshot smoke pass.
