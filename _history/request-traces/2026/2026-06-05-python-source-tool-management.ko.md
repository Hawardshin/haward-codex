# 요청 추적: Python Source Tool Management

## 요청

- 툴을 만드는 쉬운 방법과 Python source 관리를 개선한다.

## 산출물

- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`, `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`
- 스펙: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-python-source-tool-management/`
- 구현: `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- 스타일: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 스크린샷: `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-python-source-tool-management-desktop.png`, `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-python-source-tool-management-mobile.png`
- 평가: `_history/evaluations/2026/2026-06-05-python-source-tool-management.ko.md`

## 검증

- workspace-monitor test/check/build:customer/perf:budget 통과
- desktop Browser smoke와 390px mobile Playwright smoke 통과

## 결과

- 완료: Tool Studio Build Tool 안에 Python source/package/pyproject 관리 하위 작업대를 추가했다.
- 후속: 실제 source file 생성과 runner 연결은 별도 범위다.
