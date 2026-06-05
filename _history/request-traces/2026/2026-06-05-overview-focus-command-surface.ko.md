# 요청 추적: Overview Focus Command Surface

## 요청

- UI를 근본적으로 바꾸고 혁신적인 구조로 개선한다.

## 산출물

- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`, `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-overview-focus-command-surface/`
- 구현: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- 스타일: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 스크린샷: `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-overview-focus-command-desktop.png`, `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-overview-focus-command-mobile.png`
- 평가: `_history/evaluations/2026/2026-06-05-overview-focus-command-surface.ko.md`

## 검증

- workspace-monitor test/check/build:customer/perf:budget 통과
- desktop Browser smoke와 390px mobile Playwright smoke 통과

## 결과

- 완료: Overview 첫 화면을 추천 작업 중심 Focus Command Surface로 바꿨다.
- 후속: 다른 섹션 내부 화면도 같은 원칙으로 순차 적용할 수 있다.
