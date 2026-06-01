"""Check whether a task has explicit coverage against expected omissions."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

EXPECTED_STATUSES = {"covered", "deferred", "not_applicable", "missing"}
ACCEPTANCE_STATUSES = {"passed", "failed", "not_run", "deferred", "not_applicable"}


@dataclass(frozen=True)
class ExpectedItem:
    """A requirement, instruction, or planned item that could be missed."""

    item_id: str
    description: str
    source: str
    required: bool = True
    status: str = "missing"
    evidence: tuple[str, ...] = ()
    rationale: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ExpectedItem":
        return cls(
            item_id=_required_string(data, "item_id"),
            description=_required_string(data, "description"),
            source=_required_string(data, "source"),
            required=_optional_bool(data.get("required", True), "required"),
            status=_optional_string(data.get("status", "missing"), "status"),
            evidence=_tuple_of_strings(data.get("evidence", []), "evidence"),
            rationale=_optional_string(data.get("rationale", ""), "rationale"),
        )


@dataclass(frozen=True)
class ArtifactCheck:
    """A file or folder that should exist when the task is complete."""

    path: str
    purpose: str
    required: bool = True

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ArtifactCheck":
        return cls(
            path=_required_string(data, "path"),
            purpose=_required_string(data, "purpose"),
            required=_optional_bool(data.get("required", True), "required"),
        )


@dataclass(frozen=True)
class AcceptanceCheck:
    """A check that confirms a required outcome or quality gate."""

    check_id: str
    description: str
    required: bool = True
    status: str = "not_run"
    evidence: tuple[str, ...] = ()
    rationale: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "AcceptanceCheck":
        return cls(
            check_id=_required_string(data, "check_id"),
            description=_required_string(data, "description"),
            required=_optional_bool(data.get("required", True), "required"),
            status=_optional_string(data.get("status", "not_run"), "status"),
            evidence=_tuple_of_strings(data.get("evidence", []), "evidence"),
            rationale=_optional_string(data.get("rationale", ""), "rationale"),
        )


@dataclass(frozen=True)
class OmissionGuardInput:
    """Structured input for omission-prevention close-out checks."""

    task: str
    work_mode: str = "standard"
    expected_items: tuple[ExpectedItem, ...] = ()
    artifact_checks: tuple[ArtifactCheck, ...] = ()
    acceptance_checks: tuple[AcceptanceCheck, ...] = ()
    known_omission_risks: tuple[str, ...] = ()
    notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "OmissionGuardInput":
        return cls(
            task=_required_string(data, "task"),
            work_mode=_optional_string(data.get("work_mode", "standard"), "work_mode"),
            expected_items=_tuple_from_objects(data.get("expected_items", []), "expected_items", ExpectedItem.from_dict),
            artifact_checks=_tuple_from_objects(data.get("artifact_checks", []), "artifact_checks", ArtifactCheck.from_dict),
            acceptance_checks=_tuple_from_objects(
                data.get("acceptance_checks", []),
                "acceptance_checks",
                AcceptanceCheck.from_dict,
            ),
            known_omission_risks=_tuple_of_strings(data.get("known_omission_risks", []), "known_omission_risks"),
            notes=_tuple_of_strings(data.get("notes", []), "notes"),
        )


def check_omissions(guard_input: OmissionGuardInput, repo_root: Path) -> JsonMap:
    """Return a deterministic omission coverage report."""

    gaps: list[str] = []
    warnings: list[str] = []

    if not guard_input.task.strip():
        gaps.append("Task is missing.")

    if not guard_input.expected_items:
        gaps.append("expected_items is empty. List the user instructions, requirements, or acceptance items that could be missed.")

    for item in guard_input.expected_items:
        _check_expected_item(item, gaps, warnings)

    for artifact in guard_input.artifact_checks:
        _check_artifact(artifact, repo_root, gaps, warnings)

    for check in guard_input.acceptance_checks:
        _check_acceptance_check(check, gaps, warnings)

    for risk in guard_input.known_omission_risks:
        if risk.strip():
            warnings.append(f"Known omission risk recorded: {risk}")

    requires_rework = bool(gaps)
    status = "rework_required" if requires_rework else "coverage_ready"

    return {
        "status": status,
        "requires_rework": requires_rework,
        "work_mode": guard_input.work_mode,
        "coverage_summary": {
            "expected_items_count": len(guard_input.expected_items),
            "artifact_checks_count": len(guard_input.artifact_checks),
            "acceptance_checks_count": len(guard_input.acceptance_checks),
            "known_omission_risks_count": len(guard_input.known_omission_risks),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve omission gap: {gap}" for gap in gaps],
    }


def _check_expected_item(item: ExpectedItem, gaps: list[str], warnings: list[str]) -> None:
    label = item.item_id or item.description or "<unnamed-item>"
    if not item.item_id.strip():
        gaps.append("Expected item is missing item_id.")
    if not item.description.strip():
        gaps.append(f"Expected item {label} is missing description.")
    if not item.source.strip():
        gaps.append(f"Expected item {label} is missing source.")
    if item.status not in EXPECTED_STATUSES:
        gaps.append(f"Expected item {label} has invalid status '{item.status}'.")
        return

    if item.status == "covered" and item.required and not item.evidence:
        gaps.append(f"Required expected item {label} is covered but has no evidence.")
    if item.status == "missing" and item.required:
        gaps.append(f"Required expected item {label} is missing.")
    if item.status == "deferred" and item.required and not item.rationale.strip():
        gaps.append(f"Required expected item {label} is deferred without rationale.")
    if item.status == "not_applicable" and not item.rationale.strip():
        gaps.append(f"Expected item {label} is not_applicable without rationale.")
    if not item.required and item.status == "missing":
        warnings.append(f"Optional expected item {label} is missing.")


def _check_artifact(artifact: ArtifactCheck, repo_root: Path, gaps: list[str], warnings: list[str]) -> None:
    if not artifact.path.strip():
        gaps.append("Artifact check is missing path.")
        return
    if not artifact.purpose.strip():
        gaps.append(f"Artifact check {artifact.path} is missing purpose.")

    artifact_path = (repo_root / artifact.path).resolve()
    root_path = repo_root.resolve()
    try:
        artifact_path.relative_to(root_path)
    except ValueError:
        gaps.append(f"Artifact check {artifact.path} points outside the repository root.")
        return

    if artifact_path.exists():
        return
    if artifact.required:
        gaps.append(f"Required artifact {artifact.path} is missing.")
    else:
        warnings.append(f"Optional artifact {artifact.path} is missing.")


def _check_acceptance_check(check: AcceptanceCheck, gaps: list[str], warnings: list[str]) -> None:
    label = check.check_id or check.description or "<unnamed-check>"
    if not check.check_id.strip():
        gaps.append("Acceptance check is missing check_id.")
    if not check.description.strip():
        gaps.append(f"Acceptance check {label} is missing description.")
    if check.status not in ACCEPTANCE_STATUSES:
        gaps.append(f"Acceptance check {label} has invalid status '{check.status}'.")
        return

    if check.status == "passed" and check.required and not check.evidence:
        gaps.append(f"Required acceptance check {label} passed but has no evidence.")
    if check.required and check.status in {"failed", "not_run"}:
        gaps.append(f"Required acceptance check {label} status is {check.status}.")
    if check.status in {"deferred", "not_applicable"} and not check.rationale.strip():
        gaps.append(f"Acceptance check {label} is {check.status} without rationale.")
    if not check.required and check.status in {"failed", "not_run"}:
        warnings.append(f"Optional acceptance check {label} status is {check.status}.")


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
