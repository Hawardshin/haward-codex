# Spec: Philosophy Feature Extraction Structure

## Goal

Ensure the user's philosophy principles become feature candidates, executable assets, validation, rollback, and data accumulation instead of remaining standalone prose.

## Design

- `agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json`
  - Connects all 18 philosophy principles to feature flows.
  - Defines feature intake stages, candidate contract, quality gates, and seed candidates.
- `agent-platform/src/agent_platform/governance/philosophy_features.py`
  - Checks required principle coverage, stage completeness, candidate contract, and implemented target path existence.
- CLI
  - Adds `check-philosophy-features <registry.json>`.
- Operations links
  - `_ops/workflows/79-philosophy-feature-extraction.md`
  - `_ops/prompts/109-philosophy-feature-extraction.md`
  - `agent-platform/configs/agents/philosophy-feature-extractor-agent.json`
  - memory bootstrap, prompt router, philosophy traceability
- UI
  - Adds a `Philosophy Feature Factory` panel to Workspace Monitor Overview.
  - Customer snapshots strip internal candidates and paths.

## Acceptance

- `check-philosophy-features` returns `ready`.
- `check-philosophy-trace` and `check-memory-bootstrap` pass.
- `agent-platform` unittest and `workspace-monitor` test/type/build pass.
- Customer snapshot does not include internal candidates or paths.
