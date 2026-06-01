from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from source_collector import (
    Source,
    SourceCollectionInput,
    SearchQuery,
    analyze,
    build_human_query_plan,
    infer_source_type,
    render_markdown,
    render_query_plan_markdown,
)


class SourceCollectorTests(unittest.TestCase):
    def test_ready_bundle_with_required_source_types(self) -> None:
        result = analyze(
            SourceCollectionInput(
                topic="Agent search automation",
                purpose="Choose a source collection workflow.",
                access_date="2026-05-31",
                queries=(SearchQuery(query="agent search automation official docs"),),
                sources=(
                    Source(title="Official docs", url="https://docs.example.com/search", source_type="official", accessed_date="2026-05-31", key_claim="Official behavior.", reliability_notes="Primary source."),
                    Source(title="Paper", url="https://arxiv.org/abs/1707.02553", source_type="paper", accessed_date="2026-05-31", key_claim="Research method.", reliability_notes="Paper."),
                    Source(title="Tech blog A", url="https://engineering.example.com/a", source_type="tech_blog", accessed_date="2026-05-31", key_claim="Practice A.", reliability_notes="Engineering blog."),
                    Source(title="Tech blog B", url="https://blog.example.com/b", source_type="tech_blog", accessed_date="2026-05-31", key_claim="Practice B.", reliability_notes="Engineering blog."),
                    Source(title="Repo", url="https://github.com/example/repo", source_type="open_source", accessed_date="2026-05-31", key_claim="Implementation.", reliability_notes="Source code.", signals={"github_stars": 1200}),
                    Source(title="HN", url="https://news.ycombinator.com/item?id=1", source_type="community", accessed_date="2026-05-31", key_claim="Discussion.", reliability_notes="Community signal.", signals={"hn_points": 150}),
                    Source(title="Failure case", url="https://example.com/failure", source_type="analysis", accessed_date="2026-05-31", key_claim="Limit.", reliability_notes="Contrary example.", contrary=True),
                ),
            )
        )

        self.assertEqual(result["status"], "ready_to_use")
        self.assertEqual(result["missing_bundle_items"], [])
        self.assertGreater(result["adoption_signal_count"], 0)
        self.assertEqual(result["contrary_source_count"], 1)

    def test_missing_bundle_items_are_reported(self) -> None:
        result = analyze(
            SourceCollectionInput(
                topic="Small topic",
                purpose="Check missing coverage.",
                access_date="2026-05-31",
                sources=(Source(title="Only one source", url="https://example.com", source_type="analysis"),),
            )
        )

        self.assertEqual(result["status"], "more_sources_required")
        self.assertIn("official", result["missing_bundle_items"])
        self.assertIn("paper", result["missing_bundle_items"])

    def test_source_type_auto_inference(self) -> None:
        self.assertEqual(infer_source_type("https://github.com/org/project"), "open_source")
        self.assertEqual(infer_source_type("https://arxiv.org/abs/1234.1"), "paper")
        self.assertEqual(infer_source_type("https://docs.example.com/api"), "official")
        self.assertEqual(infer_source_type("https://www.linkedin.com/posts/example"), "social")

    def test_markdown_report_contains_scores_and_missing_items(self) -> None:
        collection_input = SourceCollectionInput(
            topic="Report topic",
            purpose="Render report.",
            access_date="2026-05-31",
            sources=(Source(title="Only one source", url="https://example.com", source_type="analysis"),),
        )
        report = render_markdown(collection_input, analyze(collection_input), "ko")

        self.assertIn("# 출처 수집 보고서", report)
        self.assertIn("Bundle Coverage", report)
        self.assertIn("Missing Bundle Items", report)

    def test_human_query_plan_contains_operator_and_snowballing_stages(self) -> None:
        plan = build_human_query_plan("agent search automation", "deep")
        stage_ids = [stage["stage_id"] for stage in plan["query_ladder"]]
        queries = [query for stage in plan["query_ladder"] for query in stage["queries"]]

        self.assertIn("operator_precision", stage_ids)
        self.assertIn("snowballing_steps", plan)
        self.assertTrue(any("filetype:pdf" in query for query in queries))
        self.assertTrue(any("site:github.com" in query for query in queries))

    def test_query_plan_markdown_renders_summary_contract(self) -> None:
        markdown = render_query_plan_markdown(build_human_query_plan("source discovery", "standard"), "en")

        self.assertIn("# Human-Like Search Query Plan", markdown)
        self.assertIn("Summary Capture", markdown)


if __name__ == "__main__":
    unittest.main()
