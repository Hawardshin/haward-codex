from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.work_evaluator import WorkEvaluationInput, evaluate_work


def complete_evidence_targets() -> dict[str, tuple[str, ...]]:
    return {
        "source_provenance_targets": (
            "_history/web-searches/2026/2026-05-31-evaluator.ko.md",
            "_history/plans/2026/2026-05-31-evaluator.ko.md",
        ),
        "plan_evidence_targets": (
            "_history/plans/2026/2026-05-31-evaluator.ko.md",
        ),
    }


class WorkEvaluatorTests(unittest.TestCase):
    def test_ready_to_close_without_gaps(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Add an evaluator.",
                result_summary="Added evaluator code and docs.",
                changed_files=("agent-platform/src/agent_platform/evaluation/work_evaluator.py",),
                verification=("python3 -m unittest discover -s tests: OK",),
                references_checked=("_ops/workflows/40-evaluate-and-rework.md",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Reference research is missing. Check prior internal work or strong external references before evaluation.",
            report["gaps"],
        )

    def test_missing_source_provenance_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Add an evaluator.",
                result_summary="Added evaluator.",
                changed_files=("agent-platform/src/agent_platform/evaluation/work_evaluator.py",),
                verification=("python3 -m unittest discover -s tests: OK",),
                references_checked=("_ops/workflows/40-evaluate-and-rework.md",),
                plan_evidence_targets=("_history/plans/2026/2026-05-31-evaluator.ko.md",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Source provenance target is missing. Record where material values, source data, assumptions, claims, or configuration inputs came from.",
            report["gaps"],
        )

    def test_missing_plan_evidence_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Add an evaluator.",
                result_summary="Added evaluator.",
                changed_files=("agent-platform/src/agent_platform/evaluation/work_evaluator.py",),
                verification=("python3 -m unittest discover -s tests: OK",),
                references_checked=("_ops/workflows/40-evaluate-and-rework.md",),
                source_provenance_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-evaluator.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Plan evidence target is missing. Record the checked evidence that supports the executed plan.",
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
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-summary.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-install.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-install.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                changed_files=("_docs/policies/context-archive-policy.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("ReadAgent paper",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-context.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                changed_files=("_docs/policies/context-archive-policy.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("ReadAgent paper",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-context.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                **complete_evidence_targets(),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
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
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-requests.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "User request summary target is missing. Add a request summary under _history/user-requests/.",
            report["gaps"],
        )

    def test_missing_request_trace_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Keep request and outcome documentation linked.",
                result_summary="Added request summary and work summary.",
                changed_files=("_history/user-requests/2026/2026-05-31.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("Requirements traceability references",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-trace.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Request trace target is missing. Add a request-to-outcome trace under _history/request-traces/.",
            report["gaps"],
        )

    def test_missing_requirements_target_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Manage requirements iteratively.",
                result_summary="Added docs without updating requirements.",
                changed_files=("_docs/policies/requirements-management-policy.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("Requirements management references",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-requirements.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-spec-driven-operating-loop/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Requirements target is missing. Add or update requirements under _requirements/ or the owning project's docs/requirements/.",
            report["gaps"],
        )

    def test_missing_spec_target_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Use a spec-driven structure.",
                result_summary="Added docs without updating specs.",
                changed_files=("_docs/policies/spec-driven-development-policy.ko.md",),
                verification=("manual doc review: OK",),
                references_checked=("GitHub Spec Kit",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-spec-driven-development.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Spec target is missing. Add or update spec-driven artifacts under _specs/ or the owning project's specs/.",
            report["gaps"],
        )

    def test_skill_work_requires_skill_targets(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Create a reusable skill.",
                result_summary="Created a skill without validation targets.",
                changed_files=("_skills/example-skill/SKILL.md",),
                verification=("manual review",),
                references_checked=("skill-creator guidance",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-skill.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-skill-lifecycle-governance/spec.ko.md",),
                skill_work_occurred=True,
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Skill work occurred but skill_targets is missing. Add the created or updated skill source path.",
            report["gaps"],
        )
        self.assertIn(
            "Skill work occurred but skill_validation_targets is missing. Add a validate-skill input, report, or evaluation target.",
            report["gaps"],
        )

    def test_quick_mode_relaxes_governance_targets(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Fix a typo.",
                result_summary="Fixed one typo.",
                work_mode="quick",
                changed_files=("_docs/example.ko.md",),
                verification=("manual review: OK",),
            )
        )

        self.assertEqual(report["status"], "ready_to_close")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["work_mode"], "quick")
        self.assertEqual(report["gaps"], [])
        self.assertIn(
            "requirements_targets omitted under quick mode; add or defer it if the work becomes durable.",
            report["improvements"],
        )

    def test_ship_first_requires_deferred_improvement_targets_when_improvements_exist(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Patch the broken dashboard first.",
                result_summary="Patched the dashboard rendering error.",
                work_mode="ship_first",
                changed_files=("_ops/artifacts/ops-dashboard.html",),
                verification=("browser smoke test: OK",),
                references_checked=("GitHub Flow",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-dashboard.ko.md",),
                improvement_ideas=("Backfill the durable spec after the emergency fix.",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Ship-first mode has improvement ideas but deferred_improvement_targets is missing.",
            report["gaps"],
        )

    def test_ship_first_ready_when_deferred_improvement_targets_present(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Patch the broken dashboard first.",
                result_summary="Patched the dashboard rendering error.",
                work_mode="ship_first",
                changed_files=("_ops/artifacts/ops-dashboard.html",),
                verification=("browser smoke test: OK",),
                references_checked=("GitHub Flow",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-dashboard.ko.md",),
                deferred_improvement_targets=("_ops/backlog/deferred-improvements.ko.md",),
                improvement_ideas=("Backfill the durable spec after the emergency fix.",),
            )
        )

        self.assertFalse(report["requires_rework"])

    def test_research_mode_requires_provenance_and_plan_evidence(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Research better work modes.",
                result_summary="Captured source notes.",
                work_mode="research",
                changed_files=("_research/topics/agent-operations/work-modes.ko.md",),
                verification=("manual source review: OK",),
                references_checked=("Google Engineering Practices",),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-work-modes.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Source provenance target is missing. Record where material values, source data, assumptions, claims, or configuration inputs came from.",
            report["gaps"],
        )
        self.assertIn(
            "Plan evidence target is missing. Record the checked evidence that supports the executed plan.",
            report["gaps"],
        )
        self.assertNotIn(
            "Requirements target is missing. Add or update requirements under _requirements/ or the owning project's docs/requirements/.",
            report["gaps"],
        )

    def test_unknown_work_mode_requires_rework(self) -> None:
        report = evaluate_work(
            WorkEvaluationInput(
                initial_instruction="Use a strange mode.",
                result_summary="Mode was rejected.",
                work_mode="experimental",
                changed_files=("_ops/workflows/00-start-here.md",),
                verification=("manual review: OK",),
                references_checked=("_ops/workflows/00-start-here.md",),
                **complete_evidence_targets(),
                web_search_record_targets=("_history/web-searches/2026/2026-05-31-mode.ko.md",),
                user_request_summary_targets=("_history/user-requests/2026/2026-05-31.ko.md",),
                requirements_targets=("_requirements/baselines/2026-05-31-workspace-platform.ko.md",),
                spec_targets=("_specs/workspace-platform/2026-05-31-work-mode-routing/spec.ko.md",),
                request_trace_targets=("_history/request-traces/2026/2026-05-31.ko.md",),
                work_summary_targets=("_history/work-summaries/2026/2026-05-31.ko.md",),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "Unknown work_mode 'experimental'. Use one of: governance, quick, research, ship_first, standard.",
            report["gaps"],
        )


if __name__ == "__main__":
    unittest.main()
