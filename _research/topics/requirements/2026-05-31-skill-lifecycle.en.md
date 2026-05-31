# Skill Lifecycle Research Note

## Summary

Skills are reusable capability units. They should not be treated as long prompt files; they need triggers, operating procedure, validation, and improvement loops.

## Key References

- [OpenAI Evaluation Best Practices](https://platform.openai.com/docs/guides/evals): task-specific eval and repeated validation
- [OpenAI Agent Evals](https://platform.openai.com/docs/guides/agent-evals): agent behavior evaluation
- [Anthropic Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices): `SKILL.md` frontmatter and concise body
- [Claude custom skills docs](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills): skill folder structure
- [Agent Skills survey](https://arxiv.org/abs/2605.07358): representation, acquisition, retrieval, and evolution lifecycle
- [SkillScope](https://arxiv.org/abs/2605.05868): skill permission and safety validation

## Repository Application

- Create `_skills/create-validated-skill/`.
- Add `validate-skill` CLI to check skill source plus validation and forward-test records.
- Make `work-evaluator-agent` catch missing skill targets for skill work.
- Install skills only when installation records and rollback paths exist.

## Reuse Caution

External skill formats can change quickly. Recheck official docs before changing skill format or installation rules later.
