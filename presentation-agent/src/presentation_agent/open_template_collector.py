"""Collect open Impress templates and render HTML reference pages.

The downloaded upstream repository stores many OpenDocument presentation
templates as unpacked directories. This module repackages permitted template
directories into .otp files, copies thumbnails, extracts lightweight slide text,
and creates provenance-rich HTML reference pages. It is not a pixel-faithful
presentation renderer.
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import sys
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from xml.etree import ElementTree


UPSTREAM_REPO_URL = "https://github.com/dohliam/libreoffice-impress-templates"
UPSTREAM_ARCHIVE_URL = f"{UPSTREAM_REPO_URL}/archive/refs/heads/master.zip"
UPSTREAM_RAW_BASE = "https://raw.githubusercontent.com/dohliam/libreoffice-impress-templates/master"

NAMESPACES = {
    "draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
    "text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "dc": "http://purl.org/dc/elements/1.1/",
}


@dataclass(frozen=True)
class CollectionPolicy:
    """Collection-level license and provenance rules."""

    source_path: str
    display_name: str
    license_name: str
    license_url: str
    license_status: str
    redistribution_note: str
    source_note: str


COLLECTION_POLICIES: tuple[CollectionPolicy, ...] = (
    CollectionPolicy(
        source_path="lo-cft",
        display_name="LibreOffice Call for Templates",
        license_name="CC0",
        license_url="https://creativecommons.org/publicdomain/zero/1.0/",
        license_status="public_domain",
        redistribution_note="Collection README says all templates are CC0.",
        source_note="The Document Foundation design call templates.",
    ),
    CollectionPolicy(
        source_path="lo4-design-candidates",
        display_name="LibreOffice 4.4 Design Candidates",
        license_name="CC0",
        license_url="https://creativecommons.org/publicdomain/zero/1.0/",
        license_status="public_domain",
        redistribution_note="Collection README lists templates as CC0.",
        source_note="LibreOffice Design Team call for templates for 4.4.",
    ),
    CollectionPolicy(
        source_path="lo5-design-candidates",
        display_name="LibreOffice 5.0 Design Candidates",
        license_name="CC0",
        license_url="https://creativecommons.org/publicdomain/zero/1.0/",
        license_status="public_domain",
        redistribution_note="Collection README says all templates are CC0.",
        source_note="LibreOffice Design Team call for templates for 5.0.",
    ),
    CollectionPolicy(
        source_path="lo51-templates",
        display_name="LibreOffice 5.1 Templates",
        license_name="CC0",
        license_url="https://creativecommons.org/publicdomain/zero/1.0/",
        license_status="public_domain",
        redistribution_note="Collection README says redistributed templates are CC0.",
        source_note="Templates included with LibreOffice 5.x.",
    ),
    CollectionPolicy(
        source_path="lo35-templates",
        display_name="LibreOffice 3.5 Templates",
        license_name="LGPLv3",
        license_url="https://www.gnu.org/licenses/lgpl-3.0.html",
        license_status="open_source",
        redistribution_note="Collection README says templates appear licensed under LGPLv3 with LibreOffice 3.5.",
        source_note="Templates provided in LibreOffice 3.5.",
    ),
    CollectionPolicy(
        source_path="fedora-slideshow",
        display_name="Fedora Slideshow Templates",
        license_name="CC-BY / CC-BY-SA 3.0",
        license_url="https://creativecommons.org/licenses/by-sa/3.0/",
        license_status="free_with_terms",
        redistribution_note="Collection README lists each template as CC-BY or CC-BY-SA 3.0.",
        source_note="Templates based on Fedora Project community designs.",
    ),
    CollectionPolicy(
        source_path="user-contrib/material-simple",
        display_name="Material Simple Templates",
        license_name="MIT",
        license_url="https://opensource.org/license/mit/",
        license_status="open_source",
        redistribution_note="Collection README and license file state MIT.",
        source_note="User-contributed simple color-scheme templates based on Material Design ideas.",
    ),
)


def slugify(value: str) -> str:
    """Convert a display value to a durable lower kebab-case slug."""

    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
    return slug or "untitled"


def _relative_posix(path: Path, base: Path) -> str:
    return path.relative_to(base).as_posix()


def _html_href(from_file: Path, project_root: Path, project_relative_target: str) -> str:
    target = project_root / project_relative_target
    return Path(os.path.relpath(target, from_file.parent)).as_posix()


def _template_dirs(source_root: Path, policy: CollectionPolicy) -> list[Path]:
    collection_root = source_root / policy.source_path
    if not collection_root.exists():
        raise FileNotFoundError(collection_root)
    return sorted(path.parent for path in collection_root.rglob("mimetype") if path.parent.is_dir())


def _read_title(template_dir: Path) -> str:
    return template_dir.name.replace("-", " ").replace("_", " ").title()


def _text_content(node: ElementTree.Element) -> str:
    values: list[str] = []
    if node.text and node.text.strip():
        values.append(node.text.strip())
    for child in node:
        child_text = _text_content(child)
        if child_text:
            values.append(child_text)
        if child.tail and child.tail.strip():
            values.append(child.tail.strip())
    return " ".join(values).strip()


def extract_odf_slide_texts(template_dir: str | Path) -> list[list[str]]:
    """Extract simple text blocks from an unpacked ODF presentation template."""

    source = Path(template_dir)
    content_path = source / "content.xml"
    if not content_path.exists():
        raise FileNotFoundError(content_path)

    root = ElementTree.fromstring(content_path.read_text(encoding="utf-8"))
    slides: list[list[str]] = []
    for page in root.findall(".//draw:page", namespaces=NAMESPACES):
        texts: list[str] = []
        text_tags = {f"{{{NAMESPACES['text']}}}h", f"{{{NAMESPACES['text']}}}p"}
        for node in page.iter():
            if node.tag not in text_tags:
                continue
            value = _text_content(node)
            if value:
                texts.append(value)
        deduped: list[str] = []
        for value in texts:
            if value not in deduped:
                deduped.append(value)
        slides.append(deduped)
    return slides


def package_odf_template(template_dir: str | Path, output_path: str | Path) -> Path:
    """Package an unpacked ODF template directory into an .otp file."""

    source = Path(template_dir)
    output = Path(output_path)
    mimetype_path = source / "mimetype"
    if not mimetype_path.exists():
        raise FileNotFoundError(mimetype_path)

    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w") as archive:
        archive.write(mimetype_path, "mimetype", compress_type=zipfile.ZIP_STORED)
        for path in sorted(source.rglob("*")):
            if path.is_dir() or path == mimetype_path:
                continue
            archive.write(path, _relative_posix(path, source), compress_type=zipfile.ZIP_DEFLATED)
    return output


def _copy_thumbnail(template_dir: Path, output_path: Path) -> Path | None:
    candidates = [
        template_dir / "Thumbnails" / "thumbnail.png",
        template_dir / "Thumbnails" / "thumbnail.jpg",
        template_dir / "Thumbnails" / "thumbnail.jpeg",
    ]
    for candidate in candidates:
        if candidate.exists():
            output_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(candidate, output_path)
            return output_path
    return None


def _render_template_html(record: dict[str, Any], slides: list[list[str]], *, output_path: Path, project_root: Path) -> Path:
    title = html.escape(record["title"])
    local_file = html.escape(record["local_file"])
    upstream_url = html.escape(record["upstream_url"])
    license_name = html.escape(record["license_name"])
    license_url = html.escape(record["license_url"])
    collection = html.escape(record["collection"])
    thumbnail = record.get("thumbnail")
    thumbnail_rel = ""
    if isinstance(thumbnail, str) and thumbnail:
        thumbnail_rel = html.escape(_html_href(output_path, project_root, thumbnail))

    body: list[str] = [
        "<!doctype html>",
        '<html lang="ko">',
        "<head>",
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        f"  <title>{title} - Open Impress Reference</title>",
        "  <style>",
        "    :root { color-scheme: light; --ink: #202124; --muted: #65686f; --line: #d9d6ce; --panel: #ffffff; --bg: #f4f1ea; --accent: #1d5c63; }",
        "    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--ink); }",
        "    main { max-width: 1120px; margin: 0 auto; padding: 36px 24px 56px; }",
        "    header { display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, 360px); gap: 28px; align-items: start; border-bottom: 1px solid var(--line); padding-bottom: 28px; }",
        "    h1 { margin: 0 0 12px; font-size: clamp(2rem, 5vw, 4rem); line-height: 1; letter-spacing: 0; }",
        "    h2 { margin: 32px 0 14px; font-size: 1.25rem; }",
        "    p, li { line-height: 1.6; }",
        "    a { color: var(--accent); }",
        "    .meta { display: grid; gap: 8px; margin: 18px 0 0; color: var(--muted); }",
        "    .meta strong { color: var(--ink); }",
        "    .thumb { width: 100%; aspect-ratio: 16 / 9; object-fit: contain; background: #fff; border: 1px solid var(--line); }",
        "    .slides { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }",
        "    .slide { min-height: 148px; background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 18px; box-sizing: border-box; }",
        "    .slide h3 { margin: 0 0 10px; font-size: 0.95rem; color: var(--muted); }",
        "    .slide p { margin: 0 0 8px; }",
        "    .note { max-width: 760px; color: var(--muted); }",
        "    @media (max-width: 760px) { header { grid-template-columns: 1fr; } }",
        "  </style>",
        "</head>",
        "<body>",
        "  <main>",
        "    <header>",
        "      <div>",
        f"        <h1>{title}</h1>",
        "        <p class=\"note\">이 페이지는 공개 라이선스 Impress 템플릿을 발표 에이전트가 다시 참고할 수 있도록 만든 HTML 참조 카드입니다. 실제 PPT 렌더링이 아니라 썸네일, 출처, 라이선스, 추출 가능한 텍스트 구조를 보존합니다.</p>",
        "        <div class=\"meta\">",
        f"          <span><strong>Collection:</strong> {collection}</span>",
        f"          <span><strong>License:</strong> <a href=\"{license_url}\">{license_name}</a></span>",
        f"          <span><strong>Local file:</strong> {local_file}</span>",
        f"          <span><strong>Source:</strong> <a href=\"{upstream_url}\">{upstream_url}</a></span>",
        "        </div>",
        "      </div>",
    ]
    if thumbnail_rel:
        body.append(f'      <img class="thumb" src="{thumbnail_rel}" alt="{title} thumbnail">')
    else:
        body.append('      <div class="thumb" role="img" aria-label="No thumbnail available"></div>')
    body.extend(["    </header>", "    <section>", "      <h2>Extracted Slide Text</h2>"])
    if slides:
        body.append('      <div class="slides">')
        for index, slide in enumerate(slides, start=1):
            body.append('        <article class="slide">')
            body.append(f"          <h3>Slide {index}</h3>")
            if slide:
                for text_value in slide[:12]:
                    body.append(f"          <p>{html.escape(text_value)}</p>")
            else:
                body.append("          <p>No text extracted from this template slide.</p>")
            body.append("        </article>")
        body.append("      </div>")
    else:
        body.append("      <p class=\"note\">No slide pages were found in content.xml.</p>")
    body.extend(
        [
            "    </section>",
            "  </main>",
            "</body>",
            "</html>",
            "",
        ]
    )
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(body), encoding="utf-8")
    return output_path


def _render_gallery(records: list[dict[str, Any]], output_path: Path, *, title: str, project_root: Path) -> Path:
    escaped_title = html.escape(title)
    by_collection: dict[str, int] = {}
    for record in records:
        by_collection[record["collection"]] = by_collection.get(record["collection"], 0) + 1

    body: list[str] = [
        "<!doctype html>",
        '<html lang="ko">',
        "<head>",
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        f"  <title>{escaped_title}</title>",
        "  <style>",
        "    :root { --ink: #202124; --muted: #666a71; --line: #d8d4ca; --panel: #fff; --bg: #f5f2eb; --accent: #0d5f6b; }",
        "    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--ink); }",
        "    main { max-width: 1280px; margin: 0 auto; padding: 36px 24px 64px; }",
        "    header { border-bottom: 1px solid var(--line); padding-bottom: 24px; margin-bottom: 28px; }",
        "    h1 { margin: 0 0 12px; font-size: clamp(2.2rem, 6vw, 4.8rem); line-height: 1; letter-spacing: 0; }",
        "    h2 { margin: 0 0 8px; font-size: 1rem; }",
        "    p { line-height: 1.6; }",
        "    a { color: var(--accent); }",
        "    .summary { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; color: var(--muted); }",
        "    .summary span { border: 1px solid var(--line); border-radius: 999px; padding: 6px 10px; background: rgba(255,255,255,0.5); }",
        "    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }",
        "    article { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; min-width: 0; }",
        "    img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: contain; background: #fff; border-bottom: 1px solid var(--line); }",
        "    .missing { width: 100%; aspect-ratio: 16 / 9; background: #fff; border-bottom: 1px solid var(--line); }",
        "    .card-body { padding: 14px; }",
        "    .meta { display: grid; gap: 4px; margin-top: 10px; color: var(--muted); font-size: 0.86rem; }",
        "  </style>",
        "</head>",
        "<body>",
        "  <main>",
        "    <header>",
        f"      <h1>{escaped_title}</h1>",
        f"      <p>{len(records)}개 공개 Impress 템플릿을 로컬 .otp 파일, 썸네일, HTML 참조 페이지로 정리했습니다. LibreOffice가 설치되어 있지 않은 현재 환경에서는 고화질 PPT 렌더링 대신 템플릿 패키지와 구조 추출 HTML을 보존합니다.</p>",
        "      <div class=\"summary\">",
    ]
    for collection, count in sorted(by_collection.items()):
        body.append(f"        <span>{html.escape(collection)}: {count}</span>")
    body.extend(["      </div>", "    </header>", "    <section class=\"grid\">"])

    for record in records:
        detail_href = html.escape(_html_href(output_path, project_root, record["html_file"]))
        thumbnail = record.get("thumbnail")
        thumbnail_href = ""
        if isinstance(thumbnail, str) and thumbnail:
            thumbnail_href = html.escape(_html_href(output_path, project_root, thumbnail))
        body.append("      <article>")
        if thumbnail_href:
            body.append(f'        <a href="{detail_href}"><img src="{thumbnail_href}" alt="{html.escape(record["title"])} thumbnail"></a>')
        else:
            body.append(f'        <a href="{detail_href}"><div class="missing" aria-label="No thumbnail"></div></a>')
        body.append('        <div class="card-body">')
        body.append(f'          <h2><a href="{detail_href}">{html.escape(record["title"])}</a></h2>')
        body.append('          <div class="meta">')
        body.append(f'            <span>{html.escape(record["collection"])}</span>')
        body.append(f'            <span>{html.escape(record["license_name"])}</span>')
        body.append(f'            <span>{record["slide_count"]} extracted slide pages</span>')
        body.append("          </div>")
        body.append("        </div>")
        body.append("      </article>")

    body.extend(["    </section>", "  </main>", "</body>", "</html>", ""])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(body), encoding="utf-8")
    return output_path


def collect_open_impress_templates(
    source_root: str | Path,
    output_root: str | Path,
    *,
    accessed_on: str,
    max_records: int | None = None,
) -> dict[str, Any]:
    """Collect configured open Impress templates into local project outputs."""

    source = Path(source_root)
    project_root = Path(output_root)
    records: list[dict[str, Any]] = []

    for policy in COLLECTION_POLICIES:
        for template_dir in _template_dirs(source, policy):
            if max_records is not None and len(records) >= max_records:
                break

            relative_template = _relative_posix(template_dir, source)
            collection_slug = slugify(policy.source_path.replace("/", "-"))
            template_slug = slugify(template_dir.name)
            record_id = f"open-impress-{collection_slug}-{template_slug}"
            title = _read_title(template_dir)

            otp_path = project_root / "data" / "assets" / "raw" / "open-impress-templates" / "files" / collection_slug / f"{template_slug}.otp"
            thumbnail_path = project_root / "data" / "assets" / "thumbnails" / "open-impress-templates" / collection_slug / f"{template_slug}.png"
            html_path = project_root / "data" / "conversions" / "html" / "open-impress-templates" / collection_slug / f"{template_slug}.html"

            package_odf_template(template_dir, otp_path)
            copied_thumbnail = _copy_thumbnail(template_dir, thumbnail_path)
            slides = extract_odf_slide_texts(template_dir)

            record: dict[str, Any] = {
                "id": record_id,
                "title": title,
                "slug": template_slug,
                "collection": policy.display_name,
                "collection_slug": collection_slug,
                "license_name": policy.license_name,
                "license_url": policy.license_url,
                "license_status": policy.license_status,
                "redistribution_note": policy.redistribution_note,
                "source_note": policy.source_note,
                "source_url": UPSTREAM_REPO_URL,
                "upstream_url": f"{UPSTREAM_REPO_URL}/tree/master/{relative_template}",
                "upstream_raw_thumbnail": f"{UPSTREAM_RAW_BASE}/{relative_template}/Thumbnails/thumbnail.png",
                "upstream_path": relative_template,
                "local_file": _relative_posix(otp_path, project_root),
                "thumbnail": _relative_posix(copied_thumbnail, project_root) if copied_thumbnail else None,
                "html_file": _relative_posix(html_path, project_root),
                "formats": ["otp", "odf-unpacked-source", "html-reference"],
                "download_allowed": True,
                "html_conversion": "reference_only",
                "slide_count": len(slides),
                "extracted_text_count": sum(len(slide) for slide in slides),
                "conversion_note": "Packaged to .otp and converted to a thumbnail/provenance/text HTML reference page; not pixel-faithful PPT rendering.",
                "provenance": {
                    "found_via": "web_search_and_github_archive_download",
                    "downloaded_from": UPSTREAM_ARCHIVE_URL,
                    "accessed_on": accessed_on,
                    "source_repository": UPSTREAM_REPO_URL,
                },
            }
            _render_template_html(record, slides, output_path=html_path, project_root=project_root)
            records.append(record)

        if max_records is not None and len(records) >= max_records:
            break

    gallery_path = project_root / "artifacts" / "html" / "open-impress-template-gallery.html"
    _render_gallery(records, gallery_path, title="Open Impress Template Gallery", project_root=project_root)

    registry = {
        "schema_version": "2026-06-02",
        "name": "open-impress-template-downloads",
        "purpose": "Record license-reviewed public Impress template files downloaded into presentation-agent, their provenance, local storage paths, thumbnails, and reference-only HTML conversion outputs.",
        "reader_guide": {
            "summary": "Downloaded and converted open/free Impress presentation templates for presentation-agent reference use.",
            "how_to_read": [
                "Read summary first to confirm collection size and access date.",
                "Read reference_links to understand the upstream repository, archive, and generated gallery.",
                "Read structure_rules before moving raw files, thumbnails, HTML pages, or registry records.",
                "Use records to inspect item-level source path, license status, local file, thumbnail, and HTML reference path."
            ],
            "owner": "presentation-agent",
            "last_reviewed": accessed_on,
            "update_triggers": [
                "A new upstream template collection is downloaded.",
                "A license or redistribution decision changes.",
                "A high-fidelity renderer replaces reference-only HTML conversion.",
                "Local raw, thumbnail, or HTML output paths change."
            ],
            "conversion_scope": "These are HTML reference cards generated from ODF thumbnails and extracted text, not faithful PowerPoint visual renders.",
            "raw_storage_rule": "Raw files are stored only for configured collections whose README/license notes allow redistribution or open/free reuse.",
        },
        "reference_links": [
            {
                "id": "upstream-repository",
                "title": "dohliam/libreoffice-impress-templates",
                "source_type": "external_repository",
                "url": UPSTREAM_REPO_URL,
                "used_for": ["source discovery", "collection README license review", "template provenance"],
                "last_checked": accessed_on,
                "accessed_on": accessed_on,
            },
            {
                "id": "upstream-archive",
                "title": "Downloaded GitHub source archive",
                "source_type": "external_archive",
                "url": UPSTREAM_ARCHIVE_URL,
                "used_for": ["raw template download", "repeatable source archive retrieval"],
                "last_checked": accessed_on,
                "accessed_on": accessed_on,
            },
            {
                "id": "gallery",
                "title": "Generated HTML gallery",
                "source_type": "local_artifact",
                "path": _relative_posix(gallery_path, project_root),
                "used_for": ["human browsing", "template design reference review"],
                "last_checked": accessed_on,
                "accessed_on": accessed_on,
            },
        ],
        "structure_rules": [
            {
                "id": "raw-files",
                "rule": "Packaged .otp files live under data/assets/raw/open-impress-templates/files/.",
                "reason": "Raw assets must stay in the presentation-agent asset boundary with license-reviewed provenance.",
                "applies_to": ["presentation-agent/data/assets/raw/open-impress-templates/files/"]
            },
            {
                "id": "thumbnails",
                "rule": "Thumbnails live under data/assets/thumbnails/open-impress-templates/.",
                "reason": "Gallery previews should be separate from raw template packages.",
                "applies_to": ["presentation-agent/data/assets/thumbnails/open-impress-templates/"]
            },
            {
                "id": "html-reference-pages",
                "rule": "Per-template HTML reference pages live under data/conversions/html/open-impress-templates/.",
                "reason": "These pages are conversion outputs and should remain separate from final deck artifacts.",
                "applies_to": ["presentation-agent/data/conversions/html/open-impress-templates/"]
            },
            {
                "id": "gallery",
                "rule": "The cross-template gallery lives under artifacts/html/open-impress-template-gallery.html.",
                "reason": "The gallery is a browsable artifact for humans to inspect many templates quickly.",
                "applies_to": ["presentation-agent/artifacts/html/open-impress-template-gallery.html"]
            },
        ],
        "field_guide": [
            {
                "field": "license_status",
                "meaning": "public_domain, open_source, or free_with_terms based on the upstream collection README.",
                "required": True
            },
            {
                "field": "html_conversion",
                "meaning": "reference_only means the page keeps provenance, thumbnail, and extracted text; it is not layout-faithful rendering.",
                "required": True
            },
            {
                "field": "local_file",
                "meaning": "Project-relative path to the packaged .otp file.",
                "required": True
            },
            {
                "field": "thumbnail",
                "meaning": "Project-relative path to the copied thumbnail when available.",
                "required": True
            },
            {
                "field": "upstream_path",
                "meaning": "Path of the original unpacked template inside the upstream repository archive.",
                "required": True
            }
        ],
        "summary": {
            "record_count": len(records),
            "collection_count": len({record["collection_slug"] for record in records}),
            "source_repository": UPSTREAM_REPO_URL,
            "accessed_on": accessed_on,
        },
        "records": records,
    }
    registry_path = project_root / "data" / "reference-index" / "open-impress-template-downloads.json"
    registry_path.parent.mkdir(parents=True, exist_ok=True)
    registry_path.write_text(json.dumps(registry, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return registry


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Collect open LibreOffice Impress templates into presentation-agent outputs.")
    parser.add_argument("source_root", help="Path to the unpacked libreoffice-impress-templates repository archive.")
    parser.add_argument("--output-root", default="presentation-agent", help="presentation-agent project root.")
    parser.add_argument("--accessed-on", required=True, help="ISO date used in provenance records.")
    parser.add_argument("--max-records", type=int, help="Optional cap for tests or partial collection runs.")
    args = parser.parse_args(argv)

    registry = collect_open_impress_templates(
        args.source_root,
        args.output_root,
        accessed_on=args.accessed_on,
        max_records=args.max_records,
    )
    print(json.dumps(registry["summary"], ensure_ascii=False, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
