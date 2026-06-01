# 커스텀 스킬 원본

이 폴더는 git으로 추적하는 커스텀 Codex 스킬 원본을 보관한다.

## 규칙

- 스킬 원본은 `_skills/<skill-name>/`에 둔다.
- `SKILL.md`는 필수이며 frontmatter `name`, `description`을 포함한다.
- 스킬을 만들거나 수정할 때는 `skill-creator` 지침과 `_docs/policies/skill-lifecycle-policy.ko.md`를 따른다.
- 스킬 작업은 `validate-skill`로 검증하고, 전진 테스트 시나리오와 개선 아이디어를 남긴다.
- 실제 Codex 활성 설치가 필요하면 `$CODEX_HOME/skills` 또는 `~/.codex/skills`에 복사하되 설치 기록을 남긴다.

## 현재 스킬

| 스킬 | 목적 | 상태 |
| --- | --- | --- |
| `create-validated-skill` | 반복 workflow를 검증된 커스텀 Codex 스킬로 만드는 절차 | source ready |

