"""Audit sensitive-file boundaries without reading private local content."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]


REQUIRED_GITIGNORE_PATTERNS = {
    "/_private/",
    "/outputs/",
    ".env",
    ".env.*",
    "*.pem",
    "*.key",
    "*.p12",
    "*.pfx",
    "*.jks",
    "*.keystore",
    "*.kdbx",
}

ALLOWED_PRIVATE_MARKERS = {
    "`_private/`",
    "_private/",
    "\"/_private/\"",
    "\"_private\"",
}


def audit_privacy(repo_root: Path) -> JsonMap:
    """Return a deterministic privacy-boundary audit report.

    The audit intentionally does not traverse or read `_private/`.
    """

    repo_root = repo_root.resolve()
    gitignore_text = _read_text(repo_root / ".gitignore")
    gitignore_lines = {
        line.strip()
        for line in gitignore_text.splitlines()
        if line.strip() and not line.strip().startswith("#")
    }

    gaps: list[str] = []
    warnings: list[str] = []

    missing_patterns = sorted(REQUIRED_GITIGNORE_PATTERNS - gitignore_lines)
    for pattern in missing_patterns:
        gaps.append(f".gitignore is missing sensitive/local-only pattern: {pattern}")

    sensitive_config = repo_root / "agent-platform" / "configs" / "security" / "sensitive-file-boundary.json"
    if not sensitive_config.exists():
        gaps.append("Missing sensitive boundary config: agent-platform/configs/security/sensitive-file-boundary.json")

    for relative_path in [
        "_ops/maps/repository-map.md",
        "workspace-monitor/src/generated/workspace-snapshot.json",
        "workspace-monitor/public/workspace-snapshot.json",
    ]:
        path = repo_root / relative_path
        if not path.exists():
            warnings.append(f"Privacy audit target does not exist yet: {relative_path}")
            continue
        text = _read_text(path)
        leaked_paths = _private_content_paths(text)
        if leaked_paths:
            gaps.append(f"{relative_path} appears to include private content paths: {', '.join(sorted(leaked_paths)[:10])}")

    workspace_index = _read_text(repo_root / "_tools" / "workspace-index" / "src" / "workspace_index.py")
    if "load_local_only_dir_names" not in workspace_index:
        gaps.append("workspace-index does not explicitly load local-only folders as file-index exclusions.")
    if "iter_indexable_files" not in workspace_index or "root.rglob(\"*\")" in workspace_index:
        gaps.append("workspace-index must prune ignored directories before traversal instead of recursively scanning the full tree.")

    monitor_collector = _read_text(repo_root / "workspace-monitor" / "scripts" / "collect-workspace.mjs")
    if "\"_private\"" not in monitor_collector or "\"/_private/\"" not in monitor_collector:
        gaps.append("workspace-monitor collector does not explicitly exclude _private from directory walks and source paths.")

    status = "privacy_ready" if not gaps else "privacy_rework_required"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "repo_root": str(repo_root),
        "principle": "Sensitive local content must be centrally routed, ignored by git, excluded from generated maps/snapshots, and not read by agents by default.",
        "checks": {
            "required_gitignore_patterns_count": len(REQUIRED_GITIGNORE_PATTERNS),
            "missing_gitignore_patterns_count": len(missing_patterns),
            "generated_targets_checked": 3,
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve privacy gap: {gap}" for gap in gaps],
    }


def _private_content_paths(text: str) -> set[str]:
    matches = set()
    for match in re.findall(r"[_./-]*_private/[A-Za-z0-9_.@%+=:,/-]+", text):
        normalized = match.strip().strip("`\"'")
        if normalized in ALLOWED_PRIVATE_MARKERS:
            continue
        if normalized.rstrip("/") == "_private":
            continue
        if normalized.endswith("/"):
            continue
        matches.add(normalized)
    return matches


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit workspace privacy and sensitive-file boundaries.")
    parser.add_argument("--repo-root", default=".", help="Repository root. Defaults to current directory.")
    parser.add_argument("--check", action="store_true", help="Exit with code 1 when gaps are found.")
    args = parser.parse_args()

    report = audit_privacy(Path(args.repo_root))
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if args.check and report["requires_rework"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
