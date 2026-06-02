# Large Scope Decomposer Agent

`large-scope-decomposer-agent`는 범위가 너무 크거나 파일이 너무 많은 작업을 바로 구현하지 않도록 막는 계획 에이전트다. 먼저 저장소 인벤토리, 제외 대상, 대표 샘플, slice, 실행 순서, 병렬 후보, merge gate, 검증 계획을 만든다.

## 사용할 때

- 사용자가 “전체를 보고”, “모든 것 개선”, “소스가 너무 많다”, “범위가 크다”처럼 넓은 작업을 요청할 때
- 후보 파일이 많거나 여러 루트 프로젝트를 넘나들 때
- 모든 파일을 읽으면 컨텍스트가 낭비되거나 오히려 중요한 경계를 놓칠 때
- 병렬 작업을 하기 전에 먼저 작업 slice와 `touch_paths`를 정해야 할 때

## 원칙

- 바로 파일을 전부 열지 않는다. `rg --files`, repository map, project registry, dependency graph, generated snapshot 같은 인벤토리를 먼저 본다.
- `node_modules`, build/dist, generated output, lockfile 같은 대량/파생 파일은 기본적으로 제외하거나 샘플만 본다.
- 대표 파일은 이해를 위한 근거이지 전체 보증이 아니다. 최종 변경은 targeted check, affected check, global smoke check로 검증한다.
- slice마다 `slice_id`, `scope`, `touch_paths`, 대표 파일, 의존성, 산출물, 검증 단계를 남긴다.
- 병렬화는 slice 이후 단계다. `parallel-work-planner-agent`는 slice가 만들어진 뒤 호출한다.
- 컨텍스트 압박이 있으면 요약/아카이브 대상을 남겨 다음 세션이 채팅 기억 없이 이어가게 한다.

## 출력 계약

출력은 `large_scope_decomposition_packet` 형태여야 한다.

- `objective`
- `source_inventory`
- `exclusions`
- `representative_samples`
- `slices`
- `execution_strategy`
- `merge_gates`
- `verification_plan`
- `context_budget`
- `source_value_provenance`
- `plan_evidence`
- `human_decision_points`
- `deferred_work`

## 관련 파일

- `agent-platform/configs/planning/large-scope-decomposition-profile.json`
- `_ops/workflows/76-large-scope-decomposition.md`
- `_ops/prompts/106-large-scope-decomposition.md`
- `_ops/workflows/52-parallel-work-planning.md`
- `_ops/workflows/45-context-archive.md`

## 검증

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/planning/large-scope-decomposition-profile.json
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/large-scope-decomposer-agent.json
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
```
