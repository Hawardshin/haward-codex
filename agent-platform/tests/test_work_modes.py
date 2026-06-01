from __future__ import annotations

import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.work_modes import check_work_mode_registry, list_work_modes, show_work_mode


REGISTRY_PATH = Path(__file__).resolve().parents[1] / "configs/workflows/work-mode-registry.json"


class WorkModeRegistryTests(unittest.TestCase):
    def load_registry(self) -> dict:
        return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    def test_work_mode_registry_is_ready(self) -> None:
        report = check_work_mode_registry(self.load_registry())

        self.assertEqual(report["status"], "ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_registry_blocks_missing_mode_selection_policy(self) -> None:
        registry = self.load_registry()
        registry["evaluator_policy"]["governance"]["blocking_target_fields"].remove("mode_selection_record_targets")

        report = check_work_mode_registry(registry)

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "evaluator_policy.governance.blocking_target_fields does not match work_evaluator.MODE_REQUIRED_TARGETS.",
            report["gaps"],
        )
        self.assertIn("evaluator_policy.governance must block on mode_selection_record_targets.", report["gaps"])

    def test_registry_blocks_missing_omission_policy(self) -> None:
        registry = self.load_registry()
        registry["evaluator_policy"]["governance"]["blocking_target_fields"].remove("omission_check_targets")

        report = check_work_mode_registry(registry)

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "evaluator_policy.governance.blocking_target_fields does not match work_evaluator.MODE_REQUIRED_TARGETS.",
            report["gaps"],
        )
        self.assertIn("evaluator_policy.governance must block on omission_check_targets.", report["gaps"])

    def test_list_and_show_work_modes(self) -> None:
        registry = self.load_registry()

        modes = list_work_modes(registry)
        governance = show_work_mode(registry, "governance")

        self.assertIn("governance", {mode["id"] for mode in modes})
        self.assertEqual(governance["enforcement_level"], "blocking")
        self.assertTrue(governance["selection_record_required"])


if __name__ == "__main__":
    unittest.main()
