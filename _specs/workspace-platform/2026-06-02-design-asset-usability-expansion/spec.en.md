# Design Asset Usability Expansion Spec

## Purpose

Move beyond simply owning many design assets by making them easy to scan, search, and connect to HTML/PPT artifacts.

## Requirements

- `REQ-WS-082`
- `DAL-REQ-005`

## Scope

- Expand internally generated SVG assets to 600.
- Provide a family-count CLI.
- Provide `family`, `query`, and `tag` search.
- Convert a single asset id into an HTML `<img>` snippet.
- Generate a static HTML gallery.
- Add external open-source source candidates to the registry without downloading files.

## Out Of Scope

- Downloading external SVG files.
- Final legal interpretation of external icon-set licenses.
- Server-backed asset management UI.
- Advanced redesign of the SVG visual system.

## Acceptance Criteria

- `asset-registry.json` records at least 600 generated assets.
- The six families each have 100 assets.
- `asset_browser.py search` and `snippet` commands work.
- `artifacts/html/gallery.html` is generated.
- Unit tests and config contract checks pass.
