# Design Asset Library

This project stores reusable, legally cautious SVG design assets for decks, dashboards, HTML artifacts, and agent-platform visuals.

## What Is Stored

- `assets/svg/generated/`: 120 locally generated SVG files.
- `data/asset-registry.json`: asset registry with provenance, usage tags, source candidates, and license cautions.
- `scripts/generate_svg_assets.py`: deterministic generator for the current SVG pack.
- `docs/licensing/`: Korean and English licensing/use guidance.
- `docs/usage/`: Korean and English usage guidance.

## Default Rule

Use generated assets first. Do not copy third-party SVG files into this project unless the source URL, license, attribution, access date, and public-use constraints are recorded.

## Main Commands

```bash
python3 design-asset-library/scripts/generate_svg_assets.py
python3 -m unittest discover -s design-asset-library/tests
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../design-asset-library/data/asset-registry.json
```

Run the last command from `agent-platform/`.
