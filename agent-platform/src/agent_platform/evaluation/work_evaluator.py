"""Evaluate completed work against the user's initial instruction."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]


@dataclass(frozen=True)
class WorkEvaluationInput:
    """Structured input for the work evaluator agent."""

    initial_instruction: str
    result_summary: str
    changed_files: tuple[str, ...] = ()
    verification: tuple[str, ...] = ()
    references_checked: tuple[str, ...] = ()
    grounding_checks: tuple[str, ...] = ()
    web_search_record_targets: tuple[str, ...] = ()
    user_request_summary_targets: tuple[str, ...] = ()
    requirements_targets: tuple[str, ...] = ()
    spec_targets: tuple[str, ...] = ()
    request_trace_targets: tuple[str, ...] = ()
    work_summary_targets: tuple[str, ...] = ()
    context_archiving_occurred: bool = False
    context_archive_targets: tuple[str, ...] = ()
    installation_occurred: bool = False
    installation_record_targets: tuple[str, ...] = ()
    known_gaps: tuple[str, ...] = ()
    improvement_ideas: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "WorkEvaluationInput":
        return cls(
            initial_instruction=_required_string(data, "initial_instruction"),
            result_summary=_required_string(data, "result_summary"),
            changed_files=_tuple_of_strings(data.get("changed_files", []), "changed_files"),
            verification=_tuple_of_strings(data.get("verification", []), "verification"),
            references_checked=_tuple_of_strings(data.get("references_checked", []), "references_checked"),
            grounding_checks=_tuple_of_strings(data.get("grounding_checks", []), "grounding_checks"),
            web_search_record_targets=_tuple_of_strings(data.get("web_search_record_targets", []), "web_search_record_targets"),
            user_request_summary_targets=_tuple_of_strings(data.get("user_request_summary_targets", []), "user_request_summary_targets"),
            requirements_targets=_tuple_of_strings(data.get("requirements_targets", []), "requirements_targets"),
            spec_targets=_tuple_of_strings(data.get("spec_targets", []), "spec_targets"),
            request_trace_targets=_tuple_of_strings(data.get("request_trace_targets", []), "request_trace_targets"),
            work_summary_targets=_tuple_of_strings(data.get("work_summary_targets", []), "work_summary_targets"),
            context_archiving_occurred=_optional_bool(data.get("context_archiving_occurred", False), "context_archiving_occurred"),
            context_archive_targets=_tuple_of_strings(data.get("context_archive_targets", []), "context_archive_targets"),
            installation_occurred=_optional_bool(data.get("installation_occurred", False), "installation_occurred"),
            installation_record_targets=_tuple_of_strings(data.get("installation_record_targets", []), "installation_record_targets"),
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
    if not evaluation_input.references_checked:
        gaps.append("Reference research is missing. Check prior internal work or strong external references before evaluation.")
    if not evaluation_input.web_search_record_targets:
        gaps.append("Web search record target is missing. Add a public search reasoning record under _history/web-searches/.")
    if not evaluation_input.user_request_summary_targets:
        gaps.append("User request summary target is missing. Add a request summary under _history/user-requests/.")
    if not evaluation_input.requirements_targets:
        gaps.append("Requirements target is missing. Add or update requirements under _requirements/ or the owning project's docs/requirements/.")
    if not evaluation_input.spec_targets:
        gaps.append("Spec target is missing. Add or update spec-driven artifacts under _specs/ or the owning project's specs/.")
    if not evaluation_input.request_trace_targets:
        gaps.append("Request trace target is missing. Add a request-to-outcome trace under _history/request-traces/.")
    if not evaluation_input.work_summary_targets:
        gaps.append("Work summary target is missing. Add a concise human-readable summary under _history/work-summaries/.")
    if evaluation_input.context_archiving_occurred and not evaluation_input.context_archive_targets:
        gaps.append("Context archiving occurred but context_archive_targets is missing. Add a resume packet under _history/context-archives/.")
    if evaluation_input.installation_occurred and not evaluation_input.installation_record_targets:
        gaps.append("Installation occurred but installation_record_targets is missing. Add an audit record under _history/installations/ and index it in _ops/installations/registry.json.")
    if not evaluation_input.grounding_checks:
        improvements.append("Run hallucination-guard-agent when the final output contains factual claims.")

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
            "references_checked_count": len(evaluation_input.references_checked),
            "grounding_checks_count": len(evaluation_input.grounding_checks),
            "web_search_record_targets_count": len(evaluation_input.web_search_record_targets),
            "user_request_summary_targets_count": len(evaluation_input.user_request_summary_targets),
            "requirements_targets_count": len(evaluation_input.requirements_targets),
            "spec_targets_count": len(evaluation_input.spec_targets),
            "request_trace_targets_count": len(evaluation_input.request_trace_targets),
            "work_summary_targets_count": len(evaluation_input.work_summary_targets),
            "context_archiving_occurred": evaluation_input.context_archiving_occurred,
            "context_archive_targets_count": len(evaluation_input.context_archive_targets),
            "installation_occurred": evaluation_input.installation_occurred,
            "installation_record_targets_count": len(evaluation_input.installation_record_targets),
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


def _optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a bool.")
    return value
