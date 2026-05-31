"""Runtime interfaces for executing agents."""

from __future__ import annotations

from collections.abc import Callable
from typing import Protocol

from agent_platform.core.models import AgentSpec, ExecutionRequest, ExecutionResult


class AgentRuntime(Protocol):
    """Adapter boundary for Python and open-source agent runtimes."""

    def run(self, agent: AgentSpec, request: ExecutionRequest) -> ExecutionResult:
        """Execute an agent and return a normalized result."""


AgentCallable = Callable[[AgentSpec, ExecutionRequest], ExecutionResult | str]


class PythonFunctionRuntime:
    """Minimal Python runtime backed by a plain callable."""

    def __init__(self, handler: AgentCallable) -> None:
        self._handler = handler

    def run(self, agent: AgentSpec, request: ExecutionRequest) -> ExecutionResult:
        result = self._handler(agent, request)
        if isinstance(result, ExecutionResult):
            return result
        return ExecutionResult(output=str(result), trace=("python-function-runtime",))
