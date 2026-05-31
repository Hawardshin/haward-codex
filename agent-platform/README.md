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
- Keep user-readable completed-work summaries under `_history/work-summaries/`.
- Keep prompt-level web search records under `_history/web-searches/`.
- Keep user request summaries under `_history/user-requests/`.
- Keep shared requirements baselines, changes, and reviews under `_requirements/`; use project-local `docs/requirements/` for project-specific requirements.
- Keep shared spec-driven artifacts under `_specs/`; use project-local `specs/` for project-specific specs.
- Keep long-context resume packets under `_history/context-archives/` when context saturation risk appears.
- Prefer Python for agent runtimes, orchestration, evaluation, and backend automation.
- Prefer mature open-source components before custom platform infrastructure.
- Install mature open-source dependencies when they are the right fit, using project/tool-local scope plus documented install command, dependency tracking, security/license review, verification, and rollback.
- Track actual installs with `_ops/installations/registry.json` and `_history/installations/YYYY/` before reporting installation complete.
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
PYTHONPATH=src python3 -m agent_platform.cli check-grounding configs/evaluation/hallucination-guard-template.json
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json configs/research/source-registry.json configs/research/research-agent-profile.json configs/research/coding-research-profile.json
```

## Current Skeleton

- `src/agent_platform/core/`: local domain model, registry, runtime interface
- `src/agent_platform/adapters/`: future external framework adapters
- `src/agent_platform/evaluation/`: evaluation agents and close-out checks
- `src/agent_platform/governance/`: checks for self-documenting settings and platform governance contracts
- `src/agent_platform/memory/`: memory bootstrap checks for durable context loading
- `src/agent_platform/oss/`: open-source dependency evaluation helpers
- `src/agent_platform/planning/`: research-backed insight and planning checks
- `configs/agents/`: declarative agent specs
- `configs/evaluation/`: structured evaluation inputs
- `configs/memory/`: durable memory bootstrap manifest
- `configs/planning/`: structured planning inputs
- `configs/research/`: source registry and research profile configs
- `configs/open-source/`: dependency candidate scoring inputs
- `research-insight-planner-agent` is the core Perplexity-style research agent for search, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review
- `requirements-manager-agent` keeps user requests, reviewed requirements, implementation, and evaluation connected
- `spec-driven-planner-agent` turns requirements into specs, plans, tasks, validation records, and traceability
- research-backed plans should point to saved plan history under `_history/plans/YYYY/`
- general research readiness requires `research_profile_paths`, all answer-engine stage IDs, and `citation_requirements`
- coding research should pass `coding-research-agent` before implementation when investigation is needed
- coding research readiness requires diverse `source_types`, including at least three distinct non-`other` types
- coding research should include `reference_config_paths` pointing to `configs/research/`
- shared settings should include `reader_guide`, `reference_links`, `structure_rules`, and `field_guide`, then pass `check-config-contract`
- factual final outputs should pass `hallucination-guard-agent` when claims need grounding
- close-out evaluation should include `web_search_record_targets` pointing to `_history/web-searches/YYYY/`
- close-out evaluation should include `user_request_summary_targets` pointing to `_history/user-requests/YYYY/`
- close-out evaluation should include `requirements_targets` pointing to `_requirements/` or project-local requirements files
- close-out evaluation should include `spec_targets` pointing to `_specs/` or project-local specs
- close-out evaluation should include `request_trace_targets` pointing to `_history/request-traces/YYYY/`
- close-out evaluation should include `work_summary_targets` pointing to `_history/work-summaries/YYYY/`
- context archive close-out should include `context_archiving_occurred=true` and `context_archive_targets`
- installation close-out should include `installation_occurred=true` and `installation_record_targets` when dependency or environment state changed
- `docs/python-agent-structure.md`: implementation structure
- `docs/open-source-integration.md`: dependency evaluation and adapter policy
- `artifacts/structure-overview.html`: browser-viewable structure summary
