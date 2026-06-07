# 구현 계획: product domain gap clarity

## 목표

사용자가 지적한 구조적 개선점과 기획 허점을 숨기지 않고, 각 기능이 명확한 제품 영역과 owner product에 들어가도록 만든다.

## 실행 순서

1. 웹 검색과 기존 registry/source inventory로 현재 제품 경계와 누락 지점을 확인한다.
2. 요구사항, spec, task, validation, traceability를 작성한다.
3. `product-domain-ownership-registry.json`을 self-documenting config로 추가한다.
4. collector와 snapshot 타입에 `domainOwnership`, `planningGapAudit`, gap stats를 추가한다.
5. Product Structure 화면에 `DomainOwnershipBoard`를 별도 컴포넌트로 추가한다.
6. readiness source map과 tests가 새 registry, collector, UI token을 확인하게 한다.
7. config contract, TypeScript check, node tests, platform tests, customer build, Browser smoke를 실행한다.
8. omission/resource/evaluation 기록을 남기고 commit/push한다.

## 범위

- 포함: 제품 영역 책임 지도, open planning gap 가시화, snapshot/collector/UI/test 연결.
- 제외: open gap 자체의 모든 구현 완료. `workspace_import_real_actions`, `agent_tool_peer_app_scaffold`, `terminal_adapter_first_run_recovery`는 다음 구현 slice로 남긴다.

