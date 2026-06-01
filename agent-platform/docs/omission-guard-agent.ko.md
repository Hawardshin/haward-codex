# Omission Guard Agent

## 목적

`omission-guard-agent`는 작업을 닫기 전에 빠뜨린 항목이 있는지 확인한다. 사용자의 지시, 요구사항, 계획 항목, 필수 산출물, acceptance check를 한 줄씩 나열하고 각 항목이 `covered`, `deferred`, `not_applicable`, `missing` 중 무엇인지 근거와 함께 기록한다.

이 에이전트는 기억력 보완용 문서가 아니라 close-out gate다. `quick`을 제외한 작업은 `omission_check_targets`를 평가 입력에 포함해야 한다.

## 입력

기본 형식은 `agent-platform/configs/evaluation/omission-guard-template.json`을 사용한다.

- `task`: 확인 대상 작업
- `work_mode`: 선택한 작업 모드
- `expected_items`: 누락되면 안 되는 지시, 요구사항, 계획, acceptance criteria
- `artifact_checks`: 실제로 존재해야 하는 파일이나 폴더
- `acceptance_checks`: 테스트, 감사, 수동 검토 같은 완료 기준
- `known_omission_risks`: 아직 주의해야 할 누락 위험

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-omissions configs/evaluation/omission-guard-template.json
```

실제 작업에서는 템플릿을 그대로 쓰지 말고 `_history/evaluations/YYYY/` 또는 프로젝트별 history 위치에 작업 전용 JSON을 저장한다.

## 판정

- `coverage_ready`: blocking omission gap이 없다.
- `rework_required`: 필수 항목이 누락됐거나, covered 근거가 없거나, deferred/not_applicable rationale이 없다.

`work-evaluator-agent`는 선택한 모드가 요구할 때 `omission_check_targets`가 없으면 close-out을 막는다.
