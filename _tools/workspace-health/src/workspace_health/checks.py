from __future__ import annotations

import sys
from pathlib import Path

from workspace_health.models import Check


def build_checks(root: Path, include_build: bool = False) -> list[Check]:
    py = sys.executable
    checks = [
        Check("docs audit", "governance", root, (py, "_tools/docs-audit/src/docs_audit.py", "--check")),
        Check("naming audit", "governance", root, (py, "_tools/naming-audit/src/naming_audit.py", "--check")),
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
                        "configs/research/deep-research-profile.json",
                        "configs/research/coding-research-profile.json",
                        "configs/workflows/work-mode-registry.json",
                        "configs/planning/deep-research-template.json",
                        "../_ops/installations/registry.json",
                        "../_ops/naming/naming-policy.json",
                        "../_tools/coding-project-bootstrap/configs/blueprints.json",
                        "../_tools/work-timer/configs/work-timing-policy.json",
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


def filter_checks(checks: list[Check], categories: list[str] | None) -> list[Check]:
    if not categories:
        return checks
    selected = set(categories)
    return [check for check in checks if check.category in selected]
