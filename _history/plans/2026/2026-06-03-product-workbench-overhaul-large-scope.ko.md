# 대범위 분해: 제품 Workbench 대공사

## 트리거

- 요청은 “전체 변경”, “대공사”, “너무 큰 작업이라고 하지 말고 진행”을 포함한다.
- 후보 파일은 renderer, Tauri runtime, scripts, tests, specs/history를 포함한다.
- `MonitorShell.tsx`는 8,284줄, `globals.css`는 7,688줄로 context pressure가 높다.

## Source Inventory

- 대상 프로젝트: `platform-desktop-app/`
- renderer/workspace-monitor 파일 수: 229
- 대표 파일:
  - `renderer/workspace-monitor/components/MonitorShell.tsx`
  - `renderer/workspace-monitor/app/globals.css`
  - `renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx`
  - `renderer/workspace-monitor/components/features/OperatorCenterDialog.tsx`
  - `renderer/workspace-monitor/lib/snapshot.ts`
  - `scripts/check-readiness.mjs`
  - `tests/readiness.test.mjs`
- 제외:
  - `node_modules`, `.next`, `out`, generated bundle chunks, generated static output
  - lockfile은 dependency 변경 전까지 제외

## Slice 목록

| slice_id | scope | touch_paths | dependencies | verification | risk |
| --- | --- | --- | --- | --- | --- |
| slice-01-home-workbench-shell | Overview 핵심 탭과 path disclosure 모듈화 | `MonitorShell.tsx`, `components/workbench/*`, readiness/test | 기존 Overview state | TS/test/build/browser | medium |
| slice-02-workspace-explorer-module | Explorer tree/dropzone/editor launch 모듈화 | workspace explorer component, source state | slice-01 | TS/browser | medium |
| slice-03-runtime-terminal-module | bottom terminal/session/task pipe 모듈화 | runtime panel component | slice-01 | TS/platform check/browser | high |
| slice-04-agent-factory-module | agent factory/candidates surface | agent components/registry | slice-01 | TS/readiness | medium |
| slice-05-learning-loop-module | accumulated data/evaluation/capability promotion surface | accumulated data UI | slice-01 | TS/platform check | high |
| slice-06-operator-center-hard-separation | runtime/audit/path details를 operator surface로 이동 | OperatorCenter/runtime data | slice-05 | Browser/readiness | high |

## Merge Gates

- 각 slice는 readiness/test/browser smoke를 통과해야 한다.
- 각 slice는 사용자-facing screenshot artifact를 남긴다.
- `MonitorShell.tsx`의 책임이 줄어야 한다.
- raw path/운영 정보는 default user flow에 직접 노출되지 않아야 한다.

## Human Decision Points

- VS Code OSS/Theia 통합은 install/license/security/bundle audit 이후 별도 결정이 필요하다.
- public release signing/notarization/updater는 제품 UX 대공사와 별도 gate다.

## 이번 실행

- `slice-01-home-workbench-shell`을 바로 구현한다.
