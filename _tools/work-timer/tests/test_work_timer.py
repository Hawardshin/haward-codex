from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from work_timer import check_timing, phase_duration_seconds, summarize_timing


POLICY = {
    "measurement_quality_values": ["measured", "partial", "not_measured"],
    "phase_status_values": ["pending", "in_progress", "completed", "blocked", "skipped"],
    "bottleneck_thresholds": {
        "phase_seconds_warn": 900,
        "phase_total_ratio_warn": 0.35,
    },
}


class WorkTimerTests(unittest.TestCase):
    def test_summarize_finds_slowest_phase(self) -> None:
        timing = {
            "task_id": "task-1",
            "title": "Example",
            "work_mode": "standard",
            "measurement_quality": "measured",
            "phases": [
                {"phase_id": "research", "label": "Research", "status": "completed", "duration_seconds": 120},
                {"phase_id": "implementation", "label": "Implementation", "status": "completed", "duration_seconds": 1500},
            ],
        }

        summary = summarize_timing(timing, POLICY)

        self.assertEqual(summary["total_measured_seconds"], 1620.0)
        self.assertEqual(summary["slowest_phase"]["phase_id"], "implementation")
        self.assertEqual(summary["bottleneck_phases"][0]["phase_id"], "implementation")

    def test_check_allows_partial_unmeasured_phase_with_warning(self) -> None:
        timing = {
            "task_id": "task-2",
            "title": "Partial",
            "work_mode": "governance",
            "measurement_quality": "partial",
            "phases": [
                {"phase_id": "web", "label": "Web", "status": "completed", "measurement": "not_measured"},
                {"phase_id": "verification", "label": "Verification", "status": "completed", "duration_seconds": 30},
            ],
        }

        report = check_timing(timing, POLICY)

        self.assertFalse(report["requires_rework"])
        self.assertIn("Some phases are unmeasured", " ".join(report["warnings"]))

    def test_check_rejects_measured_record_with_unmeasured_completed_phase(self) -> None:
        timing = {
            "task_id": "task-3",
            "title": "Invalid",
            "work_mode": "standard",
            "measurement_quality": "measured",
            "phases": [
                {"phase_id": "web", "label": "Web", "status": "completed"},
            ],
        }

        report = check_timing(timing, POLICY)

        self.assertTrue(report["requires_rework"])
        self.assertIn("measurement_quality is measured", " ".join(report["gaps"]))

    def test_duration_can_be_calculated_from_datetimes(self) -> None:
        phase = {
            "phase_id": "verification",
            "label": "Verification",
            "status": "completed",
            "started_at": "2026-06-01T18:00:00+0900",
            "ended_at": "2026-06-01T18:01:30+0900",
        }

        self.assertEqual(phase_duration_seconds(phase), 90.0)

    def test_negative_duration_is_rework_gap(self) -> None:
        timing = {
            "task_id": "task-4",
            "title": "Negative",
            "work_mode": "standard",
            "measurement_quality": "measured",
            "phases": [
                {"phase_id": "bad", "label": "Bad", "status": "completed", "duration_seconds": -1},
            ],
        }

        report = check_timing(timing, POLICY)

        self.assertTrue(report["requires_rework"])
        self.assertIn("must not be negative", " ".join(report["gaps"]))


if __name__ == "__main__":
    unittest.main()
