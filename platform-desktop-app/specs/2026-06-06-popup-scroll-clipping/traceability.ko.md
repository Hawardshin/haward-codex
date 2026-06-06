# Traceability: Popup Scroll Clipping

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-PSC-001 | `DropdownMenu.Portal`, `ContextMenu.Portal`, `collisionPadding={16}` | static test, Browser smoke |
| REQ-PSC-002 | `--popup-max-block-size`, Radix available-height, `overflow:auto` | static test, Browser computed metrics |
| REQ-PSC-003 | `--popup-layer-z: 140` | static test, Browser computed z-index |
| REQ-PSC-004 | `AppChoiceMenu`, `source-file-picker-menu`, `tool-menu-content`, `tool-context-content` | workspace-monitor tests |

## 출처 연결
- web search record: `_history/web-searches/2026/2026-06-06-popup-scroll-clipping.ko.md`
- requirements: `platform-desktop-app/docs/requirements/2026-06-06-popup-scroll-clipping.ko.md`
