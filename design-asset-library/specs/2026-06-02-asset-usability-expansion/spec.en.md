# Asset Usability Expansion Spec

## Purpose

Expand `design-asset-library` from storage into an asset workbench that users can scan, search, and paste from.

## Requirements

- `DAL-REQ-002`
- `DAL-REQ-003`
- `DAL-REQ-004`
- `DAL-REQ-005`

## Design

- Generate 600 assets from 6 families, 20 motifs, and 5 palettes.
- `asset_browser.py` reads the registry and provides family counts, search, snippets, and gallery generation.
- `gallery.html` is static and can open in a browser without a separate server.
- External open-source sources stay as candidates only and are not downloaded.

## Validation

- `python3 design-asset-library/scripts/generate_svg_assets.py`
- `python3 design-asset-library/scripts/asset_browser.py gallery --output design-asset-library/artifacts/html/gallery.html --limit 600`
- `python3 -m unittest discover -s design-asset-library/tests`
