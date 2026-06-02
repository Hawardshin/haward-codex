# Runtime Data Boundary 스펙

## 범위

- `platform-desktop-app/configs/runtime-data-boundary-registry.json`
- `platform-desktop-app/docs/architecture/runtime-data-boundary.*.md`
- `platform-desktop-app/docs/product-boundary.*.md`
- persistent instruction, memory bootstrap, readiness/test gate

## 요구사항

- 설치형 고객은 앱, 선택한 workspace, redacted log summary, export surface를 사용한다.
- 설치형 고객 제품은 platform source tree, internal specs/history, private snapshots, unredacted logs를 기능으로 노출하지 않는다.
- runtime data plane은 app bundle, user workspace, platform data store, log store, agent workspace, cache store로 분리한다.
- log taxonomy는 retention/export/model ingestion 전에 적용한다.
- reusable agent 정의는 `agent-platform/configs/agents/`에 두고 runtime work는 agent workspace plane에 둔다.

## 비범위

- OS별 실제 storage adapter 구현
- support bundle export UI 구현
- installer payload scanner 구현
- source map build pipeline 변경

## 수용 기준

- 새 registry가 self-documenting config contract를 만족한다.
- `platform-desktop-app` readiness/test가 새 registry, docs, customer visibility, log/agent/data plane token을 확인한다.
- memory bootstrap manifest가 runtime data boundary registry를 required warm anchor로 포함한다.
- 요구사항, spec, web-search, plan, request trace, work summary, evaluation artifact가 남는다.
