"""Render script-aware presentation specs into standalone HTML decks."""

from __future__ import annotations

import argparse
import html
import json
import sys
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

REQUIRED_SPEC_FIELDS = {
    "schema_version",
    "title",
    "language",
    "theme",
    "script_collaboration",
    "reference_sources",
    "slides",
}

REQUIRED_SLIDE_FIELDS = {"id", "layout", "title", "script_beat", "speaker_notes"}
SUPPORTED_LAYOUTS = {"hero", "split", "evidence", "process", "closing"}


class DeckSpecError(ValueError):
    """Raised when a deck spec cannot be rendered safely."""


def load_json(path: str | Path) -> JsonMap:
    """Load a JSON object from disk."""

    with Path(path).open(encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise DeckSpecError("JSON root must be an object.")
    return data


def catalog_ids(catalog: JsonMap) -> set[str]:
    """Return source IDs from a reference catalog."""

    records = catalog.get("records", [])
    if not isinstance(records, list):
        return set()
    return {record["id"] for record in records if isinstance(record, dict) and isinstance(record.get("id"), str)}


def validate_deck_spec(spec: JsonMap, *, known_reference_ids: set[str] | None = None) -> list[str]:
    """Return validation gaps for a script-aware deck spec."""

    gaps: list[str] = []
    missing = sorted(REQUIRED_SPEC_FIELDS - spec.keys())
    if missing:
        gaps.append(f"Missing top-level fields: {', '.join(missing)}")

    reference_ids = known_reference_ids or set()
    source_refs = spec.get("reference_sources", [])
    if not isinstance(source_refs, list) or not source_refs:
        gaps.append("reference_sources must be a non-empty list.")
    elif reference_ids:
        unknown = sorted(str(item) for item in source_refs if item not in reference_ids)
        if unknown:
            gaps.append(f"Unknown reference_sources: {', '.join(unknown)}")

    theme = spec.get("theme")
    if not isinstance(theme, dict):
        gaps.append("theme must be an object.")
    else:
        for field in ("name", "palette", "typography"):
            if field not in theme:
                gaps.append(f"theme.{field} is required.")

    collaboration = spec.get("script_collaboration")
    if not isinstance(collaboration, dict):
        gaps.append("script_collaboration must be an object.")
    else:
        for field in ("script_owner", "workflow", "handoff_contract"):
            if field not in collaboration:
                gaps.append(f"script_collaboration.{field} is required.")

    slides = spec.get("slides")
    if not isinstance(slides, list) or not slides:
        gaps.append("slides must be a non-empty list.")
        return gaps

    seen_ids: set[str] = set()
    for index, slide in enumerate(slides):
        prefix = f"slides[{index}]"
        if not isinstance(slide, dict):
            gaps.append(f"{prefix} must be an object.")
            continue
        missing_slide = sorted(REQUIRED_SLIDE_FIELDS - slide.keys())
        if missing_slide:
            gaps.append(f"{prefix} missing fields: {', '.join(missing_slide)}")
        slide_id = slide.get("id")
        if not isinstance(slide_id, str) or not slide_id.strip():
            gaps.append(f"{prefix}.id must be a non-empty string.")
        elif slide_id in seen_ids:
            gaps.append(f"Duplicate slide id: {slide_id}")
        else:
            seen_ids.add(slide_id)

        layout = slide.get("layout")
        if layout not in SUPPORTED_LAYOUTS:
            gaps.append(f"{prefix}.layout is not supported: {layout!r}")
        notes = slide.get("speaker_notes")
        if not isinstance(notes, list) or not notes or not all(isinstance(item, str) and item.strip() for item in notes):
            gaps.append(f"{prefix}.speaker_notes must be a non-empty list of strings.")
        slide_refs = slide.get("evidence_sources", [])
        if slide_refs and reference_ids:
            unknown_slide_refs = sorted(str(item) for item in slide_refs if item not in reference_ids)
            if unknown_slide_refs:
                gaps.append(f"{prefix}.evidence_sources has unknown IDs: {', '.join(unknown_slide_refs)}")

    return gaps


def render_deck(spec: JsonMap) -> str:
    """Render a validated deck spec as standalone HTML."""

    language = _text(spec.get("language", "en")) or "en"
    title = _text(spec["title"])
    theme = spec.get("theme", {})
    palette = theme.get("palette", {}) if isinstance(theme, dict) else {}
    typography = theme.get("typography", {}) if isinstance(theme, dict) else {}
    slides = spec["slides"]

    css_vars = {
        "--pa-bg": palette.get("background", "#f6f4ef"),
        "--pa-ink": palette.get("ink", "#202124"),
        "--pa-muted": palette.get("muted", "#62605a"),
        "--pa-surface": palette.get("surface", "#ffffff"),
        "--pa-accent": palette.get("accent", "#0f766e"),
        "--pa-warm": palette.get("warm", "#c2410c"),
        "--pa-cool": palette.get("cool", "#2563eb"),
        "--pa-line": palette.get("line", "#d8d5cc"),
        "--pa-font": typography.get("body", "system-ui, sans-serif"),
        "--pa-display": typography.get("display", "system-ui, sans-serif"),
    }
    style_vars = " ".join(f"{key}: {value};" for key, value in css_vars.items())

    rendered_slides = "\n".join(_render_slide(slide, index, len(slides)) for index, slide in enumerate(slides, start=1))
    notes_json = json.dumps([slide.get("speaker_notes", []) for slide in slides], ensure_ascii=False)
    beats_json = json.dumps([slide.get("script_beat", "") for slide in slides], ensure_ascii=False)

    return "\n".join(
        [
            "<!doctype html>",
            f'<html lang="{html.escape(language)}">',
            "<head>",
            '  <meta charset="utf-8">',
            '  <meta name="viewport" content="width=device-width, initial-scale=1">',
            f"  <title>{html.escape(title)}</title>",
            "  <style>",
            _base_css(style_vars),
            "  </style>",
            "</head>",
            "<body>",
            f'  <main class="pa-deck" aria-label="{html.escape(title)}">',
            rendered_slides,
            "  </main>",
            '  <aside class="pa-presenter" aria-live="polite" aria-label="Presenter notes">',
            '    <div class="pa-presenter__label">Script</div>',
            '    <div class="pa-presenter__beat"></div>',
            '    <ol class="pa-presenter__notes"></ol>',
            "  </aside>",
            '  <nav class="pa-controls" aria-label="Slide controls">',
            '    <button type="button" data-action="prev" aria-label="Previous slide">‹</button>',
            '    <output class="pa-count" aria-live="polite"></output>',
            '    <button type="button" data-action="next" aria-label="Next slide">›</button>',
            '    <button type="button" data-action="notes" aria-label="Toggle speaker notes">S</button>',
            "  </nav>",
            '  <div class="pa-progress" aria-hidden="true"><span></span></div>',
            "  <script>",
            f"    const speakerNotes = {notes_json};",
            f"    const scriptBeats = {beats_json};",
            _deck_js(),
            "  </script>",
            "</body>",
            "</html>",
            "",
        ]
    )


def build_html_deck(spec_path: str | Path, output_path: str | Path, *, catalog_path: str | Path | None = None) -> Path:
    """Validate a deck spec and write a standalone HTML presentation."""

    spec = load_json(spec_path)
    known_ids = catalog_ids(load_json(catalog_path)) if catalog_path else None
    gaps = validate_deck_spec(spec, known_reference_ids=known_ids)
    if gaps:
        raise DeckSpecError("; ".join(gaps))
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(render_deck(spec), encoding="utf-8")
    return output


def _render_slide(slide: JsonMap, index: int, total: int) -> str:
    layout = _text(slide.get("layout", "split"))
    classes = f"pa-slide pa-slide--{html.escape(layout)}"
    if index == 1:
        classes += " is-active"
    kicker = _optional_block("p", slide.get("kicker"), "pa-kicker")
    title = f'<h1>{html.escape(_text(slide.get("title", "")))}</h1>'
    subtitle = _optional_block("p", slide.get("subtitle"), "pa-subtitle")
    body = _render_body(slide)
    visual = _render_visual(slide)
    references = _render_references(slide.get("evidence_sources", []))
    notes = _render_hidden_notes(slide.get("speaker_notes", []))
    return "\n".join(
        [
            f'    <section class="{classes}" data-slide="{index}" data-script-beat="{html.escape(_text(slide.get("script_beat", "")))}" aria-label="Slide {index} of {total}">',
            '      <div class="pa-slide__frame">',
            '        <div class="pa-slide__content">',
            f"          {kicker}",
            f"          {title}",
            f"          {subtitle}",
            f"          {body}",
            f"          {references}",
            "        </div>",
            f"        {visual}",
            "      </div>",
            f"      {notes}",
            "    </section>",
        ]
    )


def _render_body(slide: JsonMap) -> str:
    if "body" in slide:
        items = slide["body"]
        if isinstance(items, list):
            return "<ul>" + "".join(f"<li>{html.escape(_text(item))}</li>" for item in items) + "</ul>"
        return f"<p>{html.escape(_text(items))}</p>"
    if "quote" in slide:
        return f'<blockquote>{html.escape(_text(slide["quote"]))}</blockquote>'
    return ""


def _render_visual(slide: JsonMap) -> str:
    visual = slide.get("visual", {})
    if not isinstance(visual, dict):
        return '<div class="pa-visual" aria-hidden="true"></div>'

    visual_type = visual.get("type", "statement")
    if visual_type == "metric":
        return "\n".join(
            [
                '<div class="pa-visual pa-visual--metric">',
                f'  <strong>{html.escape(_text(visual.get("value", "")))}</strong>',
                f'  <span>{html.escape(_text(visual.get("label", "")))}</span>',
                "</div>",
            ]
        )
    if visual_type == "steps":
        steps = visual.get("steps", [])
        if not isinstance(steps, list):
            steps = []
        return "<div class=\"pa-visual pa-visual--steps\">" + "".join(
            f'<span><b>{item_index}</b>{html.escape(_text(step))}</span>' for item_index, step in enumerate(steps, start=1)
        ) + "</div>"
    if visual_type == "cards":
        cards = visual.get("cards", [])
        if not isinstance(cards, list):
            cards = []
        return "<div class=\"pa-visual pa-visual--cards\">" + "".join(
            f'<article><h2>{html.escape(_text(card.get("title", "")))}</h2><p>{html.escape(_text(card.get("text", "")))}</p></article>'
            for card in cards
            if isinstance(card, dict)
        ) + "</div>"
    return "\n".join(
        [
            '<div class="pa-visual pa-visual--statement">',
            f'  <span>{html.escape(_text(visual.get("label", "")))}</span>',
            "</div>",
        ]
    )


def _render_references(references: Any) -> str:
    if not isinstance(references, list) or not references:
        return ""
    items = "".join(f"<li>{html.escape(_text(item))}</li>" for item in references)
    return f'<ul class="pa-source-list" aria-label="Reference source IDs">{items}</ul>'


def _render_hidden_notes(notes: Any) -> str:
    if not isinstance(notes, list):
        return '<aside class="pa-notes" hidden></aside>'
    items = "".join(f"<li>{html.escape(_text(note))}</li>" for note in notes)
    return f'<aside class="pa-notes" hidden><ol>{items}</ol></aside>'


def _optional_block(tag: str, value: Any, class_name: str) -> str:
    text = _text(value)
    if not text:
        return ""
    return f'<{tag} class="{class_name}">{html.escape(text)}</{tag}>'


def _text(value: Any) -> str:
    return str(value).strip() if value is not None else ""


def _base_css(style_vars: str) -> str:
    return f"""
    :root {{ {style_vars} }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: var(--pa-bg);
      color: var(--pa-ink);
      font-family: var(--pa-font);
      overflow: hidden;
    }}
    .pa-deck {{
      width: 100vw;
      height: 100vh;
      display: grid;
      place-items: center;
      padding: min(3vw, 32px);
    }}
    .pa-slide {{
      display: none;
      width: min(100%, calc(100vh * 16 / 9 - 64px));
      max-width: 1280px;
      aspect-ratio: 16 / 9;
      background: var(--pa-surface);
      border: 1px solid var(--pa-line);
      box-shadow: 0 18px 60px rgb(0 0 0 / 14%);
      overflow: hidden;
    }}
    .pa-slide.is-active {{ display: block; }}
    .pa-slide__frame {{
      min-height: 100%;
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(260px, .95fr);
      gap: clamp(24px, 4vw, 64px);
      padding: clamp(32px, 5vw, 72px);
      position: relative;
    }}
    .pa-slide--hero .pa-slide__frame,
    .pa-slide--closing .pa-slide__frame {{
      grid-template-columns: 1fr;
      align-content: center;
    }}
    .pa-slide__content {{
      min-width: 0;
      align-self: center;
    }}
    .pa-kicker {{
      margin: 0 0 18px;
      color: var(--pa-accent);
      font-size: clamp(14px, 1.4vw, 18px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0;
    }}
    h1 {{
      margin: 0;
      max-width: 11ch;
      font-family: var(--pa-display);
      font-size: clamp(44px, 6vw, 84px);
      line-height: .98;
      letter-spacing: 0;
    }}
    .pa-slide--split h1,
    .pa-slide--evidence h1,
    .pa-slide--process h1 {{
      max-width: 13ch;
      font-size: clamp(34px, 4.6vw, 60px);
      line-height: 1.04;
    }}
    .pa-subtitle {{
      margin: 24px 0 0;
      max-width: 54ch;
      color: var(--pa-muted);
      font-size: clamp(18px, 2vw, 25px);
      line-height: 1.4;
    }}
    ul:not(.pa-source-list) {{
      display: grid;
      gap: 14px;
      margin: 28px 0 0;
      padding: 0;
      list-style: none;
      max-width: 54ch;
      color: var(--pa-ink);
      font-size: clamp(18px, 1.8vw, 24px);
      line-height: 1.35;
    }}
    ul:not(.pa-source-list) li {{
      border-left: 4px solid var(--pa-accent);
      padding-left: 16px;
    }}
    blockquote {{
      margin: 28px 0 0;
      padding: 0 0 0 24px;
      border-left: 6px solid var(--pa-warm);
      font-size: clamp(24px, 3vw, 40px);
      line-height: 1.18;
    }}
    .pa-visual {{
      align-self: stretch;
      min-width: 0;
      display: grid;
      align-content: center;
      border-left: 1px solid var(--pa-line);
      padding-left: clamp(24px, 4vw, 56px);
    }}
    .pa-slide--hero .pa-visual,
    .pa-slide--closing .pa-visual {{
      display: none;
    }}
    .pa-visual--metric strong {{
      display: block;
      color: var(--pa-warm);
      font-size: clamp(70px, 12vw, 150px);
      line-height: .85;
      letter-spacing: 0;
    }}
    .pa-visual--metric span,
    .pa-visual--statement span {{
      display: block;
      margin-top: 18px;
      color: var(--pa-muted);
      font-size: clamp(18px, 2vw, 26px);
      line-height: 1.3;
    }}
    .pa-visual--steps {{
      align-content: center;
      gap: 16px;
    }}
    .pa-visual--steps span {{
      display: grid;
      grid-template-columns: 42px 1fr;
      align-items: center;
      gap: 14px;
      font-size: clamp(17px, 1.8vw, 23px);
      color: var(--pa-ink);
    }}
    .pa-visual--steps b {{
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--pa-cool);
      color: white;
      font-size: 16px;
    }}
    .pa-visual--cards {{
      align-content: center;
      gap: 14px;
    }}
    .pa-visual--cards article {{
      border: 1px solid var(--pa-line);
      border-radius: 8px;
      padding: 18px;
      background: color-mix(in srgb, var(--pa-bg) 42%, white);
    }}
    .pa-visual--cards h2 {{
      margin: 0 0 8px;
      font-size: clamp(17px, 1.7vw, 23px);
    }}
    .pa-visual--cards p {{
      margin: 0;
      color: var(--pa-muted);
      font-size: clamp(15px, 1.35vw, 18px);
      line-height: 1.35;
    }}
    .pa-source-list {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 28px 0 0;
      padding: 0;
      list-style: none;
      color: var(--pa-muted);
      font-size: 12px;
    }}
    .pa-source-list li {{
      border: 1px solid var(--pa-line);
      border-radius: 999px;
      padding: 5px 8px;
    }}
    .pa-controls {{
      position: fixed;
      left: 50%;
      bottom: 18px;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--pa-line);
      border-radius: 999px;
      background: rgb(255 255 255 / 84%);
      backdrop-filter: blur(12px);
      padding: 6px;
    }}
    .pa-controls button {{
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: var(--pa-ink);
      font: 700 18px/1 var(--pa-font);
      cursor: pointer;
    }}
    .pa-controls button:hover,
    .pa-controls button:focus-visible {{
      outline: 2px solid var(--pa-accent);
      outline-offset: 2px;
      background: white;
    }}
    .pa-count {{
      min-width: 54px;
      text-align: center;
      color: var(--pa-muted);
      font-size: 13px;
    }}
    .pa-progress {{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 4px;
      background: rgb(0 0 0 / 10%);
    }}
    .pa-progress span {{
      display: block;
      height: 100%;
      width: 0;
      background: var(--pa-accent);
      transition: width .2s ease;
    }}
    .pa-presenter {{
      position: fixed;
      right: 18px;
      top: 18px;
      width: min(360px, calc(100vw - 36px));
      max-height: calc(100vh - 110px);
      overflow: auto;
      transform: translateX(calc(100% + 24px));
      transition: transform .2s ease;
      border: 1px solid var(--pa-line);
      border-radius: 8px;
      background: rgb(255 255 255 / 92%);
      backdrop-filter: blur(12px);
      padding: 18px;
      box-shadow: 0 16px 42px rgb(0 0 0 / 14%);
    }}
    body.show-notes .pa-presenter {{ transform: translateX(0); }}
    .pa-presenter__label {{
      color: var(--pa-accent);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0;
    }}
    .pa-presenter__beat {{
      margin-top: 8px;
      font-weight: 700;
      font-size: 18px;
    }}
    .pa-presenter__notes {{
      margin: 14px 0 0;
      padding-left: 20px;
      color: var(--pa-muted);
      line-height: 1.45;
    }}
    @media (max-width: 760px) {{
      body {{ overflow: auto; }}
      .pa-deck {{ height: auto; padding: 0; }}
      .pa-slide {{
        display: block;
        width: 100%;
        min-height: 100svh;
        aspect-ratio: auto;
        border: 0;
        box-shadow: none;
      }}
      .pa-slide:not(.is-active) {{ display: none; }}
      .pa-slide__frame {{
        grid-template-columns: 1fr;
        min-height: 100svh;
        padding: 34px 24px 86px;
      }}
      .pa-visual {{ border-left: 0; border-top: 1px solid var(--pa-line); padding: 24px 0 0; }}
      h1, .pa-slide--split h1, .pa-slide--evidence h1, .pa-slide--process h1 {{ font-size: 42px; }}
      .pa-controls {{ bottom: 12px; }}
    }}
    @media print {{
      body {{ overflow: visible; background: white; }}
      .pa-deck {{ display: block; width: auto; height: auto; padding: 0; }}
      .pa-slide {{ display: block; width: 100vw; height: 100vh; page-break-after: always; box-shadow: none; border: 0; }}
      .pa-controls, .pa-progress, .pa-presenter {{ display: none; }}
    }}
"""


def _deck_js() -> str:
    return """
    let currentSlide = 0;
    const slides = Array.from(document.querySelectorAll('.pa-slide'));
    const progress = document.querySelector('.pa-progress span');
    const count = document.querySelector('.pa-count');
    const notesList = document.querySelector('.pa-presenter__notes');
    const beat = document.querySelector('.pa-presenter__beat');

    function showSlide(index) {
      currentSlide = Math.max(0, Math.min(index, slides.length - 1));
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === currentSlide);
      });
      count.value = `${currentSlide + 1} / ${slides.length}`;
      progress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
      beat.textContent = scriptBeats[currentSlide] || '';
      notesList.innerHTML = '';
      (speakerNotes[currentSlide] || []).forEach((note) => {
        const item = document.createElement('li');
        item.textContent = note;
        notesList.appendChild(item);
      });
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function previousSlide() { showSlide(currentSlide - 1); }

    document.addEventListener('keydown', (event) => {
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        nextSlide();
      }
      if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) {
        event.preventDefault();
        previousSlide();
      }
      if (event.key.toLowerCase() === 's') {
        document.body.classList.toggle('show-notes');
      }
    });

    document.querySelector('[data-action="prev"]').addEventListener('click', previousSlide);
    document.querySelector('[data-action="next"]').addEventListener('click', nextSlide);
    document.querySelector('[data-action="notes"]').addEventListener('click', () => {
      document.body.classList.toggle('show-notes');
    });

    showSlide(0);
"""


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Render a script-aware deck spec into HTML.")
    parser.add_argument("deck_spec", help="Path to deck spec JSON")
    parser.add_argument("output_html", help="Output HTML path")
    parser.add_argument("--catalog", help="Optional reference catalog for source ID validation")
    args = parser.parse_args(argv)

    try:
        output = build_html_deck(args.deck_spec, args.output_html, catalog_path=args.catalog)
    except DeckSpecError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

