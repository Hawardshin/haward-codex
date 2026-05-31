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
- Keep large-company and high-quality research site seeds in `configs/research/enterprise-source-registry.json`.
- Keep selectable work modes and evaluator target strictness in `configs/workflows/work-mode-registry.json`.
- Keep user request summaries under `_history/user-requests/`.
- Keep shared requirements baselines, changes, and reviews under `_requirements/`; use project-local `docs/requirements/` for project-specific requirements.
- Keep shared spec-driven artifacts under `_specs/`; use project-local `specs/` for project-specific specs.
- Keep custom skill source under `_skills/` and validate skill work before close-out.
- Keep long-context resume packets under `_history/context-archives/` when context saturation risk appears.
- Use `parallel-work-planner-agent` when speed matters or work can split into independent lanes; record dependencies, touch paths, merge gates for parallel research fan-in, conflict controls, coordination targets, merge strategy, and final verification.
- Before source-code implementation, research best-fit/reference architectures and record architecture references, at least two architecture options, and decision notes.
- Before source-code implementation, record the technology stack, stack-specific official docs or standards, version constraints, high-signal issue/discussion sources, and community signal interpretation.
- Before source-code implementation, compare language/runtime options, separate architecture theory from practitioner opinions, and record folder-structure options plus folder semantics for maintainability.
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
PYTHONPATH=src python3 -m agent_platform.cli validate-skill configs/evaluation/skill-validation-template.json
PYTHONPATH=src python3 -m agent_platform.cli check-grounding configs/evaluation/hallucination-guard-template.json
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json configs/research/source-registry.json configs/research/enterprise-source-registry.json configs/research/source-discovery-registry.json configs/research/research-agent-profile.json configs/research/coding-research-profile.json configs/workflows/work-mode-registry.json
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
- `configs/research/enterprise-source-registry.json`: curated large-company, research-lab, architecture-center, and high-signal source seed list
- `configs/research/source-discovery-registry.json`: broad search-origin registry for global, Korean, Indian, paper, and Korean local review sources
- `configs/workflows/work-mode-registry.json`: selectable work modes and evaluator target policy
- `configs/open-source/`: dependency candidate scoring inputs
- `research-insight-planner-agent` is the core Perplexity-style research agent for search, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review
- `requirements-manager-agent` keeps user requests, reviewed requirements, implementation, and evaluation connected
- `spec-driven-planner-agent` turns requirements into specs, plans, tasks, validation records, and traceability
- `skill-lifecycle-agent` creates, validates, tracks, and improves repository-managed Codex skills
- `parallel-work-planner-agent` checks task dependencies, file/resource boundaries, execution batches, research fan-in merge gates, coordination targets, and merge verification before parallel execution
- research-backed plans should point to saved plan history under `_history/plans/YYYY/`
- general research readiness requires `research_profile_paths`, all answer-engine stage IDs, and `citation_requirements`
- general research readiness requires `source_value_provenance` and `plan_evidence`
- coding research should pass `coding-research-agent` before implementation when investigation is needed
- coding research readiness requires diverse `source_types`, including at least three distinct non-`other` types
- coding research should include `reference_config_paths` pointing to `configs/research/`
- coding research readiness requires `technology_stack`, `technology_official_docs`, `stack_version_constraints`, `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes`
- coding research for source-code work requires `architecture_reference_sources`, at least two `architecture_options`, and `architecture_decision_notes`
- coding research for source-code work requires `language_options`, `selected_language`, `language_decision_notes`, `architecture_theory_sources`, `architecture_practitioner_sources`, `architecture_tradeoff_notes`, `folder_structure_options`, `folder_structure_decision_notes`, `folder_semantics_notes`, and `maintainability_notes`
- shared settings should include `reader_guide`, `reference_links`, `structure_rules`, and `field_guide`, then pass `check-config-contract`
- factual final outputs should pass `hallucination-guard-agent` when claims need grounding
- close-out evaluation should include `work_mode`; `quick`, `standard`, `ship_first`, `research`, and `governance` decide which target fields are blocking
- close-out evaluation should include `web_search_record_targets`, `user_request_summary_targets`, `requirements_targets`, `spec_targets`, `request_trace_targets`, `work_summary_targets`, `source_provenance_targets`, and `plan_evidence_targets` when required by the selected work mode
- `ship_first` close-out should include `deferred_improvement_targets` when improvement ideas are intentionally postponed
- skill close-out should include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets`
- context archive close-out should include `context_archiving_occurred=true` and `context_archive_targets`
- installation close-out should include `installation_occurred=true` and `installation_record_targets` when dependency or environment state changed
- `docs/python-agent-structure.md`: implementation structure
- `docs/open-source-integration.md`: dependency evaluation and adapter policy
- `artifacts/structure-overview.html`: browser-viewable structure summary
