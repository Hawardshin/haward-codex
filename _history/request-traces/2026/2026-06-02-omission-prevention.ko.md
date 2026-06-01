# 2026-06-02 누락 방지 요청-결과 추적

## 요청

- ID: `UR-2026-06-02-011`
- 요약: 에이전트가 작업 중 무엇인가를 빼먹을 수 있으므로, 그런 누락을 막는 구조가 필요하다고 지적했다.

## 결과

- `REQ-WS-056` 추가
- `omission-guard-agent`와 `check-omissions` CLI 추가
- `work-evaluator-agent`에 `omission_check_targets` 추가
- non-`quick` 작업 모드에서 omission coverage를 blocking close-out target으로 지정
- 누락 방지 정책, 워크플로, 프롬프트, 지속 지시, memory bootstrap, navigation 갱신

## 주요 산출물

- `agent-platform/src/agent_platform/evaluation/omission_guard.py`
- `agent-platform/configs/evaluation/omission-guard-template.json`
- `agent-platform/configs/agents/omission-guard-agent.json`
- `agent-platform/docs/omission-guard-agent.ko.md`
- `_docs/policies/omission-prevention-policy.ko.md`
- `_ops/workflows/68-omission-prevention.md`
- `_ops/prompts/99-omission-prevention.md`
- `_specs/workspace-platform/2026-06-02-omission-prevention/`

## 검증

- `python3 -m unittest discover -s tests`
- `check-omissions`
- `check-work-modes`
- `check-memory-bootstrap`
- `check-config-contract`
- `docs-audit`, `naming-audit`, `structure-audit`, `workspace-index`, `task-board`

## 평가

- `_history/evaluations/2026/2026-06-02-omission-prevention.ko.md`
