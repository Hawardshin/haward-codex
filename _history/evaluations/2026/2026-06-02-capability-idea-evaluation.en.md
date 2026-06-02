# Work Evaluation: Capability Idea Evaluation Gate

## Result

- Status: `ready_to_close`
- Work mode: `governance`
- Request ID: `UR-2026-06-02-029`
- Related requirement: `REQ-WS-070`

## Completed Work

- Strengthened capability promotion into an explicit “generate ideas → evaluate ideas → record selected/queued/rejected reasons → draft only the selected idea” flow.
- Added idea generation rules, an evaluation rubric, evaluation outcomes, and candidate contract fields to `capability-promotion-registry.json`.
- Reflected the same rule in `capability-promotion-agent.json`, policy docs, workflow, prompt, agent docs, README, and persistent instructions.
- Linked requirements baseline updates, change/review records, spec/plan/validation, web search, provenance, plan evidence, request trace, work summary, and timing records.

## Evidence

- AWS Prescriptive Guidance on evaluator and reflect-refine loops.
- Google Cloud Gemini Enterprise idea generation agent docs.
- Stage-Gate-style idea screening and phased decision guidance.
- Anthropic evaluator-optimizer and agent workflow guidance.
- Existing bounded promotion principles in the capability promotion agent and registry.

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

- Add a workspace-monitor UI for comparing generated improvement ideas and scores.
- Add a deterministic report/input generator for small governance refinements.

## Judgment

The user’s core intent was that the platform should generate ideas and have those ideas evaluated before execution. This change allows automatic improvement, but prevents blind feature growth by requiring scored evaluation across repetition reduction, time savings, maintenance cost, evidence strength, risk fit, and smallest-asset fit.
