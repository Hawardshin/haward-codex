# External SVG Actual Collection Web Search Record

## Request

- Actually collect many SVG files, not only generate local variants or list source candidates.

## Search Date

- 2026-06-02

## Queries

- `Lucide icons GitHub license SVG official`
- `Heroicons GitHub license MIT official`
- `Bootstrap Icons GitHub license MIT SVG official`
- `Tabler Icons GitHub license MIT SVG official`

## Sources Checked

| Source | URL | Checked | Applied |
| --- | --- | --- | --- |
| Lucide GitHub | https://github.com/lucide-icons/lucide | Official repository, `LICENSE`, `icons/` source path | Collected 800 SVGs at commit `423afc6d03c1fb1b86090aa14b13f7f2fa6296e4` |
| Heroicons GitHub | https://github.com/tailwindlabs/heroicons | Official repository, `LICENSE`, `optimized/24/outline`, `optimized/24/solid` paths | Collected 648 SVGs at commit `616b7a4dbbf3d011760af8066262cd5c6b3868f3` |
| Bootstrap Icons GitHub | https://github.com/twbs/icons | Official repository, `LICENSE`, `icons/` source path | Collected 800 SVGs at commit `66fd192fe2085a8255a11b58710f2d9e7f481d02` |
| Tabler Icons GitHub | https://github.com/tabler/tabler-icons | Official repository, `LICENSE`, `icons/outline/` source path | Collected 800 SVGs at commit `6d128ed935d4546607b1e4d5d08c8b27bdbe7758` |

## Additional Verification

- Confirmed default branches with `git ls-remote --symref`.
- Used GitHub codeload archives pinned to resolved commits, not moving branch archives.
- Inspected tarball paths before collection and narrowed allowlists to avoid documentation, preview, build, or layout SVGs.

## Weak Sources Ignored

- Third-party icon catalogs, search-result summaries, and blog posts were not used as evidence for actual collection.

## Plan Impact

- Actual collection was limited to four official repositories.
- Google Material Symbols, OpenMoji, and Font Awesome Free remain as candidates only for now.
- The registry stores per-asset source URL, resolved commit, upstream path, local path, and license name.
- Each collected source directory stores a copied upstream `LICENSE` and a local `SOURCE.json` notice.

## Uncertainty

- Before public redistribution, recheck each source's current license, attribution, and trademark constraints.
- This record is a technical provenance record, not legal advice.
