# 오픈소스 기능 레이더 스펙

## 목표

기능별 오픈소스 리서치 결과를 `platform-desktop-app` 제품 화면으로 승격한다. 사용자는 Product Structure에서 기능 layer별 후보 repo, 이식할 패턴, 설치 필요 여부, audit 정책을 확인하고 관련 섹션으로 바로 이동할 수 있어야 한다.

## 데이터 계약

- Config: `platform-desktop-app/configs/open-source-feature-reference-registry.json`
- Collector: `collectOpenSourceFeatureReferences(repoRoot)`
- Snapshot field: `openSourceFeatureReferences`
- Stats:
  - `openSourceReferenceLayers`
  - `openSourceReferenceRepos`

`openSourceFeatureReferences`는 다음 구조를 가진다.

- `sourceBoundary`: public source policy와 customer visibility.
- `summary`: layer 수, repo 수, install audit 필요 layer 수, 직접 탐구 필요 layer 수.
- `referenceLinks`: 내부 research/config reference. customer snapshot에서는 제거한다.
- `featureReferenceLayers`: `featureId`, `label`, `priority`, `primarySection`, `installPolicy`, `installNeededNow`, `directExplorationRequired`, `implementationTargets`, `candidateRepos`.

## UI 계약

- Product Structure 화면에 `오픈소스 기능 레이더` 보드를 표시한다.
- 보드는 `data-open-source-feature-radar="feature-reference-install-policy"` marker를 가진다.
- 각 카드는 기능 layer의 우선순위, 구현 대상, 설치 정책, 상위 후보 repo를 보여준다.
- 카드 클릭은 `primarySection`으로 이동한다.
- `tools` section도 product feature panel의 target section으로 인정한다.

## 설치 정책

현재 구현은 기존 React, CSS, snapshot collector로 충분하므로 새 dependency를 설치하지 않는다. 후보 repo를 직접 clone하거나 package/CLI/MCP/server를 설치해야 하는 후속 작업은 설치 범위, 명령, dependency record, security/license review, verification, rollback plan을 먼저 기록해야 한다.

## Customer Snapshot

Customer snapshot은 내부 `sourcePath`, `referenceLinks`, candidate repo `watchTargets`를 제거한다. 후보 repo title, URL, install policy, 제한된 `patternsToExtract`는 public summary로 유지한다.
