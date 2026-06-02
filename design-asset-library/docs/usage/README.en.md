# SVG Asset Usage

## Quick Use

1. Open `artifacts/html/gallery.html` in a browser to scan the full generated pack.
2. Narrow candidates with CLI filters for `family`, `query`, and `tag`.
3. Use the `snippet` command to generate an HTML `<img>` snippet.
4. Check provenance and license status in `data/asset-registry.json` when needed.
5. Recheck licensing docs before public distribution.

## Quick Commands

```bash
python3 design-asset-library/scripts/asset_browser.py families
python3 design-asset-library/scripts/asset_browser.py search --family presentation --query title --limit 5
python3 design-asset-library/scripts/asset_browser.py snippet presentation-title-slide-ink-cyan
python3 design-asset-library/scripts/asset_browser.py gallery --output design-asset-library/artifacts/html/gallery.html --limit 600
```

## Scale

- Current generated assets: 600
- Shape: 6 families x 20 motifs x 5 palettes

## Families

- `presentation`: slides, presentation flow, evidence, and message structure
- `interface`: dashboards, search, settings, files, and monitoring UI
- `workflow`: pipelines, parallel work, merge gates, and validation flows
- `abstract`: backgrounds, mood, and visual rhythm
- `status`: ready, blocked, warning, verified, and similar status states
- `pattern`: background and decorative patterns

## Presentation Agent Use

- The presentation agent first defines an asset query.
- It selects candidates with `asset_browser.py search` or `gallery.html`.
- HTML decks can reference SVGs as `<img>` assets or inline them.
- If the design direction is insufficient, add a motif to the generator and regenerate the registry.

## Regeneration

```bash
python3 design-asset-library/scripts/generate_svg_assets.py
python3 -m unittest discover -s design-asset-library/tests
```

## Caution

- External source candidates are not ready-to-use stored assets.
- `external_source_candidates` are search seeds and require license review before storing files.
