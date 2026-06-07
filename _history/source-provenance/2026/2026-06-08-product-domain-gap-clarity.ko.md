# 출처 기록: product domain gap clarity

## 웹 출처

- `_history/web-searches/2026/2026-06-08-product-domain-gap-clarity.ko.md`
- GitHub Desktop docs: repository list, changes/history, branch-oriented desktop workflow 참고.
- Visual Studio Code UX Guidelines: activity bar, side bar, panel, terminal/source control 영역 분리 참고.
- desktop app information architecture 관련 공식 design-system 자료 검색 결과는 제품 화면 구조와 설정/고급 기능 분리 판단에만 사용했다.

## 로컬 출처

- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/configs/workspace-tracker-product-split-registry.json`
- `platform-desktop-app/configs/product-gap-registry.json`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs`
- `platform-desktop-app/scripts/readiness/source-structure.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 적용 판단

- 기존 product split registry는 큰 제품 경계를 정의했지만, 화면과 snapshot이 영역별 owner/function/gap을 강제하지 않았다.
- 새 registry는 workspace tracker와 agent/tool operations의 책임을 더 작은 영역으로 나누고, open P0/P1 gap을 `planningGapAudit`로 계속 노출한다.
- 이번 slice는 gap closure가 아니라 gap visibility와 ownership contract를 구현한다.

