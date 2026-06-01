# 2026-06-02 리소스 누수 방지 요청-결과 추적

## 요청

- 사용자는 "메모리 릭을 주의해야한다 이런 플랫폼은"이라고 지시했다.

## 해석

- 플랫폼이 장시간 실행 에이전트, 브라우저 자동화, worker, cache, stream, 외부 CLI 등을 계속 붙이는 구조이므로 메모리 누수와 리소스 누수를 지속 운영 위험으로 관리해야 한다.
- 단순 문구가 아니라 조건부 close-out gate로 만들어야 다음 작업에서 잊히지 않는다.

## 결과

- `REQ-WS-057`을 추가했다.
- `resource-guard-agent`와 `check-resources` CLI를 추가했다.
- `work-evaluator-agent`가 `resource_risk_occurred=true`인데 `resource_check_targets`가 없으면 close-out을 막도록 했다.
- 정책, workflow, prompt, router, index, persistent instructions, memory bootstrap에 연결했다.

## 주요 산출물

- `agent-platform/src/agent_platform/evaluation/resource_guard.py`
- `agent-platform/configs/evaluation/resource-guard-template.json`
- `agent-platform/configs/agents/resource-guard-agent.json`
- `agent-platform/docs/resource-guard-agent.ko.md`
- `_docs/policies/resource-leak-prevention-policy.ko.md`
- `_ops/workflows/69-resource-leak-prevention.md`
- `_ops/prompts/100-resource-leak-prevention.md`
- `_specs/workspace-platform/2026-06-02-resource-leak-prevention/`

## 평가와 검증

- Resource check: `_history/evaluations/2026/2026-06-02-resource-leak-prevention-resource-check.json`
- Omission check: `_history/evaluations/2026/2026-06-02-resource-leak-prevention-omission-check.json`
- Work evaluation: `_history/evaluations/2026/2026-06-02-resource-leak-prevention.ko.md`

## 커밋

- 커밋 후 업데이트한다.
