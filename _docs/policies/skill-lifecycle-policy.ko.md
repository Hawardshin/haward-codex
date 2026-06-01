# 스킬 생명주기 정책

## 목적

커스텀 Codex 스킬을 단순히 만드는 데서 끝내지 않고, 생성 기준, 검증, 전진 테스트, 개선 backlog, 설치 여부, 평가 연결을 명시적으로 관리한다.

## 원칙

- 스킬은 반복되는 판단, 절차, 도메인 규칙, 도구 사용 패턴을 줄일 때만 만든다.
- 스킬 원본은 `_skills/<skill-name>/`에 둔다.
- 새 스킬이나 스킬 수정은 `skill-creator` 지침을 따른다.
- `SKILL.md`는 짧고 명확해야 하며 frontmatter description에 언제 사용할지 포함해야 한다.
- 스킬 작업은 최소 두 개의 trigger 예시, 검증 단계, 전진 테스트 시나리오, 개선 아이디어를 남긴다.
- 실제 Codex 활성 설치는 `$CODEX_HOME/skills` 위치, 권한, rollback, 설치 기록을 확인한 뒤 진행한다.
- 스킬 작업이 있었다면 종료 평가 입력에 `skill_work_occurred=true`, `skill_targets`, `skill_validation_targets`를 넣는다.

## 필수 검증

- 시스템 검증:

```bash
python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/<skill-name>
```

- 저장소 검증:

```bash
PYTHONPATH=src python3 -m agent_platform.cli validate-skill configs/evaluation/skill-validation-template.json
```

## 개선 루프

1. 실제 사용 요청과 결과를 확인한다.
2. 트리거가 맞았는지 확인한다.
3. 산출물이 기대와 달랐던 부분을 찾는다.
4. `SKILL.md`, `references/`, `scripts/`, `assets/` 중 필요한 곳만 수정한다.
5. 검증과 전진 테스트를 다시 실행한다.
6. 개선 내용과 남은 아이디어를 평가 보고서나 작업 요약에 남긴다.

## 관련 파일

- [_skills/registry.md](../../_skills/registry.md)
- [_skills/create-validated-skill/SKILL.md](../../_skills/create-validated-skill/SKILL.md)
- [_ops/workflows/37-skill-lifecycle.md](../../_ops/workflows/37-skill-lifecycle.md)
- [_ops/prompts/37-manage-skill.md](../../_ops/prompts/37-manage-skill.md)
- [agent-platform/docs/skill-lifecycle-agent.ko.md](../../agent-platform/docs/skill-lifecycle-agent.ko.md)

