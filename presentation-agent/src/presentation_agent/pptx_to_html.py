"""Convert permitted PPTX files into simple HTML slide structure.

This module intentionally performs a low-fidelity extraction. It reads slide
text from Office Open XML and emits accessible HTML sections so the
presentation agent can inspect narrative flow and rebuild slides in an HTML
framework. It is not a pixel-faithful PowerPoint renderer.
"""

from __future__ import annotations

import argparse
import html
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree


TEXT_NODE = "{http://schemas.openxmlformats.org/drawingml/2006/main}t"


def _slide_sort_key(name: str) -> tuple[int, str]:
    match = re.search(r"slide(\d+)\.xml$", name)
    if not match:
        return (10**9, name)
    return (int(match.group(1)), name)


def extract_slide_texts(pptx_path: str | Path) -> list[list[str]]:
    """Extract text runs from each slide in a PPTX file."""

    path = Path(pptx_path)
    if not path.exists():
        raise FileNotFoundError(path)

    slides: list[list[str]] = []
    with zipfile.ZipFile(path) as archive:
        slide_names = sorted(
            (name for name in archive.namelist() if name.startswith("ppt/slides/slide") and name.endswith(".xml")),
            key=_slide_sort_key,
        )
        for slide_name in slide_names:
            root = ElementTree.fromstring(archive.read(slide_name))
            texts = [node.text.strip() for node in root.iter(TEXT_NODE) if node.text and node.text.strip()]
            slides.append(texts)
    return slides


def slides_to_html(slides: list[list[str]], *, title: str = "Converted Presentation") -> str:
    """Render extracted slide text as standalone HTML."""

    escaped_title = html.escape(title)
    body: list[str] = [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        f"  <title>{escaped_title}</title>",
        "  <style>",
        "    body { margin: 0; font-family: system-ui, sans-serif; background: #f7f7f4; color: #202124; }",
        "    main { display: grid; gap: 24px; padding: 32px; }",
        "    section { aspect-ratio: 16 / 9; background: white; border: 1px solid #d8d8d2; padding: 48px; box-sizing: border-box; }",
        "    h1 { font-size: 28px; margin: 0 0 24px; }",
        "    p { font-size: 20px; line-height: 1.4; margin: 0 0 12px; }",
        "  </style>",
        "</head>",
        "<body>",
        "  <main>",
    ]
    for index, slide in enumerate(slides, start=1):
        body.append(f'    <section aria-label="Slide {index}">')
        heading = html.escape(slide[0]) if slide else f"Slide {index}"
        body.append(f"      <h1>{heading}</h1>")
        for paragraph in slide[1:]:
            body.append(f"      <p>{html.escape(paragraph)}</p>")
        body.append("    </section>")
    body.extend(["  </main>", "</body>", "</html>", ""])
    return "\n".join(body)


def convert_pptx_to_html(pptx_path: str | Path, output_path: str | Path, *, title: str | None = None) -> Path:
    """Convert a PPTX file to a simple HTML document."""

    source = Path(pptx_path)
    output = Path(output_path)
    slides = extract_slide_texts(source)
    html_text = slides_to_html(slides, title=title or source.stem)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html_text, encoding="utf-8")
    return output


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Extract PPTX slide text into simple HTML.")
    parser.add_argument("pptx", help="Path to a license-permitted .pptx file")
    parser.add_argument("output_html", help="Output HTML path")
    parser.add_argument("--title", help="HTML document title")
    args = parser.parse_args(argv)

    convert_pptx_to_html(args.pptx, args.output_html, title=args.title)
    print(args.output_html)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

