# Agent Platform

## Purpose

개인 에이전트 구축 플랫폼의 중심 프로젝트다. 여러 에이전트, 스킬, 도구, 템플릿을 만들고 운영하는 방식을 제품화하는 것이 목표다.

## Status

- Current phase: planning
- Workspace role: core project
- Registry: `_ops/projects/registry.json`

## Scope Boundary

- Belongs here:
  - reusable platform models and runtime boundaries
  - declarative agent specs and platform-level configs
  - evaluation and planning helpers used by the platform
  - open-source evaluation helpers
  - platform docs and artifacts
- Does not belong here by default:
  - domain-specific experiments
  - one-off product apps
  - project-specific tools or artifacts for another interest
  - data, UI, or workflows with an independent lifecycle

Create a separate root project for domain-specific interests that can be run, tested, archived, or resumed independently.

## Initial Direction

- Define how agents are created, configured, evaluated, and improved.
- Track reusable skills and tools as platform capabilities.
- Keep project history and decisions outside transient chat context.
- Prefer Python for agent runtimes, orchestration, evaluation, and backend automation.
- Prefer mature open-source components before custom platform infrastructure.
- Use Markdown for durable text documentation.
- Use HTML for visual, reviewable, dashboard-like, or standalone artifacts when useful.

## Structure

```text
agent-platform/
  README.md
  artifacts/
  configs/
  docs/
  pyproject.toml
  src/
  tests/
```

## Commands

From `agent-platform/`:

```bash
python3 -m unittest discover -s tests
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/example-python-agent.json
PYTHONPATH=src python3 -m agent_platform.cli score-oss configs/open-source/candidate-template.json
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
```

## Current Skeleton

- `src/agent_platform/core/`: local domain model, registry, runtime interface
- `src/agent_platform/adapters/`: future external framework adapters
- `src/agent_platform/evaluation/`: evaluation agents and close-out checks
- `src/agent_platform/oss/`: open-source dependency evaluation helpers
- `src/agent_platform/planning/`: research-backed insight and planning checks
- `configs/agents/`: declarative agent specs
- `configs/evaluation/`: structured evaluation inputs
- `configs/planning/`: structured planning inputs
- `configs/open-source/`: dependency candidate scoring inputs
- research-backed plans should point to saved plan history under `_history/plans/YYYY/`
- `docs/python-agent-structure.md`: implementation structure
- `docs/open-source-integration.md`: dependency evaluation and adapter policy
- `artifacts/structure-overview.html`: browser-viewable structure summary
