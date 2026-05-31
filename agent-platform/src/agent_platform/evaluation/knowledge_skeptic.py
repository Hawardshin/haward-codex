"""Skeptically validate knowledge-base references before reuse."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]


@dataclass(frozen=True)
class KnowledgeValidationInput:
    """Input for validating a knowledge-base claim or note before reuse."""

    claim: str
    intended_use: str
    knowledge_sources: tuple[str, ...] = ()
    verification_steps: tuple[str, ...] = ()
    skeptic_questions: tuple[str, ...] = ()
    contrary_signals: tuple[str, ...] = ()
    freshness_notes: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "KnowledgeValidationInput":
        return cls(
            claim=_required_string(data, "claim"),
            intended_use=_required_string(data, "intended_use"),
            knowledge_sources=_tuple_of_strings(data.get("knowledge_sources", []), "knowledge_sources"),
            verification_steps=_tuple_of_strings(data.get("verification_steps", []), "verification_steps"),
            skeptic_questions=_tuple_of_strings(data.get("skeptic_questions", []), "skeptic_questions"),
            contrary_signals=_tuple_of_strings(data.get("contrary_signals", []), "contrary_signals"),
            freshness_notes=_tuple_of_strings(data.get("freshness_notes", []), "freshness_notes"),
        )


def validate_knowledge_reference(validation_input: KnowledgeValidationInput) -> JsonMap:
    """Return whether a knowledge-base reference is ready to reuse."""

    gaps = []
    warnings = []

    if not validation_input.claim.strip():
        gaps.append("Claim is missing.")
    if not validation_input.intended_use.strip():
        gaps.append("Intended use is missing.")
    if not validation_input.knowledge_sources:
        gaps.append("Knowledge sources are missing.")
    if not validation_input.verification_steps:
        gaps.append("Independent verification steps are missing.")
    if not validation_input.skeptic_questions:
        gaps.append("Skeptic questions are missing.")
    if validation_input.contrary_signals:
        gaps.append("Contrary signals exist and must be resolved before reuse.")
    if not validation_input.freshness_notes:
        warnings.append("Freshness notes are missing; record whether the claim is time-sensitive.")

    status = "verification_required" if gaps else "ready_to_reference"

    return {
        "status": status,
        "requires_recheck": bool(gaps),
        "fallibility_assumption": "Knowledge-base content may be outdated, incomplete, or wrong.",
        "checks": {
            "sources_count": len(validation_input.knowledge_sources),
            "verification_steps_count": len(validation_input.verification_steps),
            "skeptic_questions_count": len(validation_input.skeptic_questions),
            "contrary_signals_count": len(validation_input.contrary_signals),
            "freshness_notes_count": len(validation_input.freshness_notes),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve gap: {gap}" for gap in gaps],
    }


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
