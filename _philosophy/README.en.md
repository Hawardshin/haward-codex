# Philosophy Library

This folder stores the foundational views behind repository operations and agent design.

Policy documents live under `_docs/`, executable procedures live under `_ops/`, and work records live under `_history/`. This folder explains why those rules exist.

## Documents

- [Agent Operating Philosophy](agent-operating-philosophy.en.md)
- [Platform Concept Review](platform-concept-review.en.md)

## Execution Link

`agent-platform/configs/governance/philosophy-traceability.json` tracks whether philosophy principles are reflected in executable operating structure. After changing philosophy, run `PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json` from `agent-platform/`.

## What Belongs Here

Store these under `_philosophy/`:

- recurring user viewpoints or worldview
- foundational principles for how agents should work
- reasons behind policies and workflows
- durable judgment criteria

Store these elsewhere:

- execution rules: `_docs/`
- prompts and workflows: `_ops/`
- work history: `_history/`
- research evidence: `_research/`
