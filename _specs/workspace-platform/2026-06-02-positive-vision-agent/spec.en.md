# Spec: Positive Vision Agent

## Background

The user asked for an expert that gives a positive make-it-happen vision. This is interpreted as a need for an agent that preserves morale and possibility in difficult work without sacrificing truth or quality.

## Requirements

- Add `positive-vision-agent` as a reusable domain agent in agent-platform.
- The agent must include positive vision, agency, pathways, if-then implementation plans, and reality checks.
- The agent must prohibit unsupported success guarantees, risk hiding, and verification bypass.
- The agent should link to `timekeeper-agent`, `parallel-work-planner-agent`, `spec-reconciliation-agent`, `omission-guard-agent`, `hallucination-guard-agent`, and `work-evaluator-agent`.
- Korean/English docs, requirements, specs, history, and evaluation files must be preserved.

## Out Of Scope

- Standalone UI or runtime implementation is out of scope for this change.
- Real notifications, voice, or mentoring interfaces are out of scope.

## Acceptance Criteria

- `inspect-agent` passes.
- `list-agents` includes `positive-vision-agent`.
- The orchestration check passes.
- Related docs and evaluation records are created.
