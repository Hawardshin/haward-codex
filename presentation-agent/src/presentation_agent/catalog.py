"""Validate and summarize presentation reference catalogs."""

from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


REQUIRED_TOP_LEVEL_FIELDS = {
    "schema_version",
    "reader_guide",
    "reference_links",
    "structure_rules",
    "field_guide",
    "records",
}

REQUIRED_RECORD_FIELDS = {
    "id",
    "title",
    "url",
    "source_type",
    "formats",
    "license_status",
    "download_allowed",
    "html_conversion",
    "design_tags",
    "quality_signals",
    "provenance",
    "notes",
}

ALLOWED_LICENSE_STATUSES = {
    "open_source",
    "public_domain",
    "free_with_terms",
    "permissive_possible",
    "official_terms_required",
    "paid_or_account_required",
    "unknown",
}

RAW_STORAGE_COMPATIBLE = {
    "open_source",
    "public_domain",
    "free_with_terms",
    "permissive_possible",
}

ALLOWED_HTML_CONVERSIONS = {
    "native_html",
    "pptx_requires_conversion",
    "manual_rebuild_recommended",
    "reference_only",
    "asset_reference",
}


class CatalogError(ValueError):
    """Raised when a catalog contract is violated."""


def load_catalog(path: str | Path) -> dict[str, Any]:
    """Load a JSON presentation reference catalog."""

    catalog_path = Path(path)
    with catalog_path.open(encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise CatalogError("Catalog root must be an object.")
    return data


def validate_catalog(data: dict[str, Any], *, min_records: int = 1) -> list[str]:
    """Return validation gaps for a catalog."""

    gaps: list[str] = []
    missing_top = sorted(REQUIRED_TOP_LEVEL_FIELDS - data.keys())
    if missing_top:
        gaps.append(f"Missing top-level fields: {', '.join(missing_top)}")

    records = data.get("records")
    if not isinstance(records, list):
        return gaps + ["records must be a list."]
    if len(records) < min_records:
        gaps.append(f"records must contain at least {min_records} entries.")

    seen_ids: set[str] = set()
    for index, record in enumerate(records):
        prefix = f"records[{index}]"
        if not isinstance(record, dict):
            gaps.append(f"{prefix} must be an object.")
            continue

        missing_record = sorted(REQUIRED_RECORD_FIELDS - record.keys())
        if missing_record:
            gaps.append(f"{prefix} missing fields: {', '.join(missing_record)}")

        record_id = record.get("id")
        if not isinstance(record_id, str) or not record_id:
            gaps.append(f"{prefix}.id must be a non-empty string.")
        elif record_id in seen_ids:
            gaps.append(f"Duplicate record id: {record_id}")
        else:
            seen_ids.add(record_id)

        url = record.get("url")
        if not isinstance(url, str) or urlparse(url).scheme not in {"http", "https"}:
            gaps.append(f"{prefix}.url must be an http(s) URL.")

        license_status = record.get("license_status")
        if license_status not in ALLOWED_LICENSE_STATUSES:
            gaps.append(f"{prefix}.license_status is not recognized: {license_status!r}")

        if record.get("download_allowed") is True and license_status not in RAW_STORAGE_COMPATIBLE:
            gaps.append(f"{prefix}.download_allowed=true is not compatible with {license_status!r}.")

        html_conversion = record.get("html_conversion")
        if html_conversion not in ALLOWED_HTML_CONVERSIONS:
            gaps.append(f"{prefix}.html_conversion is not recognized: {html_conversion!r}")

        for list_field in ("formats", "design_tags", "quality_signals"):
            value = record.get(list_field)
            if not isinstance(value, list) or not value:
                gaps.append(f"{prefix}.{list_field} must be a non-empty list.")

        provenance = record.get("provenance")
        if not isinstance(provenance, dict):
            gaps.append(f"{prefix}.provenance must be an object.")
        else:
            if not provenance.get("accessed_on"):
                gaps.append(f"{prefix}.provenance.accessed_on is required.")
            if not provenance.get("found_via"):
                gaps.append(f"{prefix}.provenance.found_via is required.")

    return gaps


def summarize_catalog(data: dict[str, Any]) -> dict[str, Any]:
    """Summarize catalog coverage for quick review."""

    records = data.get("records", [])
    return {
        "record_count": len(records),
        "source_types": dict(Counter(record["source_type"] for record in records)),
        "license_statuses": dict(Counter(record["license_status"] for record in records)),
        "html_conversions": dict(Counter(record["html_conversion"] for record in records)),
        "download_allowed_count": sum(1 for record in records if record.get("download_allowed")),
    }


def main(argv: list[str] | None = None) -> int:
    args = argv if argv is not None else sys.argv[1:]
    if not args:
        print("Usage: python -m presentation_agent.catalog <catalog.json>", file=sys.stderr)
        return 2

    data = load_catalog(args[0])
    gaps = validate_catalog(data, min_records=40)
    if gaps:
        for gap in gaps:
            print(f"ERROR: {gap}", file=sys.stderr)
        return 1

    print(json.dumps(summarize_catalog(data), ensure_ascii=False, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

