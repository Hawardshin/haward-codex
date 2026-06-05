# 추적성: Workspace Monitor 탭 전환과 소스 편집 UX

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-DESKTOP-UX-2026-06-05-001 | `MonitorShell.tsx`의 `readySection`/`pendingSectionCommitRef` 제거, `prewarmWorkSurfaces` 추가 | `tool-studio.test.mjs`, 브라우저 스모크 |
| REQ-DESKTOP-UX-2026-06-05-002 | `MountedSectionPanel`, `surfaceActive` 추가 | `tool-studio.test.mjs`, 브라우저 DOM 확인 |
| REQ-DESKTOP-UX-2026-06-05-003 | `globals.css` 사이드바/소스 컨트롤/Monaco 높이 조정, 감사 스크립트 갱신 | `check-scroll-containers.mjs`, `check-source-control-design.mjs`, 브라우저 overflow 확인 |

## 산출물

- `platform-desktop-app/docs/requirements/2026-06-05-workspace-monitor-tab-editor-ux.ko.md`
- `platform-desktop-app/specs/2026-06-05-workspace-monitor-tab-editor-ux/`
- `_history/request-traces/2026/2026-06-05-workspace-monitor-tab-editor-ux.ko.md`
- `_history/evaluations/2026/2026-06-05-workspace-monitor-tab-editor-ux.ko.md`
