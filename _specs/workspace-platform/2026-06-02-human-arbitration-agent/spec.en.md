# Spec: Human Arbitration Agent

## Requirement

- `REQ-WS-068`

## Problem

When an AI agent sees several evidence-backed options, it can produce a plausible final answer even when the remaining choice actually requires human values or authority. That conflicts with the platform's principles of human final authority, evidence-based judgment, and non-blocking work continuation.

## Goal

Add `human-arbitration-agent` to enforce:

- separation of factual uncertainty from value judgment
- human arbitration packet creation when multiple sides are defensible
- decision registration in `_ops/coordination/human-decision-inbox.json`
- pausing only the affected branch while safe work continues

## Outputs

- agent spec: `agent-platform/configs/agents/human-arbitration-agent.json`
- agent docs: `agent-platform/docs/human-arbitration-agent.*.md`
- persistent instructions: `AGENTS.md`, `_docs/instructions/persistent-instructions.*.md`
- requirement and history records

## Acceptance Criteria

- agent inspection passes
- agent appears in list output
- orchestration registry check passes
- requirements/spec/history/evaluation traces are connected
- grounding and omission checks pass
