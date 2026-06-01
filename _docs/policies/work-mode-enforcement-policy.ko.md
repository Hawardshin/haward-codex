# 작업 모드 강제 정책

## 목적

작업 모드는 단순 프롬프트 선호가 아니라 플랫폼의 실행 계약이어야 한다. 프롬프트로만 모드를 지시하면 에이전트의 자유도는 올라가지만, 실제 산출물 누락을 막거나 설계 품질을 강제하지 못한다.

## 정책

- `agent-platform/configs/workflows/work-mode-registry.json`은 작업 모드의 기준 원천이다.
- `quick`을 제외한 `standard`, `ship_first`, `research`, `governance` 작업은 모드 선택 이유, 적용한 override, 실행한 enforcement check를 파일로 남긴다.
- 평가 입력에는 선택한 모드가 요구하는 경우 `mode_selection_record_targets`를 반드시 포함한다.
- 평가 입력에는 선택한 모드가 요구하는 경우 `omission_check_targets`도 반드시 포함해 필수 지시, 요구사항, 산출물, acceptance check coverage를 남긴다.
- 리소스 위험이 있는 작업은 모드와 별개로 `resource_risk_occurred=true`와 `resource_check_targets`를 포함한다.
- 모드 정책, evaluator target, close-out strictness가 바뀌면 `check-work-modes`를 실행한다.
- 평가자는 선택한 모드의 blocking target이 누락되면 작업을 종료하지 않고 재작업으로 돌린다.
- 모드 정책은 프롬프트, 워크플로 문서, 설정 파일, CLI 검사, evaluator, 최종 평가 보고서가 함께 맞물려야 한다.

## 강제 레이어

1. 설정 레이어: `work-mode-registry.json`에 모드, 선택 규칙, enforcement layer, evaluator policy를 기록한다.
2. CLI 레이어: `check-work-modes`가 registry와 Python evaluator 정책 drift를 검사한다.
3. 기록 레이어: non-`quick` 작업은 mode selection record와 omission coverage record를 남긴다.
4. 누락 방지 레이어: `check-omissions`가 필수 항목 coverage를 검사한다.
5. 리소스 누수 방지 레이어: `check-resources`가 runtime resource risk의 생명주기와 측정 근거를 검사한다.
6. 평가 레이어: `evaluate-work`가 누락된 blocking target을 gap으로 만든다.
7. 감사 레이어: `_history/evaluations/YYYY/`에 최종 평가를 남긴다.

## 근거

- OPA 같은 policy-as-code 접근은 정책을 코드/설정으로 분리해 enforcement point에서 평가한다.
- JSON Schema는 데이터가 선언된 구조를 만족하는지 기계적으로 검증하는 표준 접근이다.
- AI guardrail 문서들은 prompt에 의존하지 않고 입력/출력 또는 실행 경계에서 검사하는 runtime control의 필요성을 보여준다.

## 금지

- "프롬프트에 써두었으니 지켜질 것"이라고 가정하지 않는다.
- `quick`이 아닌 작업에서 mode selection record 없이 의미 있는 작업을 닫지 않는다.
- `quick`이 아닌 작업에서 omission coverage 없이 의미 있는 작업을 닫지 않는다.
- 리소스 위험이 있는 작업에서 resource check 없이 의미 있는 작업을 닫지 않는다.
- mode registry와 evaluator 정책이 불일치한 상태로 push하지 않는다.
