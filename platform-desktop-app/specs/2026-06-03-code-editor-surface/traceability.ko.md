# Monaco 코드 편집 surface 추적성

| 요구사항 | 구현 대상 | 검증 |
| --- | --- | --- |
| REQ-PDA-CODE-001 | `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css` | check, build, Browser |
| REQ-PDA-CODE-002 | 기존 Tauri command 호출 유지 | check, build |
| REQ-PDA-CODE-003 | source viewer copy, current draft copy | check, Browser |
| REQ-PDA-CODE-004 | draft queue/diff/save/revert 유지 | test, build |
| REQ-PDA-CODE-005 | plan/evaluation records | evaluate-work |
