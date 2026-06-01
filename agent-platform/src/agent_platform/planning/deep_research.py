"""Validate deep research packages before long-form report writing."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

ALLOWED_DEPTH_LEVELS = {"standard", "deep", "exhaustive"}

DEPTH_REQUIREMENTS = {
    "standard": {
        "min_search_channels": 3,
        "min_sources_checked": 6,
        "min_source_types": 4,
        "min_research_iterations": 2,
        "min_evidence_items": 5,
        "min_report_outline_items": 4,
    },
    "deep": {
        "min_search_channels": 3,
        "min_sources_checked": 8,
        "min_source_types": 4,
        "min_research_iterations": 2,
        "min_evidence_items": 6,
        "min_report_outline_items": 5,
    },
    "exhaustive": {
        "min_search_channels": 4,
        "min_sources_checked": 12,
        "min_source_types": 5,
        "min_research_iterations": 3,
        "min_evidence_items": 10,
        "min_report_outline_items": 6,
    },
}

REQUIRED_DEEP_RESEARCH_STAGES = {
    "scope_definition",
    "query_decomposition",
    "source_strategy",
    "iterative_retrieval",
    "source_quality_review",
    "evidence_extraction",
    "contradiction_mapping",
    "synthesis",
    "report_outline",
    "citation_audit",
    "skeptic_review",
}

ALLOWED_SOURCE_TYPES = {
    "analysis",
    "book",
    "community",
    "contrary",
    "internal",
    "market_report",
    "news",
    "official",
    "official_statistics",
    "open_source",
    "other",
    "paper",
    "reference_implementation",
    "social",
    "standard",
    "survey_dataset",
    "tech_blog",
}

AUTHORITATIVE_SOURCE_TYPES = {
    "book",
    "official",
    "official_statistics",
    "open_source",
    "paper",
    "reference_implementation",
    "standard",
    "survey_dataset",
}

PRACTICAL_CONTEXT_SOURCE_TYPES = {
    "analysis",
    "community",
    "contrary",
    "market_report",
    "news",
    "open_source",
    "reference_implementation",
    "social",
    "tech_blog",
}


@dataclass(frozen=True)
class DeepResearchInput:
    """Structured input for deep research report readiness checks."""

    research_question: str
    report_goal: str
    intended_audience: str
    trigger_situation: str
    depth_level: str = "deep"
    research_profile_paths: tuple[str, ...] = ()
    search_channels: tuple[str, ...] = ()
    sources_checked: tuple[str, ...] = ()
    source_types: tuple[str, ...] = ()
    deep_research_stages: tuple[str, ...] = ()
    research_iterations: tuple[str, ...] = ()
    source_quality_notes: tuple[str, ...] = ()
    evidence_items: tuple[str, ...] = ()
    contradiction_notes: tuple[str, ...] = ()
    synthesis_notes: tuple[str, ...] = ()
    citation_requirements: tuple[str, ...] = ()
    citation_audit_notes: tuple[str, ...] = ()
    unsupported_or_weak_claims: tuple[str, ...] = ()
    report_outline: tuple[str, ...] = ()
    report_targets: tuple[str, ...] = ()
    source_value_provenance: tuple[str, ...] = ()
    risks_or_unknowns: tuple[str, ...] = ()
    follow_up_questions: tuple[str, ...] = ()
    knowledge_validation_status: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "DeepResearchInput":
        return cls(
            research_question=_required_string(data, "research_question"),
            report_goal=_required_string(data, "report_goal"),
            intended_audience=_required_string(data, "intended_audience"),
            trigger_situation=_required_string(data, "trigger_situation"),
            depth_level=_optional_string(data.get("depth_level", "deep"), "depth_level"),
            research_profile_paths=_tuple_of_strings(data.get("research_profile_paths", []), "research_profile_paths"),
            search_channels=_tuple_of_strings(data.get("search_channels", []), "search_channels"),
            sources_checked=_tuple_of_strings(data.get("sources_checked", []), "sources_checked"),
            source_types=_tuple_of_strings(data.get("source_types", []), "source_types"),
            deep_research_stages=_tuple_of_strings(data.get("deep_research_stages", []), "deep_research_stages"),
            research_iterations=_tuple_of_strings(data.get("research_iterations", []), "research_iterations"),
            source_quality_notes=_tuple_of_strings(data.get("source_quality_notes", []), "source_quality_notes"),
            evidence_items=_tuple_of_strings(data.get("evidence_items", []), "evidence_items"),
            contradiction_notes=_tuple_of_strings(data.get("contradiction_notes", []), "contradiction_notes"),
            synthesis_notes=_tuple_of_strings(data.get("synthesis_notes", []), "synthesis_notes"),
            citation_requirements=_tuple_of_strings(data.get("citation_requirements", []), "citation_requirements"),
            citation_audit_notes=_tuple_of_strings(data.get("citation_audit_notes", []), "citation_audit_notes"),
            unsupported_or_weak_claims=_tuple_of_strings(
                data.get("unsupported_or_weak_claims", []),
                "unsupported_or_weak_claims",
            ),
            report_outline=_tuple_of_strings(data.get("report_outline", []), "report_outline"),
            report_targets=_tuple_of_strings(data.get("report_targets", []), "report_targets"),
            source_value_provenance=_tuple_of_strings(data.get("source_value_provenance", []), "source_value_provenance"),
            risks_or_unknowns=_tuple_of_strings(data.get("risks_or_unknowns", []), "risks_or_unknowns"),
            follow_up_questions=_tuple_of_strings(data.get("follow_up_questions", []), "follow_up_questions"),
            knowledge_validation_status=_optional_string(data.get("knowledge_validation_status", ""), "knowledge_validation_status"),
        )


def complete_deep_research(research_input: DeepResearchInput) -> JsonMap:
    """Return whether deep research is ready for long-form report writing."""

    gaps: list[str] = []
    warnings: list[str] = []

    depth_level = _normalize_id(research_input.depth_level)
    if depth_level not in ALLOWED_DEPTH_LEVELS:
        gaps.append(f"Unknown depth_level '{research_input.depth_level}'. Use one of: {', '.join(sorted(ALLOWED_DEPTH_LEVELS))}.")
        depth_level = "deep"
    thresholds = DEPTH_REQUIREMENTS[depth_level]

    if not research_input.research_question.strip():
        gaps.append("Research question is missing.")
    if not research_input.report_goal.strip():
        gaps.append("Report goal is missing.")
    if not research_input.intended_audience.strip():
        gaps.append("Intended audience is missing.")
    if not research_input.trigger_situation.strip():
        gaps.append("Trigger situation is missing.")

    if not research_input.research_profile_paths:
        gaps.append("Research profile paths are missing.")
    elif not any(_is_deep_research_profile(path) for path in research_input.research_profile_paths):
        gaps.append("deep-research-profile.json must be recorded in research_profile_paths.")
    if research_input.research_profile_paths and not any(_is_research_config_path(path) for path in research_input.research_profile_paths):
        gaps.append("At least one research profile path must point to agent-platform/configs/research/.")

    if len(research_input.search_channels) < thresholds["min_search_channels"]:
        gaps.append(f"Use at least {thresholds['min_search_channels']} search channels for {depth_level}-level deep research.")
    if research_input.search_channels and not _has_web_channel(research_input.search_channels):
        gaps.append("Web search channel is missing.")
    if len(research_input.sources_checked) < thresholds["min_sources_checked"]:
        gaps.append(f"Check at least {thresholds['min_sources_checked']} sources for {depth_level}-level deep research.")

    normalized_source_types = _normalized_ids(research_input.source_types)
    unknown_source_types = sorted(normalized_source_types - ALLOWED_SOURCE_TYPES)
    if unknown_source_types:
        gaps.append(f"Unknown source types: {', '.join(unknown_source_types)}.")
    evidence_source_types = normalized_source_types - {"other"}
    if len(evidence_source_types) < thresholds["min_source_types"]:
        gaps.append(f"Use at least {thresholds['min_source_types']} distinct non-other source types for {depth_level}-level deep research.")
    if evidence_source_types and not evidence_source_types.intersection(AUTHORITATIVE_SOURCE_TYPES):
        gaps.append("At least one authoritative source type is required.")
    if evidence_source_types and not evidence_source_types.intersection(PRACTICAL_CONTEXT_SOURCE_TYPES):
        gaps.append("At least one practical, adoption, contrary, or context source type is required.")

    if not research_input.deep_research_stages:
        gaps.append("Deep research stages are missing.")
    else:
        missing_stages = sorted(REQUIRED_DEEP_RESEARCH_STAGES - _normalized_ids(research_input.deep_research_stages))
        if missing_stages:
            gaps.append(f"Deep research stages are incomplete; missing: {', '.join(missing_stages)}.")

    if len(research_input.research_iterations) < thresholds["min_research_iterations"]:
        gaps.append(f"Record at least {thresholds['min_research_iterations']} research iterations for {depth_level}-level deep research.")
    if not research_input.source_quality_notes:
        gaps.append("Source quality notes are missing.")
    if len(research_input.evidence_items) < thresholds["min_evidence_items"]:
        gaps.append(f"Record at least {thresholds['min_evidence_items']} evidence items for {depth_level}-level deep research.")
    if not research_input.contradiction_notes:
        gaps.append("Contradiction notes are missing; record conflicts, contrary evidence, or a checked none-found note.")
    if not research_input.synthesis_notes:
        gaps.append("Synthesis notes are missing.")
    if not research_input.citation_requirements:
        gaps.append("Citation requirements are missing.")
    if not research_input.citation_audit_notes:
        gaps.append("Citation audit notes are missing.")
    if not research_input.unsupported_or_weak_claims:
        gaps.append("Unsupported or weak claim notes are missing; record unresolved claims or an explicit none-found audit.")
    if len(research_input.report_outline) < thresholds["min_report_outline_items"]:
        gaps.append(f"Report outline needs at least {thresholds['min_report_outline_items']} sections for {depth_level}-level deep research.")
    if not research_input.report_targets:
        gaps.append("Report targets are missing.")
    if not research_input.source_value_provenance:
        gaps.append("Source value provenance is missing.")
    if not research_input.risks_or_unknowns:
        warnings.append("Risks or unknowns are missing; record uncertainty before report publication.")
    if not research_input.follow_up_questions:
        warnings.append("Follow-up questions are missing; record what a later research pass should revisit.")

    if _uses_internal_knowledge(research_input.sources_checked) and research_input.knowledge_validation_status != "ready_to_reference":
        gaps.append("Internal knowledge-base sources require knowledge_validation_status=ready_to_reference.")

    status = "more_research_required" if gaps else "ready_to_write_report"

    return {
        "status": status,
        "requires_more_research": bool(gaps),
        "principle": "Deep research must decompose the question, retrieve iteratively, rank sources, extract evidence, map contradictions, audit citations, and only then write the report.",
        "depth_level": depth_level,
        "required_deep_research_stages": sorted(REQUIRED_DEEP_RESEARCH_STAGES),
        "thresholds": thresholds,
        "checks": {
            "research_profile_paths_count": len(research_input.research_profile_paths),
            "search_channels_count": len(research_input.search_channels),
            "sources_checked_count": len(research_input.sources_checked),
            "source_types_count": len(evidence_source_types),
            "deep_research_stages_count": len(research_input.deep_research_stages),
            "research_iterations_count": len(research_input.research_iterations),
            "source_quality_notes_count": len(research_input.source_quality_notes),
            "evidence_items_count": len(research_input.evidence_items),
            "contradiction_notes_count": len(research_input.contradiction_notes),
            "synthesis_notes_count": len(research_input.synthesis_notes),
            "citation_requirements_count": len(research_input.citation_requirements),
            "citation_audit_notes_count": len(research_input.citation_audit_notes),
            "unsupported_or_weak_claims_count": len(research_input.unsupported_or_weak_claims),
            "report_outline_count": len(research_input.report_outline),
            "report_targets_count": len(research_input.report_targets),
            "source_value_provenance_count": len(research_input.source_value_provenance),
            "risks_or_unknowns_count": len(research_input.risks_or_unknowns),
            "follow_up_questions_count": len(research_input.follow_up_questions),
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve gap: {gap}" for gap in gaps],
    }


def _has_web_channel(search_channels: tuple[str, ...]) -> bool:
    return any("web" in channel.lower() or "internet" in channel.lower() for channel in search_channels)


def _uses_internal_knowledge(sources_checked: tuple[str, ...]) -> bool:
    internal_prefixes = ("_research/", "_docs/", "_history/", "_ops/", "agent-platform/docs/")
    internal_files = ("AGENTS.md", "README.md")
    return any(source.startswith(internal_prefixes) or source in internal_files for source in sources_checked)


def _is_research_config_path(path: str) -> bool:
    normalized = path.strip().replace("\\", "/")
    return normalized.startswith("agent-platform/configs/research/") and normalized.endswith(".json")


def _is_deep_research_profile(path: str) -> bool:
    normalized = path.strip().replace("\\", "/")
    return normalized == "agent-platform/configs/research/deep-research-profile.json"


def _normalized_ids(values: tuple[str, ...]) -> set[str]:
    return {_normalize_id(value) for value in values if value.strip()}


def _normalize_id(value: str) -> str:
    return value.strip().lower().replace("-", "_").replace(" ", "_")


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
