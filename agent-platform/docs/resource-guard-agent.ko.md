# Resource Guard Agent

## 목적

`resource-guard-agent`는 플랫폼 작업이 메모리 누수나 런타임 리소스 누수를 만들 가능성을 닫기 전에 확인한다. 대상은 장시간 실행 에이전트, 서버, 브라우저 자동화, subprocess, worker, queue, cache, stream, 대용량 데이터 처리, 파일 핸들, 네트워크 연결, timer, subscription이다.

이 에이전트는 "조심하자"는 메모가 아니라 조건부 close-out gate다. 작업에 리소스 위험이 있으면 `work-evaluator-agent` 입력에 `resource_risk_occurred=true`와 `resource_check_targets`를 함께 남긴다.

## 입력

기본 형식은 `agent-platform/configs/evaluation/resource-guard-template.json`을 사용한다.

- `task`: 확인 대상 작업
- `work_mode`: 선택한 작업 모드
- `runtime_context`: 관련 런타임이나 실행 환경
- `resource_risks`: 메모리, 프로세스, 브라우저 컨텍스트, 캐시, worker, stream 등 누수 위험
- `lifecycle_checks`: create/open/start 경로와 cleanup/close/stop 경로
- `measurement_checks`: RSS, heap, allocation, peak memory 같은 측정 항목과 도구, 기준값, 근거
- `notes`: 수동 판단, 한계, 추후 확인 트리거

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-resources configs/evaluation/resource-guard-template.json
```

실제 작업에서는 템플릿을 그대로 쓰지 말고 `_history/evaluations/YYYY/` 또는 프로젝트별 history 위치에 작업 전용 JSON을 저장한다.

## 판정

- `resource_ready`: blocking resource gap이 없다.
- `rework_required`: 필수 위험이 unresolved이거나, mitigation 근거가 없거나, lifecycle cleanup path 또는 measurement evidence가 부족하다.

`work-evaluator-agent`는 `resource_risk_occurred=true`인데 `resource_check_targets`가 없으면 close-out을 막는다.
