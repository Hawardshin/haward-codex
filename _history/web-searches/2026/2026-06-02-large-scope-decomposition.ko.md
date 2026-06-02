# 웹 검색 기록: Large Scope Decomposition

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 관련 요청: `UR-2026-06-02-033`
- 관련 요구사항: `REQ-WS-073`

## 검색어

- `large codebase AI coding agent chunking divide and conquer sourcegraph Cody context window best practices`
- `monorepo codebase understanding code search indexing dependency graph task decomposition best practices`
- `software engineering work breakdown structure large codebase change incremental delivery official guide`
- `LLM agents long context codebase retrieval chunking hierarchical planning paper`
- `Sourcegraph Cody context window codebase search context official docs`
- `Nx affected project graph official docs monorepo affected`
- `Bazel query language dependency graph official docs`
- `Google engineering practices small CLs official docs`

## 확인한 출처

- Sourcegraph Cody Context: https://sourcegraph.com/docs/cody/core-concepts/context
- Nx Affected: https://nx.dev/ci/features/affected
- Bazel Query Guide: https://bazel.build/query/guide
- Google Engineering Practices, Small CLs: https://google.github.io/eng-practices/review/developer/small-cls.html

## 제외하거나 약하게 본 출처

- 일반 블로그의 “큰 작업은 쪼개라” 수준 글은 내부 정책으로 바로 쓰기에는 근거 구조가 약해 제외했다.
- 특정 LLM 에이전트 제품 홍보 글은 현재 저장소의 tool-agnostic 원칙과 충돌할 수 있어 보조 신호로만 취급했다.

## 계획 반영 인사이트

- Sourcegraph의 context 개념은 모든 파일을 프롬프트에 넣는 대신 검색과 관련 컨텍스트 조립을 사용해야 한다는 방향을 뒷받침한다.
- Nx affected와 Bazel query는 큰 코드베이스에서 영향 범위와 dependency graph를 먼저 좁히는 방식을 보여준다.
- Google Small CLs는 큰 변경을 검토 가능한 작은 단위로 나누는 운영 원칙을 뒷받침한다.
- 따라서 기존 `parallel-work-planner-agent` 앞에 source inventory, 제외, 샘플링, slice, context budget을 만드는 `large-scope-decomposer-agent`를 둔다.

## 남은 불확실성

- 현재 저장소에는 범용 dependency graph 엔진이 모든 프로젝트에 설치되어 있지 않다. 우선 repository map, `rg --files`, project registry, generated snapshot, 프로젝트별 도구를 사용하는 정책으로 둔다.
- 실제 대형 리팩토링에서는 프로젝트별 stack 공식 도구를 추가 조사해야 한다.

## 공개 판단 요약

이번 변경은 병렬 작업 요구사항을 대체하지 않는다. 병렬화 전 단계에서 너무 큰 범위를 줄이고, 모든 파일을 읽지 않은 선택을 inventory, 제외 기준, 샘플 한계, 검증 계획으로 관리하도록 추가했다.
