# External SVG Actual Collection Guide

## Current Collection

| Source | Count | License | Local path |
| --- | ---: | --- | --- |
| Lucide | 800 | ISC | `assets/svg/external/lucide/` |
| Heroicons | 648 | MIT | `assets/svg/external/heroicons/` |
| Bootstrap Icons | 800 | MIT | `assets/svg/external/bootstrap-icons/` |
| Tabler Icons | 800 | MIT | `assets/svg/external/tabler-icons/` |

The repository stores 3,048 actual external SVG files.

## Key Files

- `configs/external-collection-policy.json`: source, commit, allowlist, and collection-size policy
- `scripts/collect_external_svg_assets.py`: actual collector
- `data/external-asset-registry.json`: registry for stored external SVGs
- `artifacts/html/external-gallery.html`: external SVG browsing gallery
- `assets/svg/external/<source>/LICENSE`: upstream license per source
- `assets/svg/external/<source>/SOURCE.json`: source provenance per source

## Commands

```bash
python3 design-asset-library/scripts/collect_external_svg_assets.py --dry-run
python3 design-asset-library/scripts/collect_external_svg_assets.py
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json families
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json search --family lucide --query dashboard --limit 5
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json snippet external-lucide-outline-layout-dashboard
```

## Expansion Rules

- Before adding a source, check its official repository and license.
- Use a pinned commit archive URL instead of a moving branch.
- Keep `allowed_svg_roots` narrow.
- Test that per-source `LICENSE` and `SOURCE.json` are generated.
- Recheck each source's license, attribution, and trademark constraints before public distribution.
