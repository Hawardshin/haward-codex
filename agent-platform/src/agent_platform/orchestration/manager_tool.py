"""Plan manager-as-tools orchestration from registered agent specs."""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any

from agent_platform.core.models import AgentSpec
from agent_platform.core.registry import AgentRegistry


JsonMap = dict[str, Any]

DEFAULT_MANAGER_AGENT = "agent-orchestrator-agent"
DEFAULT_PATTERN = "supervisor_router"
STOPWORDS = {
    "a",
    "an",
    "and",
    "as",
    "by",
    "for",
    "from",
    "in",
    "into",
    "of",
    "on",
    "or",
    "the",
    "to",
    "with",
}


@dataclass(frozen=True)
class ManagerToolPlanInput:
    """Input for creating a manager agent plus subagent tool plan."""

    goal: str
    context: str = ""
    manager_agent: str = DEFAULT_MANAGER_AGENT
    preferred_pattern: str = DEFAULT_PATTERN
    requested_agents: tuple[str, ...] = ()
    required_capabilities: tuple[str, ...] = ()
    allowed_tools: tuple[str, ...] = ()
    blocked_tools: tuple[str, ...] = ()
    human_checkpoint_triggers: tuple[str, ...] = ()
    output_targets: tuple[str, ...] = ()
    validation_targets: tuple[str, ...] = ()
    constraints: tuple[str, ...] = ()
    max_subagents: int = 5

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ManagerToolPlanInput":
        return cls(
            goal=_required_string(data, "goal"),
            context=_optional_string(data.get("context", ""), "context"),
            manager_agent=_optional_string(data.get("manager_agent", DEFAULT_MANAGER_AGENT), "manager_agent")
            or DEFAULT_MANAGER_AGENT,
            preferred_pattern=_optional_string(data.get("preferred_pattern", DEFAULT_PATTERN), "preferred_pattern")
            or DEFAULT_PATTERN,
            requested_agents=_tuple_of_strings(data.get("requested_agents", ()), "requested_agents"),
            required_capabilities=_tuple_of_strings(data.get("required_capabilities", ()), "required_capabilities"),
            allowed_tools=_tuple_of_strings(data.get("allowed_tools", ()), "allowed_tools"),
            blocked_tools=_tuple_of_strings(data.get("blocked_tools", ()), "blocked_tools"),
            human_checkpoint_triggers=_tuple_of_strings(
                data.get("human_checkpoint_triggers", ()), "human_checkpoint_triggers"
            ),
            output_targets=_tuple_of_strings(data.get("output_targets", ()), "output_targets"),
            validation_targets=_tuple_of_strings(data.get("validation_targets", ()), "validation_targets"),
            constraints=_tuple_of_strings(data.get("constraints", ()), "constraints"),
            max_subagents=_optional_int(data.get("max_subagents", 5), "max_subagents"),
        )


def plan_manager_tool_orchestration(
    plan_input: ManagerToolPlanInput,
    agent_registry: AgentRegistry,
    orchestration_registry: JsonMap,
) -> JsonMap:
    """Build a deterministic manager-as-tools plan from local registry data."""

    gaps: list[str] = []
    warnings: list[str] = []

    if not plan_input.goal.strip():
        gaps.append("goal is required.")
    if plan_input.max_subagents < 1:
        gaps.append("max_subagents must be at least 1.")

    agents_by_name = {agent.name: agent for agent in agent_registry.list_agents()}
    manager = agents_by_name.get(plan_input.manager_agent)
    if manager is None:
        gaps.append(f"manager_agent '{plan_input.manager_agent}' is not registered.")

    patterns_by_id = _patterns_by_id(orchestration_registry)
    selected_pattern = patterns_by_id.get(plan_input.preferred_pattern)
    if selected_pattern is None:
        gaps.append(f"preferred_pattern '{plan_input.preferred_pattern}' is not in the orchestration registry.")
        selected_pattern = patterns_by_id.get(DEFAULT_PATTERN, {})

    selected_agents, scoring_notes = _select_subagents(plan_input, agents_by_name, warnings, gaps)
    if not selected_agents:
        gaps.append("No subagents were selected; request agents explicitly or add required_capabilities that match registered specs.")

    subagent_tools = [
        _subagent_tool(agent, plan_input, scoring_notes.get(agent.name, ("explicitly requested",))) for agent in selected_agents
    ]
    controls = _controls(orchestration_registry)
    default_validation_commands = [
        "PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json",
        "PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents",
        f"PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/{plan_input.manager_agent}.json",
    ]
    validation_commands = tuple(dict.fromkeys((*default_validation_commands, *plan_input.validation_targets)))

    status = "rework_required" if gaps else "ready_to_orchestrate"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "orchestration_model": "manager_as_tools",
        "manager_agent": _agent_ref(manager) if manager is not None else {"name": plan_input.manager_agent, "registered": False},
        "selected_pattern": {
            "pattern_id": plan_input.preferred_pattern,
            "coordination_model": selected_pattern.get("coordination_model", ""),
            "state_contract": selected_pattern.get("state_contract", {}),
            "handoff_contract": selected_pattern.get("handoff_contract", {}),
            "failure_policy": selected_pattern.get("failure_policy", {}),
        },
        "subagent_tools": subagent_tools,
        "execution_plan": _execution_plan(plan_input, subagent_tools),
        "controls": controls,
        "human_checkpoints": _human_checkpoints(plan_input, controls),
        "observability": {
            "minimum_records": selected_pattern.get("observability_contract", {}).get(
                "minimum_records",
                ["route decision", "subagent tool calls", "merge decision", "validation result"],
            ),
            "trace_fields": [
                "goal",
                "manager_agent",
                "selected_pattern",
                "subagent_tools",
                "routing_reason",
                "tool_outputs",
                "merge_decision",
                "validation_commands",
            ],
        },
        "validation_commands": list(validation_commands),
        "output_targets": list(plan_input.output_targets),
        "constraints": list(plan_input.constraints),
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve manager tool orchestration gap: {gap}" for gap in gaps],
    }


def _select_subagents(
    plan_input: ManagerToolPlanInput,
    agents_by_name: dict[str, AgentSpec],
    warnings: list[str],
    gaps: list[str],
) -> tuple[list[AgentSpec], dict[str, tuple[str, ...]]]:
    if plan_input.requested_agents:
        selected = []
        notes: dict[str, tuple[str, ...]] = {}
        for name in plan_input.requested_agents:
            if name == plan_input.manager_agent:
                gaps.append("manager_agent cannot also be listed in requested_agents.")
                continue
            agent = agents_by_name.get(name)
            if agent is None:
                gaps.append(f"requested agent '{name}' is not registered.")
                continue
            selected.append(agent)
            notes[name] = ("explicitly requested",)
        return selected[: plan_input.max_subagents], notes

    query = " ".join(
        (
            plan_input.goal,
            plan_input.context,
            " ".join(plan_input.required_capabilities),
            " ".join(plan_input.output_targets),
        )
    )
    scored: list[tuple[int, str, AgentSpec, tuple[str, ...]]] = []
    for agent in agents_by_name.values():
        if agent.name == plan_input.manager_agent:
            continue
        score, reasons = _score_agent(query, plan_input.required_capabilities, agent)
        if score > 0:
            scored.append((score, agent.name, agent, reasons))

    scored.sort(key=lambda item: (-item[0], item[1]))
    selected = [agent for _, _, agent, _ in scored[: plan_input.max_subagents]]
    notes = {agent.name: reasons for _, _, agent, reasons in scored[: plan_input.max_subagents]}
    if not selected and agents_by_name:
        warnings.append("No registered subagent matched the goal or required capabilities.")
    return selected, notes


def _score_agent(query: str, required_capabilities: tuple[str, ...], agent: AgentSpec) -> tuple[int, tuple[str, ...]]:
    haystack = _agent_haystack(agent)
    query_tokens = _tokens(query)
    agent_tokens = _tokens(haystack)
    overlaps = sorted(query_tokens.intersection(agent_tokens))
    score = len(overlaps)
    reasons = [f"keyword:{token}" for token in overlaps[:8]]

    normalized_haystack = haystack.lower()
    for capability in required_capabilities:
        capability_tokens = _tokens(capability)
        if capability.lower() in normalized_haystack:
            score += 4
            reasons.append(f"capability:{capability}")
        else:
            matched = sorted(capability_tokens.intersection(agent_tokens))
            if matched:
                score += len(matched)
                reasons.append(f"capability_tokens:{'/'.join(matched[:4])}")

    return score, tuple(reasons or ("metadata match",))


def _subagent_tool(agent: AgentSpec, plan_input: ManagerToolPlanInput, match_reasons: tuple[str, ...]) -> JsonMap:
    allowed_tool_set = set(plan_input.allowed_tools)
    blocked_tool_set = set(plan_input.blocked_tools)
    agent_tools = [tool for tool in agent.tools if tool not in blocked_tool_set]
    if allowed_tool_set:
        agent_tools = [tool for tool in agent_tools if tool in allowed_tool_set]

    return {
        "tool_name": f"run_{_slug(agent.name)}",
        "agent_name": agent.name,
        "tool_description": agent.description,
        "match_reasons": list(match_reasons),
        "input_contract": agent.metadata.get(
            "input_schema",
            "structured task payload with task_id, scope, inputs, expected_outputs, constraints, and blocked_decisions",
        ),
        "output_contract": agent.metadata.get(
            "output_contract",
            "structured agent result with summary, artifacts, evidence, risks, validation, and next_action",
        ),
        "allowed_tools": agent_tools,
        "blocked_tools": [tool for tool in agent.tools if tool in blocked_tool_set],
        "policy": agent.metadata.get("policy", ""),
        "docs_targets": agent.metadata.get("docs_targets", []),
    }


def _execution_plan(plan_input: ManagerToolPlanInput, subagent_tools: list[JsonMap]) -> list[JsonMap]:
    invocation_mode = "parallel" if plan_input.preferred_pattern == "parallel_fanout_merge" else "bounded_sequence"
    return [
        {
            "stage_id": "route",
            "owner": plan_input.manager_agent,
            "action": "Classify the goal, confirm constraints, and choose which subagent tools to call.",
            "required_output": "routing_reason and selected subagent tool list",
        },
        {
            "stage_id": "invoke_subagent_tools",
            "owner": plan_input.manager_agent,
            "action": f"Call selected subagent tools using {invocation_mode}.",
            "tools": [tool["tool_name"] for tool in subagent_tools],
            "required_output": "tool_outputs with provenance, risks, and validation notes",
        },
        {
            "stage_id": "merge",
            "owner": plan_input.manager_agent,
            "action": "Merge subagent outputs, resolve contradictions, and keep the manager in control of the final answer.",
            "required_output": "merged_result and unresolved_risks",
        },
        {
            "stage_id": "evaluate",
            "owner": plan_input.manager_agent,
            "action": "Run required validation commands and record close-out evidence.",
            "required_output": "validation_result, omissions, and next_action",
        },
    ]


def _human_checkpoints(plan_input: ManagerToolPlanInput, controls: list[JsonMap]) -> JsonMap:
    default_triggers = [
        "destructive file operations",
        "secret-bearing input",
        "new dependency installation",
        "public release",
        "cost-impacting external run",
        "irreversible trade-off",
    ]
    return {
        "triggers": list(dict.fromkeys((*default_triggers, *plan_input.human_checkpoint_triggers))),
        "control": next((control for control in controls if control.get("control_id") == "human_checkpoint"), {}),
    }


def _agent_ref(agent: AgentSpec) -> JsonMap:
    return {
        "name": agent.name,
        "runtime": agent.runtime,
        "description": agent.description,
        "tools": list(agent.tools),
        "status": agent.metadata.get("status", "unknown"),
    }


def _patterns_by_id(orchestration_registry: JsonMap) -> dict[str, JsonMap]:
    patterns = orchestration_registry.get("orchestration_patterns", [])
    if not isinstance(patterns, list):
        return {}
    return {str(pattern.get("pattern_id")): pattern for pattern in patterns if isinstance(pattern, dict)}


def _controls(orchestration_registry: JsonMap) -> list[JsonMap]:
    controls = orchestration_registry.get("orchestration_controls", [])
    if not isinstance(controls, list):
        return []
    return [control for control in controls if isinstance(control, dict)]


def _agent_haystack(agent: AgentSpec) -> str:
    metadata_values = " ".join(str(value) for value in agent.metadata.values() if isinstance(value, str))
    return " ".join((agent.name, agent.description, " ".join(agent.skills), " ".join(agent.tools), metadata_values))


def _tokens(text: str) -> set[str]:
    return {token for token in re.findall(r"[a-z0-9_]+", text.lower()) if len(token) > 2 and token not in STOPWORDS}


def _slug(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")
    return slug or "agent"


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if value is None:
        return ()
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_string(value: Any, field_name: str) -> str:
    if value is None:
        return ""
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_int(value: Any, field_name: str) -> int:
    if not isinstance(value, int):
        raise TypeError(f"{field_name} must be an integer.")
    return value
