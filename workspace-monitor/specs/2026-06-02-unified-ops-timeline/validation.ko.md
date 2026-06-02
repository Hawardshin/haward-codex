# 검증: Unified Ops Timeline

## 실행한 검증

- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- 정적 서버 `python3 -m http.server 4182 -d workspace-monitor/out`
- `curl http://127.0.0.1:4182/`
- `curl http://127.0.0.1:4182/workspace-snapshot.json`
- `rg "Unified Ops|히스토리와 모니터링 통합|ops-event-rail|unifiedOps" workspace-monitor/out workspace-monitor/.next -n`
- `lsof -ti tcp:4182 || true`

## 결과

- collector test 11개 통과
- TypeScript check 통과
- Next.js static build 통과
- perf budget 통과: largest chunk `227537` bytes, budget `1000000` bytes
- static snapshot response에서 `schemaVersion: 2026-06-03`, `unifiedOpsEvents`, `unifiedOps` 확인
- built output에서 `Unified Ops`, `히스토리와 모니터링 통합`, `ops-event-rail`, `unifiedOps` 확인
- 임시 서버 종료 후 `4182` listener 없음

## 제한

- Browser MCP 도구가 노출되지 않아 실제 screenshot 검증은 수행하지 못했다.
- OpenTelemetry SDK나 외부 telemetry backend는 도입하지 않았다.
