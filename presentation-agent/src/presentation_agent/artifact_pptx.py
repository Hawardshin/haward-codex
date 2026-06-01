"""Create artifact-tool workspaces for editable PPTX export from deck specs."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

from presentation_agent.html_deck import DeckSpecError, catalog_ids, load_json, validate_deck_spec


JsonMap = dict[str, Any]

DEFAULT_SLIDE_SIZE = "1280x720"


def create_artifact_workspace(
    spec_path: str | Path,
    workspace_path: str | Path,
    *,
    catalog_path: str | Path | None = None,
) -> dict[str, Any]:
    """Write artifact-tool slide modules and source notes for a deck spec."""

    spec = load_json(spec_path)
    known_ids = catalog_ids(load_json(catalog_path)) if catalog_path else None
    gaps = validate_deck_spec(spec, known_reference_ids=known_ids)
    if gaps:
        raise DeckSpecError("; ".join(gaps))

    workspace = Path(workspace_path)
    slides_dir = workspace / "slides"
    preview_dir = workspace / "preview"
    layout_dir = workspace / "layout"
    output_dir = workspace / "output"
    qa_dir = workspace / "qa"
    for directory in (slides_dir, preview_dir, layout_dir, output_dir, qa_dir):
        directory.mkdir(parents=True, exist_ok=True)

    spec_copy_path = workspace / "deck-spec.json"
    spec_copy_path.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    slides = spec["slides"]
    for index, slide in enumerate(slides, start=1):
        module_path = slides_dir / f"slide-{index:02d}.mjs"
        module_path.write_text(_render_slide_module(index, slide, spec), encoding="utf-8")

    source_notes_path = workspace / "source-notes.md"
    source_notes_path.write_text(_render_source_notes(spec), encoding="utf-8")

    manifest = {
        "schema_version": "2026-06-01",
        "purpose": "artifact-tool workspace generated from presentation-agent deck-spec",
        "deck_title": spec["title"],
        "slide_count": len(slides),
        "workspace": str(workspace),
        "slides_dir": str(slides_dir),
        "preview_dir": str(preview_dir),
        "layout_dir": str(layout_dir),
        "output_dir": str(output_dir),
        "source_notes": str(source_notes_path),
        "final_pptx": str(output_dir / _slug(spec["title"], suffix=".pptx")),
        "builder_command_template": (
            "node $PRESENTATIONS_SKILL_DIR/scripts/build_artifact_deck.mjs "
            "--slides-dir {slides_dir} --preview-dir {preview_dir} --layout-dir {layout_dir} "
            "--out {final_pptx} --manifest {manifest_path} --slide-count {slide_count} --slide-size 1280x720"
        ),
    }
    manifest_path = workspace / "artifact-workspace-manifest.json"
    manifest["builder_command"] = manifest["builder_command_template"].format(
        slides_dir=slides_dir,
        preview_dir=preview_dir,
        layout_dir=layout_dir,
        final_pptx=manifest["final_pptx"],
        manifest_path=workspace / "artifact-build-manifest.json",
        slide_count=len(slides),
    )
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return manifest


def _render_slide_module(index: int, slide: JsonMap, spec: JsonMap) -> str:
    palette = spec.get("theme", {}).get("palette", {})
    colors = {
        "background": palette.get("background", "#f6f4ef"),
        "surface": palette.get("surface", "#ffffff"),
        "ink": palette.get("ink", "#202124"),
        "muted": palette.get("muted", "#62605a"),
        "accent": palette.get("accent", "#0f766e"),
        "warm": palette.get("warm", "#c2410c"),
        "cool": palette.get("cool", "#2563eb"),
        "line": palette.get("line", "#d8d5cc"),
    }
    layout = slide.get("layout", "split")
    title = _js(slide.get("title", ""))
    kicker = _js(slide.get("kicker", ""))
    subtitle = _js(slide.get("subtitle", ""))
    body = slide.get("body", [])
    body_items = body if isinstance(body, list) else [body]
    notes = slide.get("speaker_notes", [])
    visual = slide.get("visual", {}) if isinstance(slide.get("visual"), dict) else {}
    evidence = slide.get("evidence_sources", [])

    lines = [
        f"export async function slide{index:02d}(presentation, ctx) {{",
        "  const slide = presentation.slides.add();",
        f"  ctx.addShape(slide, {{ x: 0, y: 0, w: 1280, h: 720, fill: {_js(colors['surface'])}, line: ctx.line('transparent', 0) }});",
        f"  ctx.addShape(slide, {{ x: 0, y: 0, w: 1280, h: 18, fill: {_js(colors['accent'])}, line: ctx.line('transparent', 0) }});",
    ]

    if layout in {"hero", "closing"}:
        lines.extend(
            [
                f"  ctx.addText(slide, {{ text: {kicker}, x: 72, y: 94, w: 520, h: 34, fontSize: 17, bold: true, color: {_js(colors['accent'])} }});",
                f"  ctx.addText(slide, {{ text: {title}, x: 72, y: 160, w: 760, h: 210, fontSize: 66, bold: true, color: {_js(colors['ink'])}, insets: {{ left: 0, right: 0, top: 0, bottom: 0 }} }});",
                f"  ctx.addText(slide, {{ text: {subtitle}, x: 76, y: 414, w: 780, h: 96, fontSize: 24, color: {_js(colors['muted'])}, insets: {{ left: 0, right: 0, top: 0, bottom: 0 }} }});",
                f"  ctx.addShape(slide, {{ x: 914, y: 126, w: 250, h: 250, geometry: 'ellipse', fill: {_js(colors['background'])}, line: ctx.line({_js(colors['line'])}, 2) }});",
                f"  ctx.addText(slide, {{ text: {_js(slide.get('script_beat', ''))}, x: 926, y: 230, w: 226, h: 48, fontSize: 22, bold: true, color: {_js(colors['warm'])}, align: 'center', valign: 'mid' }});",
            ]
        )
    else:
        lines.extend(
            [
                f"  ctx.addText(slide, {{ text: {kicker}, x: 62, y: 58, w: 520, h: 30, fontSize: 15, bold: true, color: {_js(colors['accent'])} }});",
                f"  ctx.addText(slide, {{ text: {title}, x: 62, y: 104, w: 560, h: 126, fontSize: 42, bold: true, color: {_js(colors['ink'])} }});",
            ]
        )
        y = 270
        for item in body_items[:4]:
            lines.extend(
                [
                    f"  ctx.addShape(slide, {{ x: 66, y: {y + 8}, w: 5, h: 42, fill: {_js(colors['accent'])}, line: ctx.line('transparent', 0) }});",
                    f"  ctx.addText(slide, {{ text: {_js(item)}, x: 88, y: {y}, w: 520, h: 58, fontSize: 22, color: {_js(colors['ink'])} }});",
                ]
            )
            y += 74
        lines.extend(_render_visual_js(visual, colors))

    lines.extend(_render_footer_js(slide, evidence, colors))
    lines.extend(_render_speaker_notes_js(notes, colors))
    lines.append("  return slide;")
    lines.append("}\n")
    return "\n".join(lines)


def _render_visual_js(visual: JsonMap, colors: dict[str, str]) -> list[str]:
    visual_type = visual.get("type", "statement")
    if visual_type == "metric":
        return [
            f"  ctx.addShape(slide, {{ x: 735, y: 146, w: 360, h: 360, geometry: 'ellipse', fill: {_js(colors['background'])}, line: ctx.line({_js(colors['line'])}, 2) }});",
            f"  ctx.addText(slide, {{ text: {_js(visual.get('value', ''))}, x: 760, y: 240, w: 310, h: 112, fontSize: 92, bold: true, color: {_js(colors['warm'])}, align: 'center', valign: 'mid' }});",
            f"  ctx.addText(slide, {{ text: {_js(visual.get('label', ''))}, x: 772, y: 368, w: 286, h: 76, fontSize: 20, color: {_js(colors['muted'])}, align: 'center', valign: 'mid' }});",
        ]
    if visual_type == "steps":
        lines = [
            f"  ctx.addShape(slide, {{ x: 710, y: 150, w: 410, h: 420, fill: {_js(colors['background'])}, line: ctx.line({_js(colors['line'])}, 2) }});",
        ]
        for index, step in enumerate(visual.get("steps", [])[:5], start=1):
            y = 182 + (index - 1) * 68
            lines.extend(
                [
                    f"  ctx.addShape(slide, {{ x: 744, y: {y}, w: 44, h: 44, geometry: 'ellipse', fill: {_js(colors['cool'])}, line: ctx.line('transparent', 0) }});",
                    f"  ctx.addText(slide, {{ text: {_js(index)}, x: 744, y: {y + 7}, w: 44, h: 28, fontSize: 16, bold: true, color: '#ffffff', align: 'center', valign: 'mid' }});",
                    f"  ctx.addText(slide, {{ text: {_js(step)}, x: 810, y: {y + 2}, w: 250, h: 42, fontSize: 22, color: {_js(colors['ink'])} }});",
                ]
            )
        return lines
    if visual_type == "cards":
        lines = []
        for index, card in enumerate(visual.get("cards", [])[:3]):
            if not isinstance(card, dict):
                continue
            y = 150 + index * 132
            lines.extend(
                [
                    f"  ctx.addShape(slide, {{ x: 700, y: {y}, w: 420, h: 104, fill: {_js(colors['background'])}, line: ctx.line({_js(colors['line'])}, 2) }});",
                    f"  ctx.addText(slide, {{ text: {_js(card.get('title', ''))}, x: 728, y: {y + 20}, w: 360, h: 26, fontSize: 21, bold: true, color: {_js(colors['ink'])} }});",
                    f"  ctx.addText(slide, {{ text: {_js(card.get('text', ''))}, x: 728, y: {y + 54}, w: 360, h: 30, fontSize: 16, color: {_js(colors['muted'])} }});",
                ]
            )
        return lines
    return [
        f"  ctx.addShape(slide, {{ x: 718, y: 170, w: 382, h: 310, fill: {_js(colors['background'])}, line: ctx.line({_js(colors['line'])}, 2) }});",
        f"  ctx.addText(slide, {{ text: {_js(visual.get('label', ''))}, x: 756, y: 286, w: 306, h: 82, fontSize: 26, bold: true, color: {_js(colors['warm'])}, align: 'center', valign: 'mid' }});",
    ]


def _render_footer_js(slide: JsonMap, evidence: Any, colors: dict[str, str]) -> list[str]:
    source_text = "Sources: " + ", ".join(str(item) for item in evidence) if isinstance(evidence, list) and evidence else ""
    return [
        f"  ctx.addText(slide, {{ text: {_js(source_text)}, x: 62, y: 666, w: 940, h: 26, fontSize: 10, color: {_js(colors['muted'])} }});",
        f"  ctx.addText(slide, {{ text: {_js(slide.get('script_beat', ''))}, x: 1052, y: 660, w: 150, h: 28, fontSize: 11, bold: true, color: {_js(colors['accent'])}, align: 'right' }});",
    ]


def _render_speaker_notes_js(notes: Any, colors: dict[str, str]) -> list[str]:
    if not isinstance(notes, list) or not notes:
        return []
    joined = " / ".join(str(note) for note in notes)
    return [
        f"  ctx.addText(slide, {{ text: {_js('Speaker notes: ' + joined)}, x: 62, y: 620, w: 1040, h: 28, fontSize: 9, color: {_js(colors['muted'])} }});",
    ]


def _render_source_notes(spec: JsonMap) -> str:
    lines = [
        f"# Source Notes: {spec['title']}",
        "",
        "## Reference Sources",
        "",
    ]
    for source_id in spec.get("reference_sources", []):
        lines.append(f"- `{source_id}`")
    lines.extend(["", "## Speaker Notes", ""])
    for slide in spec.get("slides", []):
        lines.append(f"### {slide.get('id', '')}: {slide.get('title', '')}")
        for note in slide.get("speaker_notes", []):
            lines.append(f"- {note}")
        lines.append("")
    return "\n".join(lines)


def _slug(value: str, *, suffix: str = "") -> str:
    raw = "".join(char.lower() if char.isalnum() else "-" for char in value)
    collapsed = "-".join(part for part in raw.split("-") if part)
    return f"{collapsed[:80] or 'presentation'}{suffix}"


def _js(value: Any) -> str:
    return json.dumps(str(value), ensure_ascii=False)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Create an artifact-tool PPTX workspace from a deck spec.")
    parser.add_argument("deck_spec", help="Path to deck spec JSON")
    parser.add_argument("workspace", help="Output artifact-tool workspace")
    parser.add_argument("--catalog", help="Optional reference catalog for source ID validation")
    args = parser.parse_args(argv)
    try:
        manifest = create_artifact_workspace(args.deck_spec, args.workspace, catalog_path=args.catalog)
    except DeckSpecError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(json.dumps(manifest, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

