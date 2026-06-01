# 리소스 누수 방지 Plan

## 작업 모드

- 선택: `governance`
- 이유: durable repository rule, evaluator behavior, memory bootstrap, workflow/prompt가 바뀐다.

## 근거

- Python 공식 `tracemalloc` 문서는 allocation snapshot과 current/peak traced memory 측정을 제공한다.
- Node.js 공식 `process.memoryUsage()` 문서는 RSS와 heap/external/ArrayBuffer 메모리 측정을 제공한다.
- Next.js 공식 memory usage 문서는 build memory debug, heap profile, heap snapshot을 다룬다.
- Playwright 공식 문서는 browser context 모델과 lifecycle cleanup의 중요성을 보여준다.

## 계획

1. 요구사항 `REQ-WS-057`을 기준선에 추가한다.
2. `resource_guard.py`와 `check-resources` CLI를 추가한다.
3. evaluator에 `resource_risk_occurred`, `resource_check_targets` 조건부 gap을 추가한다.
4. resource guard template, agent config, 한영 docs를 추가한다.
5. policy, workflow, prompt, router, index, persistent instructions, memory bootstrap을 연결한다.
6. 단위 테스트와 governance checks를 실행한다.
7. omission/resource/grounding/evaluation 기록을 남기고 커밋/푸시한다.

## 판단

모든 작업에 resource check를 강제하면 사용자가 우려한 과도한 루프 문제가 다시 생긴다. 따라서 작업 모드와 별개로 `resource_risk_occurred=true`일 때만 `resource_check_targets`를 blocking으로 만든다.
