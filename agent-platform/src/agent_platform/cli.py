"""Command line entry points for the agent platform."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from agent_platform.core.registry import load_agent_spec, load_registry_dir
from agent_platform.evaluation.hallucination_guard import HallucinationGuardInput, check_hallucination_risk
from agent_platform.evaluation.knowledge_skeptic import KnowledgeValidationInput, validate_knowledge_reference
from agent_platform.evaluation.work_evaluator import WorkEvaluationInput, evaluate_work
from agent_platform.oss.evaluation import OpenSourceCandidate, evaluate_candidate
from agent_platform.planning.research_insight_planner import ResearchInsightPlanInput, create_research_insight_plan


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

    check_grounding = subparsers.add_parser("check-grounding", help="Check whether factual claims are grounded before publication.")
    check_grounding.add_argument("path", type=Path)

    plan_from_research = subparsers.add_parser("plan-from-research", help="Check whether search-backed insights are ready for planning.")
    plan_from_research.add_argument("path", type=Path)

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

    raise ValueError(f"Unknown command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
