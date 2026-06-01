from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


CHECK_CATEGORIES = ("governance", "projects", "tools", "frontend")


@dataclass(frozen=True)
class Check:
    name: str
    category: str
    cwd: Path
    args: tuple[str, ...]
    env: dict[str, str] | None = None


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run workspace health checks.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[3])
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
        if args.json:
            print(json.dumps({"checks": [serialize_check(check, root) for check in checks]}, ensure_ascii=False, indent=2))
            return 0
        for check in checks:
            print(f"[{check.category}] {check.name}: {format_command(check, root)}")
        return 0

    results = []
    for check in checks:
        result = run_check(check)
        status = "ok" if result.returncode == 0 else "fail"
        results.append(serialize_result(check, result, root))
        if args.json:
            continue
        if result.returncode == 0:
            print(f"[ok] {check.category}: {check.name}")
            continue
        print(f"[fail] {check.category}: {check.name}")
        print(f"command: {format_command(check, root)}")
        if result.stdout.strip():
            print("stdout:")
            print(result.stdout.rstrip())
        if result.stderr.strip():
            print("stderr:")
            print(result.stderr.rstrip())

    failures = [result for result in results if result["status"] == "fail"]
    if args.json:
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
        return 1 if failures else 0

    if failures:
        print(f"workspace health failed: {len(failures)} of {len(checks)} checks failed")
        return 1

    print(f"workspace health passed: {len(checks)} checks")
    return 0


def build_checks(root: Path, include_build: bool = False) -> list[Check]:
    py = sys.executable
    checks = [
        Check("docs audit", "governance", root, (py, "_tools/docs-audit/src/docs_audit.py", "--check")),
        Check("structure audit", "governance", root, (py, "_tools/structure-audit/src/structure_audit.py", "--check")),
        Check("workspace index freshness", "governance", root, (py, "_tools/workspace-index/src/workspace_index.py", "--check")),
        Check("task board freshness", "governance", root, (py, "_tools/task-board/src/task_board.py", "--check")),
    ]

    agent_platform = root / "agent-platform"
    if agent_platform.exists():
        checks.extend(
            [
                Check(
                    "memory bootstrap contract",
                    "governance",
                    agent_platform,
                    (py, "-m", "agent_platform.cli", "check-memory-bootstrap", "configs/memory/bootstrap-manifest.json"),
                    {"PYTHONPATH": "src"},
                ),
                Check(
                    "core config contracts",
                    "governance",
                    agent_platform,
                    (
                        py,
                        "-m",
                        "agent_platform.cli",
                        "check-config-contract",
                        "configs/memory/bootstrap-manifest.json",
                        "configs/research/source-registry.json",
                        "configs/research/research-agent-profile.json",
                        "configs/research/coding-research-profile.json",
                        "configs/workflows/work-mode-registry.json",
                        "../_ops/installations/registry.json",
                    ),
                    {"PYTHONPATH": "src"},
                ),
                Check(
                    "agent-platform tests",
                    "projects",
                    agent_platform,
                    (py, "-m", "unittest", "discover", "-s", "tests"),
                    {"PYTHONPATH": "src"},
                ),
            ]
        )

    presentation_agent = root / "presentation-agent"
    if presentation_agent.exists():
        checks.append(
            Check(
                "presentation-agent tests",
                "projects",
                presentation_agent,
                (py, "-m", "unittest", "discover", "-s", "tests"),
                {"PYTHONPATH": "src"},
            )
        )

    for test_dir in discover_tool_test_dirs(root):
        checks.append(
            Check(
                f"tool tests: {test_dir.parent.name}",
                "tools",
                root,
                (py, "-m", "unittest", "discover", "-s", test_dir.relative_to(root).as_posix()),
            )
        )

    workspace_monitor = root / "workspace-monitor"
    if (workspace_monitor / "package.json").exists():
        checks.extend(
            [
                Check("workspace-monitor tests", "frontend", workspace_monitor, ("npm", "run", "test")),
                Check("workspace-monitor typecheck", "frontend", workspace_monitor, ("npm", "run", "check")),
            ]
        )
        if include_build:
            checks.append(Check("workspace-monitor build", "frontend", workspace_monitor, ("npm", "run", "build")))

    return checks


def discover_tool_test_dirs(root: Path) -> list[Path]:
    tools_root = root / "_tools"
    if not tools_root.exists():
        return []
    return sorted(path for path in tools_root.glob("*/tests") if path.is_dir())


def run_check(check: Check) -> subprocess.CompletedProcess[str]:
    env = os.environ.copy()
    if check.env:
        env.update(check.env)
    return subprocess.run(
        check.args,
        cwd=check.cwd,
        env=env,
        text=True,
        capture_output=True,
        check=False,
    )


def filter_checks(checks: list[Check], categories: list[str] | None) -> list[Check]:
    if not categories:
        return checks
    selected = set(categories)
    return [check for check in checks if check.category in selected]


def serialize_check(check: Check, root: Path) -> dict[str, str]:
    return {
        "name": check.name,
        "category": check.category,
        "cwd": relative_cwd(check.cwd, root),
        "command": " ".join(check.args),
    }


def serialize_result(check: Check, result: subprocess.CompletedProcess[str], root: Path) -> dict[str, object]:
    data: dict[str, object] = serialize_check(check, root)
    data.update(
        {
            "status": "ok" if result.returncode == 0 else "fail",
            "returncode": result.returncode,
        }
    )
    if result.returncode != 0:
        data["stdout"] = result.stdout
        data["stderr"] = result.stderr
    return data


def format_command(check: Check, root: Path | None = None) -> str:
    cwd = relative_cwd(check.cwd, root) if root else str(check.cwd)
    return f"(cd {cwd} && {' '.join(check.args)})"


def relative_cwd(cwd: Path, root: Path | None) -> str:
    if not root:
        return str(cwd)
    try:
        relative = cwd.relative_to(root)
    except ValueError:
        return str(cwd)
    return "." if not relative.parts else relative.as_posix()


if __name__ == "__main__":
    raise SystemExit(main())
