from __future__ import annotations

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
