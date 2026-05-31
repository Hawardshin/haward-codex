from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.core.models import AgentSpec, ExecutionRequest, ExecutionResult
from agent_platform.core.runtime import PythonFunctionRuntime
from agent_platform.oss.evaluation import OpenSourceCandidate, evaluate_candidate


class RuntimeTests(unittest.TestCase):
    def test_python_function_runtime_wraps_string_output(self) -> None:
        runtime = PythonFunctionRuntime(lambda agent, request: f"{agent.name}: {request.prompt}")

        result = runtime.run(
            AgentSpec(name="agent", description="Agent"),
            ExecutionRequest(prompt="hello"),
        )

        self.assertEqual(result.output, "agent: hello")
        self.assertEqual(result.trace, ("python-function-runtime",))

    def test_python_function_runtime_accepts_execution_result(self) -> None:
        expected = ExecutionResult(output="done", trace=("custom",))
        runtime = PythonFunctionRuntime(lambda agent, request: expected)

        result = runtime.run(
            AgentSpec(name="agent", description="Agent"),
            ExecutionRequest(prompt="hello"),
        )

        self.assertEqual(result, expected)


class OpenSourceEvaluationTests(unittest.TestCase):
    def test_evaluate_candidate_recommends_strong_fit(self) -> None:
        result = evaluate_candidate(
            OpenSourceCandidate(
                name="candidate",
                purpose="agent orchestration",
                license_name="MIT",
                maintained=5,
                documentation=4,
                community=4,
                fit=5,
                lock_in_risk=1,
            )
        )

        self.assertEqual(result["recommendation"], "adopt")
        self.assertEqual(result["installation_status"], "not_required")

    def test_evaluate_candidate_rejects_invalid_score(self) -> None:
        with self.assertRaises(ValueError):
            evaluate_candidate(
                OpenSourceCandidate(
                    name="candidate",
                    purpose="agent orchestration",
                    license_name="MIT",
                    maintained=6,
                    documentation=4,
                    community=4,
                    fit=5,
                    lock_in_risk=1,
                )
            )

    def test_installation_requires_review_fields(self) -> None:
        result = evaluate_candidate(
            OpenSourceCandidate(
                name="candidate",
                purpose="agent orchestration",
                license_name="MIT",
                maintained=5,
                documentation=4,
                community=4,
                fit=5,
                lock_in_risk=1,
                install_needed=True,
            )
        )

        self.assertEqual(result["recommendation"], "adopt")
        self.assertEqual(result["installation_status"], "installation_review_required")
        self.assertIn("install_command is missing.", result["installation_gaps"])
        self.assertIn("installation_record_path is missing.", result["installation_gaps"])

    def test_installation_ready_when_review_is_complete(self) -> None:
        result = evaluate_candidate(
            OpenSourceCandidate(
                name="candidate",
                purpose="agent orchestration",
                license_name="MIT",
                maintained=5,
                documentation=4,
                community=4,
                fit=5,
                lock_in_risk=1,
                install_needed=True,
                installation_scope="project",
                install_command="python3 -m pip install candidate",
                dependency_record_path="agent-platform/pyproject.toml",
                installation_record_path="_history/installations/2026/2026-05-31-candidate.ko.md",
                environment_path="agent-platform/.venv",
                version_or_lock_status="Pinned in pyproject.toml and locked by the project lock file.",
                post_install_verification="python3 -c 'import candidate' and unit tests passed.",
                security_review="Checked OpenSSF Scorecard, release activity, and dependency risk.",
                license_review="MIT license is compatible with this workspace.",
                rollback_plan="Remove dependency entry and adapter, then rerun tests.",
            )
        )

        self.assertEqual(result["recommendation"], "adopt")
        self.assertEqual(result["installation_status"], "ready_to_install")
        self.assertEqual(result["installation_gaps"], [])


if __name__ == "__main__":
    unittest.main()
