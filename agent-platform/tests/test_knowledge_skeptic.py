from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.knowledge_skeptic import KnowledgeValidationInput, validate_knowledge_reference


class KnowledgeSkepticTests(unittest.TestCase):
    def test_ready_when_sources_and_checks_exist(self) -> None:
        report = validate_knowledge_reference(
            KnowledgeValidationInput(
                claim="A recorded research note supports the workflow.",
                intended_use="Use it as a reference in evaluation.",
                knowledge_sources=("_research/topics/example/2026-05-31-note.ko.md",),
                verification_steps=("Checked primary source and access date.",),
                skeptic_questions=("Could this be outdated?",),
                freshness_notes=("Checked on 2026-05-31.",),
            )
        )

        self.assertEqual(report["status"], "ready_to_reference")
        self.assertFalse(report["requires_recheck"])
        self.assertEqual(report["gaps"], [])

    def test_missing_verification_requires_recheck(self) -> None:
        report = validate_knowledge_reference(
            KnowledgeValidationInput(
                claim="A note says this library is maintained.",
                intended_use="Use it to choose a dependency.",
                knowledge_sources=("_research/topics/example/library.ko.md",),
                skeptic_questions=("Could release activity have changed?",),
                freshness_notes=("Unknown freshness.",),
            )
        )

        self.assertEqual(report["status"], "verification_required")
        self.assertTrue(report["requires_recheck"])
        self.assertIn("Independent verification steps are missing.", report["gaps"])

    def test_contrary_signals_require_resolution(self) -> None:
        report = validate_knowledge_reference(
            KnowledgeValidationInput(
                claim="A note says this API is stable.",
                intended_use="Use it in implementation.",
                knowledge_sources=("_docs/example.md",),
                verification_steps=("Checked current docs.",),
                skeptic_questions=("Could this API be deprecated?",),
                contrary_signals=("Current docs mention a migration path.",),
                freshness_notes=("Checked current docs on 2026-05-31.",),
            )
        )

        self.assertTrue(report["requires_recheck"])
        self.assertIn("Contrary signals exist and must be resolved before reuse.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
