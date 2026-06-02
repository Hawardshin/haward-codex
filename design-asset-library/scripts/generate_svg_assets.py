#!/usr/bin/env python3
"""Generate a local SVG design asset pack and registry."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSET_ROOT = ROOT / "assets" / "svg" / "generated"
REGISTRY_PATH = ROOT / "data" / "asset-registry.json"

PALETTES = [
    ("ink-cyan", "#172033", "#15aabf", "#e3fafc", "#f8fbff"),
    ("forest-lime", "#163b2b", "#51cf66", "#ebfbee", "#fbfff8"),
    ("graphite-amber", "#262626", "#fab005", "#fff4d6", "#fdfcf7"),
    ("plum-rose", "#35243b", "#f06595", "#fff0f6", "#fff9fb"),
    ("navy-sky", "#183153", "#4dabf7", "#e7f5ff", "#f7fbff"),
]

FAMILIES = {
    "presentation": [
        "title-slide",
        "agenda-list",
        "quote-block",
        "metric-card",
        "comparison-panel",
        "timeline-strip",
        "process-lane",
        "speaker-notes",
        "storyboard-frame",
        "research-board",
        "data-callout",
        "decision-slide",
        "section-break",
        "insight-card",
        "closing-frame",
        "visual-summary",
        "evidence-stack",
        "slide-grid",
        "key-message",
        "deck-cover",
    ],
    "interface": [
        "dashboard",
        "search-panel",
        "filter-drawer",
        "settings-panel",
        "notification-card",
        "upload-window",
        "code-window",
        "chat-panel",
        "database-card",
        "document-viewer",
        "calendar-board",
        "command-menu",
        "monitor-screen",
        "timeline-view",
        "source-card",
        "agent-card",
        "status-widget",
        "file-browser",
        "review-panel",
        "mode-switcher",
    ],
    "workflow": [
        "pipeline",
        "branching-path",
        "merge-gate",
        "checkpoint",
        "feedback-loop",
        "iteration-cycle",
        "approval-flow",
        "handoff",
        "dependency-map",
        "queue-lane",
        "parallel-lanes",
        "fan-in",
        "risk-gate",
        "rollback-path",
        "escalation",
        "decision-inbox",
        "plan-track",
        "evidence-flow",
        "validation-loop",
        "shipping-path",
    ],
    "abstract": [
        "orbit",
        "soft-wave",
        "layer-stack",
        "node-cloud",
        "ribbon",
        "signal-burst",
        "nested-grid",
        "loop-field",
        "radial-tiles",
        "angled-planes",
        "quiet-mesh",
        "split-ring",
        "folded-corner",
        "pulse-lines",
        "floating-panels",
        "rounded-lattice",
        "vector-spark",
        "curved-lane",
        "modular-blocks",
        "focus-ring",
    ],
    "status": [
        "ready",
        "in-progress",
        "blocked",
        "warning",
        "approved",
        "review",
        "risk",
        "success",
        "failed",
        "paused",
        "scheduled",
        "verified",
        "needs-input",
        "secure",
        "private",
        "public-ready",
        "queued",
        "draft",
        "published",
        "archived",
    ],
    "pattern": [
        "dot-field",
        "diagonal-lines",
        "corner-grid",
        "plus-field",
        "radial-dots",
        "small-waves",
        "mesh-lines",
        "confetti",
        "tile-grid",
        "soft-stripes",
        "offset-circles",
        "marker-lines",
        "crosshatch",
        "light-rings",
        "module-dots",
        "notebook-grid",
        "halo-field",
        "frame-lines",
        "subtle-zigzag",
        "micro-cards",
    ],
}


@dataclass(frozen=True)
class Asset:
    asset_id: str
    family: str
    motif: str
    palette_name: str
    path: Path
    tags: tuple[str, ...]


def main() -> int:
    ASSET_ROOT.mkdir(parents=True, exist_ok=True)
    assets = build_assets()
    for asset in assets:
        asset.path.parent.mkdir(parents=True, exist_ok=True)
        asset.path.write_text(render_svg(asset), encoding="utf-8")
    REGISTRY_PATH.parent.mkdir(parents=True, exist_ok=True)
    REGISTRY_PATH.write_text(json.dumps(build_registry(assets), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"generated {len(assets)} SVG assets")
    print(REGISTRY_PATH.relative_to(ROOT))
    return 0


def build_assets() -> list[Asset]:
    assets: list[Asset] = []
    for family, motifs in FAMILIES.items():
        for motif in motifs:
            for palette_item in PALETTES:
                palette_name = palette_item[0]
                asset_id = f"{family}-{motif}-{palette_name}"
                path = ASSET_ROOT / family / f"{motif}-{palette_name}.svg"
                assets.append(
                    Asset(
                        asset_id=asset_id,
                        family=family,
                        motif=motif,
                        palette_name=palette_name,
                        path=path,
                        tags=(family, motif.replace("-", " "), palette_name),
                    )
                )
    return assets


def render_svg(asset: Asset) -> str:
    dark, accent, tint, paper = palette(asset.palette_name)
    body = render_family_body(asset, dark, accent, tint, paper)
    title = asset.asset_id.replace("-", " ").title()
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-labelledby="title-{asset.asset_id}">
  <title id="title-{asset.asset_id}">{title}</title>
  <rect width="256" height="256" rx="28" fill="{paper}"/>
  {body}
</svg>
'''


def render_family_body(asset: Asset, dark: str, accent: str, tint: str, paper: str) -> str:
    family = asset.family
    seed = sum(ord(char) for char in asset.motif)
    if family == "presentation":
        return presentation_body(seed, dark, accent, tint)
    if family == "interface":
        return interface_body(seed, dark, accent, tint)
    if family == "workflow":
        return workflow_body(seed, dark, accent, tint)
    if family == "abstract":
        return abstract_body(seed, dark, accent, tint)
    if family == "status":
        return status_body(seed, dark, accent, tint)
    return pattern_body(seed, dark, accent, tint)


def presentation_body(seed: int, dark: str, accent: str, tint: str) -> str:
    x = 34 + seed % 18
    return f'''<rect x="{x}" y="42" width="164" height="118" rx="14" fill="{tint}" stroke="{dark}" stroke-width="4"/>
  <rect x="{x + 18}" y="66" width="94" height="10" rx="5" fill="{dark}"/>
  <rect x="{x + 18}" y="90" width="128" height="8" rx="4" fill="{accent}"/>
  <rect x="{x + 18}" y="112" width="68" height="8" rx="4" fill="{dark}" opacity=".35"/>
  <circle cx="{x + 136}" cy="124" r="22" fill="{accent}" opacity=".88"/>
  <path d="M76 188h96M96 160l-20 28M152 160l20 28" fill="none" stroke="{dark}" stroke-width="6" stroke-linecap="round"/>'''


def interface_body(seed: int, dark: str, accent: str, tint: str) -> str:
    offset = seed % 12
    return f'''<rect x="36" y="46" width="176" height="140" rx="16" fill="{tint}" stroke="{dark}" stroke-width="4"/>
  <rect x="36" y="46" width="176" height="28" rx="16" fill="{dark}"/>
  <circle cx="56" cy="60" r="4" fill="{accent}"/>
  <circle cx="70" cy="60" r="4" fill="#fff" opacity=".72"/>
  <circle cx="84" cy="60" r="4" fill="#fff" opacity=".42"/>
  <rect x="{54 + offset}" y="92" width="60" height="46" rx="10" fill="{accent}" opacity=".9"/>
  <rect x="126" y="92" width="48" height="8" rx="4" fill="{dark}"/>
  <rect x="126" y="116" width="66" height="8" rx="4" fill="{dark}" opacity=".45"/>
  <rect x="126" y="140" width="52" height="8" rx="4" fill="{dark}" opacity=".28"/>
  <path d="M58 166h136" stroke="{accent}" stroke-width="8" stroke-linecap="round"/>'''


def workflow_body(seed: int, dark: str, accent: str, tint: str) -> str:
    bend = 92 + seed % 24
    return f'''<path d="M54 80h52c18 0 26 {bend - 80} 42 {bend - 80}h54" fill="none" stroke="{dark}" stroke-width="8" stroke-linecap="round"/>
  <path d="M54 156h52c18 0 26 -{bend - 80} 42 -{bend - 80}h54" fill="none" stroke="{accent}" stroke-width="8" stroke-linecap="round"/>
  <circle cx="54" cy="80" r="18" fill="{tint}" stroke="{dark}" stroke-width="5"/>
  <circle cx="54" cy="156" r="18" fill="{tint}" stroke="{accent}" stroke-width="5"/>
  <rect x="104" y="104" width="52" height="52" rx="12" fill="{dark}"/>
  <path d="M122 130h34" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
  <circle cx="202" cy="80" r="18" fill="{accent}"/>
  <circle cx="202" cy="156" r="18" fill="{dark}"/>'''


def abstract_body(seed: int, dark: str, accent: str, tint: str) -> str:
    r = 28 + seed % 22
    return f'''<circle cx="128" cy="128" r="{r + 44}" fill="{tint}"/>
  <circle cx="128" cy="128" r="{r}" fill="none" stroke="{dark}" stroke-width="8"/>
  <circle cx="{88 + seed % 18}" cy="92" r="22" fill="{accent}" opacity=".86"/>
  <circle cx="{160 - seed % 16}" cy="170" r="18" fill="{dark}" opacity=".88"/>
  <path d="M56 146c34-48 88-58 142-28" fill="none" stroke="{accent}" stroke-width="8" stroke-linecap="round"/>
  <path d="M70 184c42-30 80-34 120-12" fill="none" stroke="{dark}" stroke-width="5" stroke-linecap="round" opacity=".65"/>'''


def status_body(seed: int, dark: str, accent: str, tint: str) -> str:
    angle = 40 + seed % 20
    return f'''<circle cx="128" cy="128" r="74" fill="{tint}" stroke="{dark}" stroke-width="6"/>
  <path d="M88 132l24 24 58-68" fill="none" stroke="{accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="184" cy="{angle}" r="22" fill="{accent}"/>
  <path d="M76 72l16 16M180 176l16 16M72 184l18-12" stroke="{dark}" stroke-width="6" stroke-linecap="round" opacity=".5"/>'''


def pattern_body(seed: int, dark: str, accent: str, tint: str) -> str:
    step = 24 + seed % 8
    dots = []
    for row in range(5):
        for col in range(5):
            x = 48 + col * step
            y = 48 + row * step
            if x < 210 and y < 210:
                color = accent if (row + col + seed) % 3 == 0 else dark
                opacity = ".75" if color == accent else ".22"
                dots.append(f'<circle cx="{x}" cy="{y}" r="5" fill="{color}" opacity="{opacity}"/>')
    return f'''<rect x="34" y="34" width="188" height="188" rx="20" fill="{tint}"/>
  <path d="M48 204L204 48M80 220L220 80M28 156L156 28" stroke="{accent}" stroke-width="5" stroke-linecap="round" opacity=".45"/>
  {' '.join(dots)}'''


def palette(name: str) -> tuple[str, str, str, str]:
    for palette_item in PALETTES:
        if palette_item[0] == name:
            return palette_item[1:]
    raise ValueError(f"Unknown palette: {name}")


def build_registry(assets: list[Asset]) -> dict:
    return {
        "schema_version": "1.0.0",
        "name": "design-asset-library-registry",
        "purpose": "Registry for locally generated SVG design assets and external open-source source candidates.",
        "reader_guide": {
            "summary": "Use generated_assets for immediate legal-safe internal use. Use external_source_candidates only after license review and attribution rules are recorded.",
            "how_to_read": [
                "Start with generation_policy to understand why these assets are stored.",
                "Use generated_assets for actual SVG file paths.",
                "Use external_source_candidates as research leads, not as downloaded assets.",
                "Check license_status before public release or redistribution."
            ],
            "owner": "design-asset-library",
            "last_reviewed": "2026-06-02",
            "update_triggers": [
                "A new SVG pack is generated.",
                "A third-party asset source is added.",
                "Public redistribution is planned.",
                "License or attribution rules change."
            ]
        },
        "reference_links": [
            {
                "id": "lucide-license",
                "title": "Lucide Icons License",
                "url": "https://lucide.dev/license",
                "source_type": "official_docs",
                "used_for": ["Open-source icon source candidate and license comparison."],
                "last_checked": "2026-06-02"
            },
            {
                "id": "heroicons",
                "title": "Heroicons",
                "url": "https://heroicons.com/",
                "source_type": "official_docs",
                "used_for": ["Open-source SVG icon source candidate."],
                "last_checked": "2026-06-02"
            },
            {
                "id": "tabler-icons-license",
                "title": "Tabler Icons License",
                "url": "https://tabler.io/icons",
                "source_type": "official_docs",
                "used_for": ["Open-source icon source candidate and license comparison."],
                "last_checked": "2026-06-02"
            },
            {
                "id": "bootstrap-icons",
                "title": "Bootstrap Icons",
                "url": "https://icons.getbootstrap.com/",
                "source_type": "official_docs",
                "used_for": ["Open-source SVG icon source candidate and license comparison."],
                "last_checked": "2026-06-02"
            },
            {
                "id": "material-symbols",
                "title": "Google Material Symbols",
                "url": "https://fonts.google.com/icons",
                "source_type": "official_docs",
                "used_for": ["Icon source candidate and visual language reference."],
                "last_checked": "2026-06-02"
            },
            {
                "id": "openmoji",
                "title": "OpenMoji",
                "url": "https://openmoji.org/",
                "source_type": "official_docs",
                "used_for": ["Open-source emoji and pictogram source candidate."],
                "last_checked": "2026-06-02"
            },
            {
                "id": "font-awesome-free-license",
                "title": "Font Awesome Free License",
                "url": "https://fontawesome.com/license/free",
                "source_type": "official_docs",
                "used_for": ["Open-source icon source candidate and license comparison."],
                "last_checked": "2026-06-02"
            }
        ],
        "structure_rules": [
            {
                "id": "no-unlicensed-downloads",
                "rule": "Do not store third-party SVG files until license, source URL, access date, attribution, and public-use constraints are recorded.",
                "reason": "The user explicitly requested legal asset collection, not illegal downloading.",
                "applies_to": ["external_source_candidates", "generated_assets"]
            },
            {
                "id": "generated-default",
                "rule": "Use locally generated SVG files as the default immediately usable asset pack.",
                "reason": "Generated files avoid copying external copyrighted designs while still providing many reusable visual motifs.",
                "applies_to": ["generated_assets"]
            },
            {
                "id": "registry-required",
                "rule": "Every stored SVG must have a registry entry with id, path, family, rights_status, and tags.",
                "reason": "Future agents need source provenance before using assets in public artifacts.",
                "applies_to": ["generated_assets"]
            }
        ],
        "field_guide": [
            {"field": "generated_assets", "meaning": "SVG files generated inside this repository and ready for internal use.", "required": True},
            {"field": "external_source_candidates", "meaning": "High-signal legal source candidates that are not downloaded by this registry.", "required": True},
            {"field": "license_status", "meaning": "Use constraints and public-release cautions for an asset or source.", "required": True},
            {"field": "source_provenance", "meaning": "Where the asset or source candidate came from.", "required": True}
        ],
        "generation_policy": {
            "generator": "design-asset-library/scripts/generate_svg_assets.py",
            "asset_count": len(assets),
            "rights_status": "generated_in_repository",
            "license_status": "No third-party SVG files were copied. Public redistribution still requires the repository owner to confirm final license terms.",
            "public_release_note": "For public release, add an explicit project license or keep generated assets internal-only."
        },
        "generated_assets": [
            {
                "id": asset.asset_id,
                "path": asset.path.relative_to(ROOT).as_posix(),
                "family": asset.family,
                "motif": asset.motif,
                "format": "svg",
                "rights_status": "generated_in_repository",
                "license_status": "No third-party SVG copied; owner should confirm public redistribution license.",
                "source_provenance": ["Generated by scripts/generate_svg_assets.py on 2026-06-02."],
                "tags": list(asset.tags)
            }
            for asset in assets
        ],
        "external_source_candidates": [
            {
                "id": "lucide",
                "name": "Lucide",
                "url": "https://lucide.dev/",
                "source_type": "open_source_icon_library",
                "downloaded": False,
                "license_status": "Candidate only; verify current license and attribution before storing files.",
                "fit": ["icons", "toolbars", "dashboard UI"]
            },
            {
                "id": "heroicons",
                "name": "Heroicons",
                "url": "https://heroicons.com/",
                "source_type": "open_source_icon_library",
                "downloaded": False,
                "license_status": "Candidate only; verify current license and attribution before storing files.",
                "fit": ["interface icons", "presentation UI symbols"]
            },
            {
                "id": "tabler-icons",
                "name": "Tabler Icons",
                "url": "https://tabler.io/icons",
                "source_type": "open_source_icon_library",
                "downloaded": False,
                "license_status": "Candidate only; verify current license and attribution before storing files.",
                "fit": ["large icon sets", "presentation symbols", "product UI"]
            },
            {
                "id": "bootstrap-icons",
                "name": "Bootstrap Icons",
                "url": "https://icons.getbootstrap.com/",
                "source_type": "open_source_icon_library",
                "downloaded": False,
                "license_status": "Candidate only; verify current license and attribution before storing files.",
                "fit": ["interface icons", "presentation symbols", "dashboard UI"]
            },
            {
                "id": "material-symbols",
                "name": "Google Material Symbols",
                "url": "https://fonts.google.com/icons",
                "source_type": "open_source_icon_library",
                "downloaded": False,
                "license_status": "Candidate only; verify current license and attribution before storing files.",
                "fit": ["product UI", "navigation icons", "status symbols"]
            },
            {
                "id": "openmoji",
                "name": "OpenMoji",
                "url": "https://openmoji.org/",
                "source_type": "open_source_emoji_library",
                "downloaded": False,
                "license_status": "Candidate only; verify current license, attribution, and share-alike constraints before storing files.",
                "fit": ["friendly status symbols", "emoji-style pictograms", "playful presentation accents"]
            },
            {
                "id": "font-awesome-free",
                "name": "Font Awesome Free",
                "url": "https://fontawesome.com/license/free",
                "source_type": "open_source_icon_library",
                "downloaded": False,
                "license_status": "Candidate only; verify current license and per-pack constraints before storing files.",
                "fit": ["common interface icons", "brand-adjacent icon needs", "tool symbols"]
            }
        ]
    }


if __name__ == "__main__":
    raise SystemExit(main())
