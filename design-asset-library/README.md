# Design Asset Library

This project stores reusable, legally cautious SVG design assets for decks, dashboards, HTML artifacts, and agent-platform visuals.

## What Is Stored

- `assets/svg/generated/`: 600 locally generated SVG files.
- `assets/svg/external/`: 3,048 actually collected open-source SVG files with per-source `LICENSE` and `SOURCE.json`.
- `data/asset-registry.json`: asset registry with provenance, usage tags, source candidates, and license cautions.
- `data/external-asset-registry.json`: registry for actual external SVG files, pinned commits, local license paths, and source provenance.
- `configs/external-collection-policy.json`: self-documenting collection policy for allowed sources, limits, and path allowlists.
- `scripts/generate_svg_assets.py`: deterministic generator for the current SVG pack.
- `scripts/collect_external_svg_assets.py`: deterministic external collector for approved open-source sources.
- `scripts/asset_browser.py`: CLI search, HTML snippet, and static gallery generator.
- `artifacts/html/gallery.html`: browser-friendly gallery for scanning generated assets.
- `artifacts/html/external-gallery.html`: browser-friendly gallery for scanning actually collected external SVG assets.
- `docs/licensing/`: Korean and English licensing/use guidance.
- `docs/usage/`: Korean and English usage guidance.

## Default Rule

Use generated assets first when legal certainty matters. Use external collected assets when their source, license, attribution, access date, and public-use constraints are acceptable for the target artifact.

## Main Commands

```bash
python3 design-asset-library/scripts/generate_svg_assets.py
python3 design-asset-library/scripts/collect_external_svg_assets.py
python3 design-asset-library/scripts/asset_browser.py families
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json families
python3 design-asset-library/scripts/asset_browser.py search --family presentation --query title --limit 5
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json search --family lucide --query dashboard --limit 5
python3 design-asset-library/scripts/asset_browser.py snippet presentation-title-slide-ink-cyan
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json snippet external-lucide-outline-layout-dashboard
python3 design-asset-library/scripts/asset_browser.py gallery --output design-asset-library/artifacts/html/gallery.html --limit 600
python3 design-asset-library/scripts/asset_browser.py --registry design-asset-library/data/external-asset-registry.json gallery --output design-asset-library/artifacts/html/external-gallery.html --limit 3048
python3 -m unittest discover -s design-asset-library/tests
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../design-asset-library/data/asset-registry.json ../design-asset-library/data/external-asset-registry.json ../design-asset-library/configs/external-collection-policy.json
```

Run the last command from `agent-platform/`.
