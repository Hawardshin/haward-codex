# Implementation Plan: Spec-Driven Operating Loop

## Strategy

1. Add `_specs/` as the shared location for spec-driven artifacts.
2. Add spec-driven policy, prompt, and workflow.
3. Add spec-driven templates.
4. Add `spec-driven-planner-agent` config and docs.
5. Add `spec_targets` to `work-evaluator-agent`.
6. Link the spec-driven step from README, AGENTS, persistent instructions, workspace rules, ops index, and start/close/evaluate workflows.
7. Add `REQ-WS-013` to the requirements baseline and record requirement change/review files.
8. Update history, research, coordination board, and maps.

## Impact Scope

- Shared operating docs: `README.md`, `AGENTS.md`, `_docs/`
- Operating flow: `_ops/prompts/`, `_ops/workflows/`
- Evaluation code: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- Evaluation tests: `agent-platform/tests/test_work_evaluator.py`
- Memory bootstrap: `agent-platform/configs/memory/bootstrap-manifest.json`
- History/research/requirements: `_history/`, `_research/`, `_requirements/`

## Validation Strategy

- JSON config validation
- `agent-platform` unit tests
- memory bootstrap check
- config contract check
- workspace map check
- task board check
- knowledge skeptic
- hallucination guard
- work evaluator
