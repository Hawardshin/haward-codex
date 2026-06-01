from __future__ import annotations

import os
import subprocess
from pathlib import Path

from workspace_health.models import Check


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
