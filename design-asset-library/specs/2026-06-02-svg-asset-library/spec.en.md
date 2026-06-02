# SVG Asset Library Spec

## Update Note

- This document records the initial 120-asset generation scope.
- The current working baseline follows `design-asset-library/specs/2026-06-02-asset-usability-expansion/spec.en.md`: 600 generated assets plus discovery tooling.

## Purpose

Prepare many SVG design assets for presentations, HTML, dashboards, and prototypes without copyright-risky downloads.

## Scope

- Generate 120 internal SVG files.
- Write an asset registry.
- Record external open-source source candidates.
- Write licensing and usage docs.
- Add unit tests.

## Out Of Scope

- Downloading paid, commercial, or brand assets.
- Storing external SVG files.
- Cloning a specific paid template.

## Acceptance Criteria

- Registry passes the self-documenting config contract.
- At least 100 SVG files exist and parse as XML.
- External candidates remain `downloaded=false`.
