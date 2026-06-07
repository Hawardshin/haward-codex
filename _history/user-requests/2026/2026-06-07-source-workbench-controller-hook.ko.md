# 2026-06-07 source workbench controller hook 요청

## 요약

- 사용자는 좁은 수정이 아니라 넓은 부분도 계획을 세워 계속 구현하라고 요청했다.
- 앞선 source editor 세션 훅 분리 다음 후보였던 native invoke 기반 source workbench handler 분리를 진행 대상으로 삼았다.

## 작업 범위

- `MonitorShell.tsx`에 남은 source file load/save, AGENTS.md 준비, template insert, patch context copy, draft close/revert handler를 controller hook으로 이동한다.
- 구조 계약과 readiness source map이 새 hook 경계를 감시하도록 갱신한다.
- TypeScript, workspace-monitor 계약 테스트, 전체 테스트, 내부 패키징으로 검증한다.
