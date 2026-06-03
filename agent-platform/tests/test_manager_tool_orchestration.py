import unittest

from agent_platform.core.models import AgentSpec
from agent_platform.core.registry import AgentRegistry
from agent_platform.orchestration.manager_tool import ManagerToolPlanInput, plan_manager_tool_orchestration


def registry_with_agents() -> AgentRegistry:
    registry = AgentRegistry()
    registry.add(
        AgentSpec(
            name="agent-orchestrator-agent",
            description="Coordinates platform agents.",
            tools=("agent-platform:plan-agent-orchestration",),
            metadata={"status": "active"},
        )
    )
    registry.add(
        AgentSpec(
            name="research-insight-planner-agent",
            description="Collects and ranks research evidence before planning.",
            tools=("_tools/source-collector", "web-search"),
            metadata={
                "status": "active",
                "input_schema": "research input",
                "output_contract": "ranked evidence and plan insights",
                "policy": "Use official sources first.",
            },
        )
    )
    registry.add(
        AgentSpec(
            name="work-evaluator-agent",
            description="Evaluates outputs against requirements and validation evidence.",
            tools=("agent-platform:evaluate-work",),
            metadata={
                "status": "active",
                "input_schema": "evaluation input",
                "output_contract": "ready_to_close or rework_required",
            },
        )
    )
    return registry


def orchestration_registry() -> dict:
    return {
        "orchestration_patterns": [
            {
                "pattern_id": "supervisor_router",
                "coordination_model": "Supervisor selects subagent tools and owns final merge.",
                "state_contract": {"owner": "supervisor"},
                "handoff_contract": {"mode": "supervisor_to_agent"},
                "observability_contract": {"minimum_records": ["route decision", "agent outputs"]},
                "failure_policy": {"retry": "bounded"},
            },
            {
                "pattern_id": "parallel_fanout_merge",
                "coordination_model": "Fan out independent lanes and merge.",
                "state_contract": {"owner": "merge gate"},
                "handoff_contract": {"mode": "lane_output_to_merge_gate"},
                "observability_contract": {"minimum_records": ["lane start/end", "merge decision"]},
                "failure_policy": {"retry": "lane only"},
            },
        ],
        "orchestration_controls": [
            {"control_id": "human_checkpoint", "rule": "Human checkpoints are required.", "verification": ["inbox"]},
            {"control_id": "evaluation", "rule": "Evaluate output.", "verification": ["evaluate-work"]},
        ],
    }


class ManagerToolOrchestrationTests(unittest.TestCase):
    def test_requested_agents_become_subagent_tools(self) -> None:
        report = plan_manager_tool_orchestration(
            ManagerToolPlanInput(
                goal="Use research and evaluation subagents for an orchestration plan.",
                requested_agents=("research-insight-planner-agent", "work-evaluator-agent"),
                blocked_tools=("web-search",),
            ),
            registry_with_agents(),
            orchestration_registry(),
        )

        self.assertEqual(report["status"], "ready_to_orchestrate")
        self.assertEqual(
            ["run_research_insight_planner_agent", "run_work_evaluator_agent"],
            [tool["tool_name"] for tool in report["subagent_tools"]],
        )
        self.assertEqual(["web-search"], report["subagent_tools"][0]["blocked_tools"])

    def test_auto_selects_agents_from_goal_and_capabilities(self) -> None:
        report = plan_manager_tool_orchestration(
            ManagerToolPlanInput(
                goal="Rank research evidence and validate the final work.",
                required_capabilities=("research evidence", "evaluate output"),
            ),
            registry_with_agents(),
            orchestration_registry(),
        )

        selected = {tool["agent_name"] for tool in report["subagent_tools"]}
        self.assertIn("research-insight-planner-agent", selected)
        self.assertIn("work-evaluator-agent", selected)
        self.assertEqual("ready_to_orchestrate", report["status"])

    def test_missing_requested_agent_requires_rework(self) -> None:
        report = plan_manager_tool_orchestration(
            ManagerToolPlanInput(goal="Coordinate missing agent.", requested_agents=("missing-agent",)),
            registry_with_agents(),
            orchestration_registry(),
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn("missing-agent", "\n".join(report["gaps"]))

    def test_invalid_pattern_requires_rework(self) -> None:
        report = plan_manager_tool_orchestration(
            ManagerToolPlanInput(
                goal="Coordinate research.",
                requested_agents=("research-insight-planner-agent",),
                preferred_pattern="unknown_pattern",
            ),
            registry_with_agents(),
            orchestration_registry(),
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn("unknown_pattern", "\n".join(report["gaps"]))

    def test_manager_cannot_call_itself_as_subagent(self) -> None:
        report = plan_manager_tool_orchestration(
            ManagerToolPlanInput(goal="Coordinate self.", requested_agents=("agent-orchestrator-agent",)),
            registry_with_agents(),
            orchestration_registry(),
        )

        self.assertTrue(report["requires_rework"])
        self.assertIn("manager_agent cannot also be listed", "\n".join(report["gaps"]))


if __name__ == "__main__":
    unittest.main()
