# 요청-결과 추적

이 폴더는 사용자의 요청이 어떤 작업으로 반영됐는지 추적한다. `_history/user-requests/`가 "무엇을 요청했는가"를 저장한다면, 이 폴더는 "그 요청이 어떤 결과, 산출물, 평가, 커밋으로 이어졌는가"를 저장한다.

## 목적

- 요청과 결과가 분리되어 잊히는 일을 줄인다.
- 미래 작업자가 요청의 의도, 처리 상태, 산출물 위치, 평가 결과를 한 표에서 확인하게 한다.
- 같은 요청을 다시 설명하거나 같은 결정을 반복하지 않게 한다.
- 평가 에이전트가 요청 추적 누락을 blocking gap으로 잡게 한다.

## 경로 규칙

```text
_history/request-traces/YYYY/YYYY-MM-DD.ko.md
_history/request-traces/YYYY/YYYY-MM-DD.en.md
```

## 필수 필드

- 요청 ID
- 요청 요약
- 처리 결과
- 상태
- 주요 산출물
- 평가/검증
- 커밋
- 후속 관리

## 종료 평가 규칙

의미 있는 작업의 `work-evaluator-agent` 입력에는 `request_trace_targets`를 포함한다. 누락되면 blocking gap이다.
