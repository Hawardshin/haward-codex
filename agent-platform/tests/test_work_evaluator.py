from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.work_evaluator import WorkEvaluationInput, evaluate_work


class WorkEvaluatorTests(unittest.TestCase):
    def test_ready_to_close_without_gaps(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Add an evaluator.",
                result_summary="Added evaluator code and docs.",
                changed_files=("agent-platform/src/agent_platform/evaluation/work_evaluator.py",),
                verification=("python3 -m unittest discover -s tests: OK",),
                references_checked=("_ops/workflows/40-evaluate-and-rework.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertEqual(report["status"], "ready_to_close")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_known_gap_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Add an evaluator.",
                result_summary="Added docs only.",
                changed_files=("AGENTS.md",),
                verification=("not run",),
                references_checked=("_ops/prompts/70-evaluate-work.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
                known_gaps=("No Python evaluator agent was added.",),
            )
        )

        self.assertEqual(report["status"], "rework_required")
        self.assertTrue(report["requires_rework"])
        self.assertIn("No Python evaluator agent was added.", report["gaps"])

    def test_missing_verification_becomes_improvement(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Add an evaluator.",
                result_summary="Added evaluator.",
                changed_files=("agent-platform/src/agent_platform/evaluation/work_evaluator.py",),
                references_checked=("agent-platform/docs/work-evaluator-agent.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertFalse(report["requires_rework"])
        self.assertIn("Add or run a verification step before close-out.", report["improvements"])

    def test_missing_reference_research_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Add an evaluator.",
                result_summary="Added evaluator.",
                changed_files=("agent-platform/src/agent_platform/evaluation/work_evaluator.py",),
                verification=("python3 -m unittest discover -s tests: OK",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Reference research is missing. Check prior internal work or strong external references before evaluation.",
            report["gaps"],
        )

    def test_missing_work_summary_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Make work easy to understand later.",
                result_summary="Added documentation.",
                changed_files=("_history/README.md",),
                verification=("manual doc review: OK",),
                references_checked=("Keep a Changelog",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Work summary target is missing. Add a concise human-readable summary under _history/work-summaries/.",
            report["gaps"],
        )


if __name__ == "__main__":
    unittest.main()
