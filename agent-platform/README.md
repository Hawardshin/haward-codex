# Agent Platform

## Purpose

`agent-platform/`은 이 monorepo의 중심 엔진이다. 루트 저장소가 여러 프로젝트와 히스토리를 담는 작업 공간이라면, 이 프로젝트는 에이전트가 어떻게 조사하고, 계획하고, 평가하고, 설정을 검증하고, 다음 작업을 위해 기억을 남길지 정의하는 재사용 가능한 플랫폼 레이어다.

목표는 하나의 챗봇을 만드는 것이 아니다. 사용자의 지시를 요구사항과 스펙으로 바꾸고, 리서치 결과를 계획 가능한 근거로 정리하고, 작업 결과를 evaluator와 hallucination guard로 점검하며, 반복되는 능력을 agent, tool, skill, template로 승격하는 구조를 제품화하는 것이다.

이 프로젝트는 다음 질문에 답해야 한다.

- 어떤 에이전트가 어떤 입력을 받아 어떤 기준으로 실행되는가?
- 어떤 조사가 구현 가능한 계획으로 인정되는가?
- 어떤 설정 파일이 self-documenting contract를 만족하는가?
- 어떤 사실 주장이 grounding 없이 최종 산출물에 들어가면 안 되는가?
- 어떤 작업은 full governance loop가 필요하고, 어떤 작업은 가볍게 처리해도 되는가?
- 새 도구, 스킬, 알림, 조사 프로필, 평가 기준은 어디에 등록되고 어떻게 검증되는가?

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
- Keep platform notification routing in `configs/integrations/notification-channels.json`; store only environment variable names there, never real webhook URLs or tokens.
- Keep user request summaries under `_history/user-requests/`.
- Keep shared requirements baselines, changes, and reviews under `_requirements/`; use project-local `docs/requirements/` for project-specific requirements.
- Keep shared spec-driven artifacts under `_specs/`; use project-local `specs/` for project-specific specs.
- When an active spec is ambiguous or differs from source/tests/artifacts, use `spec-reconciliation-agent` and `reconcile-spec` before editing either side; `ask_user` issues must produce `clarification_needed` alerts and wait for the recorded answer.
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
PYTHONPATH=src python3 -m agent_platform.cli complete-deep-research configs/planning/deep-research-template.json
PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
PYTHONPATH=src python3 -m agent_platform.cli reconcile-spec artifacts/spec-reconciliation/example-clarification-input.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
PYTHONPATH=src python3 -m agent_platform.cli check-notifications configs/integrations/notification-channels.json
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event work_completed --title "Dry run" --message "Notification dry run" --severity info --dry-run
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json configs/research/source-registry.json configs/research/enterprise-source-registry.json configs/research/source-discovery-registry.json configs/research/research-agent-profile.json configs/research/deep-research-profile.json configs/research/coding-research-profile.json configs/workflows/work-mode-registry.json configs/planning/spec-reconciliation-template.json configs/planning/deep-research-template.json configs/integrations/notification-channels.json
```

## Current Skeleton

- `src/agent_platform/core/`: local domain model, registry, runtime interface
- `src/agent_platform/adapters/`: future external framework adapters
- `src/agent_platform/evaluation/`: evaluation agents and close-out checks
- `src/agent_platform/governance/`: checks for self-documenting settings and platform governance contracts
- `src/agent_platform/integrations/`: external service integrations such as Slack, Discord, and Teams notifications
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
- `configs/research/deep-research-profile.json`: source, depth, stage, citation-audit, and report contract for long-form deep research
- `configs/workflows/work-mode-registry.json`: selectable work modes and evaluator target policy
- `configs/integrations/notification-channels.json`: notification on/off routing, event filters, provider payload options, and environment-variable secret indirection
- `configs/open-source/`: dependency candidate scoring inputs
- `research-insight-planner-agent` is the core Perplexity-style research agent for search, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review
- `deep-research-agent` validates multi-step deep research packages before long-form report writing
- `requirements-manager-agent` keeps user requests, reviewed requirements, implementation, and evaluation connected
- `spec-driven-planner-agent` turns requirements into specs, plans, tasks, validation records, and traceability
- `spec-reconciliation-agent` decides whether ambiguous specs or spec/source drift should update the spec, update source, ask the user, or defer; user decisions are surfaced as `clarification_needed`
- `skill-lifecycle-agent` creates, validates, tracks, and improves repository-managed Codex skills
- `parallel-work-planner-agent` checks task dependencies, file/resource boundaries, execution batches, research fan-in merge gates, coordination targets, and merge verification before parallel execution
- research-backed plans should point to saved plan history under `_history/plans/YYYY/`
- general research readiness requires `research_profile_paths`, all answer-engine stage IDs, and `citation_requirements`
- general research readiness requires `source_value_provenance` and `plan_evidence`
- deep research readiness requires multiple search channels, research iterations, evidence items, contradiction notes, citation audit notes, unsupported/weak claim notes, report outline, and report targets
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
