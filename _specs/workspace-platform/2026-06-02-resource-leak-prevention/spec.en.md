# Resource Leak Prevention Spec

## Background

The platform keeps adding agents, browser verification, monitoring UI, external CLI adapters, and parallel work. In that structure, memory leaks and resource leaks can accumulate into slower work, unstable verification, and reliability issues for installable productization.

## Requirement

- `REQ-WS-057`

## Goals

- Create a conditional close-out gate for work with memory or resource leak risk.
- Structure resource risks, lifecycle cleanup paths, measurement evidence, or accepted-risk rationale.
- Make `work-evaluator-agent` treat missing resource checks as blocking gaps when resource risk occurred.
- Make the rule discoverable from operating docs, prompts, and memory bootstrap in future sessions.

## Non-Goals

- Do not require memory profiling for every task.
- Do not build a full runtime profiler or daemon observability system in this change.
- Do not retroactively audit every old project for resource risk.

## Scope

- `agent-platform/src/agent_platform/evaluation/resource_guard.py`
- `check-resources` CLI
- Conditional resource targets in `work-evaluator-agent`
- Resource guard template, agent config, and docs
- Workspace policy, workflow, prompt, persistent instruction, and memory anchor

## Acceptance Criteria

- Resource guard reports required unresolved risks, unsupported mitigations, missing cleanup paths, and `not_run` measurements as gaps.
- Evaluator reports a gap when `resource_risk_occurred=true` and `resource_check_targets` is missing.
- Work mode registry includes the resource leak record enforcement layer.
- Docs, prompts, workflows, index, and memory bootstrap make resource leak prevention discoverable.
- Unit tests and governance checks pass.
