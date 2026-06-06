# Spec: Subagent Tool Selection

날짜: 2026-06-07

## 목표

Desktop Runtime의 subagent plan 결과 카드에서 실행할 tool을 직접 선택하고, 선택된 tool 집합으로 단일 실행과 bounded fan-out을 시작한다.

## 동작

- `selectedSubagentToolNames` 상태가 plan tool 선택을 소유한다.
- `run_subagent_tool_plan` 성공 시 첫 2개 tool을 기본 선택한다.
- selector는 checkbox list로 표시하고 선택 수를 `n/3`으로 보여준다.
- 선택되지 않은 tool은 선택 수가 3에 도달하면 disabled 처리한다.
- `executeSubagentTools`는 `selectedSubagentTools[0]`를 실행한다.
- `fanoutSubagentTools`는 `selectedSubagentFanoutToolNames`를 native invoke payload의 `toolNames`에 전달하고, `maxSessions`를 선택 수와 맞춘다.

## UI 계약

- plan result 카드 안에 `data-subagent-tool-selector`가 존재한다.
- 각 tool option은 `data-subagent-tool-option={tool.toolName}`를 가진다.
- 각 checkbox는 `data-subagent-tool-checkbox={tool.toolName}`를 가진다.
- fan-out 버튼 문구는 첫 2개 고정이 아니라 선택 기반이다.

## 안전 경계

- frontend 선택 수 hard cap은 3이다.
- Rust command의 hard cap 3과 unknown-tool validation을 그대로 신뢰한다.
- Browser preview에서는 native command 실행이 아니라 DOM contract만 smoke한다.
