# Design Asset Library Web Search Record

## Request

- `UR-2026-06-02-041`
- The user asked for many similar SVG files to be prepared for reuse, while clarifying that illegal downloading is not desired.

## Search Date

- 2026-06-02

## Queries

- `open source SVG illustration library license unDraw lucide heroicons official license`
- `SVG icon library open source MIT license official lucide heroicons tabler icons`
- `design assets license SVG templates open source official documentation`
- `site:lucide.dev license lucide icons`
- `site:heroicons.com license heroicons MIT`
- `site:tabler.io icons license MIT`

## Checked Sources

| Source | Type | Checked Point | Used For |
| --- | --- | --- | --- |
| Lucide License | Official docs | Lucide's license page shows the ISC License and MIT text for Feather-derived icons. | Open-source source candidate and license-review seed |
| Heroicons | Official site | Heroicons presents SVG icons, 316 icons, and MIT license on the homepage. | External candidate registry |
| Tabler Icons | Official site | Tabler Icons presents 6100+ SVG icons, MIT License, and personal/commercial license. | External candidate registry |

## Plan Impact

- Do not download external SVG files directly; record them only as `external_source_candidates`.
- Use internally generated SVG files as the default ready-to-use asset pack.
- Keep public redistribution license confirmation as an owner decision.
- Preserve source provenance and license status in the registry.

## Weak Sources Ignored

- General blogs and asset list pages were not used as implementation evidence because they often point to downloads without enough license context.
- Marketplace and paid-template pages were not used.

## Public Decision Summary

- The suitable structure is: internally generated SVGs for immediate use, external open-source sources as candidates only, and stored third-party assets only after license review.
