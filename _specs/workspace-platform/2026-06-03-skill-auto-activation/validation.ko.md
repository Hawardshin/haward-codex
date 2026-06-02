# 검증: 스킬 자동 적용 점검

## 예정 검증

- `PYTHONPATH=src python3 -m agent_platform.cli check-skill-activation configs/skills/skill-activation-registry.json`
- `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/create-validated-skill`
- `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/presentation-reference-curator`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-skill ../_history/skill-validations/2026/2026-06-03-create-validated-skill-activation.json`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-skill ../_history/skill-validations/2026/2026-06-03-presentation-reference-curator-activation.json`
- `PYTHONPATH=src python3 -m unittest tests.test_skill_activation tests.test_skill_validator`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-skill-auto-activation-omission-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-03-skill-auto-activation-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-skill-auto-activation-evaluation-input.json`

## 현재 결과

- 사전 activation check는 `presentation-reference-curator` 설치 누락과 `create-validated-skill` drift를 실패로 보고했다.
- 설치 동기화 후 activation check는 `ready`를 반환했다.
