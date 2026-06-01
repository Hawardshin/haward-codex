# 요청-결과 추적: Principle Guardian Agent

## 요청

- ID: `UR-2026-06-02-025`
- 요약: 사용자가 “다들 강력하게 원칙을 고수한다”고 요청했다.

## 해석

모든 에이전트가 원칙을 장식 문구가 아니라 실행 계약과 close-out gate로 취급하도록 영속 지침과 `principle-guardian-agent`를 추가한다.

## 결과

- 요구사항: `REQ-WS-067`
- 에이전트 설정: `agent-platform/configs/agents/principle-guardian-agent.json`
- 문서: `agent-platform/docs/principle-guardian-agent.ko.md`, `agent-platform/docs/principle-guardian-agent.en.md`
- 영속 지침: `AGENTS.md`, `_docs/instructions/persistent-instructions.ko.md`
- 스펙: `_specs/workspace-platform/2026-06-02-principle-guardian-agent/`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-principle-guardian-agent.ko.md`
- 연구 노트: `_research/topics/principle-governance/2026-06-02-principle-guardian-agent.ko.md`
- 평가: `_history/evaluations/2026/2026-06-02-principle-guardian-agent.ko.md`

## 검증

- `inspect-agent`: 통과
- `list-agents`: `principle-guardian-agent` 포함
- `check-agent-orchestration`: `ready`
- `agent-platform` tests: 150 tests OK
- `workspace-monitor` collect/test/check/build: 통과
- `workspace-health`: 18 checks passed

## 커밋

- 커밋 예정: `feat(agent): add principle guardian`
