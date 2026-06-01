from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.planning.deep_research import DeepResearchInput, complete_deep_research


def complete_deep_research_input(**overrides: object) -> DeepResearchInput:
    data = {
        "research_question": "What should a deep research agent validate before writing a report?",
        "report_goal": "Write a detailed source-grounded report with citations.",
        "intended_audience": "Workspace owner and future agents",
        "trigger_situation": "The user asks for deep multi-source research or a long-form report.",
        "depth_level": "deep",
        "research_profile_paths": (
            "agent-platform/configs/research/deep-research-profile.json",
            "agent-platform/configs/research/source-registry.json",
        ),
        "search_channels": (
            "web search",
            "official documentation search",
            "paper search",
            "repository search",
        ),
        "sources_checked": (
            "https://developers.openai.com/api/docs/guides/deep-research",
            "https://help.openai.com/articles/10500283",
            "https://exa.ai/docs/reference/exa-research",
            "https://docs.langchain.com/oss/python/deepagents/deep-research",
            "https://github.com/langchain-ai/open_deep_research",
            "https://github.com/langchain-ai/deepagents",
            "https://arxiv.org/abs/2605.06635",
            "https://arxiv.org/abs/2508.15804",
        ),
        "source_types": (
            "official",
            "open_source",
            "paper",
            "community",
        ),
        "deep_research_stages": (
            "scope_definition",
            "query_decomposition",
            "source_strategy",
            "iterative_retrieval",
            "source_quality_review",
            "evidence_extraction",
            "contradiction_mapping",
            "synthesis",
            "report_outline",
            "citation_audit",
            "skeptic_review",
        ),
        "research_iterations": (
            "Iteration 1: search official docs and product guidance.",
            "Iteration 2: search open-source implementations and citation-evaluation papers.",
        ),
        "source_quality_notes": (
            "Official docs support product behavior and stage names.",
            "Papers support citation-audit risk framing.",
        ),
        "evidence_items": (
            "Deep research uses many sources <- OpenAI API docs.",
            "Research tasks can be decomposed into planning/searching/synthesis <- Exa docs.",
            "Sub-agent research and citations are useful <- LangChain docs.",
            "Open-source implementation uses supervisor-researcher architecture <- open_deep_research.",
            "Citations can be unverifiable <- Cited but Not Verified.",
            "Report evaluation should inspect citations and statements <- ReportBench.",
        ),
        "contradiction_notes": (
            "Commercial tools promise comprehensive reports, but evaluation papers warn citations can still be weak.",
        ),
        "synthesis_notes": (
            "A readiness checker should require stages, evidence, contradiction mapping, and citation audit.",
        ),
        "citation_requirements": (
            "Every material claim must map to a checked source.",
            "Weak or unsupported claims must be listed before report publication.",
        ),
        "citation_audit_notes": (
            "Each evidence item was written as claim <- source so report citations can be checked.",
        ),
        "unsupported_or_weak_claims": (
            "No unresolved claim is accepted; future reports must record explicit none-found audits when applicable.",
        ),
        "report_outline": (
            "Executive summary",
            "Research scope and method",
            "Evidence synthesis",
            "Contradictions and uncertainty",
            "Recommendations and next research",
        ),
        "report_targets": (
            "_research/topics/example/deep-research-report.ko.md",
        ),
        "source_value_provenance": (
            "Deep research stage design <- checked external sources and internal code references.",
        ),
        "risks_or_unknowns": (
            "Citation audit still depends on checking source text.",
        ),
        "follow_up_questions": (
            "Should a future version call a real search API?",
        ),
        "knowledge_validation_status": "",
    }
    data.update(overrides)
    return DeepResearchInput(**data)


class DeepResearchTests(unittest.TestCase):
    def test_ready_when_deep_research_package_is_complete(self) -> None:
        report = complete_deep_research(complete_deep_research_input())

        self.assertEqual(report["status"], "ready_to_write_report")
        self.assertFalse(report["requires_more_research"])
        self.assertEqual(report["gaps"], [])

    def test_missing_deep_research_profile_requires_more_research(self) -> None:
        report = complete_deep_research(
            complete_deep_research_input(
                research_profile_paths=("agent-platform/configs/research/research-agent-profile.json",)
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("deep-research-profile.json must be recorded in research_profile_paths.", report["gaps"])

    def test_incomplete_stages_are_reported(self) -> None:
        report = complete_deep_research(
            complete_deep_research_input(
                deep_research_stages=(
                    "scope_definition",
                    "query_decomposition",
                    "synthesis",
                )
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Deep research stages are incomplete; missing: citation_audit, contradiction_mapping, evidence_extraction, iterative_retrieval, report_outline, skeptic_review, source_quality_review, source_strategy.",
            report["gaps"],
        )

    def test_deep_level_requires_enough_sources_and_evidence(self) -> None:
        report = complete_deep_research(
            complete_deep_research_input(
                sources_checked=("https://developers.openai.com/api/docs/guides/deep-research",),
                evidence_items=("Deep research uses many sources <- OpenAI API docs.",),
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn("Check at least 8 sources for deep-level deep research.", report["gaps"])
        self.assertIn("Record at least 6 evidence items for deep-level deep research.", report["gaps"])

    def test_internal_sources_require_knowledge_validation(self) -> None:
        report = complete_deep_research(
            complete_deep_research_input(
                sources_checked=(
                    "https://developers.openai.com/api/docs/guides/deep-research",
                    "https://help.openai.com/articles/10500283",
                    "https://exa.ai/docs/reference/exa-research",
                    "https://docs.langchain.com/oss/python/deepagents/deep-research",
                    "https://github.com/langchain-ai/open_deep_research",
                    "https://github.com/langchain-ai/deepagents",
                    "https://arxiv.org/abs/2605.06635",
                    "_research/topics/agent-planning/example.ko.md",
                )
            )
        )

        self.assertEqual(report["status"], "more_research_required")
        self.assertIn(
            "Internal knowledge-base sources require knowledge_validation_status=ready_to_reference.",
            report["gaps"],
        )

    def test_internal_sources_pass_when_validated(self) -> None:
        report = complete_deep_research(
            complete_deep_research_input(
                sources_checked=(
                    "https://developers.openai.com/api/docs/guides/deep-research",
                    "https://help.openai.com/articles/10500283",
                    "https://exa.ai/docs/reference/exa-research",
                    "https://docs.langchain.com/oss/python/deepagents/deep-research",
                    "https://github.com/langchain-ai/open_deep_research",
                    "https://github.com/langchain-ai/deepagents",
                    "https://arxiv.org/abs/2605.06635",
                    "_research/topics/agent-planning/example.ko.md",
                ),
                knowledge_validation_status="ready_to_reference",
            )
        )

        self.assertEqual(report["status"], "ready_to_write_report")


if __name__ == "__main__":
    unittest.main()
