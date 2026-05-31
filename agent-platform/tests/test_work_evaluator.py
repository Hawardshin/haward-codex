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
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
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
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
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
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
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
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
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
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-summary.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Work summary target is missing. Add a concise human-readable summary under _history/work-summaries/.",
            report["gaps"],
        )

    def test_installation_requires_record_targets(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Install a package.",
                result_summary="Installed dependency in the project.",
                changed_files=("agent-platform/pyproject.toml",),
                verification=("python3 -m unittest discover -s tests: OK",),
                references_checked=("Python Packaging User Guide",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-install.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
                installation_occurred=True,
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Installation occurred but installation_record_targets is missing. Add an audit record under _history/installations/ and index it in _ops/installations/registry.json.",
            report["gaps"],
        )

    def test_installation_ready_when_record_targets_present(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Install a package.",
                result_summary="Installed dependency in the project.",
                changed_files=("agent-platform/pyproject.toml",),
                verification=("python3 -m unittest discover -s tests: OK",),
                references_checked=("Python Packaging User Guide",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-install.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
                installation_occurred=True,
                installation_record_targets=("_history/installations/2026/2026-05-31-package.ko.md",),
            )
        )

        self.assertFalse(report["requires_rework"])

    def test_context_archiving_requires_record_targets(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Summarize long context.",
                result_summary="Created summary docs.",
                changed_files=("_docs/context-archive-policy.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("ReadAgent paper",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-context.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
                context_archiving_occurred=True,
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Context archiving occurred but context_archive_targets is missing. Add a resume packet under _history/context-archives/.",
            report["gaps"],
        )

    def test_context_archiving_ready_when_record_targets_present(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Summarize long context.",
                result_summary="Created summary docs.",
                changed_files=("_docs/context-archive-policy.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("ReadAgent paper",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-context.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
                context_archiving_occurred=True,
                context_archive_targets=("_history/context-archives/2026/2026-05-31-context.ko.md",),
            )
        )

        self.assertFalse(report["requires_rework"])

    def test_missing_web_search_record_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Make web search mandatory.",
                result_summary="Updated prompt docs.",
                changed_files=("_ops/prompts/README.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("OpenAI web search docs",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Web search record target is missing. Add a public search reasoning record under _history/web-searches/.",
            report["gaps"],
        )

    def test_missing_user_request_summary_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Save user request summaries.",
                result_summary="Added request summary docs.",
                changed_files=("_history/user-requests/README.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("Agent memory docs",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-requests.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "User request summary target is missing. Add a request summary under _history/user-requests/.",
            report["gaps"],
        )


if __name__ == "__main__":
    unittest.main()
