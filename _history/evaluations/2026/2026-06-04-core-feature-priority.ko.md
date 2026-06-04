# 평가: 핵심 기능 우선순위

## 결과

- Agent Core와 CLI Orchestration을 두 primary capability로 재정의했다.
- Root Tool Management와 Work Visibility를 supporting layer로 추가했다.
- Home first view, metrics, feature tabs, setup panels, settings setup grid를 핵심 기능 중심으로 재구성했다.
- user view mode는 `overview`, `agents`, `desktop`, `source`, `intent` 중심으로 바뀌었다.
- 현재 registry, fallback product architecture, readiness scripts/tests, snapshots를 새 계약으로 맞췄다.

## 요구 충족 평가

- "에이전트를 매우 쉽게 만들 수 있는 기능"은 Agent Core primary surface와 setup CTA로 전면 배치됐다.
- "CLI를 통한 다양한 작업 오케스트레이션과 연속성"은 CLI Orchestration primary surface와 deferred decision/task-run wording으로 전면 배치됐다.
- "둘 다 똑같은 툴을 쓰기 때문에 루트에서 툴 관리"는 Root Tool Management supporting layer와 setup grid로 반영됐다.
- "작업을 얼마나 하고 있는지 한눈에"는 Work Visibility와 Home workload strip으로 반영됐다.
- "중요 기능을 쓰려면 먼저 설정해야 함"은 Home setup panel과 execution settings readiness grid로 반영됐다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run test`: 통과, 17 tests
- `corepack pnpm --dir platform-desktop-app run test`: 통과, 21 tests
- `corepack pnpm --dir platform-desktop-app run check`: 통과
- changed config contract checks: 통과
- `check-view-modes`: 통과
- `python3 -m unittest tests.test_view_modes`: 통과
- Browser smoke desktop/mobile: 통과, `Agent Core`, `CLI Orchestration`, `Root Tools`, `Work Visibility` 렌더 확인, 가로 overflow 없음
- Playwright screenshot capture: 통과, `_history/evaluations/2026/2026-06-04-core-feature-priority-desktop.png`, `_history/evaluations/2026/2026-06-04-core-feature-priority-mobile.png`

## 남은 리스크

- 실제 native app에서 외부 CLI/provider 설정 완료 여부는 사용자의 로컬 환경에 좌우된다.
- public release readiness는 signing, notarization, updater, clean-machine smoke가 아직 gate다.

## Close-Out Targets

- mode_selection_record_targets: `_history/mode-selections/2026/2026-06-04-core-feature-priority.json`
- omission_check_targets: `_history/plan-evidence/2026/2026-06-04-core-feature-priority-omission-resource-check.ko.md`
- resource_check_targets: `_history/plan-evidence/2026/2026-06-04-core-feature-priority-omission-resource-check.ko.md`
- request_trace_targets: `_history/request-traces/2026/2026-06-04-core-feature-priority.ko.md`
- work_timing_targets: `_history/work-timings/2026/2026-06-04-core-feature-priority.json`
