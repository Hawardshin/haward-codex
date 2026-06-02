# Claude Code 공개 설계 전이 계획

## 모드 선택

- 선택 모드: `governance`
- 이유: durable platform behavior, source boundary, self-documenting registry, Workspace Monitor 운영 표면, readiness/evaluation이 함께 바뀐다.
- web-first: 공식 Claude Code docs를 먼저 확인했다.
- memory bootstrap: `check-memory-bootstrap` 결과 `ready_to_bootstrap`.

## Large Scope Decomposition

- broad trigger: 사용자가 Claude Code의 많은 insight를 플랫폼에 넣어 달라고 요청했다.
- 축소 slice: 공개 출처 기반 설계 전이 registry와 Workspace Monitor 노출만 이번 변경에 포함한다.
- 제외: 유출/비공개 자료, 실제 connector/hook/worktree runtime 구현, CLI 자동 설치, public installer release claim.
- 대표 파일: `workspace-monitor/scripts/collect-workspace.mjs`, `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/lib/snapshot.ts`, `platform-desktop-app/scripts/check-readiness.mjs`, `platform-desktop-app/README.md`.

## 작업 순서

1. 공개 출처와 source boundary를 web-search 기록에 남긴다.
2. 요구사항과 스펙을 작성한다.
3. self-documenting registry를 추가한다.
4. collector/type/UI/readiness/test를 연결한다.
5. 검증, omission/grounding/evaluation 기록을 남긴다.
6. commit/push한다.
