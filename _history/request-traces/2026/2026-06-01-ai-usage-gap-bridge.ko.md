# 요청-결과 추적: AI 사용 격차와 간극 해소

## 요청

AI를 잘 못 쓰는 사람의 문제점, AI를 잘 쓰는 사람과 못 쓰는 사람의 차이, 그 간극을 해소하는 방법을 조사하고 플랫폼에 반영할 것.

## 작업 모드

`governance`

## 요구사항

- `REQ-WS-042`

## 결과

- AI 사용 격차를 개인 탓이 아니라 작업 맥락, task-fit, 반복, 검증, 도구화, 자산화 gap으로 분류하는 profile을 추가했다.
- AI를 잘 쓰는 사람의 행동을 platform operation으로 반영했다.
- bridge workflow/prompt를 추가해 모호한 요청을 개선하고, 검증과 반복을 붙이며, 재사용 패턴을 durable asset으로 승격할 수 있게 했다.
- memory bootstrap에 anchor를 추가해 미래 세션에서도 이 기준을 찾을 수 있게 했다.

## 산출물

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_docs/operating-models/ai-usage-gap-operating-model.ko.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_research/topics/agent-planning/2026-06-01-ai-usage-gap-bridge.ko.md`
- `_specs/workspace-platform/2026-06-01-ai-usage-gap-bridge/`

## 검증

- config contract
- memory bootstrap
- docs audit
- workspace index/task board
- grounding/evaluation

## 평가

- 평가 파일: `_history/evaluations/2026/2026-06-01-ai-usage-gap-bridge.ko.md`
- 시간 기록: `_history/work-timings/2026/2026-06-01-ai-usage-gap-bridge.json`
