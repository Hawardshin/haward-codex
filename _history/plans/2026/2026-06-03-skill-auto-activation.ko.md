# 작업 계획 기록: 스킬 자동 적용 점검

## 요청 해석

- 사용자는 스킬들이 자동으로 잘 적용되지 않는다고 보고했다.
- 단순 사용법 안내가 아니라, 레포의 custom skill lifecycle 자체가 자동 적용 준비 상태를 놓치지 않도록 개선해야 한다.

## 실행 계획

1. 웹 검색으로 공개 skill 설명과 설치/사용 경계를 확인한다.
2. 로컬 `_skills/`와 `/Users/shinjoungeun/.codex/skills/`를 비교한다.
3. source/install/trigger/drift를 검사하는 activation registry와 CLI checker를 추가한다.
4. 설치 누락 또는 drift가 있으면 감사 기록과 함께 동기화한다.
5. skill validation input, requirements, specs, history, evaluation을 남긴다.
6. activation check, skill validation, unittest, close-out guards를 실행한다.

## 확인된 원인

- `presentation-reference-curator`는 `_skills/` source는 있었지만 installed Codex skill copy가 없었다.
- `create-validated-skill`은 source 설명을 개선한 뒤 installed copy와 drift가 발생했다.

## 병합 게이트

- `check-skill-activation`이 `ready`여야 한다.
- 두 스킬 모두 `validate-skill`이 `skill_ready`여야 한다.
- `agent-platform` unittest가 통과해야 한다.
