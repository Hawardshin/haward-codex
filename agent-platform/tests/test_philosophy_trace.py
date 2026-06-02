from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.governance.philosophy_trace import check_philosophy_traceability


REGISTRY_PATH = Path(__file__).resolve().parents[1] / "configs/governance/philosophy-traceability.json"
REPO_ROOT = Path(__file__).resolve().parents[2]


class PhilosophyTraceTests(unittest.TestCase):
    def load_registry(self) -> dict:
        return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    def test_philosophy_traceability_registry_is_ready(self) -> None:
        report = check_philosophy_traceability(self.load_registry(), REPO_ROOT)

        self.assertEqual(report["status"], "ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_missing_required_principle_is_blocking(self) -> None:
        registry = self.load_registry()
        registry["principles"] = registry["principles"][1:]

        report = check_philosophy_traceability(registry, REPO_ROOT)

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("Missing required philosophy principle mappings" in gap for gap in report["gaps"]))

    def test_missing_execution_target_path_is_blocking(self) -> None:
        registry = self.load_registry()
        registry["principles"][0]["execution_targets"][0]["path"] = "missing/path.md"

        report = check_philosophy_traceability(registry, REPO_ROOT)

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("does not exist" in gap for gap in report["gaps"]))

    def test_minimal_valid_registry(self) -> None:
        with tempfile.TemporaryDirectory() as tmp_dir:
            root = Path(tmp_dir)
            (root / "philosophy.md").write_text("# Principle\n", encoding="utf-8")
            (root / "workflow.md").write_text("# Workflow\n", encoding="utf-8")
            registry = {
                "required_principle_ids": ["p1"],
                "principles": [
                    {
                        "id": "p1",
                        "title": "Principle",
                        "philosophy_sources": [{"path": "philosophy.md", "section": "Principle"}],
                        "execution_targets": [{"path": "workflow.md", "target_type": "workflow", "role": "Executes the principle"}],
                        "validation_targets": [{"command": "echo ok", "validates": "Smoke check"}],
                    }
                ],
            }

            report = check_philosophy_traceability(registry, root)

            self.assertEqual(report["status"], "ready")


if __name__ == "__main__":
    unittest.main()
