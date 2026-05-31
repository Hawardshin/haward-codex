from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.planning.coding_research import CodingResearchInput, complete_coding_research


def complete_answers() -> dict[str, str]:
    return {
        "what_was_verified": "Verified official docs, repository conventions, and prior policy.",
        "best_option": "Add a deterministic Python readiness checker.",
        "why_this_option": "It matches the existing platform helper pattern.",
        "alternatives_rejected": "A prompt-only checklist was rejected because it cannot be tested.",
        "implementation_impact": "Add planning module, CLI command, config, docs, and tests.",
        "risks_and_unknowns": "The checklist may need project-specific extensions later.",
        "validation_plan": "Run unit tests and CLI readiness checks.",
        "reusable_knowledge": "Capture the workflow in _ops and _templates.",
        "next_action": "Implement and verify the checker.",
    }


class CodingResearchTests(unittest.TestCase):
    def test_ready_when_research_is_complete(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research the best way to add a coding research agent.",
                coding_context="agent-platform planning helpers and operations prompts.",
                research_types=("architecture", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://www.thoughtworks.com/en-us/radar/faq", "_docs/search-insight-planning-policy.ko.md"),
                findings=("Technology evaluation should include staged adoption and trade-off framing.",),
                options=("Prompt-only checklist", "Python readiness checker"),
                recommendation="Use a Python readiness checker plus reusable prompts.",
                post_research_answers=complete_answers(),
                validation_steps=("Run unit tests.", "Run complete-coding-research CLI."),
                risks_or_unknowns=("Future research types may need more fields.",),
                capture_targets=("_research/topics/agent-planning/",),
                plan_history_targets=("_history/plans/2026/2026-05-31-coding-research-agent.ko.md",),
                knowledge_validation_status="ready_to_reference",
            )
        )

        self.assertEqual(report["status"], "ready_to_implement")
        self.assertFalse(report["requires_more_research"])
        self.assertEqual(report["gaps"], [])

    def test_missing_web_search_requires_more_research(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a code change.",
                coding_context="Local project.",
                research_types=("bug_root_cause",),
                search_channels=("repository search", "code search"),
                sources_checked=("src/example.py",),
                findings=("A local function is involved.",),
                options=("Fix local function",),
                recommendation="Fix the local function.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("No external examples checked.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Web search channel is missing.", report["gaps"])

    def test_missing_post_research_question_requires_more_research(self) -> None:
        answers = complete_answers()
        answers.pop("alternatives_rejected")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a library migration.",
                coding_context="A Python package.",
                research_types=("migration",),
                search_channels=("web search", "package registry search"),
                sources_checked=("https://docs.example.com/migration",),
                findings=("Migration guide exists.",),
                options=("Migrate now", "Defer migration"),
                recommendation="Migrate now.",
                post_research_answers=answers,
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Docs may be incomplete.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertTrue(report["requires_more_research"])
        self.assertIn("alternatives_rejected", report["missing_post_research_questions"])

    def test_internal_knowledge_requires_skeptic_validation(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Use prior repository notes.",
                coding_context="Agent platform docs.",
                research_types=("implementation_pattern",),
                search_channels=("web search", "repository search"),
                sources_checked=("_research/topics/agent-planning/example.ko.md",),
                findings=("Prior notes describe the platform pattern.",),
                options=("Reuse existing pattern",),
                recommendation="Reuse existing pattern.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Prior notes may be stale.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Internal knowledge-base sources require knowledge_validation_status=ready_to_reference.",
            report["gaps"],
        )

    def test_unknown_research_type_is_a_gap(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research something.",
                coding_context="A project.",
                research_types=("unknown",),
                search_channels=("web search", "repository search"),
                sources_checked=("https://github.com/example/project",),
                findings=("A finding.",),
                options=("An option.",),
                recommendation="A recommendation.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Unknown risk.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertIn("Unknown research types: unknown.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
