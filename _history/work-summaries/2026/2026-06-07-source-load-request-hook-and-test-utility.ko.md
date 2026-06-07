# 2026-06-07 소스 로드 요청 훅 및 테스트 유틸 분리 작업 요약

## 변경

- source editor의 stale async load 응답 방지 로직을 `useSourceLoadRequestGate.ts`로 분리했다.
- `MonitorShell.tsx`는 새 hook을 사용하도록 바꾸고 inline sequence ref를 제거했다.
- TypeScript helper 테스트의 모듈 로딩 shim을 `tests/utils/import-type-script-module.mjs`로 이동했다.
- source editor 구조 테스트, Tool Studio 계약 테스트, readiness source structure 집계를 갱신했다.
- `run:internal`이 반복 패키징 후 앱 인스턴스를 누적하지 않도록 `open-internal-app.mjs` 기본 모드를 기존 인스턴스 재사용으로 바꿨다.

## 효과

- `MonitorShell.tsx`가 source load request sequencing 세부 구현을 직접 소유하지 않는다.
- 테스트가 같은 TS transpile/import helper를 공유해 다음 source editor helper 테스트를 더 쉽게 추가할 수 있다.
- readiness 구조 집계가 새 source editor helper를 놓치지 않는다.
- 내부 실행은 기본적으로 한 앱 인스턴스를 재사용하고, 필요한 경우에만 `--new-instance`로 새 인스턴스를 열 수 있다.

## 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 107개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- `node scripts/open-internal-app.mjs --dry-run`: `reuse_existing_instance` 확인.
- 최종 내부 앱 프로세스: 1개.
