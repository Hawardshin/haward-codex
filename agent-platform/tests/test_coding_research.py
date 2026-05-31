from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.planning.coding_research import CodingResearchInput, complete_coding_research


def complete_code_references() -> dict[str, tuple[str, ...]]:
    return {
        "code_reference_sources": (
            "https://github.com/example/project/tree/main/src",
            "https://github.com/example/project/tree/main/tests",
        ),
        "code_reference_notes": (
            "Inspected source layout, module boundaries, tests, and error handling patterns.",
        ),
        "source_value_provenance": (
            "Technology evaluation pattern <- Thoughtworks Radar FAQ and repository docs checked on 2026-05-31.",
        ),
        "plan_evidence": (
            "Python readiness checker recommendation <- existing CLI pattern, tests, and source registry requirements.",
        ),
        "architecture_reference_sources": (
            "https://learn.microsoft.com/azure/architecture/",
            "https://github.com/example/project/blob/main/docs/architecture.md",
        ),
        "architecture_options": (
            "Modular monolith with explicit package boundaries.",
            "Distributed services split by capability.",
        ),
        "architecture_decision_notes": (
            "Selected modular monolith for the current scope; rejected distributed services because coordination cost exceeds the benefit.",
        ),
    }


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
                source_types=("official", "reference_implementation", "tech_blog", "internal"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
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
                source_types=("official", "reference_implementation", "tech_blog", "internal"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
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
                source_types=("official", "reference_implementation", "tech_blog", "internal"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
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

    def test_source_diversity_is_required(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research an API choice.",
                coding_context="A service integration.",
                research_types=("api_docs",),
                search_channels=("web search", "official documentation search"),
                sources_checked=("https://docs.example.com/api",),
                source_types=("official",),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
                findings=("Official docs describe the API.",),
                options=("Use API", "Do not use API"),
                recommendation="Use API.",
                post_research_answers=complete_answers(),
                validation_steps=("Run integration tests.",),
                risks_or_unknowns=("Community examples were not checked.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Use at least 3 distinct non-other source types for coding research.", report["gaps"])

    def test_reference_config_path_is_required(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research an API choice.",
                coding_context="A service integration.",
                research_types=("api_docs",),
                search_channels=("web search", "official documentation search"),
                sources_checked=("https://docs.example.com/api",),
                source_types=("official", "reference_implementation", "open_source", "tech_blog"),
                **complete_code_references(),
                findings=("Official docs describe the API.",),
                options=("Use API", "Do not use API"),
                recommendation="Use API.",
                post_research_answers=complete_answers(),
                validation_steps=("Run integration tests.",),
                risks_or_unknowns=("The profile config was not recorded.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Reference config paths are missing; point to the source registry or research profile used for this investigation.",
            report["gaps"],
        )

    def test_code_references_are_required(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research an implementation pattern.",
                coding_context="A Python service.",
                research_types=("implementation_pattern",),
                search_channels=("web search", "repository search"),
                sources_checked=("https://github.com/example/project", "https://docs.example.com/api"),
                source_types=("official", "reference_implementation", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                findings=("A maintained project has a useful service layout.",),
                options=("Reuse similar module boundaries", "Use a custom layout"),
                recommendation="Reuse similar module boundaries.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("The reference implementation may not match every local constraint.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Code reference sources are missing; inspect relevant open-source repositories, reference implementations, or well-structured code before implementation.",
            report["gaps"],
        )

    def test_source_value_provenance_is_required(self) -> None:
        references = complete_code_references()
        references.pop("source_value_provenance")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research an API choice.",
                coding_context="A service integration.",
                research_types=("api_docs",),
                search_channels=("web search", "official documentation search", "repository search"),
                sources_checked=("https://docs.example.com/api", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Official docs describe the API.",),
                options=("Use API", "Do not use API"),
                recommendation="Use API.",
                post_research_answers=complete_answers(),
                validation_steps=("Run integration tests.",),
                risks_or_unknowns=("The source value origin is not recorded.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Source value provenance is missing; record where material values, assumptions, claims, configuration inputs, or constraints came from.",
            report["gaps"],
        )

    def test_plan_evidence_is_required(self) -> None:
        references = complete_code_references()
        references.pop("plan_evidence")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research an API choice.",
                coding_context="A service integration.",
                research_types=("api_docs",),
                search_channels=("web search", "official documentation search", "repository search"),
                sources_checked=("https://docs.example.com/api", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Official docs describe the API.",),
                options=("Use API", "Do not use API"),
                recommendation="Use API.",
                post_research_answers=complete_answers(),
                validation_steps=("Run integration tests.",),
                risks_or_unknowns=("The plan is not tied to evidence.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Plan evidence is missing; map the recommendation and implementation plan to checked sources, repository evidence, or explicit assumptions.",
            report["gaps"],
        )

    def test_architecture_references_are_required(self) -> None:
        references = complete_code_references()
        references.pop("architecture_reference_sources")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a source-code architecture decision.",
                coding_context="A Python service.",
                research_types=("architecture", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://learn.microsoft.com/azure/architecture/", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Architecture reference sources should shape module boundaries before coding.",),
                options=("Use modular monolith", "Use distributed services"),
                recommendation="Use modular monolith.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Reference architectures may not match every local constraint.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Architecture reference sources are missing; inspect best-practice architecture frameworks, reference architectures, or well-structured source architectures before implementation.",
            report["gaps"],
        )

    def test_architecture_options_are_required(self) -> None:
        references = complete_code_references()
        references["architecture_options"] = ("Modular monolith",)

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a source-code architecture decision.",
                coding_context="A Python service.",
                research_types=("architecture",),
                search_channels=("web search", "repository search"),
                sources_checked=("https://learn.microsoft.com/azure/architecture/", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Architecture options need trade-off comparison.",),
                options=("Use modular monolith", "Use distributed services"),
                recommendation="Use modular monolith.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Reference architectures may not match every local constraint.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("At least two architecture options or patterns must be compared before implementation.", report["gaps"])

    def test_documentation_url_is_not_enough_as_code_reference(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research an implementation pattern.",
                coding_context="A Python service.",
                research_types=("implementation_pattern",),
                search_channels=("web search", "repository search"),
                sources_checked=("https://github.com/example/project", "https://docs.example.com/api"),
                source_types=("official", "reference_implementation", "tech_blog"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                code_reference_sources=("https://docs.example.com/api",),
                code_reference_notes=("Only checked docs, not code.",),
                findings=("A maintained project has a useful service layout.",),
                options=("Reuse similar module boundaries", "Use a custom layout"),
                recommendation="Reuse similar module boundaries.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("The reference implementation may not match every local constraint.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("At least one code reference source must be a repository URL, source file path, or code search result.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
