# 요청-결과 추적: 스킬 자동 적용 점검

## 요청

- ID: `UR-2026-06-03-014`
- 요약: 커스텀 스킬들이 자동 적용되지 않는 것 같다는 보고.

## 결과

- source-only 상태와 installed-active 상태를 분리하는 activation registry를 추가했다.
- `check-skill-activation` CLI를 추가해 source, install, trigger examples, installed copy drift를 검사한다.
- `presentation-reference-curator` 설치 누락을 확인하고 `/Users/shinjoungeun/.codex/skills/`에 설치했다.
- `create-validated-skill` 설명을 자동 적용 문제까지 포괄하도록 개선하고 설치본을 동기화했다.
- 스킬 validation input, 설치 감사 기록, requirements/spec/history/evaluation record를 추가했다.

## 산출물

- `agent-platform/configs/skills/skill-activation-registry.json`
- `agent-platform/src/agent_platform/evaluation/skill_activation.py`
- `agent-platform/tests/test_skill_activation.py`
- `_skills/create-validated-skill/SKILL.md`
- `_skills/presentation-reference-curator/SKILL.md`
- `_history/installations/2026/2026-06-03-skill-activation-sync.ko.md`

## 검증

- `check-skill-activation`: 설치 전 실패, 설치 후 ready.
- `quick_validate.py`: 두 스킬 모두 valid.
- 최종 unittest와 close-out guard 결과는 evaluation result에 연결한다.
