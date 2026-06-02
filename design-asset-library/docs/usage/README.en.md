# SVG Asset Usage

## Quick Use

1. Search `generated_assets` in `data/asset-registry.json`.
2. Pick an asset by `family`, `motif`, and `tags`.
3. Insert the SVG path into HTML, HTML-to-PPT artifacts, dashboards, or prototypes.
4. Recheck licensing docs before public distribution.

## Families

- `presentation`: slides, presentation flow, evidence, and message structure
- `interface`: dashboards, search, settings, files, and monitoring UI
- `workflow`: pipelines, parallel work, merge gates, and validation flows
- `abstract`: backgrounds, mood, and visual rhythm
- `status`: ready, blocked, warning, verified, and similar status states
- `pattern`: background and decorative patterns

## Presentation Agent Use

- The presentation agent first defines an asset query.
- It selects candidates from `asset-registry.json`.
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
