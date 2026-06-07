# 요청-결과 추적: 타이틀바 섹션 링크 UI

- 사용자 요청: UI개선
- 결과: 워크스페이스 모니터 titlebar에 현재 섹션 링크 복사 UI 추가
- 요구사항: `_requirements/changes/2026-06-08-titlebar-section-link-ui.ko.md`
- 프로젝트 요구사항: `platform-desktop-app/docs/requirements/2026-06-08-titlebar-section-link-ui.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-08-titlebar-section-link-ui/`
- 검증: `platform-desktop-app/specs/2026-06-08-titlebar-section-link-ui/validation.ko.md`
- 평가 입력: `_history/evaluations/2026/2026-06-08-titlebar-section-link-ui-evaluation-input.json`

## 구현 연결

- `MonitorShell.tsx`: `copyCurrentSectionLink`, `data-titlebar-section-link`, `data-titlebar-share-status`
- `globals.css`: `.titlebar-section-link-control`, `.titlebar-share-status`
- `tool-studio.test.mjs`: titlebar link UI 정적 계약
