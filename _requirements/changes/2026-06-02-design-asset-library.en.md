# Design Asset Library Change

## Requirement ID

- `REQ-WS-081`

## User Request

- The user asked for many SVG design assets to be prepared for reuse, while explicitly saying not to download illegally.

## Change

- Add the new root project `design-asset-library/`.
- Use internally generated SVG assets as the default asset source.
- Record external open-source candidates in the registry, but require license review before storing files.
- Let presentation, HTML, dashboard, and prototype work select SVGs through the registry.

## Decision

- Do not copy external SVG files by default.
- Build the initial asset pack through a generator.
