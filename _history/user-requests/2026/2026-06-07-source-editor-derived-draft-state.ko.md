# 2026-06-07 소스 에디터 draft 파생 상태 분리 사용자 요청

## 요약

- 사용자가 지속 구현을 요청했다.
- 이전 source draft helper 분리 이후, `MonitorShell.tsx`에 남은 draft 파생 상태 계산을 추가로 분리한다.

## 적용 범위

- 소유 프로젝트: `platform-desktop-app`
- 적용 화면: Workspace Monitor source workbench
- 주요 파일: `components/MonitorShell.tsx`, `components/workbench/source-editor/sourceDrafts.ts`, `tests/source-editor-templates.test.mjs`
