# Request Trace: Popup Scroll Clipping

날짜: 2026-06-06

## 요청
- 스크롤 때문에 팝업이 안 보이는 현상 수정.

## 산출물
- requirements: `platform-desktop-app/docs/requirements/2026-06-06-popup-scroll-clipping.ko.md`
- spec: `platform-desktop-app/specs/2026-06-06-popup-scroll-clipping/spec.ko.md`
- plan: `platform-desktop-app/specs/2026-06-06-popup-scroll-clipping/plan.ko.md`
- tasks: `platform-desktop-app/specs/2026-06-06-popup-scroll-clipping/tasks.ko.md`
- validation: `platform-desktop-app/specs/2026-06-06-popup-scroll-clipping/validation.ko.md`
- traceability: `platform-desktop-app/specs/2026-06-06-popup-scroll-clipping/traceability.ko.md`

## 코드 변경
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/ToolStudioPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 상태
- 구현, 테스트, Browser smoke, 내부 패키징 완료.
- 커밋/푸시 대기.
