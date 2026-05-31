"""Turn search findings into validated insights and plan readiness."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

REQUIRED_ANSWER_ENGINE_STAGES = {
    "query_understanding",
    "search_retrieval",
    "source_ranking",
    "evidence_extraction",
    "synthesis",
    "citation_grounding",
    "skeptic_review",
}


@dataclass(frozen=True)
class ResearchInsightPlanInput:
    """Input for checking whether research is sufficient to make a plan."""

    objective: str
    search_questions: tuple[str, ...] = ()
    search_channels: tuple[str, ...] = ()
    sources_checked: tuple[str, ...] = ()
    research_profile_paths: tuple[str, ...] = ()
    answer_engine_stages: tuple[str, ...] = ()
    citation_requirements: tuple[str, ...] = ()
    insights: tuple[str, ...] = ()
    plan_steps: tuple[str, ...] = ()
    validation_steps: tuple[str, ...] = ()
    knowledge_validation_status: str = ""
    risks_or_unknowns: tuple[str, ...] = ()
    capture_targets: tuple[str, ...] = ()
    plan_history_targets: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ResearchInsightPlanInput":
        return cls(
            objective=_required_string(data, "objective"),
            search_questions=_tuple_of_strings(data.get("search_questions", []), "search_questions"),
            search_channels=_tuple_of_strings(data.get("search_channels", []), "search_channels"),
            sources_checked=_tuple_of_strings(data.get("sources_checked", []), "sources_checked"),
            research_profile_paths=_tuple_of_strings(data.get("research_profile_paths", []), "research_profile_paths"),
            answer_engine_stages=_tuple_of_strings(data.get("answer_engine_stages", []), "answer_engine_stages"),
            citation_requirements=_tuple_of_strings(data.get("citation_requirements", []), "citation_requirements"),
            insights=_tuple_of_strings(data.get("insights", []), "insights"),
            plan_steps=_tuple_of_strings(data.get("plan_steps", []), "plan_steps"),
            validation_steps=_tuple_of_strings(data.get("validation_steps", []), "validation_steps"),
            knowledge_validation_status=_optional_string(data.get("knowledge_validation_status", ""), "knowledge_validation_status"),
            risks_or_unknowns=_tuple_of_strings(data.get("risks_or_unknowns", []), "risks_or_unknowns"),
            capture_targets=_tuple_of_strings(data.get("capture_targets", []), "capture_targets"),
            plan_history_targets=_tuple_of_strings(data.get("plan_history_targets", []), "plan_history_targets"),
        )


def create_research_insight_plan(plan_input: ResearchInsightPlanInput) -> JsonMap:
    """Return a readiness report for search-backed planning."""

    gaps = []
    warnings = []

    if not plan_input.objective.strip():
        gaps.append("Objective is missing.")
    if not plan_input.search_questions:
        gaps.append("Search questions are missing.")
    if len(plan_input.search_channels) < 2:
        gaps.append("Use at least two search channels, such as web search plus repository or documentation search.")
    if plan_input.search_channels and not _has_web_channel(plan_input.search_channels):
        gaps.append("Web search channel is missing.")
    if not plan_input.sources_checked:
        gaps.append("Sources checked are missing.")
    if not plan_input.research_profile_paths:
        gaps.append("Research profile paths are missing; record the research/source configs used for this plan.")
    elif not any(_is_research_config_path(path) for path in plan_input.research_profile_paths):
        gaps.append("At least one research profile path must point to agent-platform/configs/research/.")
    if not plan_input.answer_engine_stages:
        gaps.append("Answer engine stages are missing; use the research-agent-profile pipeline before planning.")
    else:
        missing_stages = sorted(REQUIRED_ANSWER_ENGINE_STAGES - _normalized_stage_ids(plan_input.answer_engine_stages))
        if missing_stages:
            gaps.append(f"Answer engine stages are incomplete; missing: {', '.join(missing_stages)}.")
    if not plan_input.citation_requirements:
        gaps.append("Citation requirements are missing; record how claims will be grounded to checked sources.")
    if not plan_input.insights:
        gaps.append("Insights are missing.")
    if not plan_input.plan_steps:
        gaps.append("Plan steps are missing.")
    if not plan_input.validation_steps:
        gaps.append("Validation steps are missing.")
    if not plan_input.plan_history_targets:
        gaps.append("Plan history target is missing.")

    if _uses_internal_knowledge(plan_input.sources_checked) and plan_input.knowledge_validation_status != "ready_to_reference":
        gaps.append("Internal knowledge-base sources require knowledge_validation_status=ready_to_reference.")

    if not plan_input.risks_or_unknowns:
        warnings.append("Risks or unknowns are missing; record uncertainty before execution.")
    if not plan_input.capture_targets:
        warnings.append("Capture targets are missing; record where reusable findings should be stored.")

    status = "more_research_required" if gaps else "ready_to_plan"

    return {
        "status": status,
        "requires_more_research": bool(gaps),
        "principle": "Use a search-grounded answer-engine flow to produce evidence-backed insights before planning.",
        "checks": {
            "search_questions_count": len(plan_input.search_questions),
            "search_channels_count": len(plan_input.search_channels),
            "sources_checked_count": len(plan_input.sources_checked),
            "research_profile_paths_count": len(plan_input.research_profile_paths),
            "answer_engine_stages_count": len(plan_input.answer_engine_stages),
            "required_answer_engine_stages": sorted(REQUIRED_ANSWER_ENGINE_STAGES),
            "citation_requirements_count": len(plan_input.citation_requirements),
            "insights_count": len(plan_input.insights),
            "plan_steps_count": len(plan_input.plan_steps),
            "validation_steps_count": len(plan_input.validation_steps),
            "risks_or_unknowns_count": len(plan_input.risks_or_unknowns),
            "capture_targets_count": len(plan_input.capture_targets),
            "plan_history_targets_count": len(plan_input.plan_history_targets),
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


def _normalized_stage_ids(stage_ids: tuple[str, ...]) -> set[str]:
    return {stage_id.strip().lower().replace("-", "_").replace(" ", "_") for stage_id in stage_ids if stage_id.strip()}


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
