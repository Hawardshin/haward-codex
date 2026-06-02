# 요청 추적: 레퍼런스 UI 적용 구현

## 요청

- ID: `UR-2026-06-02-056`
- 요약: 앞서 분석한 적용 가능한 설치형 앱 레퍼런스를 실제 앱에 모두 적용해 달라는 요청.

## 결과

- Workspace Monitor Desktop 탭에 command palette, capability center metadata, run board, process graph, terminal event rail, grouped decision inbox, decision replay, source diff review, evidence/promotion surface를 구현했다.
- `PDA-REQ-024`, `PDA-UX-017`을 추가하고 multi-CLI desktop spec과 readiness test를 보강했다.
- xterm.js, Monaco, PTY dependency 설치는 기존 설치 감사 gate 뒤로 유지했다.

## 산출물

- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.ko.md`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`
- `platform-desktop-app/tests/readiness.test.mjs`
- `workspace-monitor/artifacts/screenshots/desktop-reference-ui-desktop.png`
- `workspace-monitor/artifacts/screenshots/desktop-reference-ui-mobile.png`

## 검증

- Workspace Monitor TypeScript check/test/build/perf budget 통과
- platform-desktop-app test/readiness 통과
- Playwright desktop/mobile smoke 통과
