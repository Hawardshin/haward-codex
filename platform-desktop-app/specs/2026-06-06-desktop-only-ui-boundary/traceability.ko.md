# Traceability: 데스크톱 전용 UI 경계

| 요구 | 구현/검증 |
| --- | --- |
| 모바일 UI 삭제 | `app/globals.css` 720px/420px media block 제거, renderer test 역방향 가드 |
| 데스크톱 최소 창 | `src-tauri/tauri.conf.json`, `--desktop-app-min-width`, `--desktop-app-min-height` |
| 모바일 audit 제거 | `scripts/audit-monitor-surfaces.mjs`, `tool-studio.test.mjs` |
| 요구사항 갱신 | `docs/requirements/*desktop*`, `responsive-button-design`, `split-scroll-usability`, `responsive-text-wrapping`, `intellij-run-workbench` |
| 최종 검증 | `validation.ko.md`, `_history/evaluations/2026/2026-06-06-desktop-only-ui-boundary.ko.md` |
