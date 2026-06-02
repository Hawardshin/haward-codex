# 웹 검색 기록: 스킬 자동 적용 점검

## 검색 목적

- 커스텀 Codex/ChatGPT skill이 자동 또는 명시적으로 사용되는 조건과, skill description/installation의 역할을 확인한다.

## 검색

| Query | Sources checked | Notes |
| --- | --- | --- |
| `site:help.openai.com Codex skills SKILL.md automatic use` | OpenAI Help search results | 직접적인 Codex skill auto-activation 구현 세부는 찾지 못했다. |
| `site:developers.openai.com Codex skills SKILL.md automatic invocation` | OpenAI developer domain search results | 직접적인 로컬 `$CODEX_HOME/skills` 세부는 찾지 못했다. |
| `site:openai.com Codex skills SKILL.md` | OpenAI Academy pages | 스킬 설명, 설치, 자동/명시 사용의 공개 설명을 확인했다. |

## 확인한 강한 출처

| Source | Access date | Reliability | Used for |
| --- | --- | --- | --- |
| https://openai.com/academy/skills/ | 2026-06-03 | official | 스킬은 이름/설명, workflow instructions, resources를 포함하고, 설치 후 관련 skill을 자동 또는 명시적으로 사용할 수 있다는 근거 |
| https://openai.com/academy/codex-plugins-and-skills/ | 2026-06-03 | official | Codex에서 skill은 작업 playbook이고 `$skill-name`으로 명시 호출할 수 있다는 근거 |

## 약한 출처/제외

- 비공식 블로그, forum 추측, 미확인 로컬 경로 관련 글은 이번 구현 근거로 사용하지 않았다.
- Codex 내부 자동 선택 알고리즘 세부는 공개 강한 출처로 확인하지 못했으므로, 구현은 레포에서 통제 가능한 source/install/trigger/drift 검사에 한정했다.

## 계획 영향

- `SKILL.md` frontmatter description과 trigger examples를 검사 대상으로 삼았다.
- 레포 원본 `_skills/`와 실제 설치본 `/Users/shinjoungeun/.codex/skills/`를 별도 필드로 관리했다.
- `check-skill-activation`으로 설치 누락과 installed copy drift를 자동 적용 준비 실패로 처리했다.
