from __future__ import annotations

import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.view_modes import check_view_mode_registry, list_view_modes, show_view_mode


REGISTRY_PATH = Path(__file__).resolve().parents[1] / "configs/access/view-mode-registry.json"


class ViewModeRegistryTests(unittest.TestCase):
    def load_registry(self) -> dict:
        return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    def test_view_mode_registry_is_ready(self) -> None:
        report = check_view_mode_registry(self.load_registry())

        self.assertEqual(report["status"], "ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])
        self.assertEqual(report["checks"]["default_mode"], "user")

    def test_requires_all_three_mode_ids(self) -> None:
        registry = self.load_registry()
        registry["modes"] = [mode for mode in registry["modes"] if mode["id"] != "superadmin_developer"]

        report = check_view_mode_registry(registry)

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("View mode ids must be exactly" in gap for gap in report["gaps"]))

    def test_superadmin_mode_requires_all_monitor_sections(self) -> None:
        registry = self.load_registry()
        superadmin = next(mode for mode in registry["modes"] if mode["id"] == "superadmin_developer")
        superadmin["allowed_sections"] = ["overview", "projects", "history", "documents"]

        report = check_view_mode_registry(registry)

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "mode superadmin_developer: superadmin developer view must include sections: agents, requirements, structure.",
            report["gaps"],
        )

    def test_list_and_show_view_modes(self) -> None:
        registry = self.load_registry()

        modes = list_view_modes(registry)
        superadmin = show_view_mode(registry, "superadmin_developer")

        self.assertEqual([mode["id"] for mode in modes], ["user", "developer", "superadmin_developer"])
        self.assertEqual(superadmin["label"], "Super Admin Dev")


if __name__ == "__main__":
    unittest.main()
