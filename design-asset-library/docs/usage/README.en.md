# SVG Asset Usage

## Quick Use

1. Open `artifacts/html/gallery.html` in a browser to scan the full generated pack.
2. Open `artifacts/html/external-gallery.html` when actually collected external SVGs are needed.
3. Narrow candidates with CLI filters for `family`, `query`, and `tag`.
4. Use the `snippet` command to generate an HTML `<img>` snippet.
5. Check provenance and license status in `data/asset-registry.json` or `data/external-asset-registry.json` when needed.
6. Recheck licensing docs before public distribution.

## Quick Commands

```bash
python3 design-asset-library/scripts/asset_browser.py families
python3 design-asset-library/scripts/asset_browser.py search --family presentation --query title --limit 5
python3 design-asset-library/scripts/asset_browser.py snippet presentation-title-slide-ink-cyan
python3 design-asset-library/scripts/asset_browser.py gallery --output design-asset-library/artifacts/html/gallery.html --limit 600
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json families
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json search --family lucide --query dashboard --limit 5
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json snippet external-lucide-outline-layout-dashboard
```

## Scale

- Current generated assets: 600
- Shape: 6 families x 20 motifs x 5 palettes
- Actually collected external assets: 3,048
- External source breakdown: Lucide 800, Heroicons 648, Bootstrap Icons 800, Tabler Icons 800

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
- If an external open-source icon is needed, check `external-gallery.html` and `external-asset-registry.json`.
- HTML decks can reference SVGs as `<img>` assets or inline them.
- If the design direction is insufficient, add a motif to the generator and regenerate the registry.

## Regeneration

```bash
python3 design-asset-library/scripts/generate_svg_assets.py
python3 design-asset-library/scripts/collect_external_svg_assets.py
python3 -m unittest discover -s design-asset-library/tests
```

## Caution

- `external_source_candidates` in `data/asset-registry.json` are search seeds.
- `collected_assets` in `data/external-asset-registry.json` are actually stored external SVG files.
- Even for stored external SVGs, recheck each source `LICENSE`, `SOURCE.json`, and attribution constraints before public distribution.
