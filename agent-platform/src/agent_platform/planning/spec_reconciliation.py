"""Decide whether spec/source drift needs spec change, source change, or user clarification."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

ALLOWED_ISSUE_TYPES = {
    "ambiguous_spec",
    "spec_source_mismatch",
    "missing_spec",
    "missing_source_trace",
    "test_disagreement",
}
ALLOWED_RESOLUTIONS = {"update_spec", "update_source", "ask_user", "defer"}
ALLOWED_SEVERITIES = {"info": 10, "warning": 20, "error": 30, "critical": 40}


@dataclass(frozen=True)
class ClarificationQuestion:
    """One user-answerable question needed before changing spec or source."""

    question_id: str
    question: str
    options: tuple[str, ...] = ()
    recommended_option: str = ""
    answer_format: str = ""
    decision_impact: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ClarificationQuestion":
        return cls(
            question_id=_required_string(data, "question_id"),
            question=_required_string(data, "question"),
            options=_tuple_of_strings(data.get("options", []), "options"),
            recommended_option=_optional_string(data.get("recommended_option", ""), "recommended_option"),
            answer_format=_optional_string(data.get("answer_format", ""), "answer_format"),
            decision_impact=_optional_string(data.get("decision_impact", ""), "decision_impact"),
        )


@dataclass(frozen=True)
class SpecSourceIssue:
    """One ambiguity or mismatch between a project spec and current source."""

    issue_id: str
    issue_type: str
    summary: str
    severity: str = "warning"
    affected_spec_refs: tuple[str, ...] = ()
    affected_source_paths: tuple[str, ...] = ()
    observed_spec_behavior: str = ""
    observed_source_behavior: str = ""
    evidence: tuple[str, ...] = ()
    default_resolution: str = "ask_user"
    questions: tuple[ClarificationQuestion, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "SpecSourceIssue":
        return cls(
            issue_id=_required_string(data, "issue_id"),
            issue_type=_required_string(data, "issue_type"),
            summary=_required_string(data, "summary"),
            severity=_optional_string(data.get("severity", "warning"), "severity"),
            affected_spec_refs=_tuple_of_strings(data.get("affected_spec_refs", []), "affected_spec_refs"),
            affected_source_paths=_tuple_of_strings(data.get("affected_source_paths", []), "affected_source_paths"),
            observed_spec_behavior=_optional_string(data.get("observed_spec_behavior", ""), "observed_spec_behavior"),
            observed_source_behavior=_optional_string(data.get("observed_source_behavior", ""), "observed_source_behavior"),
            evidence=_tuple_of_strings(data.get("evidence", []), "evidence"),
            default_resolution=_optional_string(data.get("default_resolution", "ask_user"), "default_resolution"),
            questions=tuple(
                ClarificationQuestion.from_dict(item) for item in _list_of_maps(data.get("questions", []), "questions")
            ),
        )


@dataclass(frozen=True)
class SpecReconciliationInput:
    """Input for deciding how to reconcile spec ambiguity or spec/source drift."""

    project: str
    request_summary: str
    spec_paths: tuple[str, ...] = ()
    source_paths: tuple[str, ...] = ()
    comparison_evidence: tuple[str, ...] = ()
    issues: tuple[SpecSourceIssue, ...] = ()
    notification_targets: tuple[str, ...] = ()
    decision_deadline: str = ""
    plan_history_targets: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "SpecReconciliationInput":
        return cls(
            project=_required_string(data, "project"),
            request_summary=_required_string(data, "request_summary"),
            spec_paths=_tuple_of_strings(data.get("spec_paths", []), "spec_paths"),
            source_paths=_tuple_of_strings(data.get("source_paths", []), "source_paths"),
            comparison_evidence=_tuple_of_strings(data.get("comparison_evidence", []), "comparison_evidence"),
            issues=tuple(SpecSourceIssue.from_dict(item) for item in _list_of_maps(data.get("issues", []), "issues")),
            notification_targets=_tuple_of_strings(data.get("notification_targets", []), "notification_targets"),
            decision_deadline=_optional_string(data.get("decision_deadline", ""), "decision_deadline"),
            plan_history_targets=_tuple_of_strings(data.get("plan_history_targets", []), "plan_history_targets"),
        )


def reconcile_spec_source(reconciliation_input: SpecReconciliationInput) -> JsonMap:
    """Return a deterministic reconciliation and clarification report."""

    gaps: list[str] = []
    warnings: list[str] = []

    if not reconciliation_input.project.strip():
        gaps.append("Project is missing.")
    if not reconciliation_input.request_summary.strip():
        gaps.append("Request summary is missing.")
    has_missing_spec_issue = any(issue.issue_type == "missing_spec" for issue in reconciliation_input.issues)

    if not reconciliation_input.spec_paths and not has_missing_spec_issue:
        gaps.append("Spec paths are missing; compare against an active spec or record missing_spec as an issue.")
    if not reconciliation_input.source_paths:
        gaps.append("Source paths are missing; compare against current implementation, tests, or generated artifacts.")
    if not reconciliation_input.comparison_evidence:
        gaps.append("Comparison evidence is missing; record inspected spec lines, source paths, tests, or command outputs.")
    if not reconciliation_input.issues:
        gaps.append("Issues are missing; record at least one ambiguity, mismatch, or missing trace.")
    if not reconciliation_input.plan_history_targets:
        warnings.append("Plan history targets are missing; save the reconciliation plan for meaningful work.")

    for issue in reconciliation_input.issues:
        _validate_issue(issue, gaps, warnings)

    clarification_issues = tuple(
        issue
        for issue in reconciliation_input.issues
        if issue.default_resolution == "ask_user" or issue.issue_type == "ambiguous_spec"
    )
    spec_update_candidates = tuple(issue.issue_id for issue in reconciliation_input.issues if issue.default_resolution == "update_spec")
    source_update_candidates = tuple(
        issue.issue_id for issue in reconciliation_input.issues if issue.default_resolution == "update_source"
    )

    notification_event = _build_notification_event(reconciliation_input, clarification_issues) if clarification_issues else None

    if gaps:
        status = "rework_required"
    elif clarification_issues:
        status = "clarification_required"
    else:
        status = "ready_to_reconcile"

    follow_up_actions = [f"Resolve reconciliation gap: {gap}" for gap in gaps]
    if status == "clarification_required":
        follow_up_actions.append("Send or surface notification_event so the user can answer the listed question IDs.")
        follow_up_actions.append("Do not change spec or source for ask_user issues until the answer is recorded.")
    if spec_update_candidates:
        follow_up_actions.append("For update_spec candidates, update spec and traceability before changing implementation behavior.")
    if source_update_candidates:
        follow_up_actions.append("For update_source candidates, update source/tests and validation against the active spec.")

    return {
        "status": status,
        "requires_rework": bool(gaps),
        "requires_user_input": status == "clarification_required",
        "principle": "When spec and source disagree, inspect evidence first, classify whether the spec or source should change, and ask user-answerable questions for ambiguous decisions.",
        "checks": {
            "spec_paths_count": len(reconciliation_input.spec_paths),
            "source_paths_count": len(reconciliation_input.source_paths),
            "comparison_evidence_count": len(reconciliation_input.comparison_evidence),
            "issues_count": len(reconciliation_input.issues),
            "clarification_questions_count": sum(len(issue.questions) for issue in clarification_issues),
            "notification_targets_count": len(reconciliation_input.notification_targets),
        },
        "spec_update_candidates": spec_update_candidates,
        "source_update_candidates": source_update_candidates,
        "clarification_issue_ids": tuple(issue.issue_id for issue in clarification_issues),
        "notification_event": notification_event,
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": follow_up_actions,
    }


def _validate_issue(issue: SpecSourceIssue, gaps: list[str], warnings: list[str]) -> None:
    label = f"issue {issue.issue_id}"
    if issue.issue_type not in ALLOWED_ISSUE_TYPES:
        gaps.append(f"{label} has unknown issue_type: {issue.issue_type}.")
    if issue.default_resolution not in ALLOWED_RESOLUTIONS:
        gaps.append(f"{label} has unknown default_resolution: {issue.default_resolution}.")
    if issue.severity not in ALLOWED_SEVERITIES:
        gaps.append(f"{label} has unknown severity: {issue.severity}.")
    if not issue.evidence:
        gaps.append(f"{label} is missing evidence.")
    if issue.issue_type == "spec_source_mismatch" and not (
        issue.observed_spec_behavior.strip() and issue.observed_source_behavior.strip()
    ):
        gaps.append(f"{label} must record observed_spec_behavior and observed_source_behavior.")
    if issue.default_resolution == "update_spec" and not issue.affected_spec_refs:
        gaps.append(f"{label} is marked update_spec but has no affected_spec_refs.")
    if issue.default_resolution == "update_source" and not issue.affected_source_paths:
        gaps.append(f"{label} is marked update_source but has no affected_source_paths.")
    if (issue.default_resolution == "ask_user" or issue.issue_type == "ambiguous_spec") and not issue.questions:
        gaps.append(f"{label} requires user clarification but has no questions.")
    for question in issue.questions:
        _validate_question(question, label, gaps, warnings)


def _validate_question(
    question: ClarificationQuestion,
    issue_label: str,
    gaps: list[str],
    warnings: list[str],
) -> None:
    label = f"{issue_label} question {question.question_id}"
    if not question.question_id.strip():
        gaps.append(f"{label} has an empty question_id.")
    if not question.question.strip():
        gaps.append(f"{label} has an empty question.")
    if not question.answer_format.strip():
        gaps.append(f"{label} is missing answer_format.")
    if question.options and question.recommended_option and question.recommended_option not in question.options:
        gaps.append(f"{label} recommended_option must match one of options.")
    if not question.decision_impact.strip():
        warnings.append(f"{label} has no decision_impact.")


def _build_notification_event(
    reconciliation_input: SpecReconciliationInput,
    clarification_issues: tuple[SpecSourceIssue, ...],
) -> JsonMap:
    severity = _max_severity(issue.severity for issue in clarification_issues)
    question_lines: list[str] = []
    reply_lines: list[str] = []
    for issue in clarification_issues:
        question_lines.append(f"- {issue.issue_id}: {issue.summary}")
        for question in issue.questions:
            option_text = f" Options: {', '.join(question.options)}." if question.options else ""
            recommendation = f" Recommended: {question.recommended_option}." if question.recommended_option else ""
            question_lines.append(f"  - {question.question_id}: {question.question}{option_text}{recommendation}")
            reply_lines.append(question.answer_format or f"{question.question_id}=<answer>")

    deadline = f"\nDeadline: {reconciliation_input.decision_deadline}" if reconciliation_input.decision_deadline else ""
    message = "\n".join(
        [
            f"Project: {reconciliation_input.project}",
            f"Request: {reconciliation_input.request_summary}",
            "Spec/source reconciliation needs your decision before continuing.",
            "Questions:",
            *question_lines,
            "Reply format:",
            *reply_lines,
            deadline.strip(),
        ]
    ).strip()
    return {
        "event_type": "clarification_needed",
        "title": f"Spec clarification needed: {reconciliation_input.project}",
        "message": message,
        "severity": severity,
        "metadata": {
            "project": reconciliation_input.project,
            "question_ids": ",".join(question.question_id for issue in clarification_issues for question in issue.questions),
            "spec_paths": ",".join(reconciliation_input.spec_paths),
            "source_paths": ",".join(reconciliation_input.source_paths),
        },
    }


def _max_severity(values: Any) -> str:
    max_value = "info"
    for value in values:
        if value in ALLOWED_SEVERITIES and ALLOWED_SEVERITIES[value] > ALLOWED_SEVERITIES[max_value]:
            max_value = value
    return max_value


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


def _list_of_maps(value: Any, field_name: str) -> list[JsonMap]:
    if not isinstance(value, list):
        raise TypeError(f"{field_name} must be a list.")
    if not all(isinstance(item, dict) for item in value):
        raise TypeError(f"{field_name} must contain only objects.")
    return value
