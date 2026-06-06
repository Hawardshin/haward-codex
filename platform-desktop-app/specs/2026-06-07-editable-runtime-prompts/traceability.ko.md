# Traceability: Editable Runtime Prompts

날짜: 2026-06-07

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| 세션 프롬프트별 수정 | `RuntimePromptCustomization.sessionPrompts`, `sessionPromptChoices`, `RuntimeTerminalDrawer` 저장/초기화 액션 | renderer tests, Browser smoke |
| 작업 파이프라인 프롬프트별 수정 | `taskPipePromptChoices`, `taskPipePromptKeyForPreset`, `data-task-pipe-prompt-editor` | renderer tests, Browser smoke |
| preferences 보존 | `RuntimeCustomization.prompts`, `setRuntimeCustomization`, Rust `DesktopPromptCustomization` | renderer check, Rust unit test |
| 허용 key만 저장 | `normalizeRuntimePromptCustomization`, Rust `normalize_prompt_customization` | renderer static contract, Rust unit test |
| UI 상태 표시 | `customized` class/badge, `.prompt-edit-actions` | renderer tests, Browser smoke |

## 변경 파일

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/src-tauri/src/lib.rs`
