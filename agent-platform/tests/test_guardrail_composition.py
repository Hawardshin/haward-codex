from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.governance.guardrail_composition import GuardrailCompositionInput, check_guardrail_composition


def ready_input() -> GuardrailCompositionInput:
    return GuardrailCompositionInput.from_dict(
        {
            "task": "Publish a repository dashboard after checking private data boundaries.",
            "work_mode": "governance",
            "risk_surfaces": [
                {
                    "surface_id": "private_file_exposure",
                    "category": "privacy",
                    "description": "The dashboard can accidentally expose sensitive local-only files.",
                    "impact": "high",
                    "reversibility": "irreversible",
                    "evidence": ["Sensitive file boundary policy routes secrets to _private/sensitive/."],
                },
                {
                    "surface_id": "public_claim_accuracy",
                    "category": "publication",
                    "description": "Published platform claims need grounding before release.",
                    "impact": "medium",
                    "reversibility": "partially_reversible",
                    "evidence": ["Grounding workflow requires source handles for factual claims."],
                },
            ],
            "guardrails": [
                {
                    "guardrail_id": "private_boundary_gate",
                    "risk_surface_ids": ["private_file_exposure"],
                    "guardrail_type": "privacy_or_security_audit",
                    "allowed_actions": ["Render public docs and dashboard summaries."],
                    "blocked_actions": ["Read or publish _private paths or secret environment values."],
                    "fallback_or_escalation": "Stop publication and create a human decision inbox item.",
                    "verification_evidence": ["check-config-contract sensitive-file-boundary.json: self_documenting"],
                },
                {
                    "guardrail_id": "publication_grounding_gate",
                    "risk_surface_ids": ["public_claim_accuracy"],
                    "guardrail_type": "evaluator_or_grounding_check",
                    "allowed_actions": ["Publish claims with source handles and uncertainty notes."],
                    "blocked_actions": ["Publish unsupported factual claims."],
                    "fallback_or_escalation": "Remove the claim or mark it uncertain until sources are checked.",
                    "verification_evidence": ["check-grounding publication-grounding.json: ready_to_publish"],
                },
            ],
            "execution_controls": {
                "requires_human_checkpoint": True,
                "requires_dry_run": False,
                "requires_rollback": False,
                "requires_privacy_audit": True,
                "requires_grounding": True,
                "requires_cost_cap": False,
            },
            "source_provenance": ["OpenAI Agents SDK guardrails", "OWASP LLM Top 10", "NIST AI RMF"],
            "plan_evidence": ["REQ-WS-079 requires structural guardrail evidence for material-risk work."],
        }
    )


class GuardrailCompositionTests(unittest.TestCase):
    def test_ready_composition(self) -> None:
        report = check_guardrail_composition(ready_input())

        self.assertEqual(report["status"], "guardrails_ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])
        self.assertEqual(report["checks"]["risk_surface_count"], 2)

    def test_high_risk_surface_without_guardrail_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        data["guardrails"] = data["guardrails"][1:]

        report = check_guardrail_composition(GuardrailCompositionInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertIn("Risk surface private_file_exposure has no guardrail coverage.", report["gaps"])

    def test_unknown_surface_reference_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        first_guardrail = data["guardrails"][0]
        data["guardrails"] = (
            first_guardrail.__class__(
                **{
                    **first_guardrail.__dict__,
                    "risk_surface_ids": ("missing_surface",),
                }
            ),
            data["guardrails"][1],
        )

        report = check_guardrail_composition(GuardrailCompositionInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertIn("Guardrail private_boundary_gate references unknown risk_surface_id 'missing_surface'.", report["gaps"])

    def test_cost_surface_needs_cost_cap_or_human_checkpoint(self) -> None:
        data = ready_input().__dict__.copy()
        data["risk_surfaces"] = (
            data["risk_surfaces"][0].__class__(
                **{
                    **data["risk_surfaces"][0].__dict__,
                    "surface_id": "token_runaway",
                    "category": "cost",
                    "impact": "high",
                    "reversibility": "partially_reversible",
                }
            ),
        )
        data["guardrails"] = (
            data["guardrails"][0].__class__(
                **{
                    **data["guardrails"][0].__dict__,
                    "risk_surface_ids": ("token_runaway",),
                    "guardrail_type": "output_schema_or_format_contract",
                }
            ),
        )
        data["execution_controls"] = data["execution_controls"].__class__(
            requires_human_checkpoint=False,
            requires_dry_run=False,
            requires_rollback=False,
            requires_privacy_audit=False,
            requires_grounding=False,
            requires_cost_cap=False,
        )

        report = check_guardrail_composition(GuardrailCompositionInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertIn("Risk surface token_runaway affects cost and needs a cost cap, rate limit, or human checkpoint.", report["gaps"])

    def test_non_quick_mode_needs_source_and_plan_evidence(self) -> None:
        data = ready_input().__dict__.copy()
        data["source_provenance"] = ()
        data["plan_evidence"] = ()

        report = check_guardrail_composition(GuardrailCompositionInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertIn("source_provenance is empty. Non-quick guardrail composition needs source handles.", report["gaps"])
        self.assertIn("plan_evidence is empty. Non-quick guardrail composition needs planning evidence.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
