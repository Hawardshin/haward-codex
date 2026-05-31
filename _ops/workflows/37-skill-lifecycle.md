# Skill Lifecycle Workflow

## Purpose

커스텀 Codex 스킬을 만들거나 수정할 때 생성 기준, 검증, 전진 테스트, 개선 루프를 명시적으로 남긴다.

## Sequence

1. Run web-first intake and record the search process.
2. Check whether the repeated need is better as a skill, prompt, workflow, template, or tool.
3. Read `_docs/skill-lifecycle-policy.ko.md`, `_skills/registry.md`, and existing related skills.
4. If creating a new skill, use `skill-creator` guidance and initialize source under `_skills/<skill-name>/`.
5. Keep `SKILL.md` concise and put when-to-use triggers in frontmatter description.
6. Add only necessary `references/`, `scripts/`, or `assets/`.
7. Record at least two trigger examples.
8. Run `quick_validate.py` against the skill folder.
9. Create a `validate-skill` input JSON and run `PYTHONPATH=src python3 -m agent_platform.cli validate-skill <input.json>`.
10. Record at least one realistic forward-test scenario. Use subagents only when available and safe.
11. Record improvement ideas or explicitly note that no immediate improvement was found.
12. Update `_skills/registry.md`, work summary, request trace, and evaluation report.
13. If installing into `$CODEX_HOME/skills`, create an installation record and update `_ops/installations/registry.json`.
14. Include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets` in close-out evaluation input.

## Rule

Do not treat a new skill as complete because `SKILL.md` exists. A skill is complete only when it has trigger examples, validation, forward-test scenarios, improvement notes, registry linkage, and close-out evaluation targets.

