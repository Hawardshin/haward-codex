from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.planning.research_insight_planner import ResearchInsightPlanInput, create_research_insight_plan


class ResearchInsightPlannerTests(unittest.TestCase):
    def test_ready_when_search_insights_and_plan_exist(self) -> None:
        report = create_research_insight_plan(
            ResearchInsightPlanInput(
                objective="Plan a search-backed agent workflow.",
                search_questions=("What references support iterative retrieval?",),
                search_channels=("web search", "repository search"),
                sources_checked=("https://arxiv.org/abs/2212.10509", "_docs/research-capture-policy.ko.md"),
                insights=("Iterative retrieval is useful when each step changes what to search next.",),
                plan_steps=("Add a planning prompt and CLI readiness check.",),
                validation_steps=("Run tests and evaluate the result.",),
                knowledge_validation_status="ready_to_reference",
                risks_or_unknowns=("Search results can be stale.",),
                capture_targets=("_research/topics/agent-planning/",),
            )
        )

        self.assertEqual(report["status"], "ready_to_plan")
        self.assertFalse(report["requires_more_research"])
        self.assertEqual(report["gaps"], [])

    def test_missing_web_search_requires_more_research(self) -> None:
        report = create_research_insight_plan(
            ResearchInsightPlanInput(
                objective="Plan a research task.",
                search_questions=("What exists already?",),
                search_channels=("repository search", "documentation search"),
                sources_checked=("_docs/research-capture-policy.ko.md",),
                insights=("Internal policy exists.",),
                plan_steps=("Update the workflow.",),
                validation_steps=("Run checks.",),
                knowledge_validation_status="ready_to_reference",
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Web search channel is missing.", report["gaps"])

    def test_internal_knowledge_requires_skeptic_validation(self) -> None:
        report = create_research_insight_plan(
            ResearchInsightPlanInput(
                objective="Use prior notes to plan.",
                search_questions=("What did prior notes say?",),
                search_channels=("web search", "repository search"),
                sources_checked=("_research/topics/example/note.ko.md",),
                insights=("Prior note suggests a direction.",),
                plan_steps=("Draft a plan.",),
                validation_steps=("Run evaluator.",),
            )
        )

        self.assertTrue(report["requires_more_research"])
        self.assertIn(
            "Internal knowledge-base sources require knowledge_validation_status=ready_to_reference.",
            report["gaps"],
        )

    def test_root_repository_docs_are_internal_knowledge(self) -> None:
        report = create_research_insight_plan(
            ResearchInsightPlanInput(
                objective="Use repository instructions to plan.",
                search_questions=("What durable rules exist?",),
                search_channels=("web search", "repository search"),
                sources_checked=("AGENTS.md",),
                insights=("Repository instructions define durable rules.",),
                plan_steps=("Update matching docs.",),
                validation_steps=("Run evaluator.",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Internal knowledge-base sources require knowledge_validation_status=ready_to_reference.",
            report["gaps"],
        )


if __name__ == "__main__":
    unittest.main()
