# 2026-05-31 Plan Record: Explicit Skill Lifecycle

## Request Summary

The user noted that skill creation did not seem explicit enough and asked that created skills continue to be verified and improved.

## Research Summary

- OpenAI evaluation and agent eval docs support task-specific evals and repeated validation for agent capabilities.
- Anthropic/Claude Skills docs emphasize `SKILL.md` frontmatter, concise body, validation, and examples.
- The Agent Skills survey and SkillScope paper informed lifecycle and permission/safety validation framing.

## Plan

1. Add requirement `REQ-WS-014`.
2. Create a skill lifecycle spec.
3. Create `_skills/create-validated-skill/` source skill.
4. Add `agent-platform validate-skill` CLI and tests.
5. Add skill target fields to `work-evaluator-agent`.
6. Update policy, prompt, workflow, templates, memory bootstrap, and history.
7. Run real skill validation and close-out evaluation.

## Decision

The important part of skill management is not only creation, but what happens after repeated use when triggers or outputs are weak. Creation and improvement should therefore share one lifecycle policy.

## Verification Criteria

- `create-validated-skill` passes quick validation and repository validation.
- `validate-skill` tests pass.
- Evaluation input catches missing skill targets as blocking gaps for skill work.

