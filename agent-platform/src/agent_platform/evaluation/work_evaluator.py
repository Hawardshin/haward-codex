"""Evaluate completed work against the user's initial instruction."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


JsonMap = dict[str, Any]


@dataclass(frozen=True)
class WorkEvaluationInput:
    """Structured input for the work evaluator agent."""

    initial_instruction: str
    result_summary: str
    changed_files: tuple[str, ...] = ()
    verification: tuple[str, ...] = ()
    known_gaps: tuple[str, ...] = ()
    improvement_ideas: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "WorkEvaluationInput":
        return cls(
            initial_instruction=_required_string(data, "initial_instruction"),
            result_summary=_required_string(data, "result_summary"),
            changed_files=_tuple_of_strings(data.get("changed_files", []), "changed_files"),
            verification=_tuple_of_strings(data.get("verification", []), "verification"),
            known_gaps=_tuple_of_strings(data.get("known_gaps", []), "known_gaps"),
            improvement_ideas=_tuple_of_strings(data.get("improvement_ideas", []), "improvement_ideas"),
        )


def evaluate_work(evaluation_input: WorkEvaluationInput) -> JsonMap:
    """Return a deterministic close-out evaluation report.

    This does not replace an AI review. It gives the evaluator agent a stable
    schema and catches obvious close-out gaps before final response.
    """

    gaps = list(evaluation_input.known_gaps)
    improvements = list(evaluation_input.improvement_ideas)
    missing = _missing_closeout_fields(evaluation_input)
    gaps.extend(missing)

    if not evaluation_input.verification:
        improvements.append("Add or run a verification step before close-out.")
    if not evaluation_input.changed_files:
        improvements.append("Record changed files or explain why the work produced no file changes.")

    requires_rework = bool(gaps)
    status = "rework_required" if requires_rework else "ready_to_close"

    follow_up_actions = [f"Resolve gap: {gap}" for gap in gaps]
    follow_up_actions.extend(f"Consider improvement: {idea}" for idea in improvements)

    return {
        "status": status,
        "requires_rework": requires_rework,
        "alignment_check": {
            "initial_instruction_present": bool(evaluation_input.initial_instruction.strip()),
            "result_summary_present": bool(evaluation_input.result_summary.strip()),
            "changed_files_count": len(evaluation_input.changed_files),
            "verification_count": len(evaluation_input.verification),
        },
        "gaps": gaps,
        "improvements": improvements,
        "follow_up_actions": follow_up_actions,
    }


def _missing_closeout_fields(evaluation_input: WorkEvaluationInput) -> list[str]:
    missing = []
    if not evaluation_input.initial_instruction.strip():
        missing.append("Initial instruction is missing.")
    if not evaluation_input.result_summary.strip():
        missing.append("Result summary is missing.")
    return missing


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _tuple_of_strings(value: Any, field_name: str) -> tuple[str, ...]:
    if not isinstance(value, list | tuple):
        raise TypeError(f"{field_name} must be a list of strings.")
    if not all(isinstance(item, str) for item in value):
        raise TypeError(f"{field_name} must contain only strings.")
    return tuple(value)
