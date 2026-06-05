# 요청-결과 추적: Agent CLI Cockpit

- 날짜: 2026-06-06
- 요청: 유사 오픈소스 딥 리서치와 직접 탐구 후 기능 추가
- 프로젝트: `platform-desktop-app/`

## 입력 요구

사용자는 현재 플랫폼과 유사한 오픈소스를 많이 조사하고, 직접 탐구한 뒤 결과를 기능으로 구현하라고 했다. 이전 반복 맥락에서는 데스크톱 native resource 활용, 느린 탭 전환, CLI/terminal/process 관리, AI 로그인/설정 UI 개선이 계속 요구됐다.

## 결정

직접 clone한 repo에서 공통으로 확인한 control-plane 패턴을 바탕으로, 큰 runtime rewrite 대신 기존 adapter/session/provider/task/decision 상태를 한 화면에 모으는 Agent CLI Cockpit을 먼저 구현했다.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-agent-cli-cockpit.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-agent-cli-cockpit/spec.ko.md`
- 연구: `_research/topics/platform-desktop-app/2026-06-06-agent-cli-cockpit-direct-open-source-exploration.ko.md`
- 구현: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- 스타일: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 검증: `platform-desktop-app/specs/2026-06-06-agent-cli-cockpit/validation.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-agent-cli-cockpit.ko.md`

## 결과

Desktop Runtime은 이제 adapter별 준비 상태, 로그인 상태, active session, task-run, decision count와 직접 action을 함께 보여준다. 내부 `.app`와 `.dmg` 패키지 빌드까지 완료했다.
