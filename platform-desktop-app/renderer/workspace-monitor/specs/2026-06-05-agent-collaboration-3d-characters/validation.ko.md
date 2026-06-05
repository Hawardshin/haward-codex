# 검증 기록

## 명령

- `corepack pnpm audit --prod=false` from `platform-desktop-app/renderer/workspace-monitor`: 통과, no known vulnerabilities
- `corepack pnpm --filter workspace-monitor test`: 통과, 39 tests
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734,386 bytes, chunkCount 12

## Browser/Playwright

- in-app Browser desktop visual smoke:
  - URL: `http://127.0.0.1:4187/?section=agents#section-agents`
  - 닫힌 상태에서 `data-agent-collaboration-theater` count 0
  - 세부 기능 open 후 `canvas[data-agent-collaboration-3d-ready="true"]` 확인
  - body horizontal overflow 0
- Project-local Playwright pixel smoke:
  - desktop 1280x820: scene 1102x552, canvas buffer 1100x550, coloredSamples 6/7, overflowX 0
  - mobile 390x844: scene 306x300, canvas buffer 532x266, coloredSamples 6/7, overflowX 0

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-collaboration-3d-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-collaboration-3d-mobile.png`

## 주의

- `corepack pnpm --filter workspace-monitor audit --prod=false`는 pnpm 10.34.1에서 내부 recursive 옵션 조합 오류로 실패했다. 동일 audit은 workspace-monitor project cwd에서 `corepack pnpm audit --prod=false`로 통과했다.
- `build:customer`는 고객 snapshot에서 내부 agent 데이터를 제거하므로 3D scene은 empty state를 표시한다. 내부 개발 snapshot `build`에서 실제 3D canvas를 검증했다.
