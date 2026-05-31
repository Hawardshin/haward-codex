"""Validate coding research before turning it into implementation work."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

ALLOWED_RESEARCH_TYPES = {
    "api_docs",
    "architecture",
    "bug_root_cause",
    "implementation_pattern",
    "library_selection",
    "migration",
    "open_source",
    "performance",
    "security",
    "testing",
}

ALLOWED_SOURCE_TYPES = {
    "analysis",
    "community",
    "contrary",
    "internal",
    "news",
    "official",
    "open_source",
    "other",
    "paper",
    "reference_implementation",
    "social",
    "standard",
    "tech_blog",
}

AUTHORITATIVE_SOURCE_TYPES = {"official", "paper", "standard", "open_source"}
PRACTICAL_SOURCE_TYPES = {"analysis", "community", "contrary", "news", "open_source", "reference_implementation", "social", "tech_blog"}
MIN_DISTINCT_SOURCE_TYPES = 3

REQUIRED_POST_RESEARCH_QUESTIONS = {
    "what_was_verified": "What exactly was verified?",
    "best_option": "What is the best option now?",
    "why_this_option": "Why is this option better than the alternatives?",
    "alternatives_rejected": "Which alternatives were rejected, and why?",
    "implementation_impact": "What files, modules, APIs, or workflows will change?",
    "risks_and_unknowns": "What remains risky, unknown, stale, or assumption-dependent?",
    "validation_plan": "How will the implementation be validated?",
    "reusable_knowledge": "What should be captured for future work?",
    "next_action": "What is the next concrete action?",
}


@dataclass(frozen=True)
class CodingResearchInput:
    """Structured input for checking whether coding research is complete."""

    research_goal: str
    coding_context: str
    research_types: tuple[str, ...] = ()
    search_channels: tuple[str, ...] = ()
    sources_checked: tuple[str, ...] = ()
    source_types: tuple[str, ...] = ()
    reference_config_paths: tuple[str, ...] = ()
    code_reference_sources: tuple[str, ...] = ()
    code_reference_notes: tuple[str, ...] = ()
    architecture_reference_sources: tuple[str, ...] = ()
    architecture_options: tuple[str, ...] = ()
    architecture_decision_notes: tuple[str, ...] = ()
    source_bundle_report: str = ""
    findings: tuple[str, ...] = ()
    options: tuple[str, ...] = ()
    recommendation: str = ""
    post_research_answers: dict[str, str] | None = None
    validation_steps: tuple[str, ...] = ()
    risks_or_unknowns: tuple[str, ...] = ()
    capture_targets: tuple[str, ...] = ()
    plan_history_targets: tuple[str, ...] = ()
    knowledge_validation_status: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "CodingResearchInput":
        return cls(
            research_goal=_required_string(data, "research_goal"),
            coding_context=_required_string(data, "coding_context"),
            research_types=_tuple_of_strings(data.get("research_types", []), "research_types"),
            search_channels=_tuple_of_strings(data.get("search_channels", []), "search_channels"),
            sources_checked=_tuple_of_strings(data.get("sources_checked", []), "sources_checked"),
            source_types=_tuple_of_strings(data.get("source_types", []), "source_types"),
            reference_config_paths=_tuple_of_strings(data.get("reference_config_paths", []), "reference_config_paths"),
            code_reference_sources=_tuple_of_strings(data.get("code_reference_sources", []), "code_reference_sources"),
            code_reference_notes=_tuple_of_strings(data.get("code_reference_notes", []), "code_reference_notes"),
            architecture_reference_sources=_tuple_of_strings(data.get("architecture_reference_sources", []), "architecture_reference_sources"),
            architecture_options=_tuple_of_strings(data.get("architecture_options", []), "architecture_options"),
            architecture_decision_notes=_tuple_of_strings(data.get("architecture_decision_notes", []), "architecture_decision_notes"),
            source_bundle_report=_optional_string(data.get("source_bundle_report", ""), "source_bundle_report"),
            findings=_tuple_of_strings(data.get("findings", []), "findings"),
            options=_tuple_of_strings(data.get("options", []), "options"),
            recommendation=_optional_string(data.get("recommendation", ""), "recommendation"),
            post_research_answers=_string_map(data.get("post_research_answers", {}), "post_research_answers"),
            validation_steps=_tuple_of_strings(data.get("validation_steps", []), "validation_steps"),
            risks_or_unknowns=_tuple_of_strings(data.get("risks_or_unknowns", []), "risks_or_unknowns"),
            capture_targets=_tuple_of_strings(data.get("capture_targets", []), "capture_targets"),
            plan_history_targets=_tuple_of_strings(data.get("plan_history_targets", []), "plan_history_targets"),
            knowledge_validation_status=_optional_string(data.get("knowledge_validation_status", ""), "knowledge_validation_status"),
        )


def complete_coding_research(research_input: CodingResearchInput) -> JsonMap:
    """Return whether coding research is ready to become implementation work."""

    gaps = []
    warnings = []
    answers = research_input.post_research_answers or {}

    if not research_input.research_goal.strip():
        gaps.append("Research goal is missing.")
    if not research_input.coding_context.strip():
        gaps.append("Coding context is missing.")
    if not research_input.research_types:
        gaps.append("Research types are missing.")

    unknown_types = sorted(set(research_input.research_types) - ALLOWED_RESEARCH_TYPES)
    if unknown_types:
        gaps.append(f"Unknown research types: {', '.join(unknown_types)}.")

    if len(research_input.search_channels) < 2:
        gaps.append("Use at least two search channels, such as web search plus official docs, repository search, code search, papers, or package registry search.")
    if research_input.search_channels and not _has_web_channel(research_input.search_channels):
        gaps.append("Web search channel is missing.")
    if research_input.search_channels and not _has_code_reference_channel(research_input.search_channels):
        gaps.append("Code reference channel is missing; use repository search, code search, or open-source repository search before implementation.")
    if not research_input.sources_checked:
        gaps.append("Sources checked are missing.")
    if not research_input.reference_config_paths:
        gaps.append("Reference config paths are missing; point to the source registry or research profile used for this investigation.")
    elif not any(_is_research_config_path(path) for path in research_input.reference_config_paths):
        gaps.append("At least one reference config path must point to agent-platform/configs/research/.")
    normalized_source_types = _normalized_source_types(research_input.source_types)
    if not normalized_source_types:
        gaps.append("Source types are missing; record diverse source types such as official, paper, open_source, tech_blog, community, social, or contrary.")
    unknown_source_types = sorted(normalized_source_types - ALLOWED_SOURCE_TYPES)
    if unknown_source_types:
        gaps.append(f"Unknown source types: {', '.join(unknown_source_types)}.")
    evidence_source_types = normalized_source_types - {"other"}
    if normalized_source_types and len(evidence_source_types) < MIN_DISTINCT_SOURCE_TYPES:
        gaps.append(f"Use at least {MIN_DISTINCT_SOURCE_TYPES} distinct non-other source types for coding research.")
    if normalized_source_types and not evidence_source_types.intersection(AUTHORITATIVE_SOURCE_TYPES):
        gaps.append("At least one authoritative source type is required: official, paper, standard, or open_source.")
    if normalized_source_types and not evidence_source_types.intersection(PRACTICAL_SOURCE_TYPES):
        gaps.append("At least one practical or adoption source type is required: open_source, reference_implementation, tech_blog, analysis, community, social, news, or contrary.")
    if not research_input.code_reference_sources:
        gaps.append("Code reference sources are missing; inspect relevant open-source repositories, reference implementations, or well-structured code before implementation.")
    elif not any(_looks_like_code_reference(source) for source in research_input.code_reference_sources):
        gaps.append("At least one code reference source must be a repository URL, source file path, or code search result.")
    if not research_input.code_reference_notes:
        gaps.append("Code reference notes are missing; record what structure, API pattern, error handling, tests, or implementation detail was learned from the referenced code.")
    if not research_input.architecture_reference_sources:
        gaps.append("Architecture reference sources are missing; inspect best-practice architecture frameworks, reference architectures, or well-structured source architectures before implementation.")
    elif not any(_looks_like_architecture_reference(source) for source in research_input.architecture_reference_sources):
        gaps.append("At least one architecture reference source must be an architecture framework, reference architecture, ADR, C4/arc42/SEI resource, or architecture-focused repository/source path.")
    if len(research_input.architecture_options) < 2:
        gaps.append("At least two architecture options or patterns must be compared before implementation.")
    if not research_input.architecture_decision_notes:
        gaps.append("Architecture decision notes are missing; record the selected architecture, rejected alternatives, boundaries, trade-offs, and validation impact.")
    if not research_input.findings:
        gaps.append("Findings are missing.")
    if not research_input.options:
        gaps.append("Options considered are missing.")
    if not research_input.recommendation.strip():
        gaps.append("Recommendation is missing.")

    missing_questions = sorted(set(REQUIRED_POST_RESEARCH_QUESTIONS) - {key for key, value in answers.items() if value.strip()})
    for question_id in missing_questions:
        gaps.append(f"Post-research answer is missing: {question_id}.")

    if not research_input.validation_steps:
        gaps.append("Validation steps are missing.")
    if not research_input.risks_or_unknowns:
        gaps.append("Risks or unknowns are missing.")
    if not research_input.plan_history_targets:
        gaps.append("Plan history target is missing.")

    if _uses_internal_knowledge(research_input.sources_checked) and research_input.knowledge_validation_status != "ready_to_reference":
        gaps.append("Internal knowledge-base sources require knowledge_validation_status=ready_to_reference.")

    if len(research_input.sources_checked) >= 8 and not research_input.source_bundle_report.strip():
        warnings.append("Large source bundle has no source_bundle_report; consider _tools/source-collector for repeatable scoring.")
    if not research_input.capture_targets:
        warnings.append("Capture targets are missing; record where reusable coding research should be stored.")
    if (
        any(source.startswith("http") for source in research_input.sources_checked)
        and not evidence_source_types.intersection(AUTHORITATIVE_SOURCE_TYPES)
        and not _has_official_or_primary_signal(research_input.sources_checked)
    ):
        warnings.append("External sources include no obvious official, standards, paper, or repository source.")

    status = "more_research_required" if gaps else "ready_to_implement"

    return {
        "status": status,
        "requires_more_research": bool(gaps),
        "principle": "Coding research must be search-backed, source-aware, skeptical, and closed with reusable answers before implementation.",
        "allowed_research_types": sorted(ALLOWED_RESEARCH_TYPES),
        "allowed_source_types": sorted(ALLOWED_SOURCE_TYPES),
        "required_post_research_questions": REQUIRED_POST_RESEARCH_QUESTIONS,
        "checks": {
            "research_types_count": len(research_input.research_types),
            "search_channels_count": len(research_input.search_channels),
            "sources_checked_count": len(research_input.sources_checked),
            "source_types_count": len(evidence_source_types),
            "source_type_counts": _source_type_counts(research_input.source_types),
            "reference_config_paths_count": len(research_input.reference_config_paths),
            "code_reference_sources_count": len(research_input.code_reference_sources),
            "code_reference_notes_count": len(research_input.code_reference_notes),
            "architecture_reference_sources_count": len(research_input.architecture_reference_sources),
            "architecture_options_count": len(research_input.architecture_options),
            "architecture_decision_notes_count": len(research_input.architecture_decision_notes),
            "findings_count": len(research_input.findings),
            "options_count": len(research_input.options),
            "post_research_answers_count": len([value for value in answers.values() if value.strip()]),
            "validation_steps_count": len(research_input.validation_steps),
            "risks_or_unknowns_count": len(research_input.risks_or_unknowns),
            "capture_targets_count": len(research_input.capture_targets),
            "plan_history_targets_count": len(research_input.plan_history_targets),
        },
        "missing_post_research_questions": missing_questions,
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve gap: {gap}" for gap in gaps],
    }


def _has_web_channel(search_channels: tuple[str, ...]) -> bool:
    return any("web" in channel.lower() or "internet" in channel.lower() for channel in search_channels)


def _has_code_reference_channel(search_channels: tuple[str, ...]) -> bool:
    code_markers = ("code", "repository", "repo", "github", "gitlab", "source")
    return any(any(marker in channel.lower() for marker in code_markers) for channel in search_channels)


def _normalized_source_types(source_types: tuple[str, ...]) -> set[str]:
    return {source_type.strip().lower() for source_type in source_types if source_type.strip()}


def _source_type_counts(source_types: tuple[str, ...]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for source_type in source_types:
        normalized = source_type.strip().lower()
        if normalized:
            counts[normalized] = counts.get(normalized, 0) + 1
    return counts


def _is_research_config_path(path: str) -> bool:
    normalized = path.strip().replace("\\", "/")
    return normalized.startswith("agent-platform/configs/research/") and normalized.endswith(".json")


def _looks_like_code_reference(source: str) -> bool:
    normalized = source.strip().lower().replace("\\", "/")
    location_markers = (
        "github.com/",
        "gitlab.com/",
        "sourcegraph.com/",
        "searchcode.com/",
        "/src/",
        "/tests/",
        "/examples/",
    )
    code_extensions = (
        ".py",
        ".js",
        ".ts",
        ".tsx",
        ".go",
        ".rs",
        ".java",
        ".kt",
        ".rb",
        ".php",
        ".cs",
        ".cpp",
        ".c",
    )
    if any(marker in normalized for marker in location_markers):
        return True
    path_without_fragment = normalized.split("#", 1)[0].split("?", 1)[0]
    return any(path_without_fragment.endswith(extension) for extension in code_extensions)


def _looks_like_architecture_reference(source: str) -> bool:
    normalized = source.strip().lower().replace("\\", "/")
    architecture_markers = (
        "architecture",
        "wellarchitected",
        "well-architected",
        "arc42",
        "c4model",
        "c4 model",
        "sei.cmu.edu",
        "adr",
        "decision-record",
        "reference-architecture",
        "reference_architecture",
        "/docs/architecture",
        "architecture.md",
        "/architecture/",
    )
    return any(marker in normalized for marker in architecture_markers)


def _uses_internal_knowledge(sources_checked: tuple[str, ...]) -> bool:
    internal_prefixes = ("_research/", "_docs/", "_history/", "_ops/", "agent-platform/docs/")
    internal_files = ("AGENTS.md", "README.md")
    return any(source.startswith(internal_prefixes) or source in internal_files for source in sources_checked)


def _has_official_or_primary_signal(sources_checked: tuple[str, ...]) -> bool:
    primary_markers = (
        "docs.",
        "documentation",
        "github.com",
        "gitlab.com",
        "arxiv.org",
        "doi.org",
        "ietf.org",
        "w3.org",
        "iso.org",
        "rfc-editor.org",
        "official",
    )
    return any(any(marker in source.lower() for marker in primary_markers) for source in sources_checked)


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


def _string_map(value: Any, field_name: str) -> dict[str, str]:
    if not isinstance(value, dict):
        raise TypeError(f"{field_name} must be an object with string values.")
    if not all(isinstance(key, str) and isinstance(item, str) for key, item in value.items()):
        raise TypeError(f"{field_name} must contain only string keys and string values.")
    return dict(value)
