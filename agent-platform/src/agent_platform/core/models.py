"""Structured models used by the platform core."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


JsonMap = dict[str, Any]


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if value is None:
        return ()
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)


@dataclass(frozen=True)
class AgentSpec:
    """Declarative description of an agent."""

    name: str
    description: str
    runtime: str = "python"
    skills: tuple[str, ...] = ()
    tools: tuple[str, ...] = ()
    metadata: JsonMap = field(default_factory=dict)

    @classmethod
    def from_dict(cls, data: JsonMap) -> "AgentSpec":
        name = data.get("name")
        description = data.get("description")
        if not isinstance(name, str) or not name:
            raise ValueError("Agent spec requires a non-empty string name.")
        if not isinstance(description, str) or not description:
            raise ValueError("Agent spec requires a non-empty string description.")

        runtime = data.get("runtime", "python")
        if not isinstance(runtime, str) or not runtime:
            raise ValueError("Agent spec runtime must be a non-empty string.")

        metadata = data.get("metadata", {})
        if not isinstance(metadata, dict):
            raise TypeError("Agent spec metadata must be an object.")

        return cls(
            name=name,
            description=description,
            runtime=runtime,
            skills=_tuple_of_strings(data.get("skills", []), "skills"),
            tools=_tuple_of_strings(data.get("tools", []), "tools"),
            metadata=metadata,
        )

    def to_dict(self) -> JsonMap:
        return {
            "name": self.name,
            "description": self.description,
            "runtime": self.runtime,
            "skills": list(self.skills),
            "tools": list(self.tools),
            "metadata": self.metadata,
        }


@dataclass(frozen=True)
class ExecutionRequest:
    """Input passed to a runtime when executing an agent."""

    prompt: str
    context: JsonMap = field(default_factory=dict)


@dataclass(frozen=True)
class ExecutionResult:
    """Normalized runtime output."""

    output: str
    trace: tuple[str, ...] = ()
    artifacts: tuple[str, ...] = ()
