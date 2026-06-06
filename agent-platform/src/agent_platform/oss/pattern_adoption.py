"""Validate open-source structure pattern adoption plans."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

REQUIRED_TOP_LEVEL_FIELDS = {
    "schema_version",
    "name",
    "purpose",
    "platform_context",
    "source_repositories",
    "pattern_candidates",
    "language_runtime_options",
    "selected_language_option_id",
    "architecture_options",
    "selected_architecture_option_id",
    "folder_structure_options",
    "selected_folder_structure_option_id",
    "clone_import_policy",
    "hybrid_module_plan",
    "adoption_decisions",
    "validation_commands",
}

SOURCE_REPOSITORY_FIELDS = {
    "repo_id",
    "name",
    "url",
    "source_type",
    "checked_date",
    "primary_language",
    "license_status",
    "stars",
    "adoption_signal_role",
    "inspected_paths",
    "useful_patterns",
    "caveats",
}
PATTERN_FIELDS = {
    "pattern_id",
    "name",
    "pattern_type",
    "source_repo_ids",
    "applicability",
    "implementation_surface",
    "risks",
    "evidence",
}
LANGUAGE_FIELDS = {
    "option_id",
    "language_or_runtime",
    "use_when",
    "tradeoffs",
    "tooling",
    "project_boundary_fit",
}
ARCHITECTURE_FIELDS = {"option_id", "name", "fit", "tradeoffs", "decision"}
FOLDER_FIELDS = {"option_id", "name", "semantics", "tradeoffs", "decision"}
CLONE_POLICY_FIELDS = {
    "direct_code_import_allowed",
    "allowed_clone_scopes",
    "required_gates",
    "disallowed_conditions",
}
HYBRID_PLAN_FIELDS = {
    "enabled",
    "candidate_languages",
    "build_boundary",
    "interface_contract",
    "verification_commands",
    "rollback_plan",
}
HYBRID_LANGUAGE_FIELDS = {"language", "use_when", "build_command", "artifact_contract", "risks"}
ADOPTION_DECISION_FIELDS = {
    "decision_id",
    "pattern_id",
    "decision",
    "implementation_mode",
    "rationale",
    "target_paths",
    "implementation_steps",
    "guardrails",
    "validation_steps",
}

LICENSE_STATUSES = {"permissive", "unclear", "restrictive", "unknown"}
DECISIONS = {"adopt", "trial", "reference_only", "reject", "defer", "direct_import"}
IMPLEMENTATION_MODES = {
    "native_python",
    "documentation",
    "adapter",
    "hybrid_module",
    "external_dependency",
    "direct_code_import",
}
ACTIVE_DECISIONS = {"adopt", "trial", "direct_import"}
DIRECT_IMPORT_GATES = {
    "license_review",
    "pinned_commit",
    "attribution",
    "tests",
    "rollback",
    "human_checkpoint",
}
DIRECT_IMPORT_FIELDS = {"source_commit", "license_review", "attribution_plan", "rollback_plan"}


@dataclass(frozen=True)
class _ValidationContext:
    gaps: list[str]
    warnings: list[str]
    follow_up_actions: list[str]

    def gap(self, message: str) -> None:
        self.gaps.append(message)
        self.follow_up_actions.append(f"Resolve OSS pattern adoption gap: {message}")

    def warn(self, message: str) -> None:
        self.warnings.append(message)


def check_pattern_adoption_plan(plan: JsonMap) -> JsonMap:
    """Return whether an open-source structure pattern plan is ready to drive implementation."""

    context = _ValidationContext(gaps=[], warnings=[], follow_up_actions=[])
    _check_top_level(plan, context)

    source_repositories = _check_source_repositories(plan.get("source_repositories"), context)
    pattern_candidates = _check_pattern_candidates(plan.get("pattern_candidates"), source_repositories, context)
    language_options = _check_options(
        plan.get("language_runtime_options"),
        "language_runtime_options",
        LANGUAGE_FIELDS,
        context,
        minimum=2,
    )
    architecture_options = _check_options(
        plan.get("architecture_options"),
        "architecture_options",
        ARCHITECTURE_FIELDS,
        context,
        minimum=2,
    )
    folder_options = _check_options(
        plan.get("folder_structure_options"),
        "folder_structure_options",
        FOLDER_FIELDS,
        context,
        minimum=2,
    )

    _check_selected_option(plan, "selected_language_option_id", "language_runtime_options", language_options, context)
    _check_selected_option(plan, "selected_architecture_option_id", "architecture_options", architecture_options, context)
    _check_selected_option(plan, "selected_folder_structure_option_id", "folder_structure_options", folder_options, context)

    clone_policy = _check_clone_import_policy(plan.get("clone_import_policy"), context)
    hybrid_plan = _check_hybrid_module_plan(plan.get("hybrid_module_plan"), context)
    decisions = _check_adoption_decisions(
        plan.get("adoption_decisions"),
        pattern_candidates,
        source_repositories,
        clone_policy,
        hybrid_plan,
        context,
    )
    _check_validation_commands(plan.get("validation_commands"), context)

    status = "rework_required" if context.gaps else "ready_to_implement"
    direct_import_decisions = [
        decision["decision_id"]
        for decision in decisions
        if decision.get("implementation_mode") == "direct_code_import" or decision.get("decision") == "direct_import"
    ]
    hybrid_decisions = [decision["decision_id"] for decision in decisions if decision.get("implementation_mode") == "hybrid_module"]

    return {
        "status": status,
        "requires_rework": bool(context.gaps),
        "principle": (
            "Open-source structure patterns can influence the platform only when source provenance, "
            "license posture, local architecture fit, implementation mode, validation, and rollback are explicit."
        ),
        "checks": {
            "source_repository_count": len(source_repositories),
            "pattern_candidate_count": len(pattern_candidates),
            "language_option_count": len(language_options),
            "architecture_option_count": len(architecture_options),
            "folder_structure_option_count": len(folder_options),
            "adoption_decision_count": len(decisions),
            "direct_import_decision_count": len(direct_import_decisions),
            "hybrid_module_decision_count": len(hybrid_decisions),
        },
        "gaps": context.gaps,
        "warnings": context.warnings,
        "direct_import_decisions": direct_import_decisions,
        "hybrid_module_decisions": hybrid_decisions,
        "follow_up_actions": context.follow_up_actions,
    }


def _check_top_level(plan: JsonMap, context: _ValidationContext) -> None:
    missing = sorted(REQUIRED_TOP_LEVEL_FIELDS - set(plan))
    if missing:
        context.gap(f"top-level fields missing: {', '.join(missing)}.")
    if not _non_empty_string(plan.get("platform_context")):
        context.gap("platform_context must explain why these patterns fit the current platform.")


def _check_source_repositories(value: Any, context: _ValidationContext) -> dict[str, JsonMap]:
    if not isinstance(value, list) or len(value) < 3:
        context.gap("source_repositories must list at least three open-source repositories.")
        return {}

    repos: dict[str, JsonMap] = {}
    for index, item in enumerate(value, start=1):
        label = f"source_repositories[{index}]"
        if not isinstance(item, dict):
            context.gap(f"{label} must be an object.")
            continue
        _check_missing_fields(item, SOURCE_REPOSITORY_FIELDS, label, context)
        repo_id = item.get("repo_id")
        if not _non_empty_string(repo_id):
            context.gap(f"{label}.repo_id must be non-empty.")
            continue
        if repo_id in repos:
            context.gap(f"{label}.repo_id is duplicated: {repo_id}.")
        repos[repo_id] = item

        license_status = item.get("license_status")
        if license_status not in LICENSE_STATUSES:
            context.gap(f"{label}.license_status must be one of: {', '.join(sorted(LICENSE_STATUSES))}.")
        elif license_status != "permissive":
            context.warn(f"{label} has {license_status} license posture; use as reference only unless a review clears it.")

        stars = item.get("stars")
        if not isinstance(stars, int) or stars < 0:
            context.gap(f"{label}.stars must be a non-negative integer.")
        if not _list_of_non_empty_strings(item.get("inspected_paths")):
            context.gap(f"{label}.inspected_paths must list the repository paths inspected for patterns.")
        if not _list_of_non_empty_strings(item.get("useful_patterns")):
            context.gap(f"{label}.useful_patterns must list reusable patterns found in the repository.")

    return repos


def _check_pattern_candidates(
    value: Any,
    source_repositories: dict[str, JsonMap],
    context: _ValidationContext,
) -> dict[str, JsonMap]:
    if not isinstance(value, list) or len(value) < 3:
        context.gap("pattern_candidates must list at least three reusable patterns.")
        return {}

    patterns: dict[str, JsonMap] = {}
    for index, item in enumerate(value, start=1):
        label = f"pattern_candidates[{index}]"
        if not isinstance(item, dict):
            context.gap(f"{label} must be an object.")
            continue
        _check_missing_fields(item, PATTERN_FIELDS, label, context)
        pattern_id = item.get("pattern_id")
        if not _non_empty_string(pattern_id):
            context.gap(f"{label}.pattern_id must be non-empty.")
            continue
        if pattern_id in patterns:
            context.gap(f"{label}.pattern_id is duplicated: {pattern_id}.")
        patterns[pattern_id] = item

        source_ids = item.get("source_repo_ids")
        if not _list_of_non_empty_strings(source_ids):
            context.gap(f"{label}.source_repo_ids must reference at least one source repository.")
        else:
            for source_id in source_ids:
                if source_id not in source_repositories:
                    context.gap(f"{label}.source_repo_ids references unknown repo_id: {source_id}.")
        for field_name in ("applicability", "implementation_surface", "risks", "evidence"):
            if not _non_empty_string(item.get(field_name)):
                context.gap(f"{label}.{field_name} must be non-empty.")

    return patterns


def _check_options(
    value: Any,
    field_name: str,
    required_fields: set[str],
    context: _ValidationContext,
    *,
    minimum: int,
) -> dict[str, JsonMap]:
    if not isinstance(value, list) or len(value) < minimum:
        context.gap(f"{field_name} must list at least {minimum} options.")
        return {}

    options: dict[str, JsonMap] = {}
    for index, item in enumerate(value, start=1):
        label = f"{field_name}[{index}]"
        if not isinstance(item, dict):
            context.gap(f"{label} must be an object.")
            continue
        _check_missing_fields(item, required_fields, label, context)
        option_id = item.get("option_id")
        if not _non_empty_string(option_id):
            context.gap(f"{label}.option_id must be non-empty.")
            continue
        if option_id in options:
            context.gap(f"{label}.option_id is duplicated: {option_id}.")
        options[option_id] = item
        for required_field in required_fields - {"option_id"}:
            if not _non_empty_string(item.get(required_field)):
                context.gap(f"{label}.{required_field} must be non-empty.")
    return options


def _check_selected_option(
    plan: JsonMap,
    selected_field: str,
    option_label: str,
    options: dict[str, JsonMap],
    context: _ValidationContext,
) -> None:
    selected = plan.get(selected_field)
    if not _non_empty_string(selected):
        context.gap(f"{selected_field} must be non-empty.")
    elif selected not in options:
        context.gap(f"{selected_field} must match an option_id in {option_label}.")


def _check_clone_import_policy(value: Any, context: _ValidationContext) -> JsonMap:
    if not isinstance(value, dict):
        context.gap("clone_import_policy must be an object.")
        return {}
    _check_missing_fields(value, CLONE_POLICY_FIELDS, "clone_import_policy", context)
    if not isinstance(value.get("direct_code_import_allowed"), bool):
        context.gap("clone_import_policy.direct_code_import_allowed must be a bool.")
    if not _list_of_non_empty_strings(value.get("allowed_clone_scopes")):
        context.gap("clone_import_policy.allowed_clone_scopes must list allowed clone scopes.")
    required_gates = value.get("required_gates")
    if not _list_of_non_empty_strings(required_gates):
        context.gap("clone_import_policy.required_gates must list direct import gates.")
    else:
        missing_gates = sorted(DIRECT_IMPORT_GATES - set(required_gates))
        if missing_gates:
            context.gap(f"clone_import_policy.required_gates missing direct import gates: {', '.join(missing_gates)}.")
    if not _list_of_non_empty_strings(value.get("disallowed_conditions")):
        context.gap("clone_import_policy.disallowed_conditions must list stop conditions.")
    return value


def _check_hybrid_module_plan(value: Any, context: _ValidationContext) -> JsonMap:
    if not isinstance(value, dict):
        context.gap("hybrid_module_plan must be an object.")
        return {}
    _check_missing_fields(value, HYBRID_PLAN_FIELDS, "hybrid_module_plan", context)
    if not isinstance(value.get("enabled"), bool):
        context.gap("hybrid_module_plan.enabled must be a bool.")
    if not _non_empty_string(value.get("build_boundary")):
        context.gap("hybrid_module_plan.build_boundary must be non-empty.")
    if not _non_empty_string(value.get("interface_contract")):
        context.gap("hybrid_module_plan.interface_contract must be non-empty.")
    if not _list_of_non_empty_strings(value.get("verification_commands")):
        context.gap("hybrid_module_plan.verification_commands must list validation commands.")
    if not _non_empty_string(value.get("rollback_plan")):
        context.gap("hybrid_module_plan.rollback_plan must be non-empty.")

    candidate_languages = value.get("candidate_languages")
    if not isinstance(candidate_languages, list) or not candidate_languages:
        context.gap("hybrid_module_plan.candidate_languages must list candidate runtimes.")
        return value
    for index, item in enumerate(candidate_languages, start=1):
        label = f"hybrid_module_plan.candidate_languages[{index}]"
        if not isinstance(item, dict):
            context.gap(f"{label} must be an object.")
            continue
        _check_missing_fields(item, HYBRID_LANGUAGE_FIELDS, label, context)
        for field_name in HYBRID_LANGUAGE_FIELDS:
            if not _non_empty_string(item.get(field_name)):
                context.gap(f"{label}.{field_name} must be non-empty.")
    return value


def _check_adoption_decisions(
    value: Any,
    pattern_candidates: dict[str, JsonMap],
    source_repositories: dict[str, JsonMap],
    clone_policy: JsonMap,
    hybrid_plan: JsonMap,
    context: _ValidationContext,
) -> list[JsonMap]:
    if not isinstance(value, list) or not value:
        context.gap("adoption_decisions must list at least one decision.")
        return []

    decisions: list[JsonMap] = []
    decision_ids: set[str] = set()
    for index, item in enumerate(value, start=1):
        label = f"adoption_decisions[{index}]"
        if not isinstance(item, dict):
            context.gap(f"{label} must be an object.")
            continue
        _check_missing_fields(item, ADOPTION_DECISION_FIELDS, label, context)
        decision_id = item.get("decision_id")
        if not _non_empty_string(decision_id):
            context.gap(f"{label}.decision_id must be non-empty.")
            continue
        if decision_id in decision_ids:
            context.gap(f"{label}.decision_id is duplicated: {decision_id}.")
        decision_ids.add(decision_id)
        decisions.append(item)

        pattern_id = item.get("pattern_id")
        if not _non_empty_string(pattern_id) or pattern_id not in pattern_candidates:
            context.gap(f"{label}.pattern_id must reference a known pattern candidate.")
        decision = item.get("decision")
        implementation_mode = item.get("implementation_mode")
        if decision not in DECISIONS:
            context.gap(f"{label}.decision must be one of: {', '.join(sorted(DECISIONS))}.")
        if implementation_mode not in IMPLEMENTATION_MODES:
            context.gap(f"{label}.implementation_mode must be one of: {', '.join(sorted(IMPLEMENTATION_MODES))}.")
        if not _non_empty_string(item.get("rationale")):
            context.gap(f"{label}.rationale must be non-empty.")

        if decision in ACTIVE_DECISIONS:
            _check_active_decision(item, label, context)
        if implementation_mode == "hybrid_module":
            _check_hybrid_decision(hybrid_plan, label, context)
        if implementation_mode == "direct_code_import" or decision == "direct_import":
            _check_direct_import_decision(
                item,
                label,
                pattern_candidates,
                source_repositories,
                clone_policy,
                context,
            )

    if not any(item.get("decision") in {"adopt", "trial"} for item in decisions):
        context.gap("adoption_decisions must include at least one adopt or trial decision.")
    return decisions


def _check_active_decision(item: JsonMap, label: str, context: _ValidationContext) -> None:
    for field_name in ("target_paths", "implementation_steps", "guardrails", "validation_steps"):
        if not _list_of_non_empty_strings(item.get(field_name)):
            context.gap(f"{label}.{field_name} must be a non-empty list for active decisions.")


def _check_hybrid_decision(hybrid_plan: JsonMap, label: str, context: _ValidationContext) -> None:
    if hybrid_plan.get("enabled") is not True:
        context.gap(f"{label} uses hybrid_module, but hybrid_module_plan.enabled is not true.")
    for field_name in ("build_boundary", "interface_contract", "verification_commands", "rollback_plan"):
        value = hybrid_plan.get(field_name)
        if field_name == "verification_commands":
            valid = _list_of_non_empty_strings(value)
        else:
            valid = _non_empty_string(value)
        if not valid:
            context.gap(f"{label} uses hybrid_module, but hybrid_module_plan.{field_name} is incomplete.")


def _check_direct_import_decision(
    item: JsonMap,
    label: str,
    pattern_candidates: dict[str, JsonMap],
    source_repositories: dict[str, JsonMap],
    clone_policy: JsonMap,
    context: _ValidationContext,
) -> None:
    if clone_policy.get("direct_code_import_allowed") is not True:
        context.gap(f"{label} requests direct code import, but clone_import_policy.direct_code_import_allowed is not true.")
    for field_name in DIRECT_IMPORT_FIELDS:
        if not _non_empty_string(item.get(field_name)):
            context.gap(f"{label}.{field_name} is required for direct code import decisions.")

    required_gates = set(clone_policy.get("required_gates", [])) if isinstance(clone_policy.get("required_gates"), list) else set()
    missing_gates = sorted(DIRECT_IMPORT_GATES - required_gates)
    if missing_gates:
        context.gap(f"{label} direct import gate list is missing: {', '.join(missing_gates)}.")

    pattern = pattern_candidates.get(item.get("pattern_id"))
    if not pattern:
        return
    source_ids = pattern.get("source_repo_ids", [])
    if not isinstance(source_ids, list):
        return
    for source_id in source_ids:
        repo = source_repositories.get(source_id)
        if repo and repo.get("license_status") != "permissive":
            context.gap(f"{label} direct import references non-permissive or unclear source repository: {source_id}.")


def _check_validation_commands(value: Any, context: _ValidationContext) -> None:
    if not _list_of_non_empty_strings(value):
        context.gap("validation_commands must list the commands that prove this plan is ready.")


def _check_missing_fields(item: JsonMap, required_fields: set[str], label: str, context: _ValidationContext) -> None:
    missing = sorted(required_fields - set(item))
    if missing:
        context.gap(f"{label} missing fields: {', '.join(missing)}.")


def _non_empty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def _list_of_non_empty_strings(value: Any) -> bool:
    return isinstance(value, list) and bool(value) and all(_non_empty_string(item) for item in value)
