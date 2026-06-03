# Traceability: Theme, Terminal Overlay, Code Folding UX

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| PDA-REQ-054 | `app/globals.css` hard-coded light background tokenization, dark soft accent variables | CSS scan, Browser dark smoke |
| PDA-REQ-055 | `--surface`, `--surface-raised`, `--surface-muted`, accent `color-mix` usage | CSS scan, Browser light smoke |
| PDA-REQ-056 | `RuntimeTerminalDrawer.tsx` backdrop, full workbench overlay CSS | Browser terminal smoke |
| PDA-REQ-057 | `MonitorShell.tsx` `foldAll`/`unfoldAll` Monaco actions and toolbar buttons | Type check, Browser source toolbar smoke |
| PDA-REQ-058 | `WorkspaceExplorerPane.tsx` folder expanded state, chevron, `aria-expanded` | Type check, Browser Explorer smoke |
