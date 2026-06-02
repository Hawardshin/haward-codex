from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.governance.philosophy_features import check_philosophy_feature_registry


REGISTRY_PATH = Path(__file__).resolve().parents[1] / "configs/orchestration/philosophy-feature-extraction-registry.json"
REPO_ROOT = Path(__file__).resolve().parents[2]


class PhilosophyFeatureRegistryTests(unittest.TestCase):
    def load_registry(self) -> dict:
        return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))

    def test_philosophy_feature_registry_is_ready(self) -> None:
        report = check_philosophy_feature_registry(self.load_registry(), REPO_ROOT)

        self.assertEqual(report["status"], "ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_required_principle_not_in_flow_is_blocking(self) -> None:
        registry = self.load_registry()
        registry["principle_feature_flows"][0]["principle_ids"] = registry["principle_feature_flows"][0]["principle_ids"][1:]

        report = check_philosophy_feature_registry(registry, REPO_ROOT)

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("missing from principle_feature_flows" in gap for gap in report["gaps"]))

    def test_missing_required_stage_is_blocking(self) -> None:
        registry = self.load_registry()
        registry["feature_intake_stages"] = [
            stage for stage in registry["feature_intake_stages"] if stage["id"] != "human_process_model"
        ]

        report = check_philosophy_feature_registry(registry, REPO_ROOT)

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("human_process_model" in gap for gap in report["gaps"]))

    def test_implemented_candidate_target_must_exist(self) -> None:
        registry = self.load_registry()
        registry["seed_feature_candidates"][0]["target_paths"].append("missing/implemented-target.md")

        report = check_philosophy_feature_registry(registry, REPO_ROOT)

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("path does not exist" in gap for gap in report["gaps"]))

    def test_minimal_valid_registry(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            (root / "target.md").write_text("target", encoding="utf-8")
            registry = {
                "required_principle_ids": ["p1"],
                "feature_intake_stages": [
                    {"id": stage_id, "label": stage_id, "input": "in", "output": "out", "checks": ["ok"]}
                    for stage_id in [
                        "philosophy_intake",
                        "principle_clustering",
                        "human_process_model",
                        "feature_candidate_generation",
                        "idea_evaluation",
                        "asset_selection",
                        "implementation_trace",
                        "validation_and_rework",
                        "data_accumulation",
                    ]
                ],
                "principle_feature_flows": [
                    {
                        "id": "flow",
                        "label": "Flow",
                        "principle_ids": ["p1"],
                        "feature_question": "What should change?",
                        "candidate_rules": ["Use the smallest asset."],
                        "output_targets": ["target.md"],
                    }
                ],
                "feature_candidate_contract": {
                    "required_fields": [
                        "source_principle_ids",
                        "human_process_step",
                        "feature_hypothesis",
                        "smallest_asset_type",
                        "evidence_inputs",
                        "risk_tier",
                        "validation_targets",
                        "rollback_plan",
                    ],
                    "allowed_asset_types": ["prompt"],
                },
                "quality_gates": [{"id": "gate", "rule": "Rule", "failure_action": "Stop"}],
                "seed_feature_candidates": [
                    {
                        "id": "candidate",
                        "label": "Candidate",
                        "source_principle_ids": ["p1"],
                        "human_process_step": "Human step",
                        "feature_hypothesis": "Hypothesis",
                        "smallest_asset_type": "prompt",
                        "status": "implemented",
                        "risk_tier": "low",
                        "evidence_inputs": ["source"],
                        "target_paths": ["target.md"],
                        "validation_targets": [{"command": "echo ok", "validates": "Smoke"}],
                        "rollback_plan": "Remove prompt.",
                    }
                ],
            }

            report = check_philosophy_feature_registry(registry, root)

        self.assertEqual(report["status"], "ready")


if __name__ == "__main__":
    unittest.main()
