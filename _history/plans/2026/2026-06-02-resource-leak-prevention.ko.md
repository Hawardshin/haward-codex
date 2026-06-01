# 2026-06-02 리소스 누수 방지 계획 기록

## 작업 모드 선택

- 선택: `governance`
- 이유: 사용자 지시가 플랫폼의 지속 운영 규칙이며, evaluator, workflow, prompt, memory bootstrap, 요구사항 기준선을 바꾼다.
- 대안:
  - `quick`: 지속 규칙과 evaluator 변경이 있어 부적합.
  - `standard`: 의미 있는 변경에는 충분하지만 memory bootstrap/evaluator/policy가 바뀌므로 governance가 더 적합.

## 조사 근거

- Python `tracemalloc` 공식 문서
- Node.js `process.memoryUsage()` 공식 문서
- Playwright BrowserContext 공식 문서
- Next.js memory usage 공식 문서

## 계획

1. `REQ-WS-057`을 추가한다.
2. resource guard와 `check-resources` CLI를 만든다.
3. work evaluator에 conditional resource target gap을 추가한다.
4. 정책, workflow, prompt, router, index, persistent instructions, memory bootstrap을 연결한다.
5. 단위 테스트와 config/memory/docs/governance checks를 실행한다.
6. 누락 방지, 리소스 검사, grounding, work evaluation을 저장한다.

## 계획 근거

- "항상 조심"은 잊히기 쉽다. lifecycle, cleanup, measurement evidence를 구조화한 gate가 필요하다.
- 모든 작업에 profiling을 강제하지 않고, `resource_risk_occurred=true`일 때만 blocking target으로 둔다.
