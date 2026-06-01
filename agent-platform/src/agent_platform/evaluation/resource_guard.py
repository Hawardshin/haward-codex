"""Check memory and resource leak risk before close-out."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

RISK_STATUSES = {"mitigated", "accepted", "not_applicable", "unresolved"}
CHECK_STATUSES = {"passed", "failed", "not_run", "deferred", "not_applicable"}
RISK_CATEGORIES = {
    "memory",
    "process",
    "browser_context",
    "file_handle",
    "network_connection",
    "timer",
    "worker",
    "cache",
    "stream",
    "large_data",
    "temporary_file",
    "subscription",
    "other",
}


@dataclass(frozen=True)
class ResourceRisk:
    """A memory or resource leak risk that needs mitigation or a conscious exception."""

    risk_id: str
    category: str
    description: str
    required: bool = True
    status: str = "unresolved"
    mitigation: str = ""
    evidence: tuple[str, ...] = ()
    rationale: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ResourceRisk":
        return cls(
            risk_id=_required_string(data, "risk_id"),
            category=_required_string(data, "category"),
            description=_required_string(data, "description"),
            required=_optional_bool(data.get("required", True), "required"),
            status=_optional_string(data.get("status", "unresolved"), "status"),
            mitigation=_optional_string(data.get("mitigation", ""), "mitigation"),
            evidence=_tuple_of_strings(data.get("evidence", []), "evidence"),
            rationale=_optional_string(data.get("rationale", ""), "rationale"),
        )


@dataclass(frozen=True)
class LifecycleCheck:
    """A concrete create/open/start operation and its cleanup path."""

    check_id: str
    resource: str
    create_path: str
    cleanup_path: str
    required: bool = True
    status: str = "not_run"
    evidence: tuple[str, ...] = ()
    rationale: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "LifecycleCheck":
        return cls(
            check_id=_required_string(data, "check_id"),
            resource=_required_string(data, "resource"),
            create_path=_required_string(data, "create_path"),
            cleanup_path=_optional_string(data.get("cleanup_path", ""), "cleanup_path"),
            required=_optional_bool(data.get("required", True), "required"),
            status=_optional_string(data.get("status", "not_run"), "status"),
            evidence=_tuple_of_strings(data.get("evidence", []), "evidence"),
            rationale=_optional_string(data.get("rationale", ""), "rationale"),
        )


@dataclass(frozen=True)
class MeasurementCheck:
    """A memory or resource measurement that bounds the risk."""

    check_id: str
    metric: str
    tool: str
    threshold: str
    required: bool = True
    status: str = "not_run"
    evidence: tuple[str, ...] = ()
    rationale: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "MeasurementCheck":
        return cls(
            check_id=_required_string(data, "check_id"),
            metric=_required_string(data, "metric"),
            tool=_required_string(data, "tool"),
            threshold=_optional_string(data.get("threshold", ""), "threshold"),
            required=_optional_bool(data.get("required", True), "required"),
            status=_optional_string(data.get("status", "not_run"), "status"),
            evidence=_tuple_of_strings(data.get("evidence", []), "evidence"),
            rationale=_optional_string(data.get("rationale", ""), "rationale"),
        )


@dataclass(frozen=True)
class ResourceGuardInput:
    """Structured input for memory and resource leak checks."""

    task: str
    work_mode: str = "standard"
    runtime_context: tuple[str, ...] = ()
    resource_risks: tuple[ResourceRisk, ...] = ()
    lifecycle_checks: tuple[LifecycleCheck, ...] = ()
    measurement_checks: tuple[MeasurementCheck, ...] = ()
    notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ResourceGuardInput":
        return cls(
            task=_required_string(data, "task"),
            work_mode=_optional_string(data.get("work_mode", "standard"), "work_mode"),
            runtime_context=_tuple_of_strings(data.get("runtime_context", []), "runtime_context"),
            resource_risks=_tuple_from_objects(data.get("resource_risks", []), "resource_risks", ResourceRisk.from_dict),
            lifecycle_checks=_tuple_from_objects(
                data.get("lifecycle_checks", []),
                "lifecycle_checks",
                LifecycleCheck.from_dict,
            ),
            measurement_checks=_tuple_from_objects(
                data.get("measurement_checks", []),
                "measurement_checks",
                MeasurementCheck.from_dict,
            ),
            notes=_tuple_of_strings(data.get("notes", []), "notes"),
        )


def check_resource_leaks(guard_input: ResourceGuardInput) -> JsonMap:
    """Return a deterministic resource leak readiness report."""

    gaps: list[str] = []
    warnings: list[str] = []

    if not guard_input.task.strip():
        gaps.append("Task is missing.")
    if not guard_input.runtime_context:
        warnings.append("runtime_context is empty. Record runtimes such as python, node, nextjs, playwright, browser, server, worker, or cli.")
    if not guard_input.resource_risks:
        gaps.append("resource_risks is empty. List memory, process, browser, cache, worker, stream, or large-data risks for this task.")

    for risk in guard_input.resource_risks:
        _check_resource_risk(risk, gaps, warnings)
    for lifecycle in guard_input.lifecycle_checks:
        _check_lifecycle(lifecycle, gaps, warnings)
    for measurement in guard_input.measurement_checks:
        _check_measurement(measurement, gaps, warnings)

    requires_rework = bool(gaps)
    status = "rework_required" if requires_rework else "resource_ready"

    return {
        "status": status,
        "requires_rework": requires_rework,
        "work_mode": guard_input.work_mode,
        "resource_summary": {
            "runtime_context_count": len(guard_input.runtime_context),
            "resource_risks_count": len(guard_input.resource_risks),
            "lifecycle_checks_count": len(guard_input.lifecycle_checks),
            "measurement_checks_count": len(guard_input.measurement_checks),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve resource gap: {gap}" for gap in gaps],
    }


def _check_resource_risk(risk: ResourceRisk, gaps: list[str], warnings: list[str]) -> None:
    label = risk.risk_id or risk.description or "<unnamed-risk>"
    if not risk.risk_id.strip():
        gaps.append("Resource risk is missing risk_id.")
    if risk.category not in RISK_CATEGORIES:
        gaps.append(f"Resource risk {label} has invalid category '{risk.category}'.")
    if not risk.description.strip():
        gaps.append(f"Resource risk {label} is missing description.")
    if risk.status not in RISK_STATUSES:
        gaps.append(f"Resource risk {label} has invalid status '{risk.status}'.")
        return

    if risk.required and risk.status == "unresolved":
        gaps.append(f"Required resource risk {label} is unresolved.")
    if risk.status == "mitigated":
        if risk.required and not risk.mitigation.strip():
            gaps.append(f"Required resource risk {label} is mitigated but has no mitigation.")
        if risk.required and not risk.evidence:
            gaps.append(f"Required resource risk {label} is mitigated but has no evidence.")
    if risk.status in {"accepted", "not_applicable"} and not risk.rationale.strip():
        gaps.append(f"Resource risk {label} is {risk.status} without rationale.")
    if not risk.required and risk.status == "unresolved":
        warnings.append(f"Optional resource risk {label} is unresolved.")


def _check_lifecycle(check: LifecycleCheck, gaps: list[str], warnings: list[str]) -> None:
    label = check.check_id or check.resource or "<unnamed-lifecycle>"
    if not check.check_id.strip():
        gaps.append("Lifecycle check is missing check_id.")
    if not check.resource.strip():
        gaps.append(f"Lifecycle check {label} is missing resource.")
    if not check.create_path.strip():
        gaps.append(f"Lifecycle check {label} is missing create_path.")
    if check.required and not check.cleanup_path.strip():
        gaps.append(f"Required lifecycle check {label} is missing cleanup_path.")
    if check.status not in CHECK_STATUSES:
        gaps.append(f"Lifecycle check {label} has invalid status '{check.status}'.")
        return

    _check_required_status("Lifecycle check", label, check.required, check.status, check.evidence, check.rationale, gaps, warnings)


def _check_measurement(check: MeasurementCheck, gaps: list[str], warnings: list[str]) -> None:
    label = check.check_id or check.metric or "<unnamed-measurement>"
    if not check.check_id.strip():
        gaps.append("Measurement check is missing check_id.")
    if not check.metric.strip():
        gaps.append(f"Measurement check {label} is missing metric.")
    if not check.tool.strip():
        gaps.append(f"Measurement check {label} is missing tool.")
    if check.required and not check.threshold.strip():
        gaps.append(f"Required measurement check {label} is missing threshold.")
    if check.status not in CHECK_STATUSES:
        gaps.append(f"Measurement check {label} has invalid status '{check.status}'.")
        return

    _check_required_status("Measurement check", label, check.required, check.status, check.evidence, check.rationale, gaps, warnings)


def _check_required_status(
    noun: str,
    label: str,
    required: bool,
    status: str,
    evidence: tuple[str, ...],
    rationale: str,
    gaps: list[str],
    warnings: list[str],
) -> None:
    if required and status == "passed" and not evidence:
        gaps.append(f"Required {noun.lower()} {label} passed but has no evidence.")
    if required and status in {"failed", "not_run"}:
        gaps.append(f"Required {noun.lower()} {label} status is {status}.")
    if status in {"deferred", "not_applicable"} and not rationale.strip():
        gaps.append(f"{noun} {label} is {status} without rationale.")
    if not required and status in {"failed", "not_run"}:
        warnings.append(f"Optional {noun.lower()} {label} status is {status}.")


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


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)


def _tuple_from_objects(value: Any, field_name: str, factory: Any) -> tuple[Any, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of objects.")
    if not all(isinstance(item, dict) for item in value):
        raise TypeError(f"{field_name} must contain only objects.")
    return tuple(factory(item) for item in value)
