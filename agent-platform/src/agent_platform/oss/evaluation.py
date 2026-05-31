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


def evaluate_candidate(candidate: OpenSourceCandidate) -> dict[str, int | str]:
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

    return {
        "name": candidate.name,
        "score": score,
        "recommendation": recommendation,
    }


def _validate_score(value: int, field_name: str) -> None:
    if not 0 <= value <= 5:
        raise ValueError(f"{field_name} must be between 0 and 5.")
