"""Command line entry points for the agent platform."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from agent_platform.core.registry import load_agent_spec, load_registry_dir
from agent_platform.oss.evaluation import OpenSourceCandidate, evaluate_candidate


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="agent-platform")
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_agents = subparsers.add_parser("list-agents", help="List agent specs in a registry directory.")
    list_agents.add_argument("--registry", type=Path, default=Path("configs/agents"))

    inspect_agent = subparsers.add_parser("inspect-agent", help="Print one agent spec as JSON.")
    inspect_agent.add_argument("path", type=Path)

    score_oss = subparsers.add_parser("score-oss", help="Score an open-source candidate JSON file.")
    score_oss.add_argument("path", type=Path)

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

    raise ValueError(f"Unknown command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
