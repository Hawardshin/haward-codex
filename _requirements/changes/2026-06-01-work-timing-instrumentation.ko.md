# 요구사항 변경: 작업 시간과 병목 기록

## 변경 ID

- `REQ-CHANGE-2026-06-01-WORK-TIMING`

## 배경

사용자는 각 작업에서 어디에 병목이 있는지 쉽게 알 수 있도록 작업별 소요시간을 기록하라고 요청했다.

## 변경 내용

- `REQ-WS-039`를 추가한다.
- 의미 있는 작업은 phase별 timing record를 `_history/work-timings/YYYY/`에 저장한다.
- close-out 평가 입력은 선택한 work mode가 요구할 때 `timing_summary_targets`를 포함한다.
- coordination board와 Workspace Monitor는 timing report가 연결된 task의 총 measured time과 slowest phase를 보여준다.

## 근거

- OpenTelemetry의 trace/span 모델은 작업을 하위 span으로 나눠 타이밍을 추적하는 구조를 제공한다.
- Google SRE의 golden signals는 latency를 핵심 관찰 신호로 다룬다.
- DORA metrics는 lead time 같은 workflow-level 측정을 통해 개선 대상을 찾는 접근을 제공한다.

## 영향 범위

- `_tools/work-timer/`
- `_history/work-timings/`
- `_ops/workflows/42-record-work-timing.md`
- `_ops/coordination/`
- `workspace-monitor/`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`

## 검증

- work-timer 단위 테스트
- work-timer timing record check
- work-evaluator 단위 테스트
- task-board freshness
- workspace-monitor tests/typecheck/build
- workspace-health
