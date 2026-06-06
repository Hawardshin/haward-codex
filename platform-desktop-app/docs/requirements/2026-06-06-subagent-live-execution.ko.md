# Requirements: Subagent Live Execution

날짜: 2026-06-06

## 배경

이전 `subagent-tool-use` slice는 manager가 사용할 subagent tool plan을 만들고 task-run record로 저장하는 데서 멈췄다. 사용자는 미뤄둔 다음 단계, 즉 계획된 subagent tool을 실제 터미널/CLI 실행으로 연결하기를 요구했다.

## 요구사항

- REQ-SLE-001: Desktop Runtime은 저장된 `subagent_tool_plan` record에서 선택한 tool 하나를 실행할 수 있어야 한다.
- REQ-SLE-002: 실행 전 `planTaskRunId`, `toolName`, `adapterId`를 검증하고, plan에 없는 tool name은 거부해야 한다.
- REQ-SLE-003: 실행은 새 subprocess runner가 아니라 기존 CLI adapter session lifecycle과 task-run persistence를 재사용해야 한다.
- REQ-SLE-004: 실행 record는 `task_kind=subagent_tool_execution`, `pipeline_id=<planTaskRunId>`, `lane_id=<toolName>`, `lane_role=<agentName>`을 가져야 한다.
- REQ-SLE-005: subagent prompt에는 manager-owned boundary, `_private`/`outputs` 접근 금지, destructive operation/install/global environment change 금지를 포함해야 한다.
- REQ-SLE-006: 이번 slice는 단일 실행 세션만 제공하고, 자동 병렬 fan-out과 자동 merge는 범위 밖으로 둔다.
- REQ-SLE-007: UI는 내부 구현 용어보다 사용자가 이해할 수 있는 계획, 실행 세션, 실행 기록 흐름으로 표시해야 한다.

## 비범위

- 다중 subagent worker 자동 fan-out
- subagent 결과 자동 merge/patch 적용
- 새 CLI 설치, global dependency 설치, background daemon 추가
- `_private/` 또는 `outputs/` 직접 접근
