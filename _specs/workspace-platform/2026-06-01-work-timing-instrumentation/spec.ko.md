# 스펙: 작업 시간과 병목 기록

## 요구사항

- `REQ-WS-039`

## 문제

작업은 히스토리와 평가로 추적되고 있지만, 어느 단계에서 시간이 오래 걸렸는지 한눈에 보기 어렵다. 병렬화나 도구화가 필요한 지점을 판단하려면 작업별 phase timing과 병목 후보가 필요하다.

## 목표

- 작업별 timing record를 `_history/work-timings/YYYY/`에 저장한다.
- timing record는 phase 단위로 duration을 기록하고, 측정하지 못한 구간은 명시한다.
- slowest measured phase와 bottleneck candidates를 도구로 요약한다.
- coordination board와 Workspace Monitor에서 timing summary를 볼 수 있게 한다.
- work-evaluator가 `timing_summary_targets`를 close-out target으로 인식한다.

## 비목표

- 사람의 생산성을 점수화하지 않는다.
- 초 단위 precision을 강제하지 않는다.
- 기존 히스토리 파일 전체에 과거 timing을 소급 생성하지 않는다.

## 설계

- `_tools/work-timer/`는 timing JSON을 검사하고 요약한다.
- `_tools/work-timer/configs/work-timing-policy.json`은 phase vocabulary, threshold, schema 설명을 제공한다.
- `_history/work-timings/`는 작업별 timing record를 저장한다.
- `_ops/workflows/42-record-work-timing.md`는 언제 기록하고 어떻게 검증할지 정의한다.
- `_ops/coordination/status.json`의 task는 선택적으로 `timing_report`를 가진다.
- task-board와 Workspace Monitor는 `timing_report`를 읽어 총 measured time과 slowest phase를 표시한다.

## 수용 기준

- work-timer tests가 통과한다.
- current task timing record를 `check`할 수 있다.
- work-evaluator tests가 통과하고 `timing_summary_targets`를 카운트한다.
- task-board와 Workspace Monitor가 timing summary를 표시할 수 있다.
- config contract, memory bootstrap, workspace-health가 통과한다.
