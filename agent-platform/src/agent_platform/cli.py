"""Command line entry points for the agent platform."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from agent_platform.core.registry import load_agent_spec, load_registry_dir
from agent_platform.evaluation.hallucination_guard import HallucinationGuardInput, check_hallucination_risk
from agent_platform.evaluation.knowledge_skeptic import KnowledgeValidationInput, validate_knowledge_reference
from agent_platform.evaluation.skill_validator import SkillValidationInput, validate_skill_definition
from agent_platform.evaluation.work_evaluator import WorkEvaluationInput, evaluate_work
from agent_platform.governance.config_contract import check_config_contract
from agent_platform.integrations.notifications import (
    NotificationEvent,
    check_notification_config,
    dispatch_notification,
    load_notification_config,
)
from agent_platform.install_modes import (
    check_install_mode_registry,
    list_install_modes,
    load_install_mode_registry,
    show_install_mode,
)
from agent_platform.memory.bootstrap import MemoryBootstrapManifest, check_memory_bootstrap
from agent_platform.oss.evaluation import OpenSourceCandidate, evaluate_candidate
from agent_platform.planning.coding_research import CodingResearchInput, complete_coding_research
from agent_platform.planning.deep_research import DeepResearchInput, complete_deep_research
from agent_platform.planning.parallel_work import ParallelWorkPlanInput, plan_parallel_work
from agent_platform.planning.research_insight_planner import ResearchInsightPlanInput, create_research_insight_plan
from agent_platform.planning.spec_reconciliation import SpecReconciliationInput, reconcile_spec_source


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="agent-platform")
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_agents = subparsers.add_parser("list-agents", help="List agent specs in a registry directory.")
    list_agents.add_argument("--registry", type=Path, default=Path("configs/agents"))

    inspect_agent = subparsers.add_parser("inspect-agent", help="Print one agent spec as JSON.")
    inspect_agent.add_argument("path", type=Path)

    score_oss = subparsers.add_parser("score-oss", help="Score an open-source candidate JSON file.")
    score_oss.add_argument("path", type=Path)

    evaluate = subparsers.add_parser("evaluate-work", help="Evaluate completed work against the initial instruction.")
    evaluate.add_argument("path", type=Path)

    validate_knowledge = subparsers.add_parser("validate-knowledge", help="Validate a knowledge-base reference skeptically.")
    validate_knowledge.add_argument("path", type=Path)

    validate_skill = subparsers.add_parser("validate-skill", help="Validate a repository-managed Codex skill source folder.")
    validate_skill.add_argument("path", type=Path)

    check_grounding = subparsers.add_parser("check-grounding", help="Check whether factual claims are grounded before publication.")
    check_grounding.add_argument("path", type=Path)

    plan_from_research = subparsers.add_parser("plan-from-research", help="Check whether search-backed insights are ready for planning.")
    plan_from_research.add_argument("path", type=Path)

    complete_research = subparsers.add_parser("complete-coding-research", help="Check whether coding research is ready for implementation.")
    complete_research.add_argument("path", type=Path)

    complete_deep = subparsers.add_parser("complete-deep-research", help="Check whether deep research is ready for long-form report writing.")
    complete_deep.add_argument("path", type=Path)

    plan_parallel = subparsers.add_parser("plan-parallel-work", help="Check whether work can be safely split into parallel lanes.")
    plan_parallel.add_argument("path", type=Path)

    reconcile_spec = subparsers.add_parser(
        "reconcile-spec",
        help="Check whether spec/source drift needs a spec update, source update, or user clarification.",
    )
    reconcile_spec.add_argument("path", type=Path)

    check_memory = subparsers.add_parser("check-memory-bootstrap", help="Check whether durable memory anchors are ready for a new agent session.")
    check_memory.add_argument("path", type=Path)
    check_memory.add_argument("--root", type=Path, default=None)

    check_config = subparsers.add_parser("check-config-contract", help="Check whether JSON settings files explain references and structure in-place.")
    check_config.add_argument("paths", type=Path, nargs="+")

    check_install_modes = subparsers.add_parser("check-install-modes", help="Validate the user/developer installation mode registry.")
    check_install_modes.add_argument("path", type=Path)

    list_install_modes_cmd = subparsers.add_parser("list-install-modes", help="List available installation modes.")
    list_install_modes_cmd.add_argument("path", type=Path)

    show_install_mode_cmd = subparsers.add_parser("show-install-mode", help="Show one installation mode as JSON.")
    show_install_mode_cmd.add_argument("path", type=Path)
    show_install_mode_cmd.add_argument("mode_id")

    check_notifications = subparsers.add_parser("check-notifications", help="Validate notification channel settings without sending messages.")
    check_notifications.add_argument("path", type=Path)
    check_notifications.add_argument("--require-secrets", action="store_true", help="Require enabled channel webhook environment variables to be present.")

    notify = subparsers.add_parser("notify", help="Send or dry-run a configured notification event.")
    notify.add_argument("path", type=Path)
    notify.add_argument("--event", required=True)
    notify.add_argument("--title", required=True)
    notify.add_argument("--message", required=True)
    notify.add_argument("--severity", default="info", choices=["debug", "info", "warning", "error", "critical"])
    notify.add_argument("--metadata", action="append", default=[], help="Optional key=value metadata item. Can be repeated.")
    notify_mode = notify.add_mutually_exclusive_group()
    notify_mode.add_argument("--dry-run", dest="dry_run", action="store_true", default=None, help="Preview payloads without sending.")
    notify_mode.add_argument("--send", dest="dry_run", action="store_false", help="Send to enabled channels with configured environment variables.")

    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)

    if args.command == "list-agents":
        registry = load_registry_dir(args.registry)
        for agent in registry.list_agents():
            print(f"{agent.name}\t{agent.runtime}\t{agent.description}")
        return 0

    if args.command == "inspect-agent":
        agent = load_agent_spec(args.path)
        print(json.dumps(agent.to_dict(), indent=2, ensure_ascii=False))
        return 0

    if args.command == "score-oss":
        with args.path.open("r", encoding="utf-8") as file:
            candidate = OpenSourceCandidate(**json.load(file))
        print(json.dumps(evaluate_candidate(candidate), indent=2, ensure_ascii=False))
        return 0

    if args.command == "evaluate-work":
        with args.path.open("r", encoding="utf-8") as file:
            evaluation_input = WorkEvaluationInput.from_dict(json.load(file))
        print(json.dumps(evaluate_work(evaluation_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "validate-knowledge":
        with args.path.open("r", encoding="utf-8") as file:
            validation_input = KnowledgeValidationInput.from_dict(json.load(file))
        print(json.dumps(validate_knowledge_reference(validation_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "validate-skill":
        with args.path.open("r", encoding="utf-8") as file:
            validation_input = SkillValidationInput.from_dict(json.load(file))
        print(json.dumps(validate_skill_definition(validation_input, _default_repo_root()), indent=2, ensure_ascii=False))
        return 0

    if args.command == "check-grounding":
        with args.path.open("r", encoding="utf-8") as file:
            guard_input = HallucinationGuardInput.from_dict(json.load(file))
        print(json.dumps(check_hallucination_risk(guard_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "plan-from-research":
        with args.path.open("r", encoding="utf-8") as file:
            plan_input = ResearchInsightPlanInput.from_dict(json.load(file))
        print(json.dumps(create_research_insight_plan(plan_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "complete-coding-research":
        with args.path.open("r", encoding="utf-8") as file:
            research_input = CodingResearchInput.from_dict(json.load(file))
        print(json.dumps(complete_coding_research(research_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "complete-deep-research":
        with args.path.open("r", encoding="utf-8") as file:
            research_input = DeepResearchInput.from_dict(json.load(file))
        print(json.dumps(complete_deep_research(research_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "plan-parallel-work":
        with args.path.open("r", encoding="utf-8") as file:
            plan_input = ParallelWorkPlanInput.from_dict(json.load(file))
        print(json.dumps(plan_parallel_work(plan_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "reconcile-spec":
        with args.path.open("r", encoding="utf-8") as file:
            reconciliation_input = SpecReconciliationInput.from_dict(json.load(file))
        print(json.dumps(reconcile_spec_source(reconciliation_input), indent=2, ensure_ascii=False))
        return 0

    if args.command == "check-memory-bootstrap":
        with args.path.open("r", encoding="utf-8") as file:
            manifest = MemoryBootstrapManifest.from_dict(json.load(file))
        repo_root = args.root if args.root is not None else _default_repo_root()
        print(json.dumps(check_memory_bootstrap(manifest, repo_root), indent=2, ensure_ascii=False))
        return 0

    if args.command == "check-config-contract":
        reports = []
        for path in args.paths:
            with path.open("r", encoding="utf-8") as file:
                reports.append({"path": str(path), **check_config_contract(json.load(file), str(path))})
        overall_requires_rework = any(report["requires_rework"] for report in reports)
        print(
            json.dumps(
                {
                    "status": "documentation_contract_required" if overall_requires_rework else "self_documenting",
                    "requires_rework": overall_requires_rework,
                    "reports": reports,
                },
                indent=2,
                ensure_ascii=False,
            )
        )
        return 0

    if args.command == "check-install-modes":
        registry = load_install_mode_registry(args.path)
        config_contract_report = check_config_contract(registry, str(args.path))
        install_mode_report = check_install_mode_registry(registry)
        print(
            json.dumps(
                {
                    "status": "rework_required"
                    if config_contract_report["requires_rework"] or install_mode_report["requires_rework"]
                    else "ready",
                    "requires_rework": config_contract_report["requires_rework"] or install_mode_report["requires_rework"],
                    "config_contract": config_contract_report,
                    "install_modes": install_mode_report,
                },
                indent=2,
                ensure_ascii=False,
            )
        )
        return 0

    if args.command == "list-install-modes":
        registry = load_install_mode_registry(args.path)
        print(json.dumps(list_install_modes(registry), indent=2, ensure_ascii=False))
        return 0

    if args.command == "show-install-mode":
        registry = load_install_mode_registry(args.path)
        print(json.dumps(show_install_mode(registry, args.mode_id), indent=2, ensure_ascii=False))
        return 0

    if args.command == "check-notifications":
        config = load_notification_config(args.path)
        config_contract_report = check_config_contract(config, str(args.path))
        notification_report = check_notification_config(config, require_secrets=args.require_secrets)
        print(
            json.dumps(
                {
                    "status": "rework_required"
                    if config_contract_report["requires_rework"] or notification_report["requires_rework"]
                    else "ready",
                    "requires_rework": config_contract_report["requires_rework"] or notification_report["requires_rework"],
                    "config_contract": config_contract_report,
                    "notification_config": notification_report,
                },
                indent=2,
                ensure_ascii=False,
            )
        )
        return 0

    if args.command == "notify":
        config = load_notification_config(args.path)
        event = NotificationEvent(
            event_type=args.event,
            title=args.title,
            message=args.message,
            severity=args.severity,
            metadata=_metadata_from_cli(args.metadata),
        )
        print(json.dumps(dispatch_notification(config, event, dry_run=args.dry_run), indent=2, ensure_ascii=False))
        return 0

    raise ValueError(f"Unknown command: {args.command}")


def _default_repo_root() -> Path:
    cwd = Path.cwd()
    if cwd.name == "agent-platform":
        return cwd.parent
    return cwd


def _metadata_from_cli(values: list[str]) -> dict[str, str]:
    metadata: dict[str, str] = {}
    for value in values:
        if "=" not in value:
            raise ValueError(f"Metadata must use key=value format: {value}")
        key, item_value = value.split("=", 1)
        key = key.strip()
        if not key:
            raise ValueError(f"Metadata key is empty: {value}")
        metadata[key] = item_value.strip()
    return metadata


if __name__ == "__main__":
    raise SystemExit(main())
