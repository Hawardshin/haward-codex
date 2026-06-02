# SVG Asset Library Usage

When the presentation agent needs new design elements, it should check `design-asset-library/` first.

## Default Sequence

1. Define the visual role needed in the presentation.
2. Scan `design-asset-library/artifacts/html/gallery.html` to see the available visual range.
3. Narrow candidates with `design-asset-library/scripts/asset_browser.py search` by `family`, `query`, or `tag`.
4. Use the `snippet` command for `<img>` code or inline the SVG directly.
5. If no asset fits, add a motif to `design-asset-library/scripts/generate_svg_assets.py` and regenerate the registry.
6. If an external SVG is needed, investigate `external_source_candidates`, but store files only after license review.

## Quick Commands

```bash
python3 design-asset-library/scripts/asset_browser.py search --family presentation --query title --limit 5
python3 design-asset-library/scripts/asset_browser.py snippet presentation-title-slide-ink-cyan
```

## Positive Replacement Rule

- Instead of copying external assets directly, first record source URL, license, access date, attribution, and public-use constraints.
- For PPT or HTML mood matching, combine internal generated SVGs through color, size, and placement.
