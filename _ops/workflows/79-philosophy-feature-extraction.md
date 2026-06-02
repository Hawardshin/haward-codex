# Philosophy Feature Extraction Workflow

## Purpose

Use this workflow when the user's philosophy should directly produce platform features, reusable assets, UI surfaces, agents, tools, or validation gates.

## Inputs

- `_philosophy/agent-operating-philosophy.ko.md`
- `agent-platform/configs/governance/philosophy-traceability.json`
- `agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json`
- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- Relevant requirements, specs, timing records, evaluations, request traces, and work summaries
- Web search record with high-authority references and contrary signals

## Sequence

1. Run web-first intake and save the search record.
2. Run or simulate memory bootstrap and read philosophy, traceability, capability promotion, and feature extraction anchors.
3. Select work mode. Use `governance` when rules, registries, agents, validators, or feature gates change.
4. Identify source principle ids from `_philosophy/agent-operating-philosophy.ko.md`.
5. Select the matching `principle_feature_flows` lane.
6. Model how a competent human would perform the work before automation: goal, context, sources, assumptions, options, decision, execution, verification, handoff, and review.
7. Generate multiple candidate features or reusable assets. Include a lighter asset option and a defer or do-nothing option when evidence is weak.
8. Score candidates against philosophy fit, human process fidelity, repetition reduction, time savings, evidence strength, risk fit, maintenance cost, smallest-asset fit, and data-quality gain.
9. Select the smallest useful asset type: prompt, workflow, template, tool, skill, agent, then project feature.
10. Record source principles, evidence inputs, risk tier, validation targets, rollback plan, and residual risks.
11. Implement only the selected bounded candidate or queue it in the candidate record.
12. Update philosophy traceability, memory bootstrap, prompt router, monitor snapshot, requirements, specs, validation, request trace, work summary, timing, and evaluation as needed.
13. Run `check-philosophy-features`, `check-philosophy-trace`, config contract checks, tests, and UI checks relevant to the changed paths.
14. Rework real gaps before final close-out, then commit and push.

## Output Contract

- Source principle ids and affected feature flow
- Human process model
- Candidate ideas with selected, rejected, queued, or deferred status
- Selected smallest asset type and rejected lighter options
- Risk tier and human checkpoint decision
- Implementation targets
- Validation targets and results
- Rollback or disablement plan
- High-quality data records created
- Commit and push trace

## Rules

- Do not create features from vague philosophy wording alone. Tie each feature to stable principle ids and observed or expected human work.
- Do not treat a monitor panel as the feature unless it changes the operating loop or makes a decision/action visible.
- Do not auto-execute high-risk philosophy-derived features without a human checkpoint.
- Do not leave a principle as prose if the request asks for product structure; create the smallest executable target that can change future behavior.
