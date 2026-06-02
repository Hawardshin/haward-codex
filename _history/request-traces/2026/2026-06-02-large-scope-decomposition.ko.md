# 요청-결과 추적: Large Scope Decomposition

## 요청

- 요청 ID: `UR-2026-06-02-033`
- 요약: 범위가 너무 크거나 파일이 너무 많은 경우 작업을 쪼개서 현명하게 처리하는 구조를 요청했다.

## 결과

- `REQ-WS-073` 추가
- `large-scope-decomposition-profile.json` 추가
- `large-scope-decomposer-agent` 추가
- 정책, workflow, prompt, persistent instructions, memory bootstrap 연결

## 주요 산출물

- `agent-platform/configs/planning/large-scope-decomposition-profile.json`
- `agent-platform/configs/agents/large-scope-decomposer-agent.json`
- `agent-platform/docs/large-scope-decomposer-agent.ko.md`
- `_docs/policies/large-scope-decomposition-policy.ko.md`
- `_ops/workflows/76-large-scope-decomposition.md`
- `_ops/prompts/106-large-scope-decomposition.md`
- `_specs/workspace-platform/2026-06-02-large-scope-decomposition/`

## 검증

- 평가 파일: `_history/evaluations/2026/2026-06-02-large-scope-decomposition.ko.md`
- omission: `_history/evaluations/2026/2026-06-02-large-scope-decomposition-omission.json`
- grounding: `_history/evaluations/2026/2026-06-02-large-scope-decomposition-grounding.json`

## 커밋

- 커밋 예정: `feat(agent-platform): add large scope decomposition`
