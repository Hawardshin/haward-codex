# Requirement Change: Capability Idea Evaluation

## Request

- Request ID: `UR-2026-06-02-029`
- Summary: Capability promotion should generate ideas and have those ideas evaluated.

## Change

- Strengthened `REQ-WS-070`.
- Capability candidates must be generated as multiple improvement ideas and evaluated against explicit criteria.
- Selected ideas, rejected ideas, queued ideas, and human-review decisions must keep reasons.

## Applied Targets

- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- `agent-platform/configs/agents/capability-promotion-agent.json`
- `_docs/policies/capability-promotion-policy.en.md`
- `_ops/workflows/75-capability-promotion.md`
- `_ops/prompts/105-capability-promotion.md`
