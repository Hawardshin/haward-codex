# Request Trace: Scroll Access Regression

## 요청

- ID: `UR-2026-06-03-061`
- 요약: 여전히 스크롤이 되지 않아 원하는 내용이 보이지 않는 곳이 있다는 피드백.

## 근거 수집

- Web-first intake: `_history/web-searches/2026/2026-06-03-scroll-access-regression.ko.md`
- 기존 spec: `platform-desktop-app/specs/2026-06-03-split-scroll-usability/`
- Browser smoke: 정적 customer build를 `http://127.0.0.1:4187/`에서 desktop, compact, mobile viewport로 확인.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-scroll-containers.mjs`
- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `platform-desktop-app/docs/requirements/2026-06-03-split-scroll-usability.ko.md`
- `platform-desktop-app/specs/2026-06-03-split-scroll-usability/`
- `_history/evaluations/2026/2026-06-03-scroll-access-regression.ko.md`

## 결과

- 최상위 shell의 고정 height/min-height 잠금을 완화하고 내부 viewport가 스크롤 책임을 갖게 했다.
- settings dialog, terminal drawer, source workbench의 scroll/height/focus 계약을 보강했다.
- 모바일 terminal drawer와 Source workbench 가로 overflow 회귀를 Browser smoke에서 발견하고 수정했다.
- 기본 `workspace-monitor check`에 scroll container regression gate를 연결했다.

## 검증 결과

- 전체 검증 통과.
- Browser smoke 통과: base/source/settings/terminal 상태에서 horizontal overflow 0, terminal sidebar/main과 settings panel scroll/focus 계약 확인.
