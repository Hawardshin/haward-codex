# 평가: IntelliJ식 실행 작업대

## 결과

- Desktop Runtime 상단에 Run Configuration, Services, Problems, status bar를 추가했다.
- 검색 에이전트, 선택 CLI 세션, task pipe, readiness 점검이 실행 구성 카드에서 바로 시작된다.
- Services는 runtime, workspace, CLI adapters, provider accounts, active sessions를 요약한다.
- Problems는 런타임 오류, 미설치 CLI, provider 미설정, decision inbox, dirty drafts, public blockers를 조치 가능한 항목으로 보여준다.
- product feature, user flow, reference advantage registry와 readiness script에 계약을 남겼다.

## 요구 충족 평가

- 사용자의 “IntelliJ 디자인 참고” 요구는 tool-window 기반 실행 표면으로 반영됐다.
- 사용자의 “기능을 UI에 녹여라” 요구는 기존 runtime 함수에 연결된 실행 구성 카드로 반영됐다.
- 모니터링이 주 기능처럼 보이는 문제는 `작업 실행` 탭을 agent orchestration 실행 표면으로 재배치해 완화했다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check` passed
- `corepack pnpm --filter workspace-monitor test` passed, 17 tests
- `corepack pnpm --filter platform-desktop-app test` passed, 21 tests
- `corepack pnpm --filter platform-desktop-app run check` passed
- `corepack pnpm --filter workspace-monitor run build:customer` passed
- `node scripts/check-customer-bundle.mjs` passed
- changed config contract checks passed for product feature, user flow, and reference advantage registries
- `git diff --check` passed
- Playwright smoke passed on desktop `1440x950` and mobile `390x900`: `Run Configuration`, `Services`, `Problems`, `.intellij-run-workbench-panel`, `.ide-run-config-list`, `.ide-services-window`, `.ide-problems-strip` visible

## 남은 리스크

- 실제 native Tauri 환경에서 폴더 선택과 CLI 실행은 사용자의 로컬 설치 상태에 따라 달라진다.
- 이번 변경은 실행 표면을 개선한 product slice이며, 이후 세부 tool window 탭 전환과 keyboard run selector는 별도 확장 대상이다.

## Close-Out Targets

- mode_selection_record_targets: `_history/mode-selections/2026/2026-06-04-intellij-run-workbench.json`
- omission_check_targets: `_history/plan-evidence/2026/2026-06-04-intellij-run-workbench-omission-resource-check.ko.md`
- resource_check_targets: `_history/plan-evidence/2026/2026-06-04-intellij-run-workbench-omission-resource-check.ko.md`
- request_trace_targets: `_history/request-traces/2026/2026-06-04-intellij-run-workbench.ko.md`
- work_timing_targets: `_history/work-timings/2026/2026-06-04-intellij-run-workbench.json`
