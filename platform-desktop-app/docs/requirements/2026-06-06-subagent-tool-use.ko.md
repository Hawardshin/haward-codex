# 요구사항: Subagent Tool Use

날짜: 2026-06-06

## 요구

사용자는 에이전트가 서브에이전트를 도구처럼 사용할 수 있는 기능을 요구했다. 설명이나 추후 계획만으로 두지 않고, 플랫폼 화면과 native runtime에서 실행 가능한 최소 경로를 제공해야 한다.

## 수용 기준

- Tool Studio는 `subagent-delegation-loop`를 source-backed Agent Tool Playbook으로 보여준다.
- Desktop Runtime은 `run_subagent_tool_plan`을 통해 `agent-platform:plan-agent-orchestration`을 실행할 수 있다.
- 실행은 arbitrary shell이 아니라 고정된 `agent-platform` planner command로 제한한다.
- 결과는 runtime task-run store에 record/stdout/stderr/input으로 저장된다.
- manager가 route, merge, evaluation, final answer를 소유한다는 제약을 plan input에 포함한다.
- 실제 autonomous subagent execution은 이번 slice에서 하지 않고, planner 결과를 task-run trace로 남긴다.

## 비범위

- 여러 subagent를 실제로 동시에 실행하는 background runtime.
- 외부 agent framework 설치.
- `_private` 또는 `outputs` 직접 접근.
