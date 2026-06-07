# 요청-결과 추적: workspace tracker product split

- 요청 요약: 데스크톱 앱을 여러 AI 코딩 도구와 Git 작업공간을 쉽게 쓰고 현재 작업 보고/근거를 보는 제품으로 재정의하며, agent/tool/Ollama/AgentCore류 기능은 분리한다.
- 결과 상태: 구현, 검증, 커밋, 푸시 완료

## 입력

- 사용자 요청 요약: `_history/user-requests/2026/2026-06-08-workspace-tracker-product-split.ko.md`
- 웹 검색 기록: `_history/web-searches/2026/2026-06-08-workspace-tracker-product-split.ko.md`
- coding research: `_history/coding-research/2026/2026-06-08-workspace-tracker-product-split.json`
- large-scope decomposition: `_history/large-scope-decompositions/2026/2026-06-08-workspace-tracker-product-split.json`

## 산출물

- 제품 분리 registry: `platform-desktop-app/configs/workspace-tracker-product-split-registry.json`
- 제품 feature registry: `platform-desktop-app/configs/product-feature-registry.json`
- view mode registry: `agent-platform/configs/access/view-mode-registry.json`
- snapshot/collector: `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`, `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- UI: `WorkspaceProductSplitPanel.tsx`, `MonitorShell.tsx`, `ProductFeatureArchitecturePanel.tsx`
- 요구사항/spec: `_requirements/changes/2026-06-08-workspace-tracker-product-split.ko.md`, `platform-desktop-app/docs/requirements/2026-06-08-workspace-tracker-product-split.ko.md`, `platform-desktop-app/specs/2026-06-08-workspace-tracker-product-split/`

## 검증

- `complete-coding-research`
- `check-config-contract`
- `workspace-monitor collect/check/test/build`
- `platform-desktop-app test/check`
- Browser local renderer smoke
- omission/resource/evaluation close-out
- `git diff --check`
