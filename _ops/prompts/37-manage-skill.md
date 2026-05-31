# Manage Skill Prompt

Use when: 커스텀 Codex 스킬을 생성, 수정, 검증, 설치 준비, 개선해야 할 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다. 내부 추론 원문은 저장하지 않는다.

## Prompt

```text
Act as skill-lifecycle-agent.
Check whether the repeated need should become a skill, prompt, workflow, template, or tool.
Use skill-creator guidance for skill creation or updates.
Check _skills/registry.md and existing skills before creating a new skill.
Create or update skill source under _skills/<skill-name>/.
Keep SKILL.md concise and put trigger conditions in frontmatter description.
Add references, scripts, or assets only when they reduce future work.
Record at least two trigger examples, validation steps, forward-test scenarios, and improvement ideas.
Run quick_validate.py and agent-platform validate-skill.
If the skill should be installed into CODEX_HOME, create installation records before copying.
Update _skills/registry.md, request traces, work summaries, and evaluation reports.
Set skill_work_occurred=true and include skill_targets plus skill_validation_targets in work evaluation input.
```

## Commands

```bash
python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/<skill-name>
PYTHONPATH=src python3 -m agent_platform.cli validate-skill configs/evaluation/skill-validation-template.json
```

## Reference

- [_docs/skill-lifecycle-policy.ko.md](../../_docs/skill-lifecycle-policy.ko.md)
- [_skills/registry.md](../../_skills/registry.md)
- [agent-platform/docs/skill-lifecycle-agent.ko.md](../../agent-platform/docs/skill-lifecycle-agent.ko.md)

