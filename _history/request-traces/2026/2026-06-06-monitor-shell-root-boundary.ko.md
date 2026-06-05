# 요청-결과 추적: MonitorShell 근본 boundary 재검토

## 요청

사용자는 “너의 근본적인 부분부터 다시 살펴봐”라고 요청했다.

## 결과

- 근본 병목을 `MonitorShell` monolith와 탭별 code boundary 부족으로 분류했다.
- Tool Studio를 static runtime import에서 dynamic boundary로 분리했다.
- idle prewarm으로 Tool Studio module preload를 연결했다.
- 전체 build/package 검증을 완료했다.

## 연결 파일

- 구현: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- 구현: `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-monitor-shell-root-boundary.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-monitor-shell-root-boundary/spec.ko.md`
- 검증: `platform-desktop-app/specs/2026-06-06-monitor-shell-root-boundary/validation.ko.md`

## 후속

다음 root slice는 `DesktopRuntimePanel` 추출 또는 Agents detail panel chunk 분리다.
