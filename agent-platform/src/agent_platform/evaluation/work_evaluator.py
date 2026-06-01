"""Evaluate completed work against the user's initial instruction."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]


ALLOWED_WORK_MODES = {"quick", "standard", "ship_first", "research", "governance"}

TARGET_GAP_MESSAGES = {
    "references_checked": "Reference research is missing. Check prior internal work or strong external references before evaluation.",
    "source_provenance_targets": "Source provenance target is missing. Record where material values, source data, assumptions, claims, or configuration inputs came from.",
    "plan_evidence_targets": "Plan evidence target is missing. Record the checked evidence that supports the executed plan.",
    "web_search_record_targets": "Web search record target is missing. Add a public search reasoning record under _history/web-searches/.",
    "user_request_summary_targets": "User request summary target is missing. Add a request summary under _history/user-requests/.",
    "requirements_targets": "Requirements target is missing. Add or update requirements under _requirements/ or the owning project's docs/requirements/.",
    "spec_targets": "Spec target is missing. Add or update spec-driven artifacts under _specs/ or the owning project's specs/.",
    "request_trace_targets": "Request trace target is missing. Add a request-to-outcome trace under _history/request-traces/.",
    "work_summary_targets": "Work summary target is missing. Add a concise human-readable summary under _history/work-summaries/.",
    "timing_summary_targets": "Timing summary target is missing. Add a phase-level work timing record under _history/work-timings/ so bottlenecks are visible.",
}

MODE_REQUIRED_TARGETS = {
    "quick": set(),
    "standard": set(TARGET_GAP_MESSAGES),
    "ship_first": {"references_checked", "web_search_record_targets"},
    "research": {
        "references_checked",
        "source_provenance_targets",
        "plan_evidence_targets",
        "web_search_record_targets",
        "timing_summary_targets",
    },
    "governance": set(TARGET_GAP_MESSAGES),
}


@dataclass(frozen=True)
class WorkEvaluationInput:
    """Structured input for the work evaluator agent."""

    initial_instruction: str
    result_summary: str
    work_mode: str = "standard"
    changed_files: tuple[str, ...] = ()
    verification: tuple[str, ...] = ()
    references_checked: tuple[str, ...] = ()
    grounding_checks: tuple[str, ...] = ()
    source_provenance_targets: tuple[str, ...] = ()
    plan_evidence_targets: tuple[str, ...] = ()
    web_search_record_targets: tuple[str, ...] = ()
    user_request_summary_targets: tuple[str, ...] = ()
    requirements_targets: tuple[str, ...] = ()
    spec_targets: tuple[str, ...] = ()
    skill_work_occurred: bool = False
    skill_targets: tuple[str, ...] = ()
    skill_validation_targets: tuple[str, ...] = ()
    request_trace_targets: tuple[str, ...] = ()
    work_summary_targets: tuple[str, ...] = ()
    timing_summary_targets: tuple[str, ...] = ()
    context_archiving_occurred: bool = False
    context_archive_targets: tuple[str, ...] = ()
    installation_occurred: bool = False
    installation_record_targets: tuple[str, ...] = ()
    deferred_improvement_targets: tuple[str, ...] = ()
    known_gaps: tuple[str, ...] = ()
    improvement_ideas: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "WorkEvaluationInput":
        return cls(
            initial_instruction=_required_string(data, "initial_instruction"),
            result_summary=_required_string(data, "result_summary"),
            work_mode=_optional_string(data.get("work_mode", "standard"), "work_mode"),
            changed_files=_tuple_of_strings(data.get("changed_files", []), "changed_files"),
            verification=_tuple_of_strings(data.get("verification", []), "verification"),
            references_checked=_tuple_of_strings(data.get("references_checked", []), "references_checked"),
            grounding_checks=_tuple_of_strings(data.get("grounding_checks", []), "grounding_checks"),
            source_provenance_targets=_tuple_of_strings(data.get("source_provenance_targets", []), "source_provenance_targets"),
            plan_evidence_targets=_tuple_of_strings(data.get("plan_evidence_targets", []), "plan_evidence_targets"),
            web_search_record_targets=_tuple_of_strings(data.get("web_search_record_targets", []), "web_search_record_targets"),
            user_request_summary_targets=_tuple_of_strings(data.get("user_request_summary_targets", []), "user_request_summary_targets"),
            requirements_targets=_tuple_of_strings(data.get("requirements_targets", []), "requirements_targets"),
            spec_targets=_tuple_of_strings(data.get("spec_targets", []), "spec_targets"),
            skill_work_occurred=_optional_bool(data.get("skill_work_occurred", False), "skill_work_occurred"),
            skill_targets=_tuple_of_strings(data.get("skill_targets", []), "skill_targets"),
            skill_validation_targets=_tuple_of_strings(data.get("skill_validation_targets", []), "skill_validation_targets"),
            request_trace_targets=_tuple_of_strings(data.get("request_trace_targets", []), "request_trace_targets"),
            work_summary_targets=_tuple_of_strings(data.get("work_summary_targets", []), "work_summary_targets"),
            timing_summary_targets=_tuple_of_strings(data.get("timing_summary_targets", []), "timing_summary_targets"),
            context_archiving_occurred=_optional_bool(data.get("context_archiving_occurred", False), "context_archiving_occurred"),
            context_archive_targets=_tuple_of_strings(data.get("context_archive_targets", []), "context_archive_targets"),
            installation_occurred=_optional_bool(data.get("installation_occurred", False), "installation_occurred"),
            installation_record_targets=_tuple_of_strings(data.get("installation_record_targets", []), "installation_record_targets"),
            deferred_improvement_targets=_tuple_of_strings(
                data.get("deferred_improvement_targets", []),
                "deferred_improvement_targets",
            ),
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
    work_mode = _normalize_work_mode(evaluation_input.work_mode)
    if work_mode not in ALLOWED_WORK_MODES:
        gaps.append(
            f"Unknown work_mode '{evaluation_input.work_mode}'. Use one of: {', '.join(sorted(ALLOWED_WORK_MODES))}."
        )
        work_mode = "standard"

    missing = _missing_closeout_fields(evaluation_input)
    gaps.extend(missing)

    if not evaluation_input.verification:
        improvements.append("Add or run a verification step before close-out.")
    if not evaluation_input.changed_files:
        improvements.append("Record changed files or explain why the work produced no file changes.")
    _check_mode_required_targets(evaluation_input, work_mode, gaps, improvements)

    if evaluation_input.skill_work_occurred and not evaluation_input.skill_targets:
        gaps.append("Skill work occurred but skill_targets is missing. Add the created or updated skill source path.")
    if evaluation_input.skill_work_occurred and not evaluation_input.skill_validation_targets:
        gaps.append("Skill work occurred but skill_validation_targets is missing. Add a validate-skill input, report, or evaluation target.")
    if evaluation_input.context_archiving_occurred and not evaluation_input.context_archive_targets:
        gaps.append("Context archiving occurred but context_archive_targets is missing. Add a resume packet under _history/context-archives/.")
    if evaluation_input.installation_occurred and not evaluation_input.installation_record_targets:
        gaps.append("Installation occurred but installation_record_targets is missing. Add an audit record under _history/installations/ and index it in _ops/installations/registry.json.")
    if (
        work_mode == "ship_first"
        and evaluation_input.improvement_ideas
        and not evaluation_input.deferred_improvement_targets
    ):
        gaps.append("Ship-first mode has improvement ideas but deferred_improvement_targets is missing.")
    if not evaluation_input.grounding_checks:
        improvements.append("Run hallucination-guard-agent when the final output contains factual claims.")

    requires_rework = bool(gaps)
    status = "rework_required" if requires_rework else "ready_to_close"

    follow_up_actions = [f"Resolve gap: {gap}" for gap in gaps]
    follow_up_actions.extend(f"Consider improvement: {idea}" for idea in improvements)

    return {
        "status": status,
        "requires_rework": requires_rework,
        "work_mode": work_mode,
        "required_target_policy": {
            "required_targets": sorted(MODE_REQUIRED_TARGETS[work_mode]),
            "deferred_targets_allowed": sorted(set(TARGET_GAP_MESSAGES) - MODE_REQUIRED_TARGETS[work_mode]),
        },
        "alignment_check": {
            "initial_instruction_present": bool(evaluation_input.initial_instruction.strip()),
            "result_summary_present": bool(evaluation_input.result_summary.strip()),
            "work_mode": work_mode,
            "changed_files_count": len(evaluation_input.changed_files),
            "verification_count": len(evaluation_input.verification),
            "references_checked_count": len(evaluation_input.references_checked),
            "grounding_checks_count": len(evaluation_input.grounding_checks),
            "source_provenance_targets_count": len(evaluation_input.source_provenance_targets),
            "plan_evidence_targets_count": len(evaluation_input.plan_evidence_targets),
            "web_search_record_targets_count": len(evaluation_input.web_search_record_targets),
            "user_request_summary_targets_count": len(evaluation_input.user_request_summary_targets),
            "requirements_targets_count": len(evaluation_input.requirements_targets),
            "spec_targets_count": len(evaluation_input.spec_targets),
            "skill_work_occurred": evaluation_input.skill_work_occurred,
            "skill_targets_count": len(evaluation_input.skill_targets),
            "skill_validation_targets_count": len(evaluation_input.skill_validation_targets),
            "request_trace_targets_count": len(evaluation_input.request_trace_targets),
            "work_summary_targets_count": len(evaluation_input.work_summary_targets),
            "timing_summary_targets_count": len(evaluation_input.timing_summary_targets),
            "context_archiving_occurred": evaluation_input.context_archiving_occurred,
            "context_archive_targets_count": len(evaluation_input.context_archive_targets),
            "installation_occurred": evaluation_input.installation_occurred,
            "installation_record_targets_count": len(evaluation_input.installation_record_targets),
            "deferred_improvement_targets_count": len(evaluation_input.deferred_improvement_targets),
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


def _normalize_work_mode(value: str) -> str:
    return value.strip().lower() or "standard"


def _check_mode_required_targets(
    evaluation_input: WorkEvaluationInput,
    work_mode: str,
    gaps: list[str],
    improvements: list[str],
) -> None:
    required_targets = MODE_REQUIRED_TARGETS[work_mode]

    for field_name, gap_message in TARGET_GAP_MESSAGES.items():
        if getattr(evaluation_input, field_name):
            continue

        if field_name in required_targets:
            gaps.append(gap_message)
        else:
            improvements.append(f"{field_name} omitted under {work_mode} mode; add or defer it if the work becomes durable.")


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_string(value: Any, field_name: str) -> str:
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
