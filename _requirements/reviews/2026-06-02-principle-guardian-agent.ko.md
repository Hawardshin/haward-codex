# 요구사항 리뷰: Principle Guardian Agent

## 리뷰 결과

- 상태: accepted
- 요구사항: `REQ-WS-067`

## 확인한 점

- 사용자 요청은 durable instruction과 governance agent로 다루는 것이 적합하다.
- `principle-guardian-agent`는 `omission-guard-agent`, `hallucination-guard-agent`, `work-evaluator-agent`와 중복되지 않는다. 기존 에이전트는 특정 검사를 수행하고, Principle Guardian은 원칙 충돌과 shortcut을 전체적으로 판정한다.
- 원칙 고수가 무조건 작업을 막는 것으로 오해되지 않도록 compliant alternative, human checkpoint, reversible path를 포함해야 한다.

## 승인 조건

- 원칙은 실행 계약이자 close-out gate로 기록
- speed/profit/optimism/convenience shortcut 차단
- 원칙 충돌 시 source, decision reason, human checkpoint 기록
- 관련 문서와 평가 저장
