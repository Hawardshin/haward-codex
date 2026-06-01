from __future__ import annotations

import argparse
import os
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Check:
    name: str
    cwd: Path
    args: tuple[str, ...]
    env: dict[str, str] | None = None


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run workspace health checks.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[3])
    parser.add_argument("--include-build", action="store_true", help="Include slower build checks.")
    parser.add_argument("--list", action="store_true", help="Print checks without running them.")
    args = parser.parse_args(argv)

    root = args.root.resolve()
    checks = build_checks(root, include_build=args.include_build)

    if args.list:
        for check in checks:
            print(f"{check.name}: {format_command(check)}")
        return 0

    failures = []
    for check in checks:
        result = run_check(check)
        if result.returncode == 0:
            print(f"[ok] {check.name}")
            continue
        failures.append((check, result))
        print(f"[fail] {check.name}")
        print(f"command: {format_command(check)}")
        if result.stdout.strip():
            print("stdout:")
            print(result.stdout.rstrip())
        if result.stderr.strip():
            print("stderr:")
            print(result.stderr.rstrip())

    if failures:
        print(f"workspace health failed: {len(failures)} of {len(checks)} checks failed")
        return 1

    print(f"workspace health passed: {len(checks)} checks")
    return 0


def build_checks(root: Path, include_build: bool = False) -> list[Check]:
    py = sys.executable
    checks = [
        Check("docs audit", root, (py, "_tools/docs-audit/src/docs_audit.py", "--check")),
        Check("structure audit", root, (py, "_tools/structure-audit/src/structure_audit.py", "--check")),
        Check("workspace index freshness", root, (py, "_tools/workspace-index/src/workspace_index.py", "--check")),
        Check("task board freshness", root, (py, "_tools/task-board/src/task_board.py", "--check")),
    ]

    agent_platform = root / "agent-platform"
    if agent_platform.exists():
        checks.extend(
            [
                Check(
                    "memory bootstrap contract",
                    agent_platform,
                    (py, "-m", "agent_platform.cli", "check-memory-bootstrap", "configs/memory/bootstrap-manifest.json"),
                    {"PYTHONPATH": "src"},
                ),
                Check(
                    "core config contracts",
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
                presentation_agent,
                (py, "-m", "unittest", "discover", "-s", "tests"),
                {"PYTHONPATH": "src"},
            )
        )

    for test_dir in discover_tool_test_dirs(root):
        checks.append(
            Check(
                f"tool tests: {test_dir.parent.name}",
                root,
                (py, "-m", "unittest", "discover", "-s", test_dir.relative_to(root).as_posix()),
            )
        )

    workspace_monitor = root / "workspace-monitor"
    if (workspace_monitor / "package.json").exists():
        checks.extend(
            [
                Check("workspace-monitor tests", workspace_monitor, ("npm", "run", "test")),
                Check("workspace-monitor typecheck", workspace_monitor, ("npm", "run", "check")),
            ]
        )
        if include_build:
            checks.append(Check("workspace-monitor build", workspace_monitor, ("npm", "run", "build")))

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


def format_command(check: Check) -> str:
    return f"(cd {check.cwd} && {' '.join(check.args)})"


if __name__ == "__main__":
    raise SystemExit(main())
