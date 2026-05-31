"""Small scoring model for open-source dependency candidates."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class OpenSourceCandidate:
    """A dependency or framework being considered for adoption."""

    name: str
    purpose: str
    license_name: str
    maintained: int
    documentation: int
    community: int
    fit: int
    lock_in_risk: int
    notes: str = ""
    install_needed: bool = False
    installation_scope: str = ""
    install_command: str = ""
    dependency_record_path: str = ""
    installation_record_path: str = ""
    environment_path: str = ""
    version_or_lock_status: str = ""
    post_install_verification: str = ""
    security_review: str = ""
    license_review: str = ""
    rollback_plan: str = ""


def evaluate_candidate(candidate: OpenSourceCandidate) -> dict[str, int | str | bool | list[str]]:
    """Return a simple score from 0 to 100.

    Inputs use a 0-5 scale. Higher lock-in risk lowers the score.
    """

    _validate_score(candidate.maintained, "maintained")
    _validate_score(candidate.documentation, "documentation")
    _validate_score(candidate.community, "community")
    _validate_score(candidate.fit, "fit")
    _validate_score(candidate.lock_in_risk, "lock_in_risk")

    positive = (
        candidate.maintained * 25
        + candidate.documentation * 20
        + candidate.community * 15
        + candidate.fit * 30
    )
    risk_penalty = candidate.lock_in_risk * 10
    score = max(0, min(100, round((positive - risk_penalty) / 4.5)))

    if score >= 80:
        recommendation = "adopt"
    elif score >= 60:
        recommendation = "trial"
    else:
        recommendation = "avoid"

    installation_gaps = _installation_gaps(candidate)
    if candidate.install_needed and recommendation in {"adopt", "trial"}:
        installation_status = "installation_review_required" if installation_gaps else "ready_to_install"
    elif candidate.install_needed:
        installation_status = "do_not_install"
    else:
        installation_status = "not_required"

    return {
        "name": candidate.name,
        "score": score,
        "recommendation": recommendation,
        "install_needed": candidate.install_needed,
        "installation_status": installation_status,
        "installation_gaps": installation_gaps,
    }


def _validate_score(value: int, field_name: str) -> None:
    if not 0 <= value <= 5:
        raise ValueError(f"{field_name} must be between 0 and 5.")


def _installation_gaps(candidate: OpenSourceCandidate) -> list[str]:
    if not candidate.install_needed:
        return []

    gaps = []
    if not candidate.installation_scope.strip():
        gaps.append("installation_scope is missing.")
    if not candidate.install_command.strip():
        gaps.append("install_command is missing.")
    if not candidate.dependency_record_path.strip():
        gaps.append("dependency_record_path is missing.")
    if not candidate.installation_record_path.strip():
        gaps.append("installation_record_path is missing.")
    if not candidate.environment_path.strip():
        gaps.append("environment_path is missing.")
    if not candidate.version_or_lock_status.strip():
        gaps.append("version_or_lock_status is missing.")
    if not candidate.post_install_verification.strip():
        gaps.append("post_install_verification is missing.")
    if not candidate.security_review.strip():
        gaps.append("security_review is missing.")
    if not candidate.license_review.strip():
        gaps.append("license_review is missing.")
    if not candidate.rollback_plan.strip():
        gaps.append("rollback_plan is missing.")
    return gaps
