# Design Asset Usability Expansion Web Search Record

## Request

- Keep collecting many useful design assets and make the structure easy to use.

## Search Time

- 2026-06-02

## Queries

- `Bootstrap Icons official license SVG MIT`
- `Google Material Symbols official license Apache 2.0 icons`
- `OpenMoji official license CC BY-SA 4.0 SVG emoji`
- `Font Awesome Free official license icons SVG`

## Sources Checked

| Source | URL | Role | Impact |
| --- | --- | --- | --- |
| Bootstrap Icons | https://icons.getbootstrap.com/ | Official icon library candidate | Added as an `external_source_candidates` entry. No file download. |
| Google Material Symbols | https://fonts.google.com/icons | Official icon/source candidate | Added as an `external_source_candidates` entry. No file download. |
| OpenMoji | https://openmoji.org/ | Open emoji/pictogram candidate | Added as an `external_source_candidates` entry with share-alike/attribution review caution. |
| Font Awesome Free License | https://fontawesome.com/license/free | Icon source license candidate | Added as an `external_source_candidates` entry with per-pack review caution. |
| Lucide | https://lucide.dev/ | Existing candidate | Kept as candidate. |
| Heroicons | https://heroicons.com/ | Existing candidate | Kept as candidate. |
| Tabler Icons | https://tabler.io/icons | Existing candidate | Kept as candidate. |

## Weak Sources Ignored

- Third-party icon catalogs and search-result summaries were used only as discovery signals.
- Reddit/community discussions were treated as license-confusion signals, not as factual license proof.

## Plan Impact

- Do not collect external SVG files directly; expand internally generated SVGs to 600.
- Keep external candidates in the registry with `downloaded=false`.
- Make assets directly usable through `gallery.html`, `asset_browser.py search`, and `snippet`.

## Uncertainty

- Each external source license must be rechecked at the moment any file is actually stored.
- This work does not finalize license interpretation; it implements a safe candidate registry plus internal generated assets.
