# 2026-06-07 소스 에디터 catalog helper 분리 사용자 요청

## 요약

- 사용자가 지속 구현을 요청했다.
- source workbench의 파일 catalog 파생 로직을 `MonitorShell.tsx`에서 더 분리한다.

## 적용 범위

- 소유 프로젝트: `platform-desktop-app`
- 적용 화면: Workspace Monitor source workbench
- 주요 파일: `components/MonitorShell.tsx`, `components/workbench/source-editor/sourceCatalog.ts`, `tests/`
