# 평가: Agent CLI Cockpit

## 판정

요청 충족. 유사 오픈소스 검색과 직접 clone 탐구 후, 현재 데스크톱 플랫폼에 Agent CLI Cockpit 기능을 추가했다. 기능은 새 process를 늘리지 않고 기존 native runtime state를 묶어 CLI/provider/session/task/decision control plane으로 보여준다.

## 구현 증거

- `MonitorShell.tsx`에 `cockpitStats`, `openSourceControlPlanePatterns`, `agentCliCockpitRows`, `startAdapterFromCockpit` 추가.
- Desktop Runtime에 `data-agent-cli-cockpit="open-source-control-plane"` section 추가.
- `globals.css`에 cockpit grid/card/state/action 스타일 추가.
- `tool-studio.test.mjs`에 Agent CLI Cockpit regression test 추가.
- workspace snapshot을 재수집해 generated/public snapshot을 현재 코드와 맞췄다.

## 검증

- `git diff --check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 66개 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 24개 통과.
- `corepack pnpm --filter platform-desktop-app run check`: internal 기준 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: `within_budget`.
- `corepack pnpm --filter workspace-monitor run build`: 통과.
- Playwright static smoke: cockpit title, 5 cards, 3 patterns, horizontal overflow 0 확인.
- `corepack pnpm run desktop:package:internal`: `.app`/`.dmg` 생성, codesign verify와 DMG verify 통과.

## 평가 입력

- `installation_occurred`: false
- `resource_risk_occurred`: true
- `resource_check_targets`: `_history/resource-checks/2026/2026-06-06-agent-cli-cockpit.json`
- `omission_check_targets`: `_history/omission-checks/2026/2026-06-06-agent-cli-cockpit.json`
- `mode_selection_record_targets`: `_history/mode-selections/2026/2026-06-06-agent-cli-cockpit.json`

## 남은 리스크

- 공개 배포 readiness는 signing, notarization, updater, clean-machine smoke 때문에 아직 blocked다.
- cockpit은 현재 가시성과 실행 진입점을 개선한다. detached session supervisor, retry graph, transcript replay는 다음 구현 후보로 남겼다.
