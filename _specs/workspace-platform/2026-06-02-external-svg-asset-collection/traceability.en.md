# External SVG Asset Collection Traceability

| Requirement | Artifact | Verification |
| --- | --- | --- |
| `REQ-WS-083` | `design-asset-library/configs/external-collection-policy.json` | config contract |
| `REQ-WS-083` | `design-asset-library/scripts/collect_external_svg_assets.py` | dry-run, actual collection |
| `REQ-WS-083` | `design-asset-library/assets/svg/external/` | SVG parse tests |
| `REQ-WS-083` | `design-asset-library/data/external-asset-registry.json` | JSON, config contract, tests |
| `REQ-WS-083` | `design-asset-library/artifacts/html/external-gallery.html` | browser smoke |
| `DAL-REQ-006` | Per-source `LICENSE`, `SOURCE.json` | registry tests |
| `DAL-REQ-006` | `design-asset-library/docs/licensing/README.en.md` | documentation review |
