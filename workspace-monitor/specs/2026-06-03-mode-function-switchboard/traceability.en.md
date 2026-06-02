# Traceability: Mode and Function Switchboard

| Requirement | Task | Implementation | Validation |
| --- | --- | --- | --- |
| REQ-WM-019 | T1 | `collectModeFunctionCatalog` | `npm run collect`, collector test |
| REQ-WM-019 | T2 | `WorkspaceModeFunctionCatalog` type | `npm run check` |
| REQ-WM-019 | T3 | `ModeFunctionSwitchboard`, CSS | `npm run build`, static smoke |
| REQ-WM-019 | T4 | readiness token checks | `platform-desktop-app test`, `platform-desktop-app run check` |

## Sources

- Apple Human Interface Guidelines: Navigation and Search, Segmented Controls
- Microsoft Fluent 2: Navigation
- WAI-ARIA Authoring Practices: Tabs and Landmarks
