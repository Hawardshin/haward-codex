# 요구사항 변경: AI 사용 격차와 간극 해소

## 변경

- `REQ-WS-042` 추가

## 배경

사용자는 AI를 잘 쓰는 사람과 못 쓰는 사람의 차이를 조사하고, 그 간극을 줄이는 방법을 플랫폼에 반영하라고 요청했다.

## 요구사항

AI 사용 간극은 개인의 능력 부족이 아니라 작업 맥락, task-fit, 반복, 검증, 도구화, 자산화 gap으로 진단한다. 플랫폼은 가장 작은 bridge intervention을 적용하고, 재사용 가능한 패턴은 durable asset으로 승격해야 한다.

## 영향

- 새 설정: `agent-platform/configs/usage/ai-usage-gap-profile.json`
- 새 운영 모델: `_docs/operating-models/ai-usage-gap-operating-model.ko.md`
- 새 workflow/prompt: `_ops/workflows/59-bridge-ai-usage-gap.md`, `_ops/prompts/89-bridge-ai-usage-gap.md`
- memory bootstrap anchor 추가
