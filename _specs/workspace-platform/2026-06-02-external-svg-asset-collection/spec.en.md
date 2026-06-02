# External SVG Asset Collection Spec

## Purpose

Actually collect many usable external open-source SVG files while managing official sources, pinned commits, license/provenance records, and path allowlists.

## Requirements

- `REQ-WS-083`
- `DAL-REQ-006`

## Scope

- Collect actual SVG files from Lucide, Heroicons, Bootstrap Icons, and Tabler Icons.
- Use only official GitHub repositories and pinned commit archives.
- Store `LICENSE` and `SOURCE.json` in each source folder.
- Create the actual collection registry at `design-asset-library/data/external-asset-registry.json`.
- Generate the external collection gallery at `design-asset-library/artifacts/html/external-gallery.html`.
- Extend `asset_browser.py` so it can search `collected_assets`.

## Out Of Scope

- Actual collection from Google Material Symbols, OpenMoji, or Font Awesome Free.
- Paid, commercial, or brand asset collection.
- Unlimited full-file collection from every source.
- Final legal judgment for public redistribution.

## Acceptance Criteria

- At least 3,000 actual external SVG files are stored.
- Each source has local `LICENSE` and `SOURCE.json`.
- The registry passes the self-documenting config contract.
- External SVG paths exist and parse as XML.
- The external gallery is generated and a representative image loads in a browser.
