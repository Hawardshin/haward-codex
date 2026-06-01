from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.integrations.cli_pipeline import CliPipelineInput, PipelineArtifact, check_cli_pipeline


def ready_input() -> CliPipelineInput:
    return CliPipelineInput.from_dict(
        {
            "pipeline_id": "demo-search-to-summary",
            "purpose": "Run two CLI adapters as an explicit process graph.",
            "work_mode": "governance",
            "risk_level": "medium",
            "processes": [
                {
                    "process_id": "collect_sources",
                    "adapter_id": "source-collector",
                    "command": "source-collector",
                    "args": ["collect", "--query-plan", "query-plan.json"],
                    "cwd": "_tools/source-collector",
                    "env_keys": ["PYTHONPATH"],
                    "timeout_seconds": 120,
                    "max_output_bytes": 1000000,
                    "required": True,
                },
                {
                    "process_id": "summarize_sources",
                    "adapter_id": "agent-platform",
                    "command": "python3",
                    "args": ["-m", "agent_platform.cli", "plan-from-research", "plan.json"],
                    "cwd": "agent-platform",
                    "env_keys": ["PYTHONPATH"],
                    "timeout_seconds": 120,
                    "max_output_bytes": 1000000,
                    "required": True,
                },
            ],
            "pipes": [
                {
                    "pipe_id": "collector_stdout_to_planner_stdin",
                    "from_process": "collect_sources",
                    "from_stream": "stdout",
                    "to_process": "summarize_sources",
                    "to_stream": "stdin",
                    "mode": "pipe",
                    "required": True,
                }
            ],
            "artifacts": [],
            "execution_policy": {
                "shell_allowed": False,
                "argv_arrays_required": True,
                "explicit_pipe_graph_required": True,
                "explicit_cwd_required": True,
                "adapter_allowlist": ["source-collector", "agent-platform"],
            },
            "safety_controls": [
                "adapter_allowlist",
                "argv_arguments",
                "shell_disabled_by_default",
                "explicit_cwd_boundary",
                "environment_allowlist",
                "secret_redaction",
                "output_redaction",
                "permission_scope",
                "fallback_behavior",
                "audit_logging",
            ],
            "resource_controls": {
                "timeout_policy": "Each process has timeout_seconds and the orchestrator cancels downstream on upstream timeout.",
                "max_output_bytes": 2000000,
                "cancellation_policy": "Cancel child processes and close pipe handles on failure.",
                "cleanup_policy": "Wait for each process and close stdin/stdout/stderr handles.",
                "orphan_process_policy": "Terminate process group when the pipeline is cancelled.",
                "backpressure_policy": "Prefer streaming pipes or bounded temp artifacts for large outputs.",
            },
            "merge_strategy": "The downstream process receives only accepted collector output and emits the final structured result.",
            "source_provenance": ["Python subprocess docs", "Node child_process docs"],
            "plan_evidence": ["CLI adapter registry requires explicit execution contracts."],
            "verification": ["check-cli-pipeline demo-search-to-summary.json: pipeline_ready"],
            "rollback_plan": ["Disable the pipeline and run the two CLI adapters manually."],
        }
    )


class CliPipelineTests(unittest.TestCase):
    def test_ready_pipeline(self) -> None:
        report = check_cli_pipeline(ready_input())

        self.assertEqual(report["status"], "pipeline_ready")
        self.assertFalse(report["requires_rework"])
        self.assertEqual(report["gaps"], [])

    def test_duplicate_process_id_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        first_process = data["processes"][0].__dict__.copy()
        data["processes"] = (
            data["processes"][0],
            data["processes"][1].__class__(**{**data["processes"][1].__dict__, "process_id": first_process["process_id"]}),
        )
        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertIn("Duplicate process_id 'collect_sources'.", report["gaps"])

    def test_shell_metachar_in_command_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        data["processes"] = (
            data["processes"][0].__class__(**{**data["processes"][0].__dict__, "command": "source-collector | jq"}),
            data["processes"][1],
        )
        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("command contains shell metacharacters" in gap for gap in report["gaps"]))

    def test_pipe_to_unknown_process_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        data["pipes"] = (
            data["pipes"][0].__class__(**{**data["pipes"][0].__dict__, "to_process": "missing_process"}),
        )
        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertIn("Pipe collector_stdout_to_planner_stdin references unknown to_process 'missing_process'.", report["gaps"])

    def test_artifact_handoff_pipeline_ready(self) -> None:
        data = ready_input().__dict__.copy()
        data["artifacts"] = (
            PipelineArtifact.from_dict(
                {
                "artifact_id": "collector_output",
                "kind": "temp_file",
                "path": "agent-platform/artifacts/cli-pipelines/demo-search-to-summary/collector-output.jsonl",
                "produced_by": "collect_sources",
                "consumed_by": ["summarize_sources"],
                "required": True,
                "max_bytes": 2000000,
                "format": "jsonl",
                "retention_policy": "",
                "cleanup_policy": "Delete after summarize_sources accepts the structured result.",
                "provenance": ["collect_sources stdout"],
                "validation": ["jsonl parses", "size stays under max_bytes"],
                }
            ),
        )
        data["pipes"] = (
            data["pipes"][0].__class__(
                **{
                    **data["pipes"][0].__dict__,
                    "mode": "artifact",
                    "artifact_id": "collector_output",
                }
            ),
        )

        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertEqual(report["status"], "pipeline_ready")
        self.assertEqual(report["checks"]["artifact_count"], 1)

    def test_artifact_path_traversal_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        data["artifacts"] = (
            PipelineArtifact.from_dict(
                {
                "artifact_id": "unsafe_output",
                "kind": "temp_file",
                "path": "../outside.json",
                "produced_by": "collect_sources",
                "consumed_by": ["summarize_sources"],
                "required": True,
                "max_bytes": 100,
                "format": "json",
                "cleanup_policy": "Delete after use.",
                "validation": ["json parses"],
                }
            ),
        )
        data["pipes"] = (
            data["pipes"][0].__class__(
                **{
                    **data["pipes"][0].__dict__,
                    "mode": "artifact",
                    "artifact_id": "unsafe_output",
                }
            ),
        )

        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("path must be workspace-relative" in gap for gap in report["gaps"]))

    def test_file_pipe_missing_artifact_id_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        data["pipes"] = (
            data["pipes"][0].__class__(**{**data["pipes"][0].__dict__, "mode": "file"}),
        )
        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("artifact_id is missing" in gap for gap in report["gaps"]))

    def test_artifact_unknown_process_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        data["artifacts"] = (
            PipelineArtifact.from_dict(
                {
                "artifact_id": "collector_output",
                "kind": "temp_file",
                "path": "agent-platform/artifacts/cli-pipelines/demo-search-to-summary/collector-output.jsonl",
                "produced_by": "missing_process",
                "consumed_by": ["summarize_sources"],
                "required": True,
                "max_bytes": 100,
                "format": "jsonl",
                "cleanup_policy": "Delete after use.",
                "validation": ["jsonl parses"],
                }
            ),
        )
        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertIn("Artifact collector_output references unknown produced_by process 'missing_process'.", report["gaps"])

    def test_missing_safety_controls_requires_rework(self) -> None:
        data = ready_input().__dict__.copy()
        data["safety_controls"] = ("adapter_allowlist",)
        report = check_cli_pipeline(CliPipelineInput(**data))

        self.assertTrue(report["requires_rework"])
        self.assertTrue(any("safety_controls is missing required controls" in gap for gap in report["gaps"]))


if __name__ == "__main__":
    unittest.main()
