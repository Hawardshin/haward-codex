# Philosophy Governance

## Purpose

`_philosophy/` stores the platform worldview, but worldview alone does not guarantee future agent behavior. Philosophy governance traces each principle into requirements, policies, workflows, prompts, settings, tools, and evaluation.

## Core Structure

- Source philosophy: `_philosophy/agent-operating-philosophy.ko.md`
- Execution mapping: `agent-platform/configs/governance/philosophy-traceability.json`
- Validation command: `PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json`
- Workflow: `_ops/workflows/78-philosophy-alignment.md`
- Reusable prompt: `_ops/prompts/108-philosophy-alignment.md`

## Operating Rules

1. A philosophy principle must not end as standalone prose.
2. Each principle needs at least one source philosophy location, one or more execution targets, and one or more validation targets.
3. Execution targets must be real repository files or folders.
4. When a new policy or workflow claims to implement a philosophy principle, link it in `philosophy-traceability.json`.
5. After changing philosophy, run the affected checks among docs audit, memory bootstrap, config contract, philosophy trace check, and workspace-health.

## Decision Criteria

- Is the principle discoverable in future memory bootstrap?
- Is the principle reflected in execution policy or workflow?
- Is the principle checkable through close-out evaluation or workspace-health?
- If principle implementations overlap or conflict, is the source of truth clear?
- Are human judgment points visible rather than hidden?

## Required Records

Meaningful philosophy changes should leave:

- requirement change and review records
- spec, plan, tasks, validation, and traceability
- web search record
- request-to-outcome trace
- work summary
- omission, grounding, and evaluation records

## Design Basis

ADR and requirements traceability practices treat important decisions and principles as maintainable only when their rationale, consequences, and verification links are explicit. This workspace extends that structure to philosophy so principles become executable operating contracts.
