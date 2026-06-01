# 2026-06-02 리소스 누수 방지 조사 노트

## 요약

플랫폼형 에이전트 환경에서 메모리 누수는 단일 버그가 아니라 운영 품질 위험이다. 장시간 실행 프로세스, 브라우저 자동화, worker/queue, cache, stream, 대용량 데이터 처리, 외부 CLI adapter는 모두 "생성한 리소스를 닫는가"와 "성장이 bounded 되는가"를 확인해야 한다.

## 핵심 참고

- Python `tracemalloc`: https://docs.python.org/3/library/tracemalloc.html
- Node.js `process.memoryUsage()`: https://nodejs.org/api/process.html#processmemoryusage
- Playwright BrowserContext: https://playwright.dev/docs/api/class-browsercontext
- Next.js memory usage guide: https://nextjs.org/docs/app/guides/memory-usage

## 플랫폼 적용

- Python 에이전트/도구: context manager, `try/finally`, streaming/chunking, `tracemalloc` snapshot/peak memory.
- Node/Next 모니터링 UI: `process.memoryUsage()`, heap profile, Next.js memory debugging.
- Playwright/브라우저 검증: page/context/browser lifecycle cleanup.
- CLI adapter/worker: subprocess 종료, timeout, cancellation, output size bound, temp file cleanup.
- cache/queue: size limit, TTL, backpressure, stop condition.

## 결정

`resource-guard-agent`는 모든 작업의 필수 루프가 아니라 조건부 gate다. 작업이 runtime resource risk를 포함하면 `resource_risk_occurred=true`와 `resource_check_targets`를 남긴다.
