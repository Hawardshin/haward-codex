# Requirement Change: Human Process Capability Promotion

## Target

- `REQ-WS-070`

## Reason

The user clarified that capability promotion should not only generate and evaluate ideas, but should work “as if a person directly did it.”

## Change

- Automatic capability candidates must record `human_process_model` before idea generation.
- `human_process_model` includes goal, context, sources, assumptions, option comparison, decision, execution notes, verification, handoff, and review.
- Generated improvement ideas must reduce or stabilize concrete human process steps, not merely react to the user phrase.
- Reflect the rule in the registry, agent spec, policy, workflow, prompt, persistent instructions, philosophy docs, and specs.

## Verification

- `check-config-contract`
- `inspect-agent`
- `check-omissions`
- `check-grounding`
- `evaluate-work`

