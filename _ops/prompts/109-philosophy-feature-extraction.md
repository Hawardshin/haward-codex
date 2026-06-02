# Philosophy Feature Extraction Prompt

## Purpose

Use this prompt to turn the user's durable philosophy into concrete, traceable platform feature candidates.

## Prompt

```text
Convert the user's philosophy into feature candidates and the smallest executable platform assets.

Inputs:
- User request summary
- Source philosophy principle ids and source sections
- agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json
- agent-platform/configs/governance/philosophy-traceability.json
- agent-platform/configs/orchestration/capability-promotion-registry.json
- Relevant requirements, specs, timing, evaluations, request traces, and web search notes
- Existing prompts, workflows, templates, tools, skills, agents, monitor surfaces, and project features

Return:
- principle_feature_flow id
- source_principle_ids
- human_process_model
- 3-5 candidate feature ideas
- rejected lighter options and defer/do-nothing option when useful
- selected candidate with smallest_asset_type
- target_paths
- evidence_inputs
- risk_tier and human checkpoint need
- validation_targets
- rollback_plan
- data records to write
- verification commands

Rules:
- Start from principle ids, not from product buzzwords.
- Model the competent human process before feature ideation.
- Prefer prompt, workflow, template, tool, skill, agent, then project_feature in that order.
- A candidate cannot be selected without validation targets and rollback or disablement.
- Preserve human authority, privacy, security, reversibility, operating cost, and high-quality data accumulation.
- Save public rationale and evidence; do not save private chain-of-thought.
```
