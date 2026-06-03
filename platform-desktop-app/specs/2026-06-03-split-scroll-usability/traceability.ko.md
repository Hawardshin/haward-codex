# Traceability: Split Scroll Usability

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| PDA-REQ-059 | `filesystem-workbench-shell`, `workspace-explorer-tree`, `source-editor-frame` split scroll CSS | Browser smoke, readiness |
| PDA-REQ-060 | `terminal-drawer`, `session-list`, `session-terminal pre`, `terminal-event-rail` split scroll CSS | Browser smoke, readiness |
| PDA-REQ-061 | `settings-dialog`, `settings-dialog-body`, `settings-tab-panel` scroll split | Browser smoke |
| PDA-REQ-062 | scroll pane `tabIndex={0}` and aria labels | source/readiness check |
| PDA-REQ-063 | max-width responsive overflow/height release | CSS check |
| PDA-REQ-064 | `desktop-app-shell`, `activity-rail`, `desktop-viewport`, terminal drawer pane, filesystem shell dynamic height contract | `check-scroll-containers.mjs`, Browser smoke |
