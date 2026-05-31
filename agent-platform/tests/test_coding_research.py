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
        "technology_stack": (
            "Python 3.11",
            "agent-platform CLI",
        ),
        "technology_official_docs": (
            "https://docs.python.org/3/",
        ),
        "stack_version_constraints": (
            "Python 3.11+ local CLI execution; no external runtime dependency.",
        ),
        "issue_discussion_sources": (
            "https://github.com/python/cpython/issues",
            "https://stackoverflow.com/questions/tagged/python",
        ),
        "issue_discussion_notes": (
            "Checked issue and discussion channels for recurring CLI/test patterns; used as implementation risk signals, not factual proof.",
        ),
        "community_signal_notes": (
            "Stack Overflow votes and GitHub reactions are treated as adoption or problem signals; official docs remain authoritative.",
        ),
        "language_options": (
            "Python 3.11 for local CLI, deterministic validation, and existing agent-platform tests.",
            "TypeScript for Node-based automation and frontend-adjacent tooling.",
        ),
        "selected_language": "Python 3.11",
        "language_decision_notes": (
            "Selected Python because the current platform helpers, tests, and CLI are Python-first and easiest to maintain locally.",
        ),
        "architecture_reference_sources": (
            "https://learn.microsoft.com/azure/architecture/",
            "https://github.com/example/project/blob/main/docs/architecture.md",
        ),
        "architecture_theory_sources": (
            "https://arc42.org/overview",
            "https://c4model.com/",
        ),
        "architecture_practitioner_sources": (
            "https://martinfowler.com/",
            "https://stackoverflow.com/questions/tagged/software-architecture",
        ),
        "architecture_options": (
            "Modular monolith with explicit package boundaries.",
            "Distributed services split by capability.",
        ),
        "architecture_decision_notes": (
            "Selected modular monolith for the current scope; rejected distributed services because coordination cost exceeds the benefit.",
        ),
        "architecture_tradeoff_notes": (
            "Compared theory-first modular boundaries with practitioner preference for simple explicit folders; selected the simpler package structure.",
        ),
        "folder_structure_options": (
            "Layered package folders by platform capability.",
            "Feature/capability folders with docs and tests near the implementation.",
        ),
        "folder_structure_decision_notes": (
            "Selected capability-oriented folders because folder names reveal purpose and keep planning/evaluation boundaries obvious.",
        ),
        "folder_semantics_notes": (
            "src/agent_platform/planning contains research and planning checks; evaluation contains close-out evaluators; configs/planning contains structured planning inputs.",
        ),
        "maintainability_notes": (
            "Language, architecture, and folders are chosen to reduce future search cost and make ownership visible.",
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
                sources_checked=("https://www.thoughtworks.com/en-us/radar/faq", "_docs/search-insight-planning-policy.ko.md", "https://stackoverflow.com/questions/tagged/python"),
                source_types=("official", "reference_implementation", "tech_blog", "community", "internal"),
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
                source_types=("official", "reference_implementation", "tech_blog", "community", "internal"),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
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
                source_types=("official", "reference_implementation", "tech_blog", "community", "internal"),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
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
                source_types=("official", "reference_implementation", "tech_blog", "community"),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
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
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
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

    def test_technology_stack_and_official_docs_are_required(self) -> None:
        references = complete_code_references()
        references.pop("technology_stack")
        references.pop("technology_official_docs")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a stack-specific API choice.",
                coding_context="A React and Next.js application.",
                research_types=("api_docs", "implementation_pattern"),
                search_channels=("web search", "official documentation search", "repository search"),
                sources_checked=("https://react.dev/learn", "https://nextjs.org/docs", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Stack-specific official docs must drive API choices.",),
                options=("Use framework API", "Use custom abstraction"),
                recommendation="Use the framework API.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Framework docs can change across versions.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Technology stack is missing; record languages, frameworks, runtimes, and major libraries involved, such as Spring Boot, C, React, or Next.js.",
            report["gaps"],
        )
        self.assertIn(
            "Technology-specific official docs are missing; record official documentation or standards for each major technology in the stack.",
            report["gaps"],
        )

    def test_stack_specific_official_docs_are_checked_for_known_technologies(self) -> None:
        references = complete_code_references()
        references["technology_stack"] = ("Spring Boot 3.3", "React 19", "Next.js 15", "ISO C23")
        references["technology_official_docs"] = (
            "https://docs.spring.io/spring-boot/reference/index.html",
            "https://react.dev/learn",
            "https://www.iso.org/standard/82075.html",
        )
        references["stack_version_constraints"] = (
            "Spring Boot 3.3, React 19, Next.js 15, and ISO/IEC 9899:2024 C23 constraints must be verified before coding.",
        )

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research stack-specific implementation docs.",
                coding_context="Java Spring Boot backend, React/Next.js frontend, and C interop.",
                research_types=("api_docs", "architecture", "implementation_pattern"),
                search_channels=("web search", "official documentation search", "repository search"),
                sources_checked=(
                    "https://docs.spring.io/spring-boot/reference/index.html",
                    "https://react.dev/learn",
                    "https://www.iso.org/standard/82075.html",
                    "https://github.com/example/project",
                ),
                source_types=("official", "standard", "open_source", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Known stack technologies need matching official docs or standards.",),
                options=("Use stack defaults", "Build custom wrappers"),
                recommendation="Use stack defaults.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Missing Next.js docs would make router assumptions weak.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Technology-specific official docs are missing for Next.js.", report["gaps"])

    def test_stack_version_constraints_are_required(self) -> None:
        references = complete_code_references()
        references.pop("stack_version_constraints")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a version-sensitive API choice.",
                coding_context="A Python service.",
                research_types=("api_docs",),
                search_channels=("web search", "official documentation search", "repository search"),
                sources_checked=("https://docs.python.org/3/", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Runtime versions shape API behavior.",),
                options=("Use current runtime", "Upgrade runtime first"),
                recommendation="Use current runtime.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Version constraints were omitted.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Stack version constraints are missing; record relevant versions, standards, runtime ranges, or an explicit unknown.", report["gaps"])

    def test_issue_discussion_sources_and_notes_are_required(self) -> None:
        references = complete_code_references()
        references.pop("issue_discussion_sources")
        references.pop("issue_discussion_notes")
        references.pop("community_signal_notes")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a known implementation issue.",
                coding_context="A Python service.",
                research_types=("bug_root_cause", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://docs.python.org/3/", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Issue history can reveal recurring edge cases.",),
                options=("Patch locally", "Change library"),
                recommendation="Patch locally.",
                post_research_answers=complete_answers(),
                validation_steps=("Run regression tests.",),
                risks_or_unknowns=("Discussion evidence was omitted.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Issue or discussion sources are missing; inspect high-signal issues, Stack Overflow answers, Reddit discussions, project discussions, or record why none applied.",
            report["gaps"],
        )
        self.assertIn(
            "Issue or discussion notes are missing; record what the discussions revealed and whether signals were strong, weak, stale, or contradicted.",
            report["gaps"],
        )
        self.assertIn(
            "Community signal notes are missing; record how votes, reactions, comments, stars, or likes were used as adoption/discovery signals rather than proof.",
            report["gaps"],
        )

    def test_issue_sources_require_community_or_social_source_type(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research a high-vote discussion before coding.",
                coding_context="A Python service.",
                research_types=("implementation_pattern",),
                search_channels=("web search", "repository search"),
                sources_checked=("https://docs.python.org/3/", "https://github.com/example/project", "https://stackoverflow.com/questions/tagged/python"),
                source_types=("official", "reference_implementation", "open_source"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
                findings=("Stack Overflow can surface recurring implementation problems.",),
                options=("Use pattern A", "Use pattern B"),
                recommendation="Use pattern A.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Community evidence must be labeled correctly.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Issue/discussion sources require community or social in source_types so their evidence role is explicit.", report["gaps"])

    def test_language_selection_is_required(self) -> None:
        references = complete_code_references()
        references.pop("language_options")
        references.pop("selected_language")
        references.pop("language_decision_notes")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research maintainable implementation language choices.",
                coding_context="A platform CLI.",
                research_types=("architecture", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Language choice should be explicit before coding.",),
                options=("Python", "TypeScript"),
                recommendation="Use Python.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Runtime choice was omitted.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("At least two language or runtime options must be compared before implementation.", report["gaps"])
        self.assertIn("Selected language or runtime is missing.", report["gaps"])
        self.assertIn(
            "Language decision notes are missing; record maintainability, team familiarity, ecosystem, runtime, tooling, and project-boundary trade-offs.",
            report["gaps"],
        )

    def test_selected_language_must_match_recorded_options(self) -> None:
        references = complete_code_references()
        references["selected_language"] = "Ruby 3.3"

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research maintainable implementation language choices.",
                coding_context="A platform CLI.",
                research_types=("architecture", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Language choice should match the compared options.",),
                options=("Python", "TypeScript"),
                recommendation="Use Python.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("The selected runtime was inconsistent.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Selected language or runtime must match one of the recorded language_options.", report["gaps"])

    def test_architecture_theory_and_practitioner_opinions_are_required(self) -> None:
        references = complete_code_references()
        references.pop("architecture_theory_sources")
        references.pop("architecture_practitioner_sources")
        references.pop("architecture_tradeoff_notes")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research architecture options before coding.",
                coding_context="A platform planning module.",
                research_types=("architecture", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://arc42.org/overview", "https://stackoverflow.com/questions/tagged/software-architecture", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Architecture research should compare formal and practical sources.",),
                options=("Layered", "Capability-oriented"),
                recommendation="Use capability-oriented folders.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Architecture opinion evidence was omitted.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Architecture theory sources are missing; record frameworks, models, official architecture docs, standards, or papers.", report["gaps"])
        self.assertIn(
            "Architecture practitioner opinion sources are missing; record high-signal practitioner blogs, issue discussions, Q&A, or community debates that may disagree with theory.",
            report["gaps"],
        )
        self.assertIn(
            "Architecture trade-off notes are missing; compare theory-driven guidance with practitioner opinions and record disagreements or convergence.",
            report["gaps"],
        )

    def test_practitioner_sources_require_signal_source_type(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research practitioner architecture opinions before coding.",
                coding_context="A platform planning module.",
                research_types=("architecture", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://arc42.org/overview", "https://stackoverflow.com/questions/tagged/software-architecture", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **complete_code_references(),
                findings=("Practitioner evidence must be labeled separately.",),
                options=("Layered", "Capability-oriented"),
                recommendation="Use capability-oriented folders.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Practitioner evidence role was not labeled.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Practitioner opinion sources require analysis, community, social, or tech_blog in source_types so their evidence role is explicit.",
            report["gaps"],
        )

    def test_folder_structure_semantics_are_required(self) -> None:
        references = complete_code_references()
        references.pop("folder_structure_options")
        references.pop("folder_structure_decision_notes")
        references.pop("folder_semantics_notes")
        references.pop("maintainability_notes")

        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research readable folder structure before coding.",
                coding_context="A platform planning module.",
                research_types=("architecture", "implementation_pattern"),
                search_channels=("web search", "repository search"),
                sources_checked=("https://go.dev/doc/modules/layout", "https://nextjs.org/docs/app/getting-started/project-structure", "https://github.com/example/project"),
                source_types=("official", "reference_implementation", "open_source", "tech_blog", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                **references,
                findings=("Folder structure should make ownership visible.",),
                options=("Layered", "Capability-oriented"),
                recommendation="Use capability-oriented folders.",
                post_research_answers=complete_answers(),
                validation_steps=("Run tests.",),
                risks_or_unknowns=("Folder meaning was omitted.",),
                plan_history_targets=("_history/plans/2026/example.ko.md",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("At least two folder structure options must be compared before implementation.", report["gaps"])
        self.assertIn(
            "Folder structure decision notes are missing; record why the selected structure supports maintainability, navigation, ownership, and future growth.",
            report["gaps"],
        )
        self.assertIn(
            "Folder semantics notes are missing; record the intended meaning of top-level and important nested folders so the structure is understandable by inspection.",
            report["gaps"],
        )
        self.assertIn(
            "Maintainability notes are missing; record how language, architecture, and folders reduce future change cost.",
            report["gaps"],
        )

    def test_documentation_url_is_not_enough_as_code_reference(self) -> None:
        report = complete_coding_research(
            CodingResearchInput(
                research_goal="Research an implementation pattern.",
                coding_context="A Python service.",
                research_types=("implementation_pattern",),
                search_channels=("web search", "repository search"),
                sources_checked=("https://github.com/example/project", "https://docs.example.com/api"),
                source_types=("official", "reference_implementation", "tech_blog", "community"),
                reference_config_paths=("agent-platform/configs/research/coding-research-profile.json",),
                technology_stack=("Python 3.11",),
                technology_official_docs=("https://docs.python.org/3/",),
                stack_version_constraints=("Python 3.11+.",),
                issue_discussion_sources=("https://stackoverflow.com/questions/tagged/python",),
                issue_discussion_notes=("Checked high-vote Stack Overflow Python questions as problem-discovery signals.",),
                community_signal_notes=("Votes and comments are signals, not proof.",),
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
