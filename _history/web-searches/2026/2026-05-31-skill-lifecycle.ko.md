# 2026-05-31 웹 검색 기록: 스킬 생명주기

## 검색 목적

스킬 생성이 명시적이지 않다는 사용자 지시에 따라, 스킬 생성/검증/개선 loop를 설계하기 위한 외부 레퍼런스를 확인했다.

## 검색어

- `AI agent skills creation evaluation improvement best practices skill lifecycle documentation validation`
- `Anthropic Claude Skills best practices SKILL.md evaluation workflow`
- `OpenAI agents tools evals best practices agent capability evaluation documentation`
- `software skill taxonomy agent capability maturity evaluation loop`

## 사용한 출처

| 출처 | 유형 | 확인일 | 반영 |
| --- | --- | --- | --- |
| [OpenAI Evaluation Best Practices](https://platform.openai.com/docs/guides/evals) | 공식 문서 | 2026-05-31 | skill work도 task-specific eval과 close-out target이 필요하다고 반영 |
| [OpenAI Agent Evals](https://platform.openai.com/docs/guides/agent-evals) | 공식 문서 | 2026-05-31 | agent/skill 동작은 반복 검증 대상이라는 점을 반영 |
| [Anthropic Skill Authoring Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | 공식 문서 | 2026-05-31 | `SKILL.md` frontmatter, concise body, validation, examples 원칙 반영 |
| [Claude custom skills docs](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills) | 공식 문서 | 2026-05-31 | skill folder와 `SKILL.md` 구조 반영 |
| [Agent Skills survey](https://arxiv.org/abs/2605.07358) | 논문 | 2026-05-31 | skill lifecycle을 acquisition/retrieval/evolution 관점으로 볼 필요 반영 |
| [SkillScope](https://arxiv.org/abs/2605.05868) | 논문 | 2026-05-31 | skill은 권한/안전/검증 단위로 관리해야 한다는 점 반영 |

## 제외한 약한 출처

- Reddit 글은 실무 신호로만 확인했고 정책 근거로는 사용하지 않았다.
- 개인 블로그는 공식 문서와 논문보다 우선하지 않았다.

## 계획 반영 인사이트

- 스킬 생성은 `SKILL.md` 파일 생성이 아니라 trigger, 검증, 전진 테스트, 개선 loop까지 포함해야 한다.
- 스킬 검증은 close-out 평가와 연결되어야 한다.
- 스킬 원본과 설치된 스킬을 구분해야 한다.

## 공개 판단 요약

이번 작업은 `_skills/create-validated-skill/` 원본 스킬, `validate-skill` CLI, `skill-lifecycle-agent`, 평가 target을 추가하는 방향으로 진행한다.
