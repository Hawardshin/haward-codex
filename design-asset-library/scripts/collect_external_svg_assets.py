#!/usr/bin/env python3
"""Collect allowed external open-source SVG assets with provenance."""

from __future__ import annotations

import argparse
import io
import json
import re
import shutil
import tarfile
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
POLICY_PATH = ROOT / "configs" / "external-collection-policy.json"
EXTERNAL_ASSET_ROOT = ROOT / "assets" / "svg" / "external"
REGISTRY_PATH = ROOT / "data" / "external-asset-registry.json"
ACCESS_DATE = "2026-06-02"


@dataclass(frozen=True)
class SvgCandidate:
    source_id: str
    source_name: str
    variant: str
    upstream_path: str
    filename: str
    content: bytes

    @property
    def slug(self) -> str:
        return Path(self.filename).stem


@dataclass(frozen=True)
class CollectedAsset:
    asset_id: str
    source_id: str
    source_name: str
    variant: str
    motif: str
    upstream_path: str
    local_path: Path
    license_name: str
    source_url: str
    resolved_commit: str
    tags: tuple[str, ...]


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    policy = load_policy(args.policy)
    assets, manifests = collect_assets(policy, dry_run=args.dry_run, max_total=args.max_total)
    if args.dry_run:
        print(json.dumps(build_dry_run_report(assets, manifests), ensure_ascii=False, indent=2))
        return 0
    REGISTRY_PATH.parent.mkdir(parents=True, exist_ok=True)
    REGISTRY_PATH.write_text(json.dumps(build_registry(policy, assets, manifests), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"collected {len(assets)} external SVG assets")
    print(REGISTRY_PATH.relative_to(ROOT))
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Collect allowed external SVG assets into design-asset-library.")
    parser.add_argument("--policy", type=Path, default=POLICY_PATH)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--max-total", type=int, help="Optional total collection cap for smoke testing.")
    return parser


def load_policy(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def collect_assets(policy: dict, *, dry_run: bool = False, max_total: int | None = None) -> tuple[list[CollectedAsset], list[dict]]:
    if not dry_run:
        reset_output_root()
    collected: list[CollectedAsset] = []
    manifests: list[dict] = []
    for source in policy["sources"]:
        archive = download_archive(source["archive_url"])
        with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as tar:
            candidates = select_candidates(list(iter_svg_candidates(tar, source)), policy["useful_keyword_priority"], source["max_assets"])
            source_assets = []
            if not dry_run:
                write_source_notice(tar, source, candidates)
            for candidate in candidates:
                if max_total is not None and len(collected) >= max_total:
                    break
                asset = build_asset(source, candidate)
                if not dry_run:
                    write_asset_file(asset.local_path, candidate.content)
                collected.append(asset)
                source_assets.append(asset)
            manifests.append(build_source_manifest(source, source_assets, len(candidates)))
        if max_total is not None and len(collected) >= max_total:
            break
    return collected, manifests


def reset_output_root() -> None:
    if EXTERNAL_ASSET_ROOT.exists():
        shutil.rmtree(EXTERNAL_ASSET_ROOT)
    EXTERNAL_ASSET_ROOT.mkdir(parents=True, exist_ok=True)


def download_archive(url: str) -> bytes:
    with urllib.request.urlopen(url, timeout=60) as response:
        return response.read()


def iter_svg_candidates(tar: tarfile.TarFile, source: dict) -> Iterable[SvgCandidate]:
    members = [member for member in tar.getmembers() if member.isfile()]
    for member in members:
        stripped = strip_archive_root(member.name)
        if not stripped.endswith(".svg"):
            continue
        root_config = matching_root(stripped, source["allowed_svg_roots"])
        if root_config is None:
            continue
        filename = Path(stripped).name
        if should_exclude(filename, source.get("exclude_name_contains", [])):
            continue
        extracted = tar.extractfile(member)
        if extracted is None:
            continue
        content = extracted.read()
        if not is_parseable_svg(content):
            continue
        yield SvgCandidate(
            source_id=source["id"],
            source_name=source["name"],
            variant=root_config["variant"],
            upstream_path=stripped,
            filename=filename,
            content=content,
        )


def strip_archive_root(member_name: str) -> str:
    parts = member_name.split("/", 1)
    return parts[1] if len(parts) == 2 else member_name


def matching_root(path: str, allowed_roots: list[dict]) -> dict | None:
    for root_config in allowed_roots:
        root = root_config["root"]
        if path.startswith(root) and "/" not in path[len(root) :].strip("/"):
            return root_config
    return None


def should_exclude(filename: str, excluded_terms: list[str]) -> bool:
    normalized = filename.lower()
    return any(term.lower() in normalized for term in excluded_terms)


def is_parseable_svg(content: bytes) -> bool:
    try:
        parsed = ElementTree.fromstring(content)
    except ElementTree.ParseError:
        return False
    return parsed.tag.endswith("svg")


def select_candidates(candidates: list[SvgCandidate], keywords: list[str], max_assets: int) -> list[SvgCandidate]:
    return sorted(candidates, key=lambda candidate: candidate_priority(candidate, keywords))[:max_assets]


def candidate_priority(candidate: SvgCandidate, keywords: list[str]) -> tuple[int, int, str, str]:
    normalized = normalize(candidate.slug)
    keyword_rank = len(keywords) + 100
    for index, keyword in enumerate(keywords):
        if keyword_match(keyword, normalized):
            keyword_rank = index
            break
    return (keyword_rank, len(normalized), normalized, candidate.variant)


def keyword_match(keyword: str, normalized_name: str) -> bool:
    normalized_keyword = normalize(keyword)
    if len(normalized_keyword) <= 2:
        return normalized_keyword in normalized_name.split()
    return normalized_keyword in normalized_name


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("-", " ").replace("_", " ").lower()).strip()


def build_asset(source: dict, candidate: SvgCandidate) -> CollectedAsset:
    asset_id = f"external-{source['id']}-{candidate.variant}-{candidate.slug}"
    local_path = EXTERNAL_ASSET_ROOT / source["id"] / candidate.variant / candidate.filename
    tags = tuple(sorted({source["id"], candidate.variant, source["license"].lower(), *normalize(candidate.slug).split()}))
    return CollectedAsset(
        asset_id=asset_id,
        source_id=source["id"],
        source_name=source["name"],
        variant=candidate.variant,
        motif=candidate.slug,
        upstream_path=candidate.upstream_path,
        local_path=local_path,
        license_name=source["license"],
        source_url=source["repository_url"],
        resolved_commit=source["resolved_commit"],
        tags=tags,
    )


def write_asset_file(path: Path, content: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(content)


def write_source_notice(tar: tarfile.TarFile, source: dict, candidates: list[SvgCandidate]) -> None:
    source_root = EXTERNAL_ASSET_ROOT / source["id"]
    source_root.mkdir(parents=True, exist_ok=True)
    license_content = read_archive_file(tar, source["license_path"])
    (source_root / "LICENSE").write_bytes(license_content)
    notice = {
        "source_id": source["id"],
        "source_name": source["name"],
        "repository_url": source["repository_url"],
        "archive_url": source["archive_url"],
        "branch": source["branch"],
        "resolved_commit": source["resolved_commit"],
        "license": source["license"],
        "license_url": source["license_url"],
        "accessed_on": ACCESS_DATE,
        "allowed_svg_roots": source["allowed_svg_roots"],
        "max_assets": source["max_assets"],
        "selected_assets": len(candidates),
        "usage_caution": source["usage_caution"],
        "collection_note": "Only allowlisted SVG files were copied. Recheck license and attribution before public redistribution."
    }
    (source_root / "SOURCE.json").write_text(json.dumps(notice, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def read_archive_file(tar: tarfile.TarFile, relative_path: str) -> bytes:
    for member in tar.getmembers():
        if member.isfile() and strip_archive_root(member.name) == relative_path:
            extracted = tar.extractfile(member)
            if extracted is not None:
                return extracted.read()
    raise FileNotFoundError(relative_path)


def build_source_manifest(source: dict, assets: list[CollectedAsset], candidate_count: int) -> dict:
    return {
        "source_id": source["id"],
        "source_name": source["name"],
        "repository_url": source["repository_url"],
        "archive_url": source["archive_url"],
        "branch": source["branch"],
        "resolved_commit": source["resolved_commit"],
        "license": source["license"],
        "license_url": source["license_url"],
        "local_license_path": f"assets/svg/external/{source['id']}/LICENSE",
        "local_source_notice_path": f"assets/svg/external/{source['id']}/SOURCE.json",
        "allowed_svg_roots": source["allowed_svg_roots"],
        "candidate_count_after_filters": candidate_count,
        "collected_count": len(assets),
        "usage_caution": source["usage_caution"]
    }


def build_registry(policy: dict, assets: list[CollectedAsset], manifests: list[dict]) -> dict:
    return {
        "schema_version": "1.0.0",
        "name": "external-svg-asset-registry",
        "purpose": "Registry for actually collected external open-source SVG assets with source provenance, pinned commits, local license copies, and usage cautions.",
        "reader_guide": {
            "summary": "Use collected_assets for actual external SVG files stored in this repository. Check source_manifests and local LICENSE files before public redistribution.",
            "how_to_read": [
                "Start with collection_summary for counts and source breakdown.",
                "Use collected_assets for local SVG paths and source provenance.",
                "Use source_manifests to find local LICENSE and SOURCE.json files.",
                "Open configs/external-collection-policy.json before changing collection scope.",
                "Re-run scripts/collect_external_svg_assets.py after policy changes."
            ],
            "owner": "design-asset-library",
            "last_reviewed": ACCESS_DATE,
            "update_triggers": [
                "External SVG collection policy changes.",
                "A source commit is updated.",
                "A new source is added.",
                "A public release is planned.",
                "License or attribution requirements change."
            ]
        },
        "reference_links": [
            {
                "id": source["source_id"],
                "title": source["source_name"],
                "url": source["repository_url"],
                "source_type": "official_repository",
                "used_for": ["actual stored SVG source", "license and provenance"],
                "last_checked": ACCESS_DATE
            }
            for source in manifests
        ],
        "structure_rules": [
            {
                "id": "source-license-preserved",
                "rule": "Each source collection must include a local LICENSE and SOURCE.json file.",
                "reason": "Actual external files require local provenance and license traceability.",
                "applies_to": ["source_manifests", "collected_assets"]
            },
            {
                "id": "pinned-source-only",
                "rule": "Collected assets must record the upstream commit used for collection.",
                "reason": "Future audits need reproducible source state.",
                "applies_to": ["source_manifests", "collected_assets"]
            },
            {
                "id": "allowlisted-svg-only",
                "rule": "Only SVG files under configured allowed roots may appear in collected_assets.",
                "reason": "Official repositories can contain docs, preview images, and non-reusable SVGs.",
                "applies_to": ["collected_assets"]
            }
        ],
        "field_guide": [
            {"field": "source_manifests", "meaning": "Source-level collection metadata, license path, commit, and counts.", "required": True},
            {"field": "collected_assets", "meaning": "Actual external SVG files stored in the repository.", "required": True},
            {"field": "upstream_path", "meaning": "Original path inside the upstream repository archive.", "required": True},
            {"field": "resolved_commit", "meaning": "Pinned upstream commit used for collection.", "required": True},
            {"field": "license_status", "meaning": "Usage caution for the stored external asset.", "required": True}
        ],
        "collection_policy_path": "configs/external-collection-policy.json",
        "collection_summary": {
            "collected_on": ACCESS_DATE,
            "asset_count": len(assets),
            "source_count": len(manifests),
            "rights_status": "external_open_source_collected_with_license_files",
            "license_status": "Upstream LICENSE files are copied per source. Recheck each source license and attribution before public redistribution.",
            "source_counts": {manifest["source_id"]: manifest["collected_count"] for manifest in manifests}
        },
        "source_manifests": manifests,
        "collected_assets": [
            {
                "id": asset.asset_id,
                "path": asset.local_path.relative_to(ROOT).as_posix(),
                "family": asset.source_id,
                "motif": asset.motif,
                "variant": asset.variant,
                "format": "svg",
                "rights_status": "external_open_source_collected",
                "license": asset.license_name,
                "license_status": "Stored with upstream LICENSE copied; verify license and attribution before public redistribution.",
                "source_library": asset.source_name,
                "source_id": asset.source_id,
                "source_url": asset.source_url,
                "resolved_commit": asset.resolved_commit,
                "upstream_path": asset.upstream_path,
                "source_provenance": [
                    f"Collected from {asset.source_url} at commit {asset.resolved_commit} on {ACCESS_DATE}.",
                    f"Original archive path: {asset.upstream_path}."
                ],
                "tags": list(asset.tags)
            }
            for asset in assets
        ]
    }


def build_dry_run_report(assets: list[CollectedAsset], manifests: list[dict]) -> dict:
    return {
        "status": "dry_run",
        "asset_count": len(assets),
        "source_counts": {manifest["source_id"]: manifest["collected_count"] for manifest in manifests},
        "sample_assets": [
            {
                "id": asset.asset_id,
                "path": asset.local_path.relative_to(ROOT).as_posix(),
                "upstream_path": asset.upstream_path
            }
            for asset in assets[:20]
        ]
    }


if __name__ == "__main__":
    raise SystemExit(main())
