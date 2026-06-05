# 검증: Agent Detail Switch Speed

## 수행 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 40개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734386 bytes, chunk count 12
- `corepack pnpm --filter workspace-monitor run perf:buttons`: 정적 서버 기동 후 통과, CPU throttle 6, synthetic feedback p95 1.4ms, real click feedback p95 29.1ms, failed feedback 0
- in-app Browser: `http://127.0.0.1:3348/#section-agents`에서 Agents 세부 기능 disclosure 열기, Collaboration에서 Builder 전환, selected/render state `builder`, pending `false`, Collaboration theater removal, horizontal overflow 0 확인
- `git diff --check`: 통과

## 브라우저 관찰

- 전환 전: `detailView=collaboration`, `renderView=collaboration`, `pending=false`, Collaboration theater present
- Builder 전환 후: `detailView=builder`, `renderView=builder`, `pending=false`, Collaboration theater absent, horizontal overflow 0
- 스크린샷: `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-detail-switch-speed-builder.png`

## 통과 기준

- 정적 테스트가 deferred detail switch 구조를 확인한다.
- Builder 전환 후 active surface에 Collaboration canvas가 남지 않는다.
- 세부 기능 pending/data attribute가 브라우저에서 확인된다.
- 기존 성능 예산과 빌드가 통과한다.
