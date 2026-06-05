# 추적성: Agent CLI Cockpit

## 요구사항-구현 매핑

| 요구 | 구현 |
| --- | --- |
| 유사 오픈소스 직접 탐구 | `_research/topics/platform-desktop-app/2026-06-06-agent-cli-cockpit-direct-open-source-exploration.ko.md` |
| CLI adapter control plane | `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`의 `agentCliCockpitRows`와 cockpit section |
| 설치/로그인/세션/결정 상태 노출 | `cockpitStats`, `providerAuthStatusForAdapter`, `taskRunsForAdapter`, `decisionsForAdapter` mapping |
| 기본 UI 대신 app tone button/card | `platform-desktop-app/renderer/workspace-monitor/app/globals.css`의 `.agent-cli-cockpit*` selectors |
| regression 고정 | `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`의 Agent CLI Cockpit test |
| 빌드까지 자동 실행 | `corepack pnpm run desktop:package:internal` 검증 기록 |

## 검증 매핑

| 검증 | 기록 |
| --- | --- |
| 단위/regression test | `platform-desktop-app/specs/2026-06-06-agent-cli-cockpit/validation.ko.md` |
| 성능 예산 | `platform-desktop-app/specs/2026-06-06-agent-cli-cockpit/validation.ko.md` |
| package build | `platform-desktop-app/specs/2026-06-06-agent-cli-cockpit/validation.ko.md` |
| 누락 방지 | `_history/omission-checks/2026/2026-06-06-agent-cli-cockpit.json` |
| 리소스 종료 | `_history/resource-checks/2026/2026-06-06-agent-cli-cockpit.json` |

## 결정

- 큰 runtime rewrite는 보류하고, 기존 native runtime state를 한 화면에서 조작하는 control-plane UI를 먼저 추가했다.
- 이 결정은 구현 범위를 작게 유지하면서도 사용자가 요구한 "오픈소스 탐구 후 기능 추가"와 "데스크톱 앱의 운영 장점 강화"를 동시에 만족한다.
