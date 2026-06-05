# Traceability: Native Select 교체

| 요구사항 | 구현 | 검증 |
|---|---|---|
| REQ-PDA-122 | `MonitorShell.tsx`에서 native `<select>` 제거 | `assert.doesNotMatch(monitorShell, /<select\\b/)` |
| REQ-PDA-123 | `AppChoiceButtonGroup`, `.app-choice-button-group` | `learning-action-choice-grid`, `decision-answer-type-choices` 테스트 |
| REQ-PDA-124 | `AppChoiceMenu`, `.app-choice-menu-trigger` | `document-filter-choice`, `history-date-choice` 테스트 |
| REQ-PDA-125 | `role="listbox"`, `role="option"`, Radix `DropdownMenu` | TypeScript check, renderer tests |

## 변경 파일

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
