from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.evaluation.resource_guard import ResourceGuardInput, check_resource_leaks


def ready_input() -> ResourceGuardInput:
    return ResourceGuardInput.from_dict(
        {
            "task": "Add browser verification.",
            "work_mode": "standard",
            "runtime_context": ["python", "playwright"],
            "resource_risks": [
                {
                    "risk_id": "browser-context",
                    "category": "browser_context",
                    "description": "Browser contexts can remain open after a failed check.",
                    "required": True,
                    "status": "mitigated",
                    "mitigation": "Use a finally block to close context and browser.",
                    "evidence": ["tests/test_browser_cleanup.py"],
                }
            ],
            "lifecycle_checks": [
                {
                    "check_id": "context-cleanup",
                    "resource": "Playwright BrowserContext",
                    "create_path": "browser.new_context()",
                    "cleanup_path": "context.close() in finally",
                    "required": True,
                    "status": "passed",
                    "evidence": ["cleanup path reviewed"],
                }
            ],
            "measurement_checks": [
                {
                    "check_id": "rss-smoke",
                    "metric": "rss",
                    "tool": "process monitor",
                    "threshold": "No unbounded growth across smoke run.",
                    "required": True,
                    "status": "passed",
                    "evidence": ["manual smoke check"],
                }
            ],
        }
    )


class ResourceGuardTests(unittest.TestCase):
    def test_ready_when_risks_are_mitigated(self) -> None:
        report = check_resource_leaks(ready_input())

        self.assertEqual(report["status"], "resource_ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_required_unresolved_risk_requires_rework(self) -> None:
        guard_input = ResourceGuardInput.from_dict(
            {
                "task": "Add worker.",
                "runtime_context": ["python"],
                "resource_risks": [
                    {
                        "risk_id": "worker-queue",
                        "category": "worker",
                        "description": "Queue may grow without a bound.",
                        "required": True,
                        "status": "unresolved",
                    }
                ],
            }
        )

        report = check_resource_leaks(guard_input)

        self.assertTrue(report["requires_rework"])
        self.assertIn("Required resource risk worker-queue is unresolved.", report["gaps"])

    def test_required_lifecycle_cleanup_path_is_required(self) -> None:
        guard_input = ResourceGuardInput.from_dict(
            {
                "task": "Open a file.",
                "runtime_context": ["python"],
                "resource_risks": [
                    {
                        "risk_id": "file-handle",
                        "category": "file_handle",
                        "description": "File handles can leak.",
                        "required": True,
                        "status": "mitigated",
                        "mitigation": "Use context manager.",
                        "evidence": ["with open(...) used"],
                    }
                ],
                "lifecycle_checks": [
                    {
                        "check_id": "file-close",
                        "resource": "file handle",
                        "create_path": "open(path)",
                        "required": True,
                        "status": "passed",
                        "evidence": ["reviewed"],
                    }
                ],
            }
        )

        report = check_resource_leaks(guard_input)

        self.assertTrue(report["requires_rework"])
        self.assertIn("Required lifecycle check file-close is missing cleanup_path.", report["gaps"])

    def test_required_measurement_not_run_requires_rework(self) -> None:
        guard_input = ResourceGuardInput.from_dict(
            {
                "task": "Add cache.",
                "runtime_context": ["node"],
                "resource_risks": [
                    {
                        "risk_id": "cache-growth",
                        "category": "cache",
                        "description": "Cache can grow without eviction.",
                        "required": True,
                        "status": "mitigated",
                        "mitigation": "Bound cache entries.",
                        "evidence": ["max entries configured"],
                    }
                ],
                "measurement_checks": [
                    {
                        "check_id": "heap-used",
                        "metric": "heapUsed",
                        "tool": "process.memoryUsage",
                        "threshold": "No growth after repeated operations.",
                        "required": True,
                        "status": "not_run",
                    }
                ],
            }
        )

        report = check_resource_leaks(guard_input)

        self.assertTrue(report["requires_rework"])
        self.assertIn("Required measurement check heap-used status is not_run.", report["gaps"])


if __name__ == "__main__":
    unittest.main()
