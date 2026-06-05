# Large Scope Decomposition Workflow

## Purpose

범위가 너무 크거나 파일이 너무 많은 작업을 실행 가능한 단위로 먼저 쪼갠다. 이 workflow는 지연이나 회피가 아니라 실행 준비 단계이며, 병렬 작업 계획보다 앞선다. 병렬화는 slice가 명확해진 뒤의 선택지다.

## Sequence

1. 웹 우선 검색, memory bootstrap, work mode 선택을 먼저 수행한다.
2. `agent-platform/configs/planning/large-scope-decomposition-profile.json`을 연다.
3. 요청이 broad language, large file set, context pressure, unknown blast radius 중 어디에 해당하는지 기록한다.
4. `rg --files`, `_ops/maps/repository-map.md`, `_ops/projects/registry.json`, generated snapshot, dependency graph 또는 코드 검색으로 후보 파일을 인벤토리화한다.
5. `node_modules`, build/dist, generated output, lockfile, vendor성 대량 파일을 기본 제외로 분리한다.
6. entrypoint, 테스트, config, schema, public API, README/spec, 최근 변경 파일 위주로 대표 샘플을 고른다.
7. 샘플을 읽고 패턴, 의존성, 위험, 아직 모르는 부분을 기록한다.
8. 작업을 `slice_id` 단위로 나눈다. 각 slice는 scope, project boundary, touch_paths, representative_files, dependencies, output_targets, verification_steps, risk_level을 가져야 한다.
9. 첫 실행 slice를 고른다. 구체적 blocker가 사용자 입력을 요구하지 않는 한 이 workflow의 산출물은 바로 실행할 `first_executable_slice`, 검증 gate, continuation path를 포함해야 한다.
10. 독립 slice가 있으면 그때 `_ops/workflows/52-parallel-work-planning.md`로 넘긴다.
11. 여러 조사 또는 구현 lane이 생기면 merge gate를 만들고 downstream work는 partial note가 아니라 merge 결과에 의존하게 한다.
12. 컨텍스트 압박이 있으면 `_ops/workflows/45-context-archive.md`로 resume packet 또는 압축 요약을 남긴다.
13. 최종 계획에는 `source_value_provenance`, `plan_evidence`, `human_decision_points`, `deferred_work`를 포함한다. `deferred_work`는 범위가 크다는 이유만으로 기록할 수 없고, 의존성, 권한, 안전, 비용, 사용자 결정 같은 구체적 이유가 있어야 한다.
14. 구현 후에는 targeted checks, affected checks, global smoke check, omission guard, grounding guard를 적용한다.

## Output

- large scope decomposition packet
- 후보 파일 수와 제외 기준
- 대표 샘플과 샘플 한계
- slice 목록과 touch path
- first executable slice와 continuation path
- 순차/병렬 실행 전략
- merge gate와 release 기준
- 검증 계획
- context archive 필요 여부

## Rule

- 범위가 크다는 이유만으로 작업을 미루지 않는다.
- 큰 범위는 실행 가능한 slice, merge gate, 검증 계획으로 바꾼다.
- “나중에”로 보내는 항목은 구체적 blocker와 resume action이 있어야 한다.
큰 작업을 해결하는 방법은 무작정 많이 읽는 것이 아니라, 먼저 경계를 만들고 검증 가능한 작은 단위로 줄이는 것이다. 모든 파일을 읽지 않았다는 사실은 결함이 아니라 관리 대상이다. 어떤 파일을 보지 않았는지, 왜 제외했는지, 어떤 검증으로 보완했는지를 남긴다.
