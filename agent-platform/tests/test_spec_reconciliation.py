from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.planning.spec_reconciliation import SpecReconciliationInput, reconcile_spec_source


class SpecReconciliationTests(unittest.TestCase):
    def test_ambiguous_spec_generates_user_answerable_notification(self) -> None:
        report = reconcile_spec_source(
            SpecReconciliationInput.from_dict(
                {
                    "project": "workspace-monitor",
                    "request_summary": "Decide how document preview should behave.",
                    "spec_paths": ["workspace-monitor/specs/2026-06-01-workspace-monitor/spec.ko.md"],
                    "source_paths": ["workspace-monitor/components/MonitorShell.tsx"],
                    "comparison_evidence": ["Spec says preview should be readable; source truncates content."],
                    "plan_history_targets": ["_history/plans/2026/2026-06-01-example.ko.md"],
                    "issues": [
                        {
                            "issue_id": "SSR-001",
                            "issue_type": "ambiguous_spec",
                            "summary": "Spec does not define how much Markdown preview should show.",
                            "severity": "warning",
                            "affected_spec_refs": ["Acceptance criteria: document preview"],
                            "affected_source_paths": ["workspace-monitor/components/MonitorShell.tsx"],
                            "evidence": ["Spec has no preview length rule."],
                            "default_resolution": "ask_user",
                            "questions": [
                                {
                                    "question_id": "Q1",
                                    "question": "Should preview show full Markdown or a capped excerpt?",
                                    "options": ["full", "excerpt", "defer"],
                                    "recommended_option": "excerpt",
                                    "answer_format": "Q1=<full|excerpt|defer>",
                                    "decision_impact": "full updates source behavior; excerpt updates the spec with a cap.",
                                }
                            ],
                        }
                    ],
                }
            )
        )

        self.assertEqual(report["status"], "clarification_required")
        self.assertTrue(report["requires_user_input"])
        self.assertEqual(report["notification_event"]["event_type"], "clarification_needed")
        self.assertIn("Q1=<full|excerpt|defer>", report["notification_event"]["message"])

    def test_update_source_candidate_is_ready_without_user_question(self) -> None:
        report = reconcile_spec_source(
            SpecReconciliationInput.from_dict(
                {
                    "project": "agent-platform",
                    "request_summary": "Fix evaluator behavior.",
                    "spec_paths": ["agent-platform/specs/example/spec.ko.md"],
                    "source_paths": ["agent-platform/src/agent_platform/evaluation/work_evaluator.py"],
                    "comparison_evidence": ["Spec requires missing spec_targets to be blocking in governance mode."],
                    "issues": [
                        {
                            "issue_id": "SSR-002",
                            "issue_type": "spec_source_mismatch",
                            "summary": "Governance mode does not block missing spec_targets.",
                            "severity": "error",
                            "affected_spec_refs": ["REQ-WS-013"],
                            "affected_source_paths": ["agent-platform/src/agent_platform/evaluation/work_evaluator.py"],
                            "observed_spec_behavior": "Governance mode requires spec_targets.",
                            "observed_source_behavior": "Evaluator does not report missing spec_targets.",
                            "evidence": ["Test fixture shows missing spec_targets passes."],
                            "default_resolution": "update_source",
                        }
                    ],
                }
            )
        )

        self.assertEqual(report["status"], "ready_to_reconcile")
        self.assertFalse(report["requires_user_input"])
        self.assertEqual(report["source_update_candidates"], ("SSR-002",))

    def test_mismatch_needs_both_observed_behaviors(self) -> None:
        report = reconcile_spec_source(
            SpecReconciliationInput.from_dict(
                {
                    "project": "agent-platform",
                    "request_summary": "Compare spec and implementation.",
                    "spec_paths": ["agent-platform/specs/example/spec.ko.md"],
                    "source_paths": ["agent-platform/src/example.py"],
                    "comparison_evidence": ["Inspected spec and source."],
                    "issues": [
                        {
                            "issue_id": "SSR-003",
                            "issue_type": "spec_source_mismatch",
                            "summary": "Behavior differs.",
                            "affected_source_paths": ["agent-platform/src/example.py"],
                            "evidence": ["Source differs from spec."],
                            "default_resolution": "update_source",
                        }
                    ],
                }
            )
        )

        self.assertEqual(report["status"], "rework_required")
        self.assertIn("observed_spec_behavior", " ".join(report["gaps"]))


if __name__ == "__main__":
    unittest.main()
