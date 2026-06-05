# IDE Action Navigation 추적성

| 요구사항 | 구현 | 검증 | 산출물 |
| --- | --- | --- | --- |
| REQ-WM-068 | `ToolStudioPanel.tsx`, `globals.css`, `tests/tool-studio.test.mjs` | 정적 테스트, keyboard/context menu Browser smoke, build/check/perf | 요구사항 문서, 이 스펙 폴더, history/evaluation/request trace/work summary |

## 의사결정 근거

- JetBrains 공식 문서는 Search Everywhere/Find Action, context action, configurable shortcut/keymap을 빠른 IDE 작업 접근의 핵심으로 둔다.
- WAI-ARIA menu button pattern은 Enter/Space로 메뉴를 열고 focus를 이동하는 menu button 상호작용을 제시한다.
- Radix ContextMenu/DropdownMenu는 keyboard navigation과 접근성 primitive를 제공하므로 기존 dependency로 구현한다.
