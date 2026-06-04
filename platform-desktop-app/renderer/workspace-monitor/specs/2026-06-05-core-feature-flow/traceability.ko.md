# 추적성

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| REQ-WM-047 | `MonitorShell.tsx` `TaskIntentFlowStep`, `requestedToolMode`, `data-task-flow-step` | `tool-studio.test.mjs`, desktop/mobile smoke |
| Tool Studio mode 연결 | `ToolStudioPanel.tsx` `requestedMode` prop, `ToolStudioModeRequest` | `data-tool-studio-mode` browser assertion |
