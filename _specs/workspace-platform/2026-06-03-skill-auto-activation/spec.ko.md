# 스펙: 스킬 자동 적용 점검

## 목표

커스텀 스킬이 레포에는 있는데 실제 Codex 런타임에서 자동 적용 후보가 되지 않는 문제를 source/install/trigger/drift 네 축으로 점검하고 수정한다.

## 설계

- `agent-platform/configs/skills/skill-activation-registry.json`
  - 레포 관리 스킬의 source path, installed path, trigger examples, negative examples, sync files를 기록한다.
  - 자동 적용이 기대되는 스킬은 `auto_activation_expected=true`로 둔다.
- `agent-platform/src/agent_platform/evaluation/skill_activation.py`
  - source `SKILL.md` 존재, frontmatter name/description, trigger examples, installed copy, sync file hash를 검사한다.
- CLI
  - `check-skill-activation <registry.json>`가 config contract와 activation check를 함께 출력한다.
- 스킬 원본
  - `create-validated-skill` 설명에 skill trigger/auto-activation 문제를 포함한다.
  - `presentation-reference-curator` 설명에 발표 레퍼런스/라이선스/변환 사용 시점을 명확히 포함한다.
- 설치
  - `presentation-reference-curator`를 `$CODEX_HOME/skills`에 설치한다.
  - `create-validated-skill` 설치본을 source와 동기화한다.

## 수용 기준

- `check-skill-activation`이 `ready`를 반환한다.
- 두 스킬 모두 `quick_validate.py`와 `validate-skill`을 통과한다.
- `unittest`가 activation checker의 ready, missing install, drift case를 검증한다.
- 설치 감사 기록과 rollback 경로가 남는다.
