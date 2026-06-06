# Traceability: Popup Scroll Clipping

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-PSC-001 | `DropdownMenu.Portal`, `ContextMenu.Portal`, `collisionPadding={16}` | static test, Browser smoke |
| REQ-PSC-002 | `--popup-max-block-size`, Radix available-height, `overflow:auto` | static test, Browser computed metrics |
| REQ-PSC-003 | `--overlay-*` token, `--popup-layer-z: 160` | static test, Browser computed z-index |
| REQ-PSC-004 | `AppChoiceMenu`, `source-file-picker-menu`, `tool-menu-content`, `tool-context-content` | workspace-monitor tests |
| REQ-PSC-005 | `ViewportOverlayPortal`, `RuntimeTerminalDrawer` root portal | Browser smoke: settings/command/operator/terminal parent `.desktop-app-root` |
| REQ-PSC-006 | `useOverlayFocus`, dialog refs, initial focus refs, Escape handling | static test, Browser focus title/placeholder checks |
| REQ-PSC-007 | `.terminal-drawer.closed`, open inline style, drawer aria state | static test, Browser computed rect/style checks |

## 출처 연결
- web search record: `_history/web-searches/2026/2026-06-06-popup-scroll-clipping.ko.md`
- requirements: `platform-desktop-app/docs/requirements/2026-06-06-popup-scroll-clipping.ko.md`
- follow-up trace: `_history/request-traces/2026/2026-06-06-popup-overlay-audit.ko.md`
