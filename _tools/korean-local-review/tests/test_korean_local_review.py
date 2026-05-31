from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from korean_local_review import ReviewCandidate, ReviewResearchInput, analyze, query_plan, score_candidate


class KoreanLocalReviewTests(unittest.TestCase):
    def test_query_plan_prioritizes_korean_local_sources(self) -> None:
        plan = query_plan("성수동 브런치", "성수동", "브런치")

        self.assertEqual(plan["recommended_order"][0], "official_site_or_place_profile")
        platforms = [item["platform"] for item in plan["queries"]]
        self.assertIn("naver_map", platforms)
        self.assertIn("kakao_map", platforms)
        self.assertIn("naver_blog", platforms)
        self.assertEqual(plan["queries"][0]["query"], "성수동 브런치")

    def test_score_candidate_rewards_korean_local_review_signal(self) -> None:
        score = score_candidate(
            ReviewCandidate(
                title="성수동 브런치 Naver Map",
                url="https://map.naver.com/",
                platform="naver_map",
                source_kind="map_place",
                accessed_date="2026-05-31",
                language="ko",
                region="성수동",
                category="브런치",
                rating=4.4,
                review_count=1200,
                blog_review_count=200,
                has_photos=True,
                receipt_verified=True,
                user_fit_notes="Korean visitor reviews and photos.",
                key_claim="Visitor signal is strong.",
            )
        )

        self.assertGreaterEqual(score["overall_score"], 70)
        self.assertGreater(score["korean_user_fit_score"], score["bias_risk_score"])

    def test_analyze_requires_cross_platform_review_sources(self) -> None:
        report = analyze(
            ReviewResearchInput(
                topic="성수동 브런치",
                region="성수동",
                category="브런치",
                access_date="2026-05-31",
                candidates=(
                    ReviewCandidate(
                        title="Naver only",
                        url="https://map.naver.com/",
                        platform="naver_map",
                        source_kind="map_place",
                    ),
                ),
            )
        )

        self.assertEqual(report["status"], "more_sources_required")
        self.assertIn("Only one platform is represented; cross-check another platform before using review evidence.", report["warnings"])


if __name__ == "__main__":
    unittest.main()
