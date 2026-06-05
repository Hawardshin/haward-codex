# 추적성: MonitorShell 근본 boundary 재검토

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| Shell root bottleneck 조사 | `wc -l`, chunk string inspection | `validation.ko.md` |
| Tool Studio runtime static import 제거 | `MonitorShell.tsx` type-only import | `tool-studio.test.mjs` |
| Tool Studio dynamic boundary | `dynamic<ToolStudioPanelProps>` | `workspace-monitor test`, chunk inspection |
| idle prewarm 연결 | `preloadToolStudioPanel()` | `tool-studio.test.mjs` |
| props/type contract 유지 | `ToolStudioPanelProps` export | `tsc --noEmit`, `workspace-monitor test` |
| build/package 자동 실행 | renderer build, desktop package pipeline | `validation.ko.md` |

## 관련 기록

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-monitor-shell-root-boundary.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-monitor-shell-root-boundary/spec.ko.md`
- 웹 검색: `_history/web-searches/2026/2026-06-06-monitor-shell-root-boundary.ko.md`
- 평가: `_history/evaluations/2026/2026-06-06-monitor-shell-root-boundary-evaluation-input.json`
