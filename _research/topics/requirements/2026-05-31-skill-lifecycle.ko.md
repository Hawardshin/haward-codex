# 스킬 생명주기 리서치 노트

## 요약

스킬은 재사용 가능한 capability 단위이며, 긴 프롬프트 저장소가 아니라 trigger, 실행 절차, 검증, 개선 loop를 가진 관리 대상이어야 한다.

## 참고한 핵심 자료

- [OpenAI Evaluation Best Practices](https://platform.openai.com/docs/guides/evals): task-specific eval과 반복 검증 기준
- [OpenAI Agent Evals](https://platform.openai.com/docs/guides/agent-evals): agent 동작 검증 관점
- [Anthropic Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices): `SKILL.md` frontmatter와 concise body
- [Claude custom skills docs](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills): skill folder 구조
- [Agent Skills survey](https://arxiv.org/abs/2605.07358): representation, acquisition, retrieval, evolution lifecycle
- [SkillScope](https://arxiv.org/abs/2605.05868): skill 권한과 안전성 검증 관점

## 저장소 반영

- `_skills/create-validated-skill/`을 만든다.
- `validate-skill` CLI로 스킬 원본과 검증/전진 테스트 기록을 확인한다.
- `work-evaluator-agent`가 스킬 작업의 target 누락을 막는다.
- 스킬 설치는 설치 기록과 rollback 경로가 있을 때만 진행한다.

## 재사용 주의

스킬 관련 외부 문서는 빠르게 바뀔 수 있다. 다음에 스킬 포맷이나 설치 방식을 바꿀 때는 공식 문서를 다시 확인한다.
