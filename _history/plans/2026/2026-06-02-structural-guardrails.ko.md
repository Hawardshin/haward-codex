# 계획 기록: 구조적 가드레일

## 요청

사용자는 “가드레일은 필요”라고 지시했다.

## 판단

이 지시는 이전 금지형 지시 변환 원칙의 보강이지만, 별도 원칙으로 다뤄야 한다. 금지형 지시는 긍정 행동 계약으로 바꾸고, 가드레일은 위험한 실행을 막거나 발견하거나 되돌리는 구조적 경계로 선택한다.

## 실행 계획

1. 웹 검색으로 AI guardrail과 risk management 근거를 확인한다.
2. 기존 `REQ-WS-078`과 충돌하지 않게 `REQ-WS-079`로 분리한다.
3. 철학에 “가드레일은 실행 경계다”를 추가한다.
4. `ai-usage-gap-profile`에 `structural_guardrail_contract`를 추가한다.
5. workflow/prompt/operating model/persistent instructions/memory bootstrap에 반영한다.
6. traceability, spec, history, omission, grounding, evaluation 기록을 만든다.
7. 검증, 커밋, push를 완료한다.
