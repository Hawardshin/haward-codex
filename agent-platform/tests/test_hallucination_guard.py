from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.hallucination_guard import (
    ClaimCheck,
    EvidenceItem,
    HallucinationGuardInput,
    check_hallucination_risk,
)


class HallucinationGuardTests(unittest.TestCase):
    def test_ready_to_publish_when_claims_are_grounded(self) -> None:
        report = check_hallucination_risk(
            HallucinationGuardInput(
                task="Document hallucination prevention policy.",
                output_summary="Added policy, workflow, and agent docs.",
                risk_level="medium",
                evidence=(
                    EvidenceItem(
                        evidence_id="repo-policy",
                        source="_docs/policies/hallucination-prevention-policy.ko.md",
                        source_type="repository_file",
                        reliability="Owned workspace policy.",
                    ),
                    EvidenceItem(
                        evidence_id="openai-docs",
                        source="https://developers.openai.com/api/docs/guides/structured-outputs",
                        source_type="official_docs",
                        checked_on="2026-05-31",
                        reliability="Official API documentation.",
                    ),
                ),
                claims=(
                    ClaimCheck(
                        statement="The workspace now has a hallucination prevention policy.",
                        claim_type="repository_state",
                        support_level="supported",
                        evidence_ids=("repo-policy",),
                        verification_steps=("Read the policy file.",),
                    ),
                    ClaimCheck(
                        statement="Structured outputs can reduce schema-level output errors.",
                        claim_type="external_fact",
                        support_level="supported",
                        evidence_ids=("openai-docs",),
                        verification_steps=("Checked official documentation.",),
                        freshness_sensitive=True,
                    ),
                ),
            )
        )

        self.assertEqual(report["status"], "ready_to_publish")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_unsupported_fact_requires_grounding(self) -> None:
        report = check_hallucination_risk(
            HallucinationGuardInput(
                task="Answer a current factual question.",
                output_summary="Drafted an answer.",
                evidence=(),
                claims=(
                    ClaimCheck(
                        statement="A current external fact is true.",
                        claim_type="external_fact",
                        support_level="not_checked",
                    ),
                ),
            )
        )

        self.assertEqual(report["status"], "grounding_required")
        self.assertTrue(report["requires_rework"])
        self.assertIn("Evidence is missing; factual claims need source, tool, or command grounding.", report["gaps"])
        self.assertIn("Claim 1 is factual and presented as fact, but has no evidence IDs.", report["gaps"])

    def test_high_risk_requires_two_independent_sources(self) -> None:
        report = check_hallucination_risk(
            HallucinationGuardInput(
                task="Produce high-risk factual guidance.",
                output_summary="Drafted guidance.",
                risk_level="high",
                evidence=(
                    EvidenceItem(
                        evidence_id="official",
                        source="https://example.com/official",
                        source_type="official_docs",
                        checked_on="2026-05-31",
                    ),
                ),
                claims=(
                    ClaimCheck(
                        statement="The guidance relies on one source.",
                        claim_type="external_fact",
                        support_level="supported",
                        evidence_ids=("official",),
                        verification_steps=("Checked the official source.",),
                    ),
                ),
            )
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn(
            "High-risk factual output requires at least two independent non-inference evidence sources.",
            report["gaps"],
        )

    def test_uncertain_caveated_claim_is_warning_not_gap(self) -> None:
        report = check_hallucination_risk(
            HallucinationGuardInput(
                task="State an uncertainty.",
                output_summary="Reported uncertainty instead of a fact.",
                evidence=(
                    EvidenceItem(
                        evidence_id="search",
                        source="Search found no definitive answer.",
                        source_type="tool_result",
                    ),
                ),
                claims=(
                    ClaimCheck(
                        statement="The answer may be incomplete.",
                        claim_type="inference",
                        support_level="uncertain",
                        evidence_ids=("search",),
                        presented_as_fact=False,
                    ),
                ),
                uncertainty_notes=("The final output must say this is uncertain.",),
            )
        )

        self.assertEqual(report["status"], "ready_to_publish")
        self.assertFalse(report["requires_rework"])


if __name__ == "__main__":
    unittest.main()
