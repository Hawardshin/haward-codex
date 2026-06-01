# 누락 방지 정책

## 목적

에이전트는 긴 지시, 많은 산출물, 병렬 작업, 리서치/구현/평가가 섞인 작업에서 일부 항목을 빠뜨릴 수 있다. 이 정책은 누락 가능성을 정상 위험으로 보고, 작업 종료 전에 명시적인 coverage check로 잡는다.

## 원칙

- 기억이나 프롬프트만 믿지 않는다. 빠뜨리면 안 되는 항목은 파일로 나열한다.
- `quick`을 제외한 작업은 `omission_check_targets`를 남긴다.
- 항목은 `covered`, `deferred`, `not_applicable`, `missing` 중 하나로 분류한다.
- `covered`인 필수 항목은 증거가 있어야 한다.
- `deferred` 또는 `not_applicable`은 이유가 있어야 한다.
- `missing`인 필수 항목은 close-out 전에 재작업한다.

## 적용 범위

다음 작업은 omission check가 특히 필요하다.

- durable rule, 요구사항, 스펙, 평가기, 워크플로, 설정 파일 변경
- 여러 사용자 지시가 이어진 작업
- 병렬 lane을 합치는 작업
- 설치, 배포, 검증, 히스토리 업데이트가 함께 필요한 작업
- 산출물이 많아 사람이 파일만 보고 누락 여부를 확인해야 하는 작업

## 실행

1. 사용자 지시, 요구사항, 계획, acceptance criteria에서 빠뜨리면 안 되는 항목을 `expected_items`로 정리한다.
2. 실제 파일이나 폴더가 필요한 것은 `artifact_checks`에 둔다.
3. 테스트, 감사, 수동 확인은 `acceptance_checks`에 둔다.
4. `agent-platform`에서 `check-omissions`를 실행한다.
5. 결과가 `rework_required`면 gap을 처리한 뒤 다시 실행한다.
6. 결과 JSON이나 보고서를 `omission_check_targets`로 `work-evaluator-agent` 입력에 연결한다.

## 명령

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/YYYY/YYYY-MM-DD-slug-omission-check.json
```

## 근거 역할

체크리스트는 사람이 완벽하게 기억하지 못하는 반복 작업에서 누락을 줄이기 위한 운영 장치다. 요구사항 traceability는 요구사항, 구현, 검증 사이의 빠진 연결을 찾기 위한 장치다. 이 정책은 두 관점을 플랫폼 close-out gate로 옮긴다.
