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

## Change Management

- Requirement changes live under `_requirements/changes/`.
- Requirement reviews live under `_requirements/reviews/`.
- Before implementation, link relevant requirement IDs from plans, work summaries, and evaluation input.
- After implementation, update request traces and related requirement artifacts.

## Current Review Result

- This baseline is usable as the shared workspace/platform requirements baseline as of 2026-05-31.
- Future project-specific product requirements should use the owning project's `docs/requirements/`.
