# 2026-06-03 데스크톱 제품 폴더 구조 재편 계획 기록

## 선택한 모드

- work mode: `governance`
- view mode: `superadmin_developer`
- install mode: `developer`

## 계획 요약

1. 공식 데스크톱 앱 packaging/config 문서를 확인해 renderer/build output boundary를 검증한다.
2. `workspace-monitor/`를 `platform-desktop-app/renderer/workspace-monitor/`로 이동한다.
3. pnpm workspace, Tauri frontendDist/dev command, customer bundle audit, readiness/test scripts를 새 경로로 연결한다.
4. project registry/root policy/docs/maps에서 루트 프로젝트 경계를 갱신한다.
5. customer build, check/test/perf, desktop readiness, docs/structure/workspace-index/config contract를 통과시킨다.
6. 요구사항/spec/history/evaluation/installation audit를 남기고 커밋/푸시한다.

## 주요 결정

- 기존 TypeScript/Next.js renderer를 유지하고 제품 소유권 경계만 이동한다.
- `workspace-monitor` package name은 npm workspace filter와 기존 scripts 호환을 위해 유지하되, durable path는 `platform-desktop-app/renderer/workspace-monitor/`로 고정한다.
- historical specs의 과거 경로는 기록으로 남기고, current source of truth만 새 경로로 갱신한다.
