from __future__ import annotations

import argparse
import json
from pathlib import Path

from workspace_health.checks import build_checks, filter_checks
from workspace_health.models import CHECK_CATEGORIES
from workspace_health.runner import format_command, run_check, serialize_check, serialize_result


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run workspace health checks.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[4])
    parser.add_argument("--include-build", action="store_true", help="Include slower build checks.")
    parser.add_argument("--list", action="store_true", help="Print checks without running them.")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON.")
    parser.add_argument(
        "--category",
        action="append",
        choices=CHECK_CATEGORIES,
        help="Run only one check category. Repeat to select multiple categories.",
    )
    args = parser.parse_args(argv)

    root = args.root.resolve()
    checks = filter_checks(build_checks(root, include_build=args.include_build), args.category)

    if args.list:
        return _print_check_list(checks, root, json_output=args.json)

    results = []
    for check in checks:
        result = run_check(check)
        results.append(serialize_result(check, result, root))
        if not args.json:
            _print_human_result(check, result, root)

    failures = [result for result in results if result["status"] == "fail"]
    if args.json:
        _print_json_summary(results, failures)
        return 1 if failures else 0

    if failures:
        print(f"workspace health failed: {len(failures)} of {len(checks)} checks failed")
        return 1

    print(f"workspace health passed: {len(checks)} checks")
    return 0


def _print_check_list(checks, root: Path, json_output: bool) -> int:
    if json_output:
        print(json.dumps({"checks": [serialize_check(check, root) for check in checks]}, ensure_ascii=False, indent=2))
        return 0
    for check in checks:
        print(f"[{check.category}] {check.name}: {format_command(check, root)}")
    return 0


def _print_human_result(check, result, root: Path) -> None:
    if result.returncode == 0:
        print(f"[ok] {check.category}: {check.name}")
        return
    print(f"[fail] {check.category}: {check.name}")
    print(f"command: {format_command(check, root)}")
    if result.stdout.strip():
        print("stdout:")
        print(result.stdout.rstrip())
    if result.stderr.strip():
        print("stderr:")
        print(result.stderr.rstrip())


def _print_json_summary(results: list[dict[str, object]], failures: list[dict[str, object]]) -> None:
    print(
        json.dumps(
            {
                "status": "failed" if failures else "passed",
                "total": len(results),
                "failed": len(failures),
                "categories": sorted({result["category"] for result in results}),
                "checks": results,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
