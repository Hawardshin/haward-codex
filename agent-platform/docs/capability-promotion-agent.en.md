# Capability Promotion Agent

`capability-promotion-agent` detects repeated work, bottlenecks, omissions, validation failures, and manual rework, then turns them into reusable platform capability candidates.

The goal is not a fully opaque black box. The user-facing flow may feel automatic, but the internal record must preserve observations, candidates, risk decisions, validation, rollback, outcomes, commits, and pushes.

## When To Use

- A manual sequence repeats.
- Timing records show a recurring slow phase.
- Evaluation, omission, grounding, or config checks fail for similar reasons.
- The same prompt, workflow, template, tool, skill, or agent choice recurs.
- A monitor or desktop feature would reduce repeated operating work.

## Output

- capability candidate ID
- observed signals and source records
- proposed capability type: `prompt`, `workflow`, `template`, `tool`, `skill`, `agent`, or `project_feature`
- lighter rejected options and reasons
- expected repetition and time reduction
- risk tier and human checkpoint requirement
- validation plan and rollback or disablement plan
- implementation targets, evaluation target, commit and push trace

## Safety Rules

- Do not auto-run destructive changes, secrets, permissions, installs, paid services, public deployments, security/privacy-sensitive work, or irreversible migrations without a human checkpoint.
- Do not create an agent just because repetition exists. Check the smallest useful asset first: prompt, workflow, template, tool, skill, agent, then project feature.
- Do not treat internal knowledge or repeated LLM agreement as factual proof. Verify important claims through web search, tests, evaluators, or human judgment.
- Applied capabilities must be documented, validated, evaluated, committed, and pushed.

## Key Files

- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- `agent-platform/configs/agents/capability-promotion-agent.json`
- `_docs/policies/capability-promotion-policy.en.md`
- `_ops/workflows/75-capability-promotion.md`
- `_ops/prompts/105-capability-promotion.md`
