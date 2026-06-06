# Requirements: Subagent Bounded Fan-Out

날짜: 2026-06-07

## 배경

이전 slice는 저장된 subagent plan에서 선택한 tool 하나를 CLI session으로 시작했다. 사용자는 미룬 다음 단계를 계속 구현하라고 요청했으므로, 다음 단계는 plan의 여러 tool을 제한된 병렬 실행으로 시작하고 manager가 수동 merge gate를 소유하게 만드는 것이다.

## 요구사항

- REQ-SBF-001: Desktop Runtime은 저장된 `subagent_tool_plan`에서 첫 2개 planned tools를 묶음 실행할 수 있어야 한다.
- REQ-SBF-002: Rust command는 registered adapter, workspace-root cwd, saved plan record, tool names를 검증해야 한다.
- REQ-SBF-003: fan-out은 default 2 sessions, hard cap 3 sessions를 넘지 않아야 한다.
- REQ-SBF-004: 각 실행은 기존 `create_cli_session` lifecycle, cancellation, task-run persistence를 재사용해야 한다.
- REQ-SBF-005: 각 lane은 `task_kind=subagent_tool_fanout`, 같은 `pipeline_id`, `lane_id=<toolName>`, `lane_role=<agentName>`을 가져야 한다.
- REQ-SBF-006: lane prompt에는 manager-owned fan-in/merge/validation/final-answer boundary, `_private`/`outputs` 접근 금지, destructive/install/global env change 금지가 포함되어야 한다.
- REQ-SBF-007: UI는 fan-out report를 실행 기록과 task pipeline panel에 연결하고, 자동 merge가 아니라 수동 merge gate임을 표시해야 한다.

## 비범위

- plan의 모든 tool 자동 실행
- 자동 결과 merge나 patch 적용
- 새 CLI 설치, global dependency 설치, daemon 추가
- lane 간 직접 통신 또는 lane의 final answer ownership
