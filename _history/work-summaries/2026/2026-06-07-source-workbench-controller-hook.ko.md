# 2026-06-07 source workbench controller hook 작업 요약

## 완료한 작업

- `useSourceWorkbenchController.ts`를 추가해 source file load/save/save-all, AGENTS.md 준비, draft close/revert, editor command, template insert, patch context copy handler를 이동했다.
- `MonitorShell.tsx`는 source editor 상태 파생값과 UI 연결을 유지하고, 세부 event/native invoke logic은 hook API로 호출한다.
- `source-editor/index.ts`, source editor 구조 테스트, Tool Studio 광역 테스트, readiness source map을 새 hook 경계에 맞췄다.

## 현재 검증 상태

- 좁은 source editor 구조 테스트 통과.
- Tool Studio 광역 테스트 통과.
- platform desktop readiness 테스트 통과.
- workspace-monitor check 통과.
- workspace-monitor 전체 테스트 통과, 111개.
- platform-desktop-app 전체 테스트 통과, 30개.
- 내부 desktop package/run pipeline 통과.
- codesign verify, DMG verify, 리소스 hygiene 통과.
