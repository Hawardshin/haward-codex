# 작업 모드 강제화 리서치 노트

## 요약

모드가 프롬프트에만 있으면 에이전트가 지킬 수도 있고 잊을 수도 있다. 강제 가능한 운영 구조는 다음 요소를 가져야 한다.

- 규칙의 기준 원천: self-documenting config
- 기계적 검사: CLI validator 또는 schema/policy check
- 실행 기록: 선택 이유와 override를 남기는 mode selection record
- 종료 게이트: evaluator가 missing target을 blocking gap으로 반환
- 감사 가능성: 평가 보고서와 히스토리

## 참고 근거

- OPA는 policy-as-code를 통해 소프트웨어가 정책 결정을 위임하는 구조를 제공한다.
- JSON Schema는 구조와 validation을 분리해 데이터가 계약을 만족하는지 검사하는 표준이다.
- Akka Guardrails와 Azure Prompt Shields는 prompt 문구가 아니라 입력/출력 또는 runtime 경계에서 검사하는 방식의 필요성을 보여준다.

## 플랫폼 적용

- `agent-platform/src/agent_platform/work_modes.py`를 추가해 work mode registry를 검사한다.
- `check-work-modes`는 registry와 evaluator target policy가 어긋나면 `rework_required`를 반환한다.
- evaluator는 non-`quick` 모드에서 `mode_selection_record_targets` 누락을 차단한다.

## 주의

- 외부 guardrail이나 policy engine을 지금 바로 도입하는 것은 과하다.
- 현재는 Python validator가 가장 작은 강제 수단이다.
- 반복적으로 policy가 복잡해지면 OPA/Rego, JSON Schema, 또는 프로젝트별 policy engine 도입을 다시 검토한다.
