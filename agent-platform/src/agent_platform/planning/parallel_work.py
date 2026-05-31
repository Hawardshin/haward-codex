"""Plan safe parallel work from task dependencies and file/resource boundaries."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


JsonMap = dict[str, Any]

ALLOWED_WORK_MODES = {"quick", "standard", "ship_first", "research", "governance"}
ALLOWED_RISK_LEVELS = {"low", "medium", "high"}


@dataclass(frozen=True)
class ParallelWorkTask:
    """One candidate unit of parallel work."""

    task_id: str
    title: str
    owner: str
    scope: str
    dependencies: tuple[str, ...] = ()
    touch_paths: tuple[str, ...] = ()
    output_targets: tuple[str, ...] = ()
    verification_steps: tuple[str, ...] = ()
    risk_level: str = "medium"
    parallelizable: bool = True
    notes: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ParallelWorkTask":
        return cls(
            task_id=_required_string(data, "task_id"),
            title=_required_string(data, "title"),
            owner=_required_string(data, "owner"),
            scope=_required_string(data, "scope"),
            dependencies=_tuple_of_strings(data.get("dependencies", []), "dependencies"),
            touch_paths=_tuple_of_strings(data.get("touch_paths", []), "touch_paths"),
            output_targets=_tuple_of_strings(data.get("output_targets", []), "output_targets"),
            verification_steps=_tuple_of_strings(data.get("verification_steps", []), "verification_steps"),
            risk_level=_optional_string(data.get("risk_level", "medium"), "risk_level"),
            parallelizable=_optional_bool(data.get("parallelizable", True), "parallelizable"),
            notes=_optional_string(data.get("notes", ""), "notes"),
        )


@dataclass(frozen=True)
class ParallelMergeGate:
    """A fan-in point that waits for parallel lanes and merges their outputs."""

    gate_id: str
    title: str
    wait_for: tuple[str, ...]
    merge_task_id: str
    merge_outputs: tuple[str, ...] = ()
    acceptance_checks: tuple[str, ...] = ()
    notes: str = ""

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ParallelMergeGate":
        return cls(
            gate_id=_required_string(data, "gate_id"),
            title=_required_string(data, "title"),
            wait_for=_tuple_of_strings(data.get("wait_for", []), "wait_for"),
            merge_task_id=_required_string(data, "merge_task_id"),
            merge_outputs=_tuple_of_strings(data.get("merge_outputs", []), "merge_outputs"),
            acceptance_checks=_tuple_of_strings(data.get("acceptance_checks", []), "acceptance_checks"),
            notes=_optional_string(data.get("notes", ""), "notes"),
        )


@dataclass(frozen=True)
class ParallelWorkPlanInput:
    """Structured input for deciding whether work can be split safely."""

    objective: str
    work_mode: str = "standard"
    tasks: tuple[ParallelWorkTask, ...] = ()
    merge_gates: tuple[ParallelMergeGate, ...] = ()
    shared_resources: tuple[str, ...] = ()
    conflict_controls: tuple[str, ...] = ()
    coordination_targets: tuple[str, ...] = ()
    merge_strategy: str = ""
    communication_checkpoints: tuple[str, ...] = ()
    verification_steps: tuple[str, ...] = ()
    rollback_plan: tuple[str, ...] = ()
    source_value_provenance: tuple[str, ...] = ()
    plan_evidence: tuple[str, ...] = ()
    plan_history_targets: tuple[str, ...] = ()

    @classmethod
    def from_dict(cls, data: JsonMap) -> "ParallelWorkPlanInput":
        return cls(
            objective=_required_string(data, "objective"),
            work_mode=_optional_string(data.get("work_mode", "standard"), "work_mode"),
            tasks=tuple(ParallelWorkTask.from_dict(item) for item in _list_of_maps(data.get("tasks", []), "tasks")),
            merge_gates=tuple(
                ParallelMergeGate.from_dict(item) for item in _list_of_maps(data.get("merge_gates", []), "merge_gates")
            ),
            shared_resources=_tuple_of_strings(data.get("shared_resources", []), "shared_resources"),
            conflict_controls=_tuple_of_strings(data.get("conflict_controls", []), "conflict_controls"),
            coordination_targets=_tuple_of_strings(data.get("coordination_targets", []), "coordination_targets"),
            merge_strategy=_optional_string(data.get("merge_strategy", ""), "merge_strategy"),
            communication_checkpoints=_tuple_of_strings(data.get("communication_checkpoints", []), "communication_checkpoints"),
            verification_steps=_tuple_of_strings(data.get("verification_steps", []), "verification_steps"),
            rollback_plan=_tuple_of_strings(data.get("rollback_plan", []), "rollback_plan"),
            source_value_provenance=_tuple_of_strings(data.get("source_value_provenance", []), "source_value_provenance"),
            plan_evidence=_tuple_of_strings(data.get("plan_evidence", []), "plan_evidence"),
            plan_history_targets=_tuple_of_strings(data.get("plan_history_targets", []), "plan_history_targets"),
        )


def plan_parallel_work(plan_input: ParallelWorkPlanInput) -> JsonMap:
    """Return whether a task graph is safe and useful for parallel execution."""

    gaps = []
    warnings = []
    work_mode = plan_input.work_mode.strip().lower() or "standard"
    task_ids = [task.task_id.strip() for task in plan_input.tasks]
    task_by_id = {task.task_id.strip(): task for task in plan_input.tasks if task.task_id.strip()}

    if not plan_input.objective.strip():
        gaps.append("Objective is missing.")
    if work_mode not in ALLOWED_WORK_MODES:
        gaps.append(f"Unknown work_mode '{plan_input.work_mode}'. Use one of: {', '.join(sorted(ALLOWED_WORK_MODES))}.")
    if len(plan_input.tasks) < 2:
        gaps.append("At least two tasks are required before parallel planning is useful.")

    _validate_task_fields(plan_input.tasks, gaps)
    if len(set(task_ids)) != len(task_ids):
        gaps.append("Task IDs must be unique.")
    _validate_dependencies(plan_input.tasks, task_by_id, gaps)
    _validate_merge_gates(plan_input.merge_gates, task_by_id, gaps)

    cycle_path = _find_cycle(plan_input.tasks)
    if cycle_path:
        gaps.append(f"Task dependency graph contains a cycle: {' -> '.join(cycle_path)}.")

    if not plan_input.conflict_controls:
        gaps.append("Conflict controls are missing; record file ownership, lock, branch, or handoff rules for parallel work.")
    if not plan_input.coordination_targets:
        gaps.append("Coordination targets are missing; record where active lanes and status will be tracked.")
    elif not any(target.strip().replace("\\", "/") == "_ops/coordination/status.json" for target in plan_input.coordination_targets):
        warnings.append("Coordination targets do not include _ops/coordination/status.json.")
    if not plan_input.merge_strategy.strip():
        gaps.append("Merge strategy is missing; record how parallel outputs will be combined and reviewed.")
    if not plan_input.communication_checkpoints:
        gaps.append("Communication checkpoints are missing; record when lanes report status and blockers.")
    if not plan_input.verification_steps:
        gaps.append("Verification steps are missing; record final checks after parallel outputs merge.")
    if not plan_input.rollback_plan:
        gaps.append("Rollback plan is missing; record how to recover if one lane fails or conflicts.")
    if not plan_input.source_value_provenance:
        gaps.append("Source value provenance is missing; record where dependency, concurrency, and conflict assumptions came from.")
    if not plan_input.plan_evidence:
        gaps.append("Plan evidence is missing; map lanes, dependencies, and merge choices to checked sources or repository evidence.")
    if not plan_input.plan_history_targets:
        gaps.append("Plan history target is missing.")

    batches = [] if cycle_path else _execution_batches(plan_input.tasks)
    _validate_batch_conflicts(batches, task_by_id, gaps)
    _validate_parallel_research_merge_gates(batches, task_by_id, plan_input.merge_gates, gaps)

    max_parallel_width = max((len(batch) for batch in batches), default=0)
    parallelism_available = max_parallel_width > 1
    if plan_input.tasks and not parallelism_available and not gaps:
        warnings.append("No independent task batch was found; execute sequentially or split work differently.")

    status = "rework_required" if gaps else "ready_to_parallelize" if parallelism_available else "sequential_required"

    return {
        "status": status,
        "requires_rework": bool(gaps),
        "parallelism_available": parallelism_available,
        "principle": "Parallel work needs explicit dependencies, file/resource boundaries, coordination, merge strategy, and final verification.",
        "checks": {
            "work_mode": work_mode,
            "tasks_count": len(plan_input.tasks),
            "merge_gates_count": len(plan_input.merge_gates),
            "parallelizable_tasks_count": len([task for task in plan_input.tasks if task.parallelizable]),
            "shared_resources_count": len(plan_input.shared_resources),
            "conflict_controls_count": len(plan_input.conflict_controls),
            "coordination_targets_count": len(plan_input.coordination_targets),
            "communication_checkpoints_count": len(plan_input.communication_checkpoints),
            "verification_steps_count": len(plan_input.verification_steps),
            "rollback_plan_count": len(plan_input.rollback_plan),
            "source_value_provenance_count": len(plan_input.source_value_provenance),
            "plan_evidence_count": len(plan_input.plan_evidence),
            "plan_history_targets_count": len(plan_input.plan_history_targets),
            "execution_batches_count": len(batches),
            "max_parallel_width": max_parallel_width,
        },
        "execution_batches": batches,
        "merge_gates": _merge_gate_summaries(plan_input.merge_gates, task_by_id, batches),
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve gap: {gap}" for gap in gaps],
    }


def _validate_task_fields(tasks: tuple[ParallelWorkTask, ...], gaps: list[str]) -> None:
    for index, task in enumerate(tasks, start=1):
        label = task.task_id.strip() or f"task {index}"
        if not task.task_id.strip():
            gaps.append(f"{label} is missing task_id.")
        if not task.title.strip():
            gaps.append(f"{label} is missing title.")
        if not task.owner.strip():
            gaps.append(f"{label} is missing owner.")
        if not task.scope.strip():
            gaps.append(f"{label} is missing scope.")
        if not task.touch_paths:
            gaps.append(f"{label} is missing touch_paths.")
        if not task.output_targets:
            gaps.append(f"{label} is missing output_targets.")
        if not task.verification_steps:
            gaps.append(f"{label} is missing verification_steps.")
        if task.risk_level not in ALLOWED_RISK_LEVELS:
            gaps.append(f"{label} has unknown risk_level: {task.risk_level}.")


def _validate_dependencies(
    tasks: tuple[ParallelWorkTask, ...],
    task_by_id: dict[str, ParallelWorkTask],
    gaps: list[str],
) -> None:
    for task in tasks:
        task_id = task.task_id.strip()
        for dependency in task.dependencies:
            normalized_dependency = dependency.strip()
            if normalized_dependency == task_id:
                gaps.append(f"{task_id} cannot depend on itself.")
            elif normalized_dependency not in task_by_id:
                gaps.append(f"{task_id} depends on unknown task_id: {normalized_dependency}.")


def _validate_merge_gates(
    merge_gates: tuple[ParallelMergeGate, ...],
    task_by_id: dict[str, ParallelWorkTask],
    gaps: list[str],
) -> None:
    gate_ids = [gate.gate_id.strip() for gate in merge_gates]
    if len(set(gate_ids)) != len(gate_ids):
        gaps.append("Merge gate IDs must be unique.")

    for index, gate in enumerate(merge_gates, start=1):
        label = gate.gate_id.strip() or f"merge gate {index}"
        if not gate.gate_id.strip():
            gaps.append(f"{label} is missing gate_id.")
        if not gate.title.strip():
            gaps.append(f"{label} is missing title.")
        if len(gate.wait_for) < 2:
            gaps.append(f"{label} must wait for at least two upstream lanes.")
        if len(set(gate.wait_for)) != len(gate.wait_for):
            gaps.append(f"{label} wait_for task IDs must be unique.")
        if not gate.merge_task_id.strip():
            gaps.append(f"{label} is missing merge_task_id.")
        if gate.merge_task_id in gate.wait_for:
            gaps.append(f"{label} merge_task_id cannot also be in wait_for.")
        if not gate.merge_outputs:
            gaps.append(f"{label} is missing merge_outputs.")
        if not gate.acceptance_checks:
            gaps.append(f"{label} is missing acceptance_checks.")

        unknown_waits = [task_id for task_id in gate.wait_for if task_id not in task_by_id]
        if unknown_waits:
            gaps.append(f"{label} waits for unknown task_id: {', '.join(unknown_waits)}.")
        if gate.merge_task_id not in task_by_id:
            gaps.append(f"{label} references unknown merge_task_id: {gate.merge_task_id}.")
            continue

        merge_task = task_by_id[gate.merge_task_id]
        missing_dependencies = sorted(set(gate.wait_for) - set(merge_task.dependencies))
        if missing_dependencies:
            gaps.append(
                f"{label} merge task {gate.merge_task_id} must depend on all wait_for tasks; missing: "
                f"{', '.join(missing_dependencies)}."
            )


def _validate_parallel_research_merge_gates(
    batches: list[list[str]],
    task_by_id: dict[str, ParallelWorkTask],
    merge_gates: tuple[ParallelMergeGate, ...],
    gaps: list[str],
) -> None:
    gate_wait_sets = [set(gate.wait_for) for gate in merge_gates]
    for batch in batches:
        research_task_ids = [task_id for task_id in batch if _looks_like_research_task(task_by_id[task_id])]
        if len(research_task_ids) < 2:
            continue
        if not any(set(research_task_ids).issubset(wait_set) for wait_set in gate_wait_sets):
            gaps.append(
                "Parallel research lanes require a merge gate that waits for every research lane in the batch: "
                f"{', '.join(research_task_ids)}."
            )


def _find_cycle(tasks: tuple[ParallelWorkTask, ...]) -> list[str]:
    task_ids = {task.task_id.strip() for task in tasks if task.task_id.strip()}
    dependencies = {
        task.task_id.strip(): [dependency.strip() for dependency in task.dependencies if dependency.strip() in task_ids]
        for task in tasks
        if task.task_id.strip()
    }
    visiting: set[str] = set()
    visited: set[str] = set()
    stack: list[str] = []

    def visit(task_id: str) -> list[str]:
        if task_id in visiting:
            cycle_start = stack.index(task_id)
            return stack[cycle_start:] + [task_id]
        if task_id in visited:
            return []
        visiting.add(task_id)
        stack.append(task_id)
        for dependency in dependencies.get(task_id, []):
            cycle = visit(dependency)
            if cycle:
                return cycle
        stack.pop()
        visiting.remove(task_id)
        visited.add(task_id)
        return []

    for task_id in sorted(task_ids):
        cycle = visit(task_id)
        if cycle:
            return cycle
    return []


def _execution_batches(tasks: tuple[ParallelWorkTask, ...]) -> list[list[str]]:
    remaining = {task.task_id.strip(): set(dependency.strip() for dependency in task.dependencies if dependency.strip()) for task in tasks if task.task_id.strip()}
    task_by_id = {task.task_id.strip(): task for task in tasks if task.task_id.strip()}
    completed: set[str] = set()
    batches: list[list[str]] = []

    while remaining:
        ready = sorted(
            task_id
            for task_id, dependencies in remaining.items()
            if dependencies.issubset(completed) and task_by_id[task_id].parallelizable
        )
        if not ready:
            ready = sorted(task_id for task_id, dependencies in remaining.items() if dependencies.issubset(completed))[:1]
        if not ready:
            return []
        batches.append(ready)
        completed.update(ready)
        for task_id in ready:
            remaining.pop(task_id, None)
    return batches


def _merge_gate_summaries(
    merge_gates: tuple[ParallelMergeGate, ...],
    task_by_id: dict[str, ParallelWorkTask],
    batches: list[list[str]],
) -> list[JsonMap]:
    task_to_batch = {task_id: index for index, batch in enumerate(batches, start=1) for task_id in batch}
    summaries = []
    for gate in merge_gates:
        wait_batches = [task_to_batch[task_id] for task_id in gate.wait_for if task_id in task_to_batch]
        merge_batch = task_to_batch.get(gate.merge_task_id)
        summaries.append(
            {
                "gate_id": gate.gate_id,
                "title": gate.title,
                "wait_for": list(gate.wait_for),
                "merge_task_id": gate.merge_task_id,
                "wait_batches": sorted(set(wait_batches)),
                "merge_batch": merge_batch,
                "merge_outputs": list(gate.merge_outputs),
                "acceptance_checks": list(gate.acceptance_checks),
                "ready_after_batch": max(wait_batches) if wait_batches else None,
                "merge_task_known": gate.merge_task_id in task_by_id,
            }
        )
    return summaries


def _validate_batch_conflicts(
    batches: list[list[str]],
    task_by_id: dict[str, ParallelWorkTask],
    gaps: list[str],
) -> None:
    for batch in batches:
        if len(batch) < 2:
            continue
        for index, task_id in enumerate(batch):
            for other_task_id in batch[index + 1 :]:
                overlap = _overlapping_paths(task_by_id[task_id].touch_paths, task_by_id[other_task_id].touch_paths)
                if overlap:
                    gaps.append(
                        f"Parallel tasks {task_id} and {other_task_id} touch overlapping paths: {', '.join(overlap)}."
                    )


def _overlapping_paths(left_paths: tuple[str, ...], right_paths: tuple[str, ...]) -> list[str]:
    overlaps = []
    normalized_left = [_normalize_path(path) for path in left_paths if path.strip()]
    normalized_right = [_normalize_path(path) for path in right_paths if path.strip()]
    for left in normalized_left:
        for right in normalized_right:
            if left == right or left.startswith(f"{right}/") or right.startswith(f"{left}/"):
                overlaps.append(f"{left} <-> {right}")
    return sorted(set(overlaps))


def _looks_like_research_task(task: ParallelWorkTask) -> bool:
    searchable = " ".join([task.task_id, task.title, task.owner, task.scope]).lower()
    return "research" in searchable or "조사" in searchable or "리서치" in searchable


def _normalize_path(path: str) -> str:
    return path.strip().replace("\\", "/").rstrip("/")


def _required_string(data: JsonMap, field_name: str) -> str:
    value = data.get(field_name)
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_string(value: Any, field_name: str) -> str:
    if not isinstance(value, str):
        raise TypeError(f"{field_name} must be a string.")
    return value


def _optional_bool(value: Any, field_name: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError(f"{field_name} must be a bool.")
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
