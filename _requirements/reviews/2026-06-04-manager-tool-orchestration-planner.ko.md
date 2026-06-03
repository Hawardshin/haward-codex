# 요구사항 검토: Manager Tool Orchestration Planner

## 검토 대상

- `REQ-WS-060` 확장
- `REQ-CHANGE-2026-06-04-001`

## 검토 결론

- 상태: `accepted`
- 우선순위: `must`
- 소유 영역: `agent-platform`, `_requirements`, `_specs`, `_history`

## 적합성 검토

- 사용자 의도와 일치: manager가 subagent를 도구처럼 호출하는 구조를 직접 구현한다.
- 기존 요구사항과 충돌 없음: 기존 agent orchestration registry와 `agent-orchestrator-agent`를 source of truth로 재사용한다.
- 검증 가능성 있음: CLI가 JSON plan을 만들고, 단위 테스트와 config/orchestration 검증으로 누락을 확인할 수 있다.
- 유지보수성 있음: 외부 runtime framework를 설치하지 않고 framework-neutral 계획 도구로 먼저 구현해 adapter 교체 가능성을 유지한다.

## 남은 리스크

- 이 변경은 실제 LLM 호출, parallel worker 실행, 또는 runtime trace 저장소를 만들지 않는다.
- 향후 실제 실행 런타임을 붙일 때는 CLI adapter, resource guard, 설치 감사, observability 저장소가 별도 요구사항으로 필요하다.

## 검토 산출물

- `_requirements/changes/2026-06-04-manager-tool-orchestration-planner.ko.md`
- `_requirements/baselines/2026-05-31-workspace-platform.ko.md`
