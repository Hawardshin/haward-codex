# 2026-05-31 Web Search Record: Skill Lifecycle

## Search Purpose

The user noted that skill creation was not explicit enough. I checked external references for skill creation, validation, and improvement loops.

## Queries

- `AI agent skills creation evaluation improvement best practices skill lifecycle documentation validation`
- `Anthropic Claude Skills best practices SKILL.md evaluation workflow`
- `OpenAI agents tools evals best practices agent capability evaluation documentation`
- `software skill taxonomy agent capability maturity evaluation loop`

## Sources Used

| Source | Type | Checked | Applied To |
| --- | --- | --- | --- |
| [OpenAI Evaluation Best Practices](https://platform.openai.com/docs/guides/evals) | official docs | 2026-05-31 | Skill work needs task-specific evals and close-out targets |
| [OpenAI Agent Evals](https://platform.openai.com/docs/guides/agent-evals) | official docs | 2026-05-31 | Agent/skill behavior should be repeatedly evaluated |
| [Anthropic Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | official docs | 2026-05-31 | `SKILL.md` frontmatter, concise body, validation, and examples |
| [Claude custom skills docs](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills) | official docs | 2026-05-31 | Skill folder and `SKILL.md` structure |
| [Agent Skills survey](https://arxiv.org/abs/2605.07358) | paper | 2026-05-31 | Skill lifecycle should include acquisition, retrieval, and evolution |
| [SkillScope](https://arxiv.org/abs/2605.05868) | paper | 2026-05-31 | Skills should be managed as safety/permission/validation units |

## Weak Sources Excluded

- Reddit posts were treated only as field signals, not policy evidence.
- Personal blogs were not prioritized over official docs and papers.

## Insights Applied To Plan

- Skill creation is not just creating `SKILL.md`; it also needs triggers, validation, forward tests, and improvement loops.
- Skill validation should connect to close-out evaluation.
- Source skills and installed active skills should be tracked separately.

## Public Decision Summary

This work will add `_skills/create-validated-skill/` source, `validate-skill` CLI, `skill-lifecycle-agent`, and skill evaluation targets.
