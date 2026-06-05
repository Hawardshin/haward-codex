# 히스토리 인사이트 루프 스펙

## 목표

Workspace Monitor snapshot pipeline에 `historyInsightLoop`를 추가한다. 이 레이어는 지금까지의 반복된 요청, 검증, web-search, 계획, evaluation, release blocker, UI 피드백, native resource 작업을 rule 기반으로 감지하고, 제품 구조 화면에서 플랫폼 적용 상태로 보여준다.

## 구현 대상

- `platform-desktop-app/renderer/workspace-monitor/scripts/lib/history-insight-loop.mjs`
- `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`
- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/collector.test.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/configs/product-feature-registry.json`

## 데이터 계약

`historyInsightLoop`는 다음을 포함한다.

- `summary`: source document count, total/applied/queued patterns, active recommendations, evidence links, latest insight date.
- `inferenceStages`: observe, cluster, infer, apply, verify.
- `signalGroups`: repeated process, inference, platform application, target section, asset type, signal strength/count, categories, evidence paths/titles.

## 감지할 반복 패턴

- 구현 후 자동 빌드 게이트.
- web research to spec loop.
- 큰 요청을 bounded slice로 나누는 실행 루프.
- desktop native resource loop.
- UI feedback to design contract.
- release blocker fail-fast gate.

## UI 계약

- Product Structure 화면에 `히스토리 인사이트 루프` 보드를 표시한다.
- 각 card는 해당 target section으로 이동한다.
- UI는 기존 product/reference boards와 같은 compact desktop surface density를 유지한다.
- 고객용 snapshot은 내부 evidence path를 제거하므로 customer bundle에는 내부 히스토리 상세가 포함되지 않는다.
