# Source Provenance: Human Process Capability Promotion

## Source Values

| Value / Claim | Source | Used In | Reliability | Limitation |
| --- | --- | --- | --- | --- |
| Human-centered design addresses users, tasks, environments, requirements, design, and evaluation. | NIST Human Centered Design | `human_process_model` design | High | Page notes some content may be old, though it was updated on 2026-05-27 |
| Human-AI tasks should be decomposed around human goals and outcomes. | NIST AI Use Taxonomy | Rule that generated ideas must come from human process steps | High | Taxonomy guidance still needs local implementation validation |
| Strong problem solving moves through framing, inspiration gathering, synthesis, ideation, testing, and storytelling. | IDEO Design Thinking Process | Human-like sequence | Medium | Design methodology requires local adaptation for repository operations |
| Higher-risk automated decisions need explicit human review gates. | Open Practice Library Human-in-the-Loop | Human checkpoint reinforcement | Medium | Practice reference, not a regulatory source by itself |
| Existing `REQ-WS-070` requires bounded black-box capability promotion and an idea evaluation gate. | `_requirements/baselines/2026-05-31-workspace-platform.en.md` | Requirement refinement | High | Internal baseline must be revalidated after edits |

## Decision

This change updates the existing `capability-promotion-agent` and registry with `human_process_model` instead of creating a new agent. The user’s instruction strengthens the precondition for automatic improvement rather than introducing a separate capability.

