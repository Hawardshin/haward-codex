# 요청 추적: 핵심 기능 우선순위

## 요청 ID

- `2026-06-04-core-feature-priority`

## 결과

- Home first view를 Agent Core, CLI Orchestration, Root Tools, Work Visibility 중심으로 재구성했다.
- product feature registry를 2 primary features + 6 supporting features로 변경했다.
- Root Tool Management와 Work Visibility를 새 supporting feature layer로 추가했다.
- user view mode default navigation을 `overview`, `agents`, `desktop`, `source`, `intent`로 맞췄다.
- product/service/reference/user-flow/gap registries와 readiness checks/tests를 새 제품명과 우선순위로 갱신했다.
- developer/customer workspace snapshots를 재생성했다.

## 산출물

- `platform-desktop-app/docs/requirements/2026-06-04-core-feature-priority.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-04-core-feature-priority.en.md`
- `platform-desktop-app/specs/2026-06-04-core-feature-priority/`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx`
- `platform-desktop-app/configs/product-feature-registry.json`
- `agent-platform/configs/access/view-mode-registry.json`

## 검증

- renderer check/test: 통과
- platform check/test: 통과
- config contract checks: 통과
- view-mode check and unit tests: 통과
- Browser smoke: desktop/mobile 통과, 가로 overflow 없음
