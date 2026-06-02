# SVG Asset Library Usage

When the presentation agent needs new design elements, it should check `design-asset-library/` first.

## Default Sequence

1. Define the visual role needed in the presentation.
2. Scan `design-asset-library/artifacts/html/gallery.html` to see the available visual range.
3. If an actual open-source icon is needed, scan `design-asset-library/artifacts/html/external-gallery.html`.
4. Narrow candidates with `design-asset-library/scripts/asset_browser.py search` by `family`, `query`, or `tag`.
5. Use the `snippet` command for `<img>` code or inline the SVG directly.
6. If no generated asset fits, add a motif to `design-asset-library/scripts/generate_svg_assets.py` and regenerate the registry.
7. If no external source fits, add the source and path allowlist to `configs/external-collection-policy.json`, then collect only after license review.

## Quick Commands

```bash
python3 design-asset-library/scripts/asset_browser.py search --family presentation --query title --limit 5
python3 design-asset-library/scripts/asset_browser.py snippet presentation-title-slide-ink-cyan
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json search --family lucide --query dashboard --limit 5
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json snippet external-lucide-outline-layout-dashboard
```

## Positive Replacement Rule

- Instead of copying external assets directly, first record source URL, license, access date, attribution, and public-use constraints.
- For PPT or HTML mood matching, combine internal generated SVGs through color, size, and placement.
