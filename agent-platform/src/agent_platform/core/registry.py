"""Agent spec loading and in-memory registry."""

from __future__ import annotations

import json
from pathlib import Path

from agent_platform.core.models import AgentSpec


class AgentRegistry:
    """Small registry for declarative agent specs."""

    def __init__(self) -> None:
        self._agents: dict[str, AgentSpec] = {}

    def add(self, agent: AgentSpec) -> None:
        if agent.name in self._agents:
            raise ValueError(f"Duplicate agent name: {agent.name}")
        self._agents[agent.name] = agent

    def get(self, name: str) -> AgentSpec:
        try:
            return self._agents[name]
        except KeyError as exc:
            raise KeyError(f"Unknown agent: {name}") from exc

    def list_agents(self) -> tuple[AgentSpec, ...]:
        return tuple(self._agents[name] for name in sorted(self._agents))


def load_agent_spec(path: Path) -> AgentSpec:
    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    return AgentSpec.from_dict(data)


def load_registry_dir(path: Path) -> AgentRegistry:
    registry = AgentRegistry()
    if not path.exists():
        return registry

    for spec_path in sorted(path.glob("*.json")):
        registry.add(load_agent_spec(spec_path))
    return registry
