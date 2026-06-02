# External SVG Asset Collection Requirement Review

## Review Target

- `REQ-WS-083`
- `DAL-REQ-006`

## Result

- Accepted.

## Judgment

- Actual file collection matches the user's explicit request.
- However, unrestricted external SVG storage would weaken license and provenance management, so the first tranche is limited to four official repositories and pinned commits.
- Each source must preserve `LICENSE` and `SOURCE.json`, and the actual collection registry must stay separate from the generated asset registry.

## Implementation Targets

- `design-asset-library/configs/external-collection-policy.json`
- `design-asset-library/scripts/collect_external_svg_assets.py`
- `design-asset-library/assets/svg/external/`
- `design-asset-library/data/external-asset-registry.json`
- `design-asset-library/artifacts/html/external-gallery.html`
