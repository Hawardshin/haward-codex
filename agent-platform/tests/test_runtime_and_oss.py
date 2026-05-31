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


if __name__ == "__main__":
    unittest.main()
