# 미뤄진 작업 커버리지 감사 계획

## 작업 모드

- `governance`

## Large Scope Decomposition

- source inventory:
  - 전체 후보 파일 샘플: 8182개
  - 감사 대상 번들 샘플: 1248개
  - 대상: `_history/user-requests/2026/`, `_history/request-traces/2026/`, `platform-desktop-app/specs/`, `platform-desktop-app/configs/`, `platform-desktop-app/scripts/`, `platform-desktop-app/tests/`, 대표 renderer/runtime source
- exclusions:
  - `_private/`
  - `outputs/`
  - `node_modules/`
  - `.next/`, `out/`, `dist/`, `target/`
- slice IDs:
  - `slice-history-coverage`: 최근 사용자 요청과 request trace 재검토
  - `slice-product-configs`: product feature/runtime/data/workspace/release 설정 재검토
  - `slice-source-readiness`: readiness/test와 대표 UI/runtime token 재검토
  - `slice-gap-ledger`: 제품 gap registry와 spec/history 산출물 생성
  - `slice-validation`: config contract, omission guard, readiness/test 검증
- touch paths:
  - `platform-desktop-app/configs/product-gap-registry.json`
  - `platform-desktop-app/scripts/check-readiness.mjs`
  - `platform-desktop-app/tests/readiness.test.mjs`
  - `platform-desktop-app/specs/2026-06-03-deferred-work-coverage-audit/`
  - `_history/`
- dependencies:
  - `product-feature-registry.json`
  - `installer-shell-runtime-contract.json`
  - `check-config-contract`
  - `check-omissions`
  - `platform-desktop-app` readiness/test scripts
- output targets:
  - product gap registry
  - audit spec/plan/tasks/validation/traceability
  - web search, request trace, omission, evaluation, work summary, timing records
- merge gates:
  - config contract passes for the new registry
  - platform desktop tests pass
  - platform desktop readiness check passes
  - omission guard reports no required audit item missing
- context budget:
  - Use targeted inventory, search, and representative file inspection rather than reading every file.
- source provenance:
  - Web search record and local history/spec/config/source evidence are recorded in `_history/`.

## 결정

- 감사를 “다 했다고 말하는 문서”가 아니라 readiness가 읽는 제품 gap registry로 고정한다.
- P0 gap은 Agent Factory creation wizard와 Learning feedback automation loop로 둔다.
- PTY/xterm은 현재 pipe-first runtime을 대체하는 필수 조건으로 보지 않고, 제품 결정이 필요한 선택적 UX slice로 둔다.
