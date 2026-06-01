# 2026-06-02 리소스 누수 방지 웹 검색 기록

## 요청

- 플랫폼은 메모리 누수에 주의해야 한다.

## 검색어

- `Python official tracemalloc memory leak debugging documentation`
- `Node.js official process memoryUsage heap memory diagnostics documentation`
- `Playwright official browser context close documentation`
- `Next.js official memory usage guide`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| Python `tracemalloc` documentation: https://docs.python.org/3/library/tracemalloc.html | 공식 문서 | allocation snapshot 비교, traced memory current/peak 측정 | Python 에이전트/도구 작업에서 measurement check 후보로 반영 |
| Node.js `process.memoryUsage()` documentation: https://nodejs.org/api/process.html#processmemoryusage | 공식 문서 | RSS, heapTotal, heapUsed, external, arrayBuffers 등 process memory 측정 | Node/Next/monitor 작업의 heap/RSS 측정 후보로 반영 |
| Playwright BrowserContext documentation: https://playwright.dev/docs/api/class-browsercontext | 공식 문서 | browser context lifecycle과 close API | 브라우저 자동화 작업의 lifecycle cleanup check에 반영 |
| Next.js memory usage guide: https://nextjs.org/docs/app/guides/memory-usage | 공식 문서 | build memory debug, heap profile, heap snapshot | workspace-monitor/Next.js 작업의 measurement check 후보로 반영 |

## 제외한 약한 출처

- 개인 블로그의 일반적인 memory leak 목록은 이번에는 공식 런타임/프레임워크 문서보다 우선순위가 낮아 제외했다.
- Stack Overflow/issue thread는 특정 leak 증상 조사에는 유용하지만, 이번 작업은 플랫폼 공통 정책과 gate 설계라 공식 문서를 우선했다.

## 계획 반영 인사이트

- 메모리 누수 예방은 "주의" 문구보다 lifecycle cleanup과 측정 가능성으로 구조화해야 한다.
- Python, Node/Next, Playwright는 각각 다른 관측 도구와 cleanup 관점이 필요하므로 resource guard는 특정 런타임 하나에 고정하지 않는다.
- 모든 작업에 profiling을 강제하면 work-mode 최적화 철학과 충돌하므로 `resource_risk_occurred=true`일 때만 `resource_check_targets`를 요구한다.

## 남은 불확실성

- 실제 장시간 실행 daemon이나 desktop sidecar가 생기면 OS별 profiler, leak test, stress test 기준을 별도 프로젝트 스펙에서 더 구체화해야 한다.
