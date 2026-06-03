# 2026-06-03 데스크톱 제품 폴더 구조 재편 요청 추적

## 요청

- 사용자가 git clone/workspace host 기능을 데스크톱 앱에 녹였으면 현재 폴더 구조도 그에 맞게 바뀌어야 한다고 지시했다.

## 결과

- 루트 `workspace-monitor/` 독립 프로젝트를 제거하고 tracked source를 `platform-desktop-app/renderer/workspace-monitor/`로 이동했다.
- `pnpm-workspace.yaml`, `pnpm-lock.yaml`, Tauri `frontendDist`, dev command, monitor build, customer bundle audit, readiness/test paths를 새 renderer 경로로 갱신했다.
- project registry, root structure policy, repository map, governance docs, product docs/configs가 `platform-desktop-app` 중심 제품 UI 소유권을 강제하게 했다.
- `PDA-REQ-034`와 `platform-desktop-app/specs/2026-06-03-desktop-product-folder-restructure/`를 추가했다.

## 검증

- Workspace Monitor check/test/customer build/perf 통과.
- Platform desktop test/runtime contract/check 통과.
- docs audit, structure audit, workspace index, config contract checks 통과.
- public release는 signing/notarization/updater/clean-machine smoke가 남아 있어 public-ready로 주장하지 않는다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/`
- `platform-desktop-app/specs/2026-06-03-desktop-product-folder-restructure/`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md`
- `_ops/projects/registry.json`
- `_ops/maps/repository-map.md`
- `_history/evaluations/2026/2026-06-03-desktop-product-folder-restructure-evaluation-result.json`
