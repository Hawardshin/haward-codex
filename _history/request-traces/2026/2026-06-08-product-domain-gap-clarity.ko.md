# 요청-결과 추적: product domain gap clarity

- 요청 요약: 구조적 개선점과 기획적 허점을 찾아 각 기능이 명확한 제품 영역에 들어가도록 하라는 요청.
- 결과 상태: 구현, 검증 완료. commit/push 예정.

## 입력

- 사용자 요청 요약: `_history/user-requests/2026/2026-06-08-product-domain-gap-clarity.ko.md`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-08-product-domain-gap-clarity.ko.md`
- 요구사항 변경: `_requirements/changes/2026-06-08-product-domain-gap-clarity.ko.md`
- 프로젝트 요구사항: `platform-desktop-app/docs/requirements/2026-06-08-product-domain-gap-clarity.ko.md`
- spec: `platform-desktop-app/specs/2026-06-08-product-domain-gap-clarity/`

## 산출물

- domain registry: `platform-desktop-app/configs/product-domain-ownership-registry.json`
- collector: `platform-desktop-app/renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs`
- snapshot type/stats: `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`, `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- UI: `platform-desktop-app/renderer/workspace-monitor/components/features/product-architecture/DomainOwnershipBoard.tsx`, `ProductFeatureArchitecturePanel.tsx`, `globals.css`
- tests/source map: `platform-desktop-app/tests/readiness.test.mjs`, `platform-desktop-app/renderer/workspace-monitor/tests/collector.test.mjs`, `platform-desktop-app/scripts/readiness/source-structure.mjs`

## 검증

- `check-config-contract`
- `workspace-monitor run check`
- `node --test renderer/workspace-monitor/tests/collector.test.mjs tests/readiness.test.mjs`
- `platform-desktop-app test`
- `renderer:build`
- Browser smoke on `#home-depth-product-structure`
- omission/resource/evaluation close-out

## 남은 gap

- Open P0: `native_git_workbench_user_path`, `workspace_import_real_actions`, `agent_tool_peer_app_scaffold`, `terminal_adapter_first_run_recovery`
- Open P1: `tool_studio_legacy_file_boundary`, `monitor_shell_domain_boundary`, `current_work_report_data_contract`

