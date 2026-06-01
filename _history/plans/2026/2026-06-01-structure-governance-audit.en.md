# Plan Record: Structure Governance Audit

## Request

- Improve contradictions or management friction in the current structure, including folder structure and operating rules.

## Work Mode

- `governance`
- Reason: this changes durable repository rules around root folder policy, project boundaries, memory anchors, and operating workflows.

## Structure Checked

- Registered projects: `agent-platform/`, `presentation-agent/`, `workspace-monitor/`
- Shared operational folders: `_docs/`, `_ops/`, `_history/`, `_requirements/`, `_specs/`, `_research/`, `_skills/`, `_templates/`, `_tools/`, `_philosophy/`, `_archive/`
- Local-only candidates: `_private/`, `outputs/`
- Generated output candidates: `workspace-monitor/.next/`, `workspace-monitor/out/`, `workspace-monitor/node_modules/`, `workspace-monitor/tsconfig.tsbuildinfo`

## Decisions

- Do not move project folders.
- Mark `_private/` and `outputs/` as local-only ignored folders.
- Store root folder classes in `_ops/projects/root-structure-policy.json`.
- Add deterministic audit under `_tools/structure-audit/`.
- Make `workspace-monitor` collect `_docs` and `_philosophy`.

## Validation Plan

- Structure audit and unit tests
- Self-documenting config contract
- Memory bootstrap
- Workspace monitor collect/test/check/build
- Workspace index and task board regeneration
- Grounding and work evaluation
