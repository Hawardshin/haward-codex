# 2026-05-31 Workspace Platform Requirements Baseline

## Scope

This baseline defines shared workspace/platform requirements derived from the user's 2026-05-31 requests and completed work. Project-specific requirements belong in the owning project's `docs/requirements/`.

## Baseline Status

- Status: `baseline`
- Baseline date: 2026-05-31
- Owning scope: shared workspace, `agent-platform/`
- Source requests: `_history/user-requests/2026/2026-05-31.en.md`
- Request-to-outcome trace: `_history/request-traces/2026/2026-05-31.en.md`

## Requirements

| ID | Requirement | Source Requests | Priority | Status | Owning Scope | Verification Method | Related Artifacts |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REQ-WS-001 | The repository shall operate as a long-lived monorepo for a personal agent-building platform and multiple projects. | UR-2026-05-31-001, 002 | must | baseline | workspace | README/registry review | `README.md`, `_ops/projects/registry.json` |
| REQ-WS-002 | Meaningful changes shall be committed and pushed to `origin/main` immediately. | UR-2026-05-31-003, 004 | must | baseline | workspace | git log and push status | `AGENTS.md`, `README.md` |
| REQ-WS-003 | Every new user instruction shall start with web search and leave a public search record. | UR-2026-05-31-023, 031 | must | baseline | workspace | web search records and evaluator targets | `_history/web-searches/`, `_ops/workflows/05-web-first-intake.md` |
| REQ-WS-004 | User requests shall be saved as meaning summaries and connected to artifacts, evaluations, and commits through request-to-outcome traces. | UR-2026-05-31-033, 035 | must | baseline | workspace | request summary and trace review | `_history/user-requests/`, `_history/request-traces/` |
| REQ-WS-005 | Requirements shall be derived from user work, reviewed, changed, baselined, and used as the basis for implementation and evaluation. | UR-2026-05-31-036 | must | baseline | workspace | requirements target and review file check | `_requirements/`, `_docs/requirements-management-policy.ko.md` |
| REQ-WS-006 | Meaningful work shall leave work summaries, plan records, evaluation reports, and detailed history. | UR-2026-05-31-012, 014, 019, 034 | must | baseline | workspace | `_history/` target checks | `_history/work-summaries/`, `_history/plans/`, `_history/evaluations/` |
| REQ-WS-007 | Completed work shall be evaluated against the initial instruction and requirements, and gaps shall be reworked. | UR-2026-05-31-011 | must | baseline | agent-platform | `evaluate-work` result | `work-evaluator-agent`, `_ops/workflows/40-evaluate-and-rework.md` |
| REQ-WS-008 | Sessions shall verify memory bootstrap anchors so the AI does not rely on chat memory. | UR-2026-05-31-009, 032 | must | baseline | agent-platform | `check-memory-bootstrap` result | `agent-platform/configs/memory/bootstrap-manifest.json` |
| REQ-WS-009 | Coding work should default to Python-first, research-first, and open-source-review-first. | UR-2026-05-31-008, 026, 028, 030 | should | baseline | agent-platform/projects | tests and research records | `agent-platform/`, `_docs/open-source-installation-policy.ko.md` |
| REQ-WS-010 | Final factual outputs shall be grounded, and knowledge-base content shall be treated as fallible. | UR-2026-05-31-017, 022 | must | baseline | workspace | knowledge/grounding checks | `knowledge-skeptic-agent`, `hallucination-guard-agent` |
| REQ-WS-011 | Active agents and parallel work should be visible in one coordination board. | UR-2026-05-31-015 | should | baseline | `_ops` | task board check | `_ops/coordination/` |
| REQ-WS-012 | Project-specific artifacts shall stay inside the owning project; only shared assets should be promoted to `_` folders. | UR-2026-05-31-021 | must | baseline | workspace/projects | project boundary review | `_docs/project-boundary-policy.ko.md` |
| REQ-WS-013 | Meaningful implementation work shall pass through spec, plan, tasks, validation, and traceability artifacts, similar to spec-driven development. | UR-2026-05-31-037 | must | baseline | workspace/projects | spec target and evaluator check | `_specs/`, `_docs/spec-driven-development-policy.en.md` |
| REQ-WS-014 | Custom skill creation and updates shall leave explicit source, trigger examples, validation, forward tests, improvement backlog, and evaluation targets. | UR-2026-05-31-038 | must | baseline | workspace/agent-platform | skill validation and evaluator check | `_skills/`, `_docs/skill-lifecycle-policy.en.md`, `skill-lifecycle-agent` |
| REQ-WS-015 | Before writing source code, agents shall research best-fit architectures and reference architectures, then record at least two structure candidates and the decision rationale. | UR-2026-05-31-039 | must | baseline | agent-platform/projects | `complete-coding-research` result and architecture fields | `_docs/architecture-first-coding-policy.en.md`, `coding-research-agent` |
| REQ-WS-016 | Large-company engineering, official research lab, architecture center, and high-signal independent source lists shall be managed in a registry separate from the general source taxonomy. | UR-2026-05-31-040 | must | baseline | agent-platform/_research | `check-config-contract` and source list review | `agent-platform/configs/research/enterprise-source-registry.json`, `_research/source-lists/` |
| REQ-WS-017 | Material source values, config values, claims, review signals, assumptions, and planning constraints shall be traced to sources and access dates, and material plan steps shall be linked to evidence. | UR-2026-05-31-041 | must | baseline | agent-platform/_history | `plan-from-research`, `complete-coding-research`, and `evaluate-work` results | `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, `plan_evidence_targets` |
| REQ-WS-018 | Web search shall behave more like human research by using broad global tech blogs, Korean big-tech blogs, India technology sources, paper discovery sources, and Korean local review channels. | UR-2026-05-31-042, 043 | must | baseline | agent-platform/_research | source discovery registry and source list review | `agent-platform/configs/research/source-discovery-registry.json`, `_research/source-lists/enterprise-high-quality-sites.en.md` |
| REQ-WS-019 | For Korean user review or local-market decisions, research shall prioritize Naver Map, Kakao Map, Naver Blog/Search, and official pages, then evaluate candidate page quality. | UR-2026-05-31-044 | must | baseline | `_tools`/`_research` | Korean local review tool tests and source list review | `_tools/korean-local-review/`, `_research/source-lists/korean-local-review-sources.en.md` |

## Change Management

- Requirement changes live under `_requirements/changes/`.
- Requirement reviews live under `_requirements/reviews/`.
- Before implementation, link relevant requirement IDs from plans, work summaries, and evaluation input.
- Before implementation, link relevant spec artifacts under `_specs/` or project `specs/`.
- Before source-code implementation, link architecture references, architecture options, and decision notes in the coding research record.
- When enterprise/high-quality sources seed research, update or reference `enterprise-source-registry.json` and `_research/source-lists/`.
- Track source values and plan evidence through `source_value_provenance`, `plan_evidence`, `source_provenance_targets`, and `plan_evidence_targets`.
- Check `source-discovery-registry.json` for broad search origins and use `_tools/korean-local-review/` for Korean local review scoring.
- When skill work occurred, link `_skills/` source, validation results, and improvement ideas.
- After implementation, update request traces and related requirement artifacts.

## Current Review Result

- This baseline is usable as the shared workspace/platform requirements baseline as of 2026-05-31.
- Future project-specific product requirements should use the owning project's `docs/requirements/`.
