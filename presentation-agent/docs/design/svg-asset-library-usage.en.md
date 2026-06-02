# SVG Asset Library Usage

When the presentation agent needs new design elements, it should check `design-asset-library/` first.

## Default Sequence

1. Define the visual role needed in the presentation.
2. Search `generated_assets` in `design-asset-library/data/asset-registry.json` by `family`, `motif`, and `tags`.
3. In HTML decks, reference SVGs as `<img>` assets or inline SVG.
4. If no asset fits, add a motif to `design-asset-library/scripts/generate_svg_assets.py` and regenerate the registry.
5. If an external SVG is needed, investigate `external_source_candidates`, but store files only after license review.

## Positive Replacement Rule

- Instead of copying external assets directly, first record source URL, license, access date, attribution, and public-use constraints.
- For PPT or HTML mood matching, combine internal generated SVGs through color, size, and placement.
