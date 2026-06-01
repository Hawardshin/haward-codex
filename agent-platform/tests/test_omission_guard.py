from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.omission_guard import OmissionGuardInput, check_omissions


REPO_ROOT = Path(__file__).resolve().parents[1]


def ready_input() -> OmissionGuardInput:
    return OmissionGuardInput.from_dict(
        {
            "task": "Add an omission guard.",
            "work_mode": "governance",
            "expected_items": [
                {
                    "item_id": "user-instruction",
                    "description": "Capture the user's concern that work can omit required items.",
                    "source": "UR-2026-06-02-011",
                    "required": True,
                    "status": "covered",
                    "evidence": ["_requirements/baselines/2026-05-31-workspace-platform.ko.md"],
                }
            ],
            "artifact_checks": [
                {
                    "path": "agent-platform/README.md",
                    "purpose": "Existing platform README proves artifact path checks use the repository root.",
                    "required": True,
                }
            ],
            "acceptance_checks": [
                {
                    "check_id": "unit-tests",
                    "description": "Omission guard unit tests pass.",
                    "required": True,
                    "status": "passed",
                    "evidence": ["python3 -m unittest discover -s tests: OK"],
                }
            ],
        }
    )


class OmissionGuardTests(unittest.TestCase):
    def test_ready_when_required_items_have_evidence(self) -> None:
        report = check_omissions(ready_input(), REPO_ROOT.parent)

        self.assertEqual(report["status"], "coverage_ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_missing_required_item_requires_rework(self) -> None:
        guard_input = OmissionGuardInput.from_dict(
            {
                "task": "Add a feature.",
                "expected_items": [
                    {
                        "item_id": "must-have",
                        "description": "Required behavior.",
                        "source": "test",
                        "required": True,
                        "status": "missing",
                    }
                ],
            }
        )
        report = check_omissions(guard_input, REPO_ROOT.parent)

        self.assertTrue(report["requires_rework"])
        self.assertIn("Required expected item must-have is missing.", report["gaps"])

    def test_required_covered_item_without_evidence_requires_rework(self) -> None:
        guard_input = OmissionGuardInput.from_dict(
            {
                "task": "Add a feature.",
                "expected_items": [
                    {
                        "item_id": "covered-without-proof",
                        "description": "Required behavior.",
                        "source": "test",
                        "required": True,
                        "status": "covered",
                    }
                ],
            }
        )
        report = check_omissions(guard_input, REPO_ROOT.parent)

        self.assertTrue(report["requires_rework"])
        self.assertIn("Required expected item covered-without-proof is covered but has no evidence.", report["gaps"])

    def test_required_artifact_missing_requires_rework(self) -> None:
        guard_input = OmissionGuardInput.from_dict(
            {
                "task": "Add a feature.",
                "expected_items": [
                    {
                        "item_id": "artifact-needed",
                        "description": "Required artifact exists.",
                        "source": "test",
                        "required": True,
                        "status": "covered",
                        "evidence": ["artifact check"],
                    }
                ],
                "artifact_checks": [
                    {
                        "path": "does-not-exist.txt",
                        "purpose": "This path should be caught.",
                        "required": True,
                    }
                ],
            }
        )
        report = check_omissions(guard_input, REPO_ROOT.parent)

        self.assertTrue(report["requires_rework"])
        self.assertIn("Required artifact does-not-exist.txt is missing.", report["gaps"])

    def test_required_acceptance_not_run_requires_rework(self) -> None:
        guard_input = OmissionGuardInput.from_dict(
            {
                "task": "Add a feature.",
                "expected_items": [
                    {
                        "item_id": "verification-needed",
                        "description": "Verification was planned.",
                        "source": "test",
                        "required": True,
                        "status": "covered",
                        "evidence": ["acceptance check"],
                    }
                ],
                "acceptance_checks": [
                    {
                        "check_id": "tests",
                        "description": "Run tests.",
                        "required": True,
                        "status": "not_run",
                    }
                ],
            }
        )
        report = check_omissions(guard_input, REPO_ROOT.parent)

        self.assertTrue(report["requires_rework"])
        self.assertIn("Required acceptance check tests status is not_run.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
