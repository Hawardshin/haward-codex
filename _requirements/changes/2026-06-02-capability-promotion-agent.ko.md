# 요구사항 변경: Capability Promotion Agent

## 요청

- 사용자 요청 요약: 다양한 작업을 스스로 하다가 필요한 기능을 추가하도록 하는 블랙박스적 처리를 원했다.
- 요청 ID: `UR-2026-06-02-028`

## 변경

- `REQ-WS-070`을 추가했다.
- 플랫폼이 반복, 병목, 누락, 검증 실패, 수동 재작업을 감지해 기능 추가 후보를 만들 수 있도록 정의했다.
- 다만 완전 불투명한 블랙박스가 아니라 observation, candidate, risk, validation, rollback, evaluation, commit/push trace를 남기는 bounded black-box로 제한했다.

## 영향

- `capability-promotion-agent`가 추가된다.
- `capability-promotion-registry.json`이 self-improvement 후보 생성의 source of truth가 된다.
- 고위험 변경은 human checkpoint 대상이 된다.

## 검증 계획

- config contract
- agent inspect/list
- agent orchestration check
- memory bootstrap check
- omission/grounding/evaluation
