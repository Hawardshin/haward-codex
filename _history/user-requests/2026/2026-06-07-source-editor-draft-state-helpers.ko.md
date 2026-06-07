# 2026-06-07 소스 에디터 draft 상태 helper 분리 사용자 요청

## 요약

- 사용자가 지속 구현을 요청했다.
- 이전 조각에서 분리한 source editor 모듈을 이어서, `MonitorShell.tsx`에 남은 중복 상태 전이 로직을 더 줄이는 방향으로 진행한다.

## 적용 범위

- 소유 프로젝트: `platform-desktop-app`
- 적용 화면: Workspace Monitor source workbench
- 주요 파일: `components/MonitorShell.tsx`, `components/workbench/source-editor/`, `tests/`
