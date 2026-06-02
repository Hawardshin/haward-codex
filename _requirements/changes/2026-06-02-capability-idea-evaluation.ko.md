# 요구사항 변경: Capability Idea Evaluation

## 요청

- 요청 ID: `UR-2026-06-02-029`
- 요약: capability promotion은 아이디어를 내고 그 아이디어를 평가받는 구조여야 한다.

## 변경

- `REQ-WS-070`을 보강했다.
- 기능 후보는 여러 개선 아이디어로 생성되고, 명시적 기준으로 평가받아야 한다.
- 선택된 아이디어, 기각된 아이디어, 대기열 아이디어, human review 필요 여부와 이유를 기록하도록 했다.

## 적용 위치

- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- `agent-platform/configs/agents/capability-promotion-agent.json`
- `_docs/policies/capability-promotion-policy.ko.md`
- `_ops/workflows/75-capability-promotion.md`
- `_ops/prompts/105-capability-promotion.md`
