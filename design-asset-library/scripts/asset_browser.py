#!/usr/bin/env python3
"""Search SVG assets and build a static gallery."""

from __future__ import annotations

import argparse
import html
import json
from collections import Counter
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]
REGISTRY_PATH = ROOT / "data" / "asset-registry.json"


def load_registry(path: Path = REGISTRY_PATH) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def get_assets(registry: dict) -> list[dict]:
    assets: list[dict] = []
    for key in ("generated_assets", "collected_assets"):
        assets.extend(registry.get(key, []))
    return assets


def family_counts(registry: dict) -> Counter:
    return Counter(asset["family"] for asset in get_assets(registry))


def filter_assets(
    assets: Iterable[dict],
    *,
    family: str | None = None,
    query: str | None = None,
    tag: str | None = None,
    limit: int | None = None,
) -> list[dict]:
    query_value = normalize(query)
    tag_value = normalize(tag)
    results: list[dict] = []
    for asset in assets:
        if family and asset.get("family") != family:
            continue
        searchable = " ".join(
            [
                asset.get("id", ""),
                asset.get("family", ""),
                asset.get("motif", ""),
                asset.get("variant", ""),
                asset.get("source_library", ""),
                " ".join(asset.get("tags", [])),
            ]
        )
        if query_value and query_value not in normalize(searchable):
            continue
        if tag_value and tag_value not in {normalize(item) for item in asset.get("tags", [])}:
            continue
        results.append(asset)
        if limit and len(results) >= limit:
            break
    return results


def normalize(value: str | None) -> str:
    return (value or "").strip().lower().replace("-", " ")


def find_asset(registry: dict, asset_id: str) -> dict:
    for asset in get_assets(registry):
        if asset["id"] == asset_id:
            return asset
    raise KeyError(asset_id)


def build_img_snippet(asset: dict, *, prefix: str = "design-asset-library/") -> str:
    src = f"{prefix}{asset['path']}"
    alt = asset["id"].replace("-", " ")
    return f'<img src="{html.escape(src)}" alt="{html.escape(alt)}" width="96" height="96">'


def write_gallery(registry: dict, output_path: Path, *, limit: int | None = None) -> None:
    assets = get_assets(registry)
    if limit:
        assets = assets[:limit]
    output_path.parent.mkdir(parents=True, exist_ok=True)
    rel_prefix = relative_prefix(output_path)
    family_list = sorted(family_counts(registry).items())
    gallery_title, gallery_summary = gallery_copy(registry)
    cards = "\n".join(render_card(asset, rel_prefix) for asset in assets)
    family_options = "\n".join(
        f'<button type="button" data-family="{html.escape(family)}">{html.escape(family)} <span>{count}</span></button>'
        for family, count in family_list
    )
    output_path.write_text(
        f"""<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(gallery_title)}</title>
  <style>
    :root {{
      color-scheme: light;
      --ink: #172033;
      --muted: #667085;
      --line: #d9e0e8;
      --paper: #f8fafc;
      --panel: #ffffff;
      --accent: #0f766e;
      --accent-2: #b7791f;
      --accent-3: #2563eb;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--ink);
      background: var(--paper);
    }}
    header {{
      position: sticky;
      top: 0;
      z-index: 2;
      border-bottom: 1px solid var(--line);
      background: rgba(248, 250, 252, .94);
      backdrop-filter: blur(10px);
    }}
    .wrap {{
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
    }}
    .hero {{
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 20px;
      align-items: end;
      padding: 28px 0 18px;
    }}
    h1 {{
      margin: 0 0 8px;
      font-size: 26px;
      line-height: 1.2;
      letter-spacing: 0;
    }}
    p {{
      margin: 0;
      color: var(--muted);
      line-height: 1.55;
    }}
    .stat {{
      min-width: 168px;
      padding: 14px 16px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
    }}
    .stat strong {{
      display: block;
      font-size: 24px;
      line-height: 1.1;
    }}
    .controls {{
      display: grid;
      grid-template-columns: minmax(180px, 1fr) auto;
      gap: 12px;
      align-items: start;
      padding: 0 0 18px;
    }}
    input {{
      width: 100%;
      min-height: 42px;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 0 13px;
      font: inherit;
      background: var(--panel);
      color: var(--ink);
    }}
    .families {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-end;
      max-width: 650px;
    }}
    button {{
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
      color: var(--ink);
      font: inherit;
      min-height: 38px;
      padding: 0 11px;
      cursor: pointer;
    }}
    button.is-active {{
      border-color: var(--accent);
      box-shadow: inset 0 0 0 1px var(--accent);
    }}
    button span {{
      color: var(--muted);
      margin-left: 4px;
    }}
    main {{
      padding: 24px 0 44px;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
      gap: 14px;
    }}
    .card {{
      min-height: 232px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
      padding: 14px;
      display: grid;
      grid-template-rows: 128px auto auto;
      gap: 10px;
    }}
    .preview {{
      display: grid;
      place-items: center;
      border-radius: 8px;
      background: #eef2f6;
      overflow: hidden;
    }}
    .preview img {{
      width: 112px;
      height: 112px;
      object-fit: contain;
      display: block;
    }}
    .name {{
      font-weight: 700;
      line-height: 1.25;
      word-break: break-word;
    }}
    .meta {{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.35;
    }}
    .pill {{
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 2px 7px;
      background: #fbfdff;
    }}
    .path {{
      grid-column: 1 / -1;
      color: var(--muted);
      font-size: 12px;
      overflow-wrap: anywhere;
    }}
    @media (max-width: 720px) {{
      .hero, .controls {{
        grid-template-columns: 1fr;
      }}
      .families {{
        justify-content: flex-start;
      }}
    }}
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <div class="hero">
        <div>
          <h1>{html.escape(gallery_title)}</h1>
          <p>{html.escape(gallery_summary)}</p>
        </div>
        <div class="stat"><strong>{len(assets)}</strong><span>shown assets</span></div>
      </div>
      <div class="controls">
        <input id="search" type="search" placeholder="Search: title, dashboard, ready, ink cyan..." aria-label="Search assets">
        <div class="families">
          <button type="button" data-family="all" class="is-active">all <span>{len(get_assets(registry))}</span></button>
          {family_options}
        </div>
      </div>
    </div>
  </header>
  <main class="wrap">
    <section id="grid" class="grid" aria-label="SVG assets">
      {cards}
    </section>
  </main>
  <script>
    const search = document.querySelector("#search");
    const cards = Array.from(document.querySelectorAll(".card"));
    const buttons = Array.from(document.querySelectorAll("[data-family]"));
    let activeFamily = "all";
    function applyFilter() {{
      const term = search.value.trim().toLowerCase();
      for (const card of cards) {{
        const familyMatch = activeFamily === "all" || card.dataset.family === activeFamily;
        const textMatch = !term || card.dataset.search.includes(term);
        card.hidden = !(familyMatch && textMatch);
      }}
    }}
    search.addEventListener("input", applyFilter);
    for (const button of buttons) {{
      button.addEventListener("click", () => {{
        activeFamily = button.dataset.family;
        for (const item of buttons) item.classList.toggle("is-active", item === button);
        applyFilter();
      }});
    }}
  </script>
</body>
</html>
""",
        encoding="utf-8",
    )


def relative_prefix(output_path: Path) -> str:
    depth = len(output_path.resolve().parent.relative_to(ROOT).parts)
    return "../" * depth


def gallery_copy(registry: dict) -> tuple[str, str]:
    if registry.get("collected_assets"):
        return (
            "External SVG Asset Gallery",
            "실제로 수집한 외부 오픈소스 SVG를 출처별로 검색하고 HTML/PPT 산출물에 바로 연결하기 위한 정적 갤러리입니다.",
        )
    return (
        "Design Asset Gallery",
        "내부 생성 SVG를 검색하고, 계열별로 훑어보고, HTML/PPT 산출물에 바로 연결하기 위한 정적 갤러리입니다.",
    )


def render_card(asset: dict, rel_prefix: str) -> str:
    src = f"{rel_prefix}{asset['path']}"
    search_text = " ".join(
        [
            asset.get("id", ""),
            asset.get("family", ""),
            asset.get("motif", ""),
            asset.get("variant", ""),
            asset.get("source_library", ""),
            " ".join(asset.get("tags", [])),
        ]
    ).lower()
    tags = "".join(f'<span class="pill">{html.escape(tag)}</span>' for tag in asset.get("tags", []))
    return f"""<article class="card" data-family="{html.escape(asset['family'])}" data-search="{html.escape(search_text)}">
        <div class="preview"><img src="{html.escape(src)}" alt="{html.escape(asset['id'].replace('-', ' '))}"></div>
        <div class="name">{html.escape(asset['id'])}</div>
        <div class="meta">{tags}</div>
        <div class="path">{html.escape(asset['path'])}</div>
      </article>"""


def cmd_families(args: argparse.Namespace) -> int:
    registry = load_registry(args.registry)
    for family, count in sorted(family_counts(registry).items()):
        print(f"{family}\t{count}")
    return 0


def cmd_search(args: argparse.Namespace) -> int:
    registry = load_registry(args.registry)
    assets = filter_assets(
        get_assets(registry),
        family=args.family,
        query=args.query,
        tag=args.tag,
        limit=args.limit,
    )
    if args.format == "json":
        print(json.dumps(assets, ensure_ascii=False, indent=2))
    else:
        for asset in assets:
            print(asset["path"])
    return 0


def cmd_snippet(args: argparse.Namespace) -> int:
    registry = load_registry(args.registry)
    print(build_img_snippet(find_asset(registry, args.asset_id), prefix=args.prefix))
    return 0


def cmd_gallery(args: argparse.Namespace) -> int:
    registry = load_registry(args.registry)
    write_gallery(registry, args.output, limit=args.limit)
    print(args.output)
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Browse design SVG assets.")
    parser.add_argument("--registry", type=Path, default=REGISTRY_PATH)
    subparsers = parser.add_subparsers(dest="command", required=True)

    families = subparsers.add_parser("families", help="Print asset counts by family.")
    families.set_defaults(func=cmd_families)

    search = subparsers.add_parser("search", help="Search generated assets.")
    search.add_argument("--family")
    search.add_argument("--query")
    search.add_argument("--tag")
    search.add_argument("--limit", type=int, default=20)
    search.add_argument("--format", choices=["paths", "json"], default="paths")
    search.set_defaults(func=cmd_search)

    snippet = subparsers.add_parser("snippet", help="Print an HTML img snippet for one asset id.")
    snippet.add_argument("asset_id")
    snippet.add_argument("--prefix", default="design-asset-library/")
    snippet.set_defaults(func=cmd_snippet)

    gallery = subparsers.add_parser("gallery", help="Write a static HTML asset gallery.")
    gallery.add_argument("--output", type=Path, default=ROOT / "artifacts" / "html" / "gallery.html")
    gallery.add_argument("--limit", type=int)
    gallery.set_defaults(func=cmd_gallery)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
