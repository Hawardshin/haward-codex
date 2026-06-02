# Web Search Record: Human Process Capability Promotion

## Request

- Request ID: `UR-2026-06-02-030`
- User summary: capability promotion and idea evaluation should work “as if a person directly did it.”
- Work mode: `governance`

## Queries

- `human-centered AI workflow automation human in the loop official guidance task analysis`
- `AI agents human in the loop workflow design official guidance`
- `human-centered design AI systems NIST human in the loop automation guidance`
- `design thinking workflow empathy define ideate prototype test official`

## Checked Sources

| Source | Type | Finding | Applied To |
| --- | --- | --- | --- |
| NIST Human Centered Design | official/standard-like | Human-centered design starts from users, tasks, environments, requirements, design, and evaluation. | Added a human process model before capability promotion ideas |
| NIST AI Use Taxonomy | official research/taxonomy | Human-AI tasks should be decomposed around human goals and outcomes. | Required generated ideas to come from human process steps |
| IDEO Design Thinking Process | methodology reference | The process frames questions, gathers inspiration, synthesizes, generates ideas, tests, and shares the story. | Converted “human-like” into goal, research, synthesis, option comparison, verification, and handoff |
| Open Practice Library Human-in-the-Loop | practice reference | Risk-based review gates keep people involved in decisions that need approval or correction. | Reinforced high-risk human checkpoints |

## Weak Or Ignored Sources

- General blogs and news were treated as weaker than official or standard-like sources for this durable rule change.
- Reddit/community discussions were not used as direct evidence for this governance change.

## Plan Impact

- “Human-like” means reproducing a competent worker’s process and artifacts, not mimicking human tone.
- Capability promotion now records `human_process_model` before idea generation.
- Generated ideas should reduce or stabilize concrete human process steps, not only react to the user phrase.
- Human checkpoints remain explicit where risk, authority, or accountability remains.

## Remaining Uncertainty

- No automatic scoring UI or background worker was implemented. This change updates the durable contract, docs, and configs.

