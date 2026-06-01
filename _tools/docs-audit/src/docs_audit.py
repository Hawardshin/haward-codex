"""Audit categorized workspace documentation."""

from __future__ import annotations

import argparse
import fnmatch
import json
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]


def audit_docs(repo_root: Path, registry_path: Path | None = None) -> JsonMap:
    """Return a deterministic docs registry audit report."""

    repo_root = repo_root.resolve()
    registry_path = registry_path or repo_root / "_docs" / "registry.json"
    registry = _read_json(registry_path)
    docs_root = repo_root / registry.get("docs_root", "_docs")
    allowed_root_files = set(registry.get("allowed_root_files", []))
    categories = registry.get("categories", [])
    required_documents = registry.get("required_documents", [])
    language_pair_exceptions = set(registry.get("language_pair_policy", {}).get("exceptions", []))

    gaps: list[str] = []
    warnings: list[str] = []
    category_reports: list[JsonMap] = []

    if not docs_root.exists():
        gaps.append(f"Docs root does not exist: {docs_root}")
        return _report(repo_root, registry_path, category_reports, gaps, warnings)

    markdown_files = sorted(path for path in docs_root.rglob("*.md") if path.is_file())
    markdown_rel = {path.relative_to(repo_root).as_posix() for path in markdown_files}
    category_paths = {category["id"]: repo_root / category["path"] for category in categories}

    for required in required_documents:
        if not (repo_root / required).exists():
            gaps.append(f"Required document is missing: {required}")

    for path in markdown_files:
        rel_to_docs = path.relative_to(docs_root)
        if len(rel_to_docs.parts) == 1 and path.name not in allowed_root_files:
            gaps.append(f"Markdown file is not allowed at _docs root: {path.relative_to(repo_root).as_posix()}")

    for category in categories:
        category_id = category["id"]
        category_path = category_paths[category_id]
        include_patterns = category.get("include_patterns", [])
        required_index_files = category.get("required_index_files", [])
        category_docs: list[str] = []

        if not category_path.exists() or not category_path.is_dir():
            gaps.append(f"Docs category folder is missing: {category.get('path')}")
            continue

        for index_file in required_index_files:
            if not (category_path / index_file).exists():
                gaps.append(f"Docs category {category_id} is missing index file: {index_file}")

        for path in sorted(category_path.rglob("*.md")):
            rel = path.relative_to(repo_root).as_posix()
            name = path.name
            if name in required_index_files:
                continue
            category_docs.append(rel)
            if not _matches_any(name, include_patterns):
                gaps.append(
                    f"Document {rel} does not match include_patterns for category {category_id}: {include_patterns}"
                )

        category_reports.append(
            {
                "id": category_id,
                "path": category.get("path"),
                "documents_count": len(category_docs),
                "required_index_files": required_index_files,
            }
        )

    for path in markdown_files:
        rel = path.relative_to(repo_root).as_posix()
        if _is_allowed_root_markdown(path, docs_root, allowed_root_files):
            continue
        containing_categories = [
            category_id
            for category_id, category_path in category_paths.items()
            if _is_relative_to(path, category_path)
        ]
        if not containing_categories:
            gaps.append(f"Document is not inside a registered docs category: {rel}")
        elif len(containing_categories) > 1:
            gaps.append(f"Document is inside multiple docs categories: {rel}")

    for rel in sorted(markdown_rel):
        if rel in language_pair_exceptions:
            continue
        counterpart = _language_counterpart(rel)
        if counterpart and counterpart not in markdown_rel and counterpart not in language_pair_exceptions:
            gaps.append(f"Language companion is missing for {rel}: expected {counterpart}")

    if not categories:
        gaps.append("Docs registry has no categories.")
    if not required_documents:
        warnings.append("Docs registry has no required_documents; future sessions may miss durable docs.")

    return _report(repo_root, registry_path, category_reports, gaps, warnings)


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit categorized _docs structure.")
    parser.add_argument("--repo-root", default=".", help="Repository root. Defaults to current directory.")
    parser.add_argument("--registry", default="", help="Optional docs registry JSON path.")
    parser.add_argument("--check", action="store_true", help="Exit with code 1 when gaps are found.")
    args = parser.parse_args()

    repo_root = Path(args.repo_root)
    registry = Path(args.registry) if args.registry else None
    report = audit_docs(repo_root, registry)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if args.check and report["requires_rework"] else 0


def _report(
    repo_root: Path,
    registry_path: Path,
    category_reports: list[JsonMap],
    gaps: list[str],
    warnings: list[str],
) -> JsonMap:
    return {
        "status": "docs_rework_required" if gaps else "docs_ready",
        "requires_rework": bool(gaps),
        "repo_root": str(repo_root),
        "registry_path": str(registry_path),
        "checks": {
            "categories_count": len(category_reports),
            "documents_count": sum(report["documents_count"] for report in category_reports),
            "gaps_count": len(gaps),
            "warnings_count": len(warnings),
        },
        "categories": category_reports,
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve docs gap: {gap}" for gap in gaps],
    }


def _matches_any(name: str, patterns: list[str]) -> bool:
    return any(fnmatch.fnmatch(name, pattern) for pattern in patterns)


def _is_allowed_root_markdown(path: Path, docs_root: Path, allowed_root_files: set[str]) -> bool:
    rel_to_docs = path.relative_to(docs_root)
    return len(rel_to_docs.parts) == 1 and path.name in allowed_root_files


def _is_relative_to(path: Path, other: Path) -> bool:
    try:
        path.relative_to(other)
        return True
    except ValueError:
        return False


def _language_counterpart(path: str) -> str:
    if path.endswith(".ko.md"):
        return f"{path[:-6]}.en.md"
    if path.endswith(".en.md"):
        return f"{path[:-6]}.ko.md"
    return ""


def _read_json(path: Path) -> JsonMap:
    return json.loads(path.read_text(encoding="utf-8"))


if __name__ == "__main__":
    raise SystemExit(main())
