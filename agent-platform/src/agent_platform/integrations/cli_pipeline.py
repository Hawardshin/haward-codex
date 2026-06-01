"""Validate multi-process CLI pipeline plans before execution."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

RISK_LEVELS = {"low", "medium", "high", "critical"}
VALID_PIPE_MODES = {"pipe", "file", "artifact"}
VALID_SOURCE_STREAMS = {"stdout", "stderr"}
VALID_DESTINATION_STREAMS = {"stdin"}
SHELL_METACHAR_PATTERNS = ("|", ";", "&&", "||", "$(", "`", ">", "<")

REQUIRED_SAFETY_CONTROLS = {
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
}

REQUIRED_RESOURCE_CONTROLS = {
    "timeout_policy",
    "max_output_bytes",
    "cancellation_policy",
    "cleanup_policy",
    "orphan_process_policy",
    "backpressure_policy",
}


@dataclass(frozen=True)
class PipelineProcess:
    """One external CLI process node in a pipeline graph."""

    process_id: str
    adapter_id: str
    command: str
    args: tuple[str, ...] = ()
    cwd: str = ""
    env_keys: tuple[str, ...] = ()
    timeout_seconds: int = 0
    max_output_bytes: int = 0
    required: bool = True

    @classmethod
    def from_dict(cls, data: JsonMap) -> "PipelineProcess":
        return cls(
            process_id=_required_string(data, "process_id"),
            adapter_id=_required_string(data, "adapter_id"),
            command=_required_string(data, "command"),
            args=_tuple_of_strings(data.get("args", []), "args"),
            cwd=_optional_string(data.get("cwd", ""), "cwd"),
            env_keys=_tuple_of_strings(data.get("env_keys", []), "env_keys"),
            timeout_seconds=_optional_int(data.get("timeout_seconds", 0), "timeout_seconds"),
            max_output_bytes=_optional_int(data.get("max_output_bytes", 0), "max_output_bytes"),
            required=_optional_bool(data.get("required", True), "required"),
        )


@dataclass(frozen=True)
class PipelinePipe:
    """A stream edge between two CLI process nodes."""

    pipe_id: str
    from_process: str
    from_stream: str
    to_process: str
    to_stream: str
    mode: str = "pipe"
    required: bool = True

    @classmethod
    def from_dict(cls, data: JsonMap) -> "PipelinePipe":
        return cls(
            pipe_id=_required_string(data, "pipe_id"),
            from_process=_required_string(data, "from_process"),
            from_stream=_optional_string(data.get("from_stream", "stdout"), "from_stream"),
            to_process=_required_string(data, "to_process"),
            to_stream=_optional_string(data.get("to_stream", "stdin"), "to_stream"),
            mode=_optional_string(data.get("mode", "pipe"), "mode"),
            required=_optional_bool(data.get("required", True), "required"),
        )


@dataclass(frozen=True)
class CliPipelineInput:
    """Structured input for a multi-CLI pipeline readiness check."""

    pipeline_id: str
    purpose: str
    work_mode: str = "standard"
    risk_level: str = "medium"
    processes: tuple[PipelineProcess, ...] = ()
    pipes: tuple[PipelinePipe, ...] = ()
    execution_policy: JsonMap | None = None
    safety_controls: tuple[str, ...] = ()
    resource_controls: JsonMap | None = None
    merge_strategy: str = ""
    source_provenance: tuple[str, ...] = ()
    plan_evidence: tuple[str, ...] = ()
    verification: tuple[str, ...] = ()
    rollback_plan: tuple[str, ...] = ()
    notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "CliPipelineInput":
        return cls(
            pipeline_id=_required_string(data, "pipeline_id"),
            purpose=_required_string(data, "purpose"),
            work_mode=_optional_string(data.get("work_mode", "standard"), "work_mode"),
            risk_level=_optional_string(data.get("risk_level", "medium"), "risk_level"),
            processes=_tuple_from_objects(data.get("processes", []), "processes", PipelineProcess.from_dict),
            pipes=_tuple_from_objects(data.get("pipes", []), "pipes", PipelinePipe.from_dict),
            execution_policy=_optional_map(data.get("execution_policy", {}), "execution_policy"),
            safety_controls=_tuple_of_strings(data.get("safety_controls", []), "safety_controls"),
            resource_controls=_optional_map(data.get("resource_controls", {}), "resource_controls"),
            merge_strategy=_optional_string(data.get("merge_strategy", ""), "merge_strategy"),
            source_provenance=_tuple_of_strings(data.get("source_provenance", []), "source_provenance"),
            plan_evidence=_tuple_of_strings(data.get("plan_evidence", []), "plan_evidence"),
            verification=_tuple_of_strings(data.get("verification", []), "verification"),
            rollback_plan=_tuple_of_strings(data.get("rollback_plan", []), "rollback_plan"),
            notes=_tuple_of_strings(data.get("notes", []), "notes"),
        )


def check_cli_pipeline(pipeline_input: CliPipelineInput) -> JsonMap:
    """Return a deterministic readiness report for a CLI process graph."""

    gaps: list[str] = []
    warnings: list[str] = []

    _check_header(pipeline_input, gaps)
    process_ids = _check_processes(pipeline_input, gaps, warnings)
    _check_pipes(pipeline_input, process_ids, gaps, warnings)
    _check_execution_policy(pipeline_input, gaps, warnings)
    _check_safety_controls(pipeline_input, gaps)
    _check_resource_controls(pipeline_input, gaps)
    _check_evidence_and_closeout(pipeline_input, gaps, warnings)

    requires_rework = bool(gaps)
    return {
        "status": "rework_required" if requires_rework else "pipeline_ready",
        "requires_rework": requires_rework,
        "work_mode": pipeline_input.work_mode,
        "checks": {
            "pipeline_id": pipeline_input.pipeline_id,
            "risk_level": pipeline_input.risk_level,
            "process_count": len(pipeline_input.processes),
            "pipe_count": len(pipeline_input.pipes),
            "adapter_count": len({process.adapter_id for process in pipeline_input.processes if process.adapter_id}),
            "safety_control_count": len(pipeline_input.safety_controls),
            "source_provenance_count": len(pipeline_input.source_provenance),
            "plan_evidence_count": len(pipeline_input.plan_evidence),
            "verification_count": len(pipeline_input.verification),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve CLI pipeline gap: {gap}" for gap in gaps],
    }


def _check_header(pipeline_input: CliPipelineInput, gaps: list[str]) -> None:
    if not pipeline_input.pipeline_id.strip():
        gaps.append("pipeline_id is missing.")
    if not pipeline_input.purpose.strip():
        gaps.append("purpose is missing.")
    if pipeline_input.risk_level not in RISK_LEVELS:
        gaps.append(f"risk_level must be one of: {', '.join(sorted(RISK_LEVELS))}.")


def _check_processes(
    pipeline_input: CliPipelineInput,
    gaps: list[str],
    warnings: list[str],
) -> set[str]:
    if not pipeline_input.processes:
        gaps.append("processes is empty. A CLI pipeline needs at least one process node.")
        return set()

    process_ids: list[str] = []
    adapter_allowlist = set(_execution_list(pipeline_input.execution_policy, "adapter_allowlist"))
    explicit_cwd_required = bool((pipeline_input.execution_policy or {}).get("explicit_cwd_required", True))
    shell_allowed = bool((pipeline_input.execution_policy or {}).get("shell_allowed", False))

    for process in pipeline_input.processes:
        label = process.process_id or process.command or "<unnamed-process>"
        if not process.process_id.strip():
            gaps.append("Pipeline process is missing process_id.")
        process_ids.append(process.process_id)
        if not process.adapter_id.strip():
            gaps.append(f"Process {label} is missing adapter_id.")
        if adapter_allowlist and process.adapter_id and process.adapter_id not in adapter_allowlist:
            gaps.append(f"Process {label} uses adapter_id '{process.adapter_id}' outside execution_policy.adapter_allowlist.")
        if not process.command.strip():
            gaps.append(f"Process {label} is missing command.")
        if _contains_shell_metachar(process.command) and not shell_allowed:
            gaps.append(
                f"Process {label} command contains shell metacharacters. Model pipes as explicit pipe edges and keep command as one executable."
            )
        if " " in process.command.strip() and not shell_allowed:
            warnings.append(f"Process {label} command contains spaces; put flags and values in args for argv-style execution.")
        if process.required and explicit_cwd_required and not process.cwd.strip():
            gaps.append(f"Required process {label} is missing cwd.")
        if process.required and process.timeout_seconds <= 0:
            gaps.append(f"Required process {label} is missing positive timeout_seconds.")
        if process.required and process.max_output_bytes <= 0:
            gaps.append(f"Required process {label} is missing positive max_output_bytes.")
        if not process.env_keys:
            warnings.append(f"Process {label} has no env_keys allowlist; confirm it does not need environment variables.")

    duplicated = sorted({process_id for process_id in process_ids if process_ids.count(process_id) > 1 and process_id})
    for process_id in duplicated:
        gaps.append(f"Duplicate process_id '{process_id}'.")
    return {process_id for process_id in process_ids if process_id}


def _check_pipes(
    pipeline_input: CliPipelineInput,
    process_ids: set[str],
    gaps: list[str],
    warnings: list[str],
) -> None:
    explicit_graph_required = bool((pipeline_input.execution_policy or {}).get("explicit_pipe_graph_required", True))
    if len(pipeline_input.processes) > 1 and explicit_graph_required and not pipeline_input.pipes:
        gaps.append("Multiple processes are declared but pipes is empty. Connect process nodes explicitly or split independent tasks.")

    pipe_ids: list[str] = []
    for pipe in pipeline_input.pipes:
        label = pipe.pipe_id or f"{pipe.from_process}->{pipe.to_process}"
        if not pipe.pipe_id.strip():
            gaps.append("Pipeline pipe is missing pipe_id.")
        pipe_ids.append(pipe.pipe_id)
        if pipe.from_process not in process_ids:
            gaps.append(f"Pipe {label} references unknown from_process '{pipe.from_process}'.")
        if pipe.to_process not in process_ids:
            gaps.append(f"Pipe {label} references unknown to_process '{pipe.to_process}'.")
        if pipe.from_process == pipe.to_process:
            gaps.append(f"Pipe {label} connects a process to itself.")
        if pipe.from_stream not in VALID_SOURCE_STREAMS:
            gaps.append(f"Pipe {label} has invalid from_stream '{pipe.from_stream}'.")
        if pipe.to_stream not in VALID_DESTINATION_STREAMS:
            gaps.append(f"Pipe {label} has invalid to_stream '{pipe.to_stream}'.")
        if pipe.mode not in VALID_PIPE_MODES:
            gaps.append(f"Pipe {label} has invalid mode '{pipe.mode}'.")
        if not pipe.required:
            warnings.append(f"Pipe {label} is optional; record how missing upstream output affects downstream behavior.")

    duplicated = sorted({pipe_id for pipe_id in pipe_ids if pipe_ids.count(pipe_id) > 1 and pipe_id})
    for pipe_id in duplicated:
        gaps.append(f"Duplicate pipe_id '{pipe_id}'.")


def _check_execution_policy(
    pipeline_input: CliPipelineInput,
    gaps: list[str],
    warnings: list[str],
) -> None:
    policy = pipeline_input.execution_policy or {}
    if not policy:
        gaps.append("execution_policy is missing.")
        return

    for field in ("shell_allowed", "argv_arrays_required", "explicit_pipe_graph_required", "explicit_cwd_required"):
        if not isinstance(policy.get(field), bool):
            gaps.append(f"execution_policy.{field} must be a boolean.")
    if policy.get("shell_allowed") is True:
        warnings.append("execution_policy.shell_allowed=true; require a separate injection review before execution.")
    if policy.get("argv_arrays_required") is not True:
        gaps.append("execution_policy.argv_arrays_required must be true.")
    if policy.get("explicit_pipe_graph_required") is not True:
        gaps.append("execution_policy.explicit_pipe_graph_required must be true.")
    if not _execution_list(policy, "adapter_allowlist"):
        gaps.append("execution_policy.adapter_allowlist must list the allowed CLI adapters.")


def _check_safety_controls(pipeline_input: CliPipelineInput, gaps: list[str]) -> None:
    provided = set(pipeline_input.safety_controls)
    missing = sorted(REQUIRED_SAFETY_CONTROLS - provided)
    if missing:
        gaps.append(f"safety_controls is missing required controls: {', '.join(missing)}.")


def _check_resource_controls(pipeline_input: CliPipelineInput, gaps: list[str]) -> None:
    controls = pipeline_input.resource_controls or {}
    if not controls:
        gaps.append("resource_controls is missing.")
        return

    missing = sorted(REQUIRED_RESOURCE_CONTROLS - set(controls))
    if missing:
        gaps.append(f"resource_controls is missing required fields: {', '.join(missing)}.")
    max_output = controls.get("max_output_bytes")
    if not isinstance(max_output, int) or max_output <= 0:
        gaps.append("resource_controls.max_output_bytes must be a positive integer.")
    for field in REQUIRED_RESOURCE_CONTROLS - {"max_output_bytes"}:
        if field in controls and (not isinstance(controls[field], str) or not controls[field].strip()):
            gaps.append(f"resource_controls.{field} must be a non-empty string.")


def _check_evidence_and_closeout(
    pipeline_input: CliPipelineInput,
    gaps: list[str],
    warnings: list[str],
) -> None:
    if len(pipeline_input.processes) > 1 and not pipeline_input.merge_strategy.strip():
        gaps.append("merge_strategy is missing for a multi-process CLI pipeline.")
    if not pipeline_input.source_provenance:
        gaps.append("source_provenance is missing. Record official docs, internal policy, or adapter evidence used for the plan.")
    if not pipeline_input.plan_evidence:
        gaps.append("plan_evidence is missing. Record why this process graph is justified.")
    if not pipeline_input.verification:
        gaps.append("verification is missing. Record dry-run, contract check, or smoke-test evidence.")
    if pipeline_input.risk_level in {"high", "critical"} and not pipeline_input.rollback_plan:
        gaps.append("High-risk CLI pipeline needs rollback_plan.")
    if pipeline_input.risk_level == "low" and pipeline_input.rollback_plan:
        warnings.append("Low-risk pipeline has rollback_plan; confirm the risk level is not understated.")


def _contains_shell_metachar(value: str) -> bool:
    return any(pattern in value for pattern in SHELL_METACHAR_PATTERNS)


def _execution_list(policy: JsonMap | None, field_name: str) -> tuple[str, ...]:
    if not isinstance(policy, dict):
        return ()
    value = policy.get(field_name, [])
    if not isinstance(value, list | tuple):
        return ()
    if not all(isinstance(item, str) for item in value):
        return ()
    return tuple(value)


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_string(value: Any, field_name: str) -> str:
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a bool.")
    return value


def _optional_int(value: Any, field_name: str) -> int:
    if not isinstance(value, int):
        raise TypeError(f"{field_name} must be an integer.")
    return value


def _optional_map(value: Any, field_name: str) -> JsonMap:
    if not isinstance(value, dict):
        raise TypeError(f"{field_name} must be an object.")
    return value


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)


def _tuple_from_objects(value: Any, field_name: str, factory: Any) -> tuple[Any, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of objects.")
    return tuple(factory(item) for item in value)
