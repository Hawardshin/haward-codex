# 네이티브 한국어 작업공간 UX 추적성

| 요구 | 산출물 | 검증 |
| --- | --- | --- |
| 한국어 우선 UI | `MonitorShell.tsx`, `globals.css` | readiness/test, Browser smoke |
| 영어 모드 고려 | `uiLanguage`, `nativeWorkspaceCopy` | TypeScript check |
| native folder picker | `tauri-plugin-dialog`, `choose_desktop_workspace_folder` | Rust build/test, readiness/test |
| 파일시스템 활용 | `NativeFileWorkspacePanel` | Tauri command checks, Browser smoke |
| 저장 전 backup 유지 | 기존 `write_workspace_text_file` | readiness/test |
