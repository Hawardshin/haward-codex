# 추적성

## 요구사항 연결

- REQ-CONTEXTUAL-BUTTON-FEEDBACK-001 -> `MonitorShell.tsx`의 `DesktopActionFeedbackId`, 주요 버튼 `data-desktop-action-feedback`
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-002 -> `getDesktopActionFeedback`, `DesktopActionFeedbackStatus`
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-003 -> `.desktop-action-current.status-*`
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-004 -> `renderDesktopActionFeedbackCard`
- REQ-CONTEXTUAL-BUTTON-FEEDBACK-005 -> `validation.ko.md`, final evaluation

## 변경 파일

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-06-contextual-button-feedback.ko.md`
- `platform-desktop-app/specs/2026-06-06-contextual-button-feedback/`
