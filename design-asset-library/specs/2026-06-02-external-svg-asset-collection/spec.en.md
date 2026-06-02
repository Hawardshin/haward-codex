# External SVG Asset Collection Project Spec

## Purpose

Add an actually stored external open-source SVG pack to `design-asset-library` so presentations, dashboards, and HTML artifacts can use it directly.

## Requirement

- `DAL-REQ-006`

## Design

- `configs/external-collection-policy.json` defines allowed sources, pinned commits, path allowlists, and max counts.
- `scripts/collect_external_svg_assets.py` reads the policy and generates actual SVG files, per-source `LICENSE`, `SOURCE.json`, and the external registry.
- `data/external-asset-registry.json` records only actually stored external SVG files.
- `asset_browser.py` handles both `generated_assets` and `collected_assets` through the same search/gallery tooling.

## Current Collection Size

- Lucide: 800
- Heroicons: 648
- Bootstrap Icons: 800
- Tabler Icons: 800
- Total: 3,048

## Validation

- `python3 design-asset-library/scripts/collect_external_svg_assets.py --dry-run`
- `python3 design-asset-library/scripts/collect_external_svg_assets.py`
- `python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json families`
- `python3 -m unittest discover -s design-asset-library/tests`
