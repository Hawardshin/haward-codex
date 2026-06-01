# 계획: 작업 모드 강제화

## 선택 모드

- `governance`
- 이유: 작업 모드 정책, evaluator behavior, memory anchor, repository rules를 바꾸는 durable platform change다.
- 모드 선택 기록: 이 파일
- Enforcement check: `check-work-modes`, `evaluate-work`, 테스트, config contract, memory bootstrap

## 근거

- OPA와 policy-as-code 문서는 정책을 별도 규칙으로 두고 enforcement point에서 평가하는 접근을 제공한다.
- JSON Schema는 구조 계약을 기계적으로 검증하는 대표 방식이다.
- AI guardrail 문서는 프롬프트만으로는 충분하지 않고 실행 경계의 검사가 필요하다는 설계 방향을 뒷받침한다.
- 기존 repository 구조에는 evaluator가 있었지만 mode selection record와 registry/evaluator drift check가 별도 CLI로 강제되지 않았다.

## 단계

1. work-mode registry에 enforcement layer와 mode별 강제 필드 추가.
2. Python work mode checker와 CLI command 추가.
3. evaluator input/target에 `mode_selection_record_targets` 추가.
4. 문서, 정책, 요구사항, workflow, memory bootstrap 반영.
5. 테스트, config check, evaluator, history/evaluation을 실행한다.
