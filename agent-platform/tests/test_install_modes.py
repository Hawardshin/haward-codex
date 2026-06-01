from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.install_modes import check_install_mode_registry, list_install_modes, show_install_mode


def registry() -> dict[str, object]:
    return {
        "schema_version": "2026-06-02",
        "name": "install-mode-registry",
        "purpose": "Split user and developer installs.",
        "reader_guide": {
            "summary": "Choose an install mode.",
            "how_to_read": ["Read modes."],
            "owner": "agent-platform",
            "last_reviewed": "2026-06-02",
            "update_triggers": ["Install mode changes."],
        },
        "reference_links": [
            {
                "id": "pip",
                "title": "pip local installs",
                "url": "https://pip.pypa.io/en/stable/topics/local-project-installs/",
                "source_type": "official_docs",
                "used_for": ["regular and editable installs"],
                "last_checked": "2026-06-02",
            }
        ],
        "structure_rules": [
            {
                "id": "split_modes",
                "rule": "Keep modes separate.",
                "reason": "Different audiences need different setup.",
                "applies_to": ["modes"],
            }
        ],
        "field_guide": [
            {
                "field": "modes",
                "meaning": "Install mode list.",
                "required": True,
            }
        ],
        "mode_boundary": {
            "install_mode": "Environment setup.",
            "work_mode": "Task close-out strictness.",
            "rule": "Do not confuse them.",
        },
        "default_mode": "user",
        "modes": [
            mode("user", "python -m pip install ."),
            mode("developer", "python -m pip install -e ."),
        ],
        "selection_rules": ["Pick user unless improving the platform."],
    }


def mode(mode_id: str, command: str) -> dict[str, object]:
    return {
        "id": mode_id,
        "label": mode_id.title(),
        "intent": f"{mode_id} setup.",
        "audience": (mode_id,),
        "dependency_policy": ("Policy.",),
        "allowed_actions": ("Action.",),
        "must_not": ("Do not misuse.",),
        "commands": [
            {
                "id": f"{mode_id}-install",
                "project": "agent-platform",
                "purpose": "Install platform.",
                "command": command,
            }
        ],
        "verification": ("Run a smoke check.",),
    }


class InstallModeTests(unittest.TestCase):
    def test_registry_ready_when_user_and_developer_modes_exist(self) -> None:
        report = check_install_mode_registry(registry())

        self.assertEqual(report["status"], "ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_missing_developer_mode_requires_rework(self) -> None:
        data = registry()
        data["modes"] = [mode("user", "python -m pip install .")]

        report = check_install_mode_registry(data)

        self.assertEqual(report["status"], "rework_required")
        self.assertIn("A developer install mode is required.", report["gaps"])

    def test_list_modes_is_compact(self) -> None:
        modes = list_install_modes(registry())

        self.assertEqual([item["id"] for item in modes], ["user", "developer"])
        self.assertIn("intent", modes[0])

    def test_show_mode_by_id(self) -> None:
        developer = show_install_mode(registry(), "developer")

        self.assertEqual(developer["id"], "developer")
        self.assertIn("-e", developer["commands"][0]["command"])


if __name__ == "__main__":
    unittest.main()
