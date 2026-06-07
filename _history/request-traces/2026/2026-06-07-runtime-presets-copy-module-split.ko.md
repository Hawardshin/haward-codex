# 요청-결과 추적

- 날짜: 2026-06-07
- 요청 요약: 계속 구현하며 큰 소스와 중복 구조를 줄인다.
- 실행 범위:
  - 런타임 작업공간 문구 모듈화
  - 세션/task-pipe 프리셋 모듈화
  - readiness/test 계약 갱신
- 산출물:
  - `platform-desktop-app/renderer/workspace-monitor/components/features/runtimeWorkspaceCopy.ts`
  - `platform-desktop-app/renderer/workspace-monitor/components/features/runtimeSessionPresets.ts`
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/scripts/readiness/source-structure.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 검증:
  - `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
  - `node --test tests/tool-studio.test.mjs`: 통과
  - `node --test tests/readiness.test.mjs`: 통과
  - `corepack pnpm run desktop:package:run:internal`: 통과
