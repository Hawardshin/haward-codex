# 요청-결과 추적: Capability Promotion Agent

## 요청

- 요청 ID: `UR-2026-06-02-028`
- 요약: 다양한 작업을 스스로 하다가 필요한 기능을 추가하도록 하는 블랙박스적 처리 구조를 요청했다.
- 작업 모드: `governance`

## 결과

- `REQ-WS-070` 추가
- `capability-promotion-agent` 추가
- `capability-promotion-registry.json` 추가
- capability promotion 정책, workflow, prompt, docs 추가
- memory bootstrap, prompt router, ops index, persistent instructions 연결

## 주요 산출물

- `agent-platform/configs/orchestration/capability-promotion-registry.json`
- `agent-platform/configs/agents/capability-promotion-agent.json`
- `agent-platform/docs/capability-promotion-agent.ko.md`
- `_docs/policies/capability-promotion-policy.ko.md`
- `_ops/workflows/75-capability-promotion.md`
- `_ops/prompts/105-capability-promotion.md`
- `_specs/workspace-platform/2026-06-02-capability-promotion-agent/`

## 검증

- 예정/실행 결과는 `_history/evaluations/2026/2026-06-02-capability-promotion-agent.ko.md`에 연결한다.

## 커밋

- 커밋 후 갱신한다.
