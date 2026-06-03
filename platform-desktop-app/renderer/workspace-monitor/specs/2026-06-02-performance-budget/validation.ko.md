# 검증: Workspace Monitor 성능 예산

## 실행한 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `python3 -m http.server 3008 --directory workspace-monitor/out`
- Playwright static smoke: `Workspace Monitor`, `Desktop`, `/workspace-snapshot.json` fetch 확인

## 결과

- TypeScript check: 통과
- Node tests: 10개 통과
- Next build: 통과
- `perf:budget`: `within_budget`
- largest JS chunk: `227,537 bytes`
- 성능 예산: `1,000,000 bytes`
- 변경 전 병목: `6,224,897 bytes` client JS chunk

## 남은 리스크

- snapshot JSON 자체는 약 6MB이며, 다음 slice에서는 snapshot sharding, category별 lazy fetch, compression/cache header 전략을 검토할 수 있다.
