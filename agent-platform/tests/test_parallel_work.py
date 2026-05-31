from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.planning.parallel_work import ParallelWorkPlanInput, plan_parallel_work


def ready_parallel_plan() -> dict:
    return {
        "objective": "Split platform work into safe parallel lanes.",
        "work_mode": "governance",
        "tasks": [
            {
                "task_id": "research",
                "title": "Collect source evidence",
                "owner": "research-agent",
                "scope": "Web and repository research records.",
                "dependencies": [],
                "touch_paths": ["_history/web-searches/2026/parallel.ko.md", "_research/topics/agent-planning/parallel.ko.md"],
                "output_targets": ["_history/web-searches/2026/parallel.ko.md"],
                "verification_steps": ["Run grounding check on source claims."],
                "risk_level": "low",
                "parallelizable": True,
            },
            {
                "task_id": "implementation",
                "title": "Implement planner",
                "owner": "coding-agent",
                "scope": "Python planner and tests.",
                "dependencies": [],
                "touch_paths": ["agent-platform/src/agent_platform/planning/parallel_work.py", "agent-platform/tests/test_parallel_work.py"],
                "output_targets": ["agent-platform/src/agent_platform/planning/parallel_work.py"],
                "verification_steps": ["Run unit tests."],
                "risk_level": "medium",
                "parallelizable": True,
            },
            {
                "task_id": "docs",
                "title": "Document workflow",
                "owner": "docs-agent",
                "scope": "Workflow and prompt documentation.",
                "dependencies": ["implementation"],
                "touch_paths": ["_ops/workflows/52-parallel-work-planning.md", "_ops/prompts/82-parallel-work-planning.md"],
                "output_targets": ["_ops/workflows/52-parallel-work-planning.md"],
                "verification_steps": ["Run workspace index check."],
                "risk_level": "low",
                "parallelizable": True,
            },
        ],
        "shared_resources": ["git index", "origin/main", "_ops/coordination/status.json"],
        "conflict_controls": [
            "Each lane records touch_paths before execution.",
            "Lanes that touch overlapping paths must depend on each other or be serialized.",
        ],
        "coordination_targets": ["_ops/coordination/status.json", "_ops/coordination/board.ko.md"],
        "merge_strategy": "Merge lane outputs only after lane verification passes, then run full final checks.",
        "communication_checkpoints": ["Update coordination status after each batch.", "Report blockers before changing shared files."],
        "verification_steps": ["Run full unit tests.", "Run task board and workspace index checks."],
        "rollback_plan": ["Stop the failed lane, keep completed lanes staged separately, and revert only the failed lane's own files when explicitly approved."],
        "source_value_provenance": ["Dependency assumptions <- touch_paths and repository map checked before planning."],
        "plan_evidence": ["Batch 1 can run in parallel because research and implementation touch disjoint paths."],
        "plan_history_targets": ["_history/plans/2026/parallel.ko.md"],
    }


class ParallelWorkTests(unittest.TestCase):
    def test_ready_when_independent_batch_exists(self) -> None:
        report = plan_parallel_work(ParallelWorkPlanInput.from_dict(ready_parallel_plan()))

        self.assertEqual(report["status"], "ready_to_parallelize")
        self.assertFalse(report["requires_rework"])
        self.assertTrue(report["parallelism_available"])
        self.assertEqual(report["execution_batches"][0], ["implementation", "research"])
        self.assertEqual(report["gaps"], [])

    def test_cycle_requires_rework(self) -> None:
        data = ready_parallel_plan()
        data["tasks"][0]["dependencies"] = ["docs"]
        data["tasks"][2]["dependencies"] = ["implementation", "research"]

        report = plan_parallel_work(ParallelWorkPlanInput.from_dict(data))

        self.assertEqual(report["status"], "rework_required")
        self.assertTrue(any("cycle" in gap for gap in report["gaps"]))

    def test_unknown_dependency_requires_rework(self) -> None:
        data = ready_parallel_plan()
        data["tasks"][1]["dependencies"] = ["missing"]

        report = plan_parallel_work(ParallelWorkPlanInput.from_dict(data))

        self.assertIn("implementation depends on unknown task_id: missing.", report["gaps"])

    def test_overlapping_parallel_paths_require_rework(self) -> None:
        data = ready_parallel_plan()
        data["tasks"][1]["touch_paths"] = ["_history/web-searches/2026/parallel.ko.md"]

        report = plan_parallel_work(ParallelWorkPlanInput.from_dict(data))

        self.assertEqual(report["status"], "rework_required")
        self.assertTrue(any("touch overlapping paths" in gap for gap in report["gaps"]))

    def test_sequential_plan_is_reported_without_gap(self) -> None:
        data = ready_parallel_plan()
        data["tasks"][1]["dependencies"] = ["research"]
        data["tasks"][2]["dependencies"] = ["implementation"]

        report = plan_parallel_work(ParallelWorkPlanInput.from_dict(data))

        self.assertEqual(report["status"], "sequential_required")
        self.assertFalse(report["requires_rework"])
        self.assertFalse(report["parallelism_available"])
        self.assertIn("No independent task batch was found; execute sequentially or split work differently.", report["warnings"])

    def test_coordination_and_conflict_controls_are_required(self) -> None:
        data = ready_parallel_plan()
        data["conflict_controls"] = []
        data["coordination_targets"] = []

        report = plan_parallel_work(ParallelWorkPlanInput.from_dict(data))

        self.assertIn(
            "Conflict controls are missing; record file ownership, lock, branch, or handoff rules for parallel work.",
            report["gaps"],
        )
        self.assertIn(
            "Coordination targets are missing; record where active lanes and status will be tracked.",
            report["gaps"],
        )


if __name__ == "__main__":
    unittest.main()
