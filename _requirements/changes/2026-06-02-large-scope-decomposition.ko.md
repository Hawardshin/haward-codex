# 요구사항 변경: Large Scope Decomposition

## 변경 ID

- `REQ-CHANGE-2026-06-02-033`

## 변경 요약

사용자는 범위가 너무 크거나 소스와 파일이 너무 많아서 문제가 되는 경우, 작업을 현명하게 쪼개서 해결하는 구조를 요청했다. 이를 공통 요구사항 `REQ-WS-073`으로 추가했다.

## 추가 요구사항

- `REQ-WS-073`: 큰 범위, 많은 파일, 여러 프로젝트, 컨텍스트 압박이 있는 작업은 구현이나 병렬화 전에 source inventory, 제외 기준, 대표 샘플, slice, `touch_paths`, merge gate, 검증 계획을 남겨야 한다.

## 근거

- 사용자 요청: `UR-2026-06-02-033`
- 외부 참고: Sourcegraph Cody context, Nx affected, Bazel query, Google Engineering Practices의 small CLs.
- 내부 참고: 기존 `parallel-work-planner-agent`는 병렬 lane 안전성은 다루지만, 병렬화 전에 너무 큰 범위를 줄이는 독립 gate는 부족했다.

## 영향 범위

- `agent-platform/configs/planning/large-scope-decomposition-profile.json`
- `agent-platform/configs/agents/large-scope-decomposer-agent.json`
- `_docs/policies/large-scope-decomposition-policy.ko.md`
- `_ops/workflows/76-large-scope-decomposition.md`
- `_ops/prompts/106-large-scope-decomposition.md`
- `AGENTS.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## 검증

- `check-config-contract`
- `inspect-agent`
- `check-agent-orchestration`
- `check-memory-bootstrap`
- `docs-audit`
- `naming-audit`
- `check-omissions`
- `check-grounding`
- `evaluate-work`
