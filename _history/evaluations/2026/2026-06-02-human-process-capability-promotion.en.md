# Work Evaluation: Human Process Capability Promotion

## Result

- Status: `ready_to_close`
- Work mode: `governance`
- Request ID: `UR-2026-06-02-030`
- Related requirement: `REQ-WS-070`

## Completed Work

- Added a `human_process_model` gate to capability promotion.
- Required the platform to model how a competent person would directly do and record the work before generating automatic improvement ideas: goal, context, sources, assumptions, option comparison, decision, execution notes, verification, handoff, and review.
- Updated `capability-promotion-registry.json`, `capability-promotion-agent.json`, policy, governance docs, workflow, prompt, README, philosophy docs, persistent instructions, requirements, and specs.
- Saved web search, source provenance, plan evidence, request trace, work summary, timing, omission, grounding, and evaluator records.

## Evidence

- NIST Human Centered Design: human work, task context, needs, and evaluation first.
- NIST AI Use Taxonomy: human-goal and outcome-centered task decomposition.
- IDEO Design Thinking Process: framing, inspiration, synthesis, ideation, and testing.
- Existing `REQ-WS-070`: bounded black-box capability promotion and idea evaluation gate.

## Verification

- `json.tool`: passed for relevant JSON
- `inspect-agent`: passed
- `check-config-contract`: passed for capability registry and core configs
- `check-omissions`: passed
- `check-grounding`: passed
- `unittest`: 150 tests passed
- `docs-audit`: passed
- `naming-audit`: passed
- `workspace-health`: 20 checks passed
- `git diff --check`: passed
- `evaluate-work`: `ready_to_close`

## Remaining Improvement Ideas

- Add a workspace-monitor UI that compares `human_process_model` and generated idea scores side by side.
- Add a helper command that validates a capability promotion package includes `human_process_model` and `human_process_artifacts`.

## Judgment

The user’s “as if a person directly did it” is best treated as a requirement to model real human work procedure and artifacts before automation. This change does not make automation sound more human; it makes the platform first structure the direct human process, then generate ideas from the repeated parts.

