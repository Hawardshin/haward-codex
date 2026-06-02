# External SVG Asset Collection Requirement Change

## Change ID

- `REQ-WS-083`
- `DAL-REQ-006`

## User Intent

- The user asked for many actual usable SVG files, not only source candidates.

## Change

- Collect actual SVG files from official open-source repositories.
- Record pinned commit, license URL, local `LICENSE`, local `SOURCE.json`, and upstream path per source.
- Restrict collection paths with path allowlists.
- Keep the actual collection registry in `data/external-asset-registry.json`, separate from the generated asset registry.
- The first collection tranche contains 3,048 SVGs from Lucide, Heroicons, Bootstrap Icons, and Tabler Icons.

## Rationale

- The user explicitly asked to actually collect many assets.
- The previous structure recorded external sources only as candidates, so it did not satisfy actual file usability.
- Actual collection is license-sensitive and therefore requires source provenance and local license preservation.
