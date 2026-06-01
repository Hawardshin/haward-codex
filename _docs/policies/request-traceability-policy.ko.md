# 요청-결과 추적 정책

## 목적

사용자 요청, 수행된 작업, 산출물, 평가, 커밋을 연결해 저장한다. 이 정책은 나중에 "어떤 요청이 있었고, 어떤 일이 됐고, 그 요청이 무엇이었는지"를 문서만 보고 확인하게 하기 위한 규칙이다.

## 원칙

- 요청 원문 전체가 아니라 의미 요약을 기준으로 추적한다.
- 각 요청에는 안정적인 요청 ID를 부여한다.
- 요청 요약, 작업 결과, 주요 파일, 평가 보고서, 커밋을 같은 행에서 연결한다.
- 진행 중이거나 부분 반영된 요청은 상태와 후속 관리 항목을 명시한다.
- 의미 있는 작업을 닫을 때 평가 입력에 `request_trace_targets`를 포함한다.
- 오래된 요청 추적을 근거로 중요한 결정을 할 때는 관련 히스토리와 현재 사용자 지시를 함께 확인한다.

## 상태 값

- `completed`: 요청이 현재 기준으로 반영됐다.
- `partial`: 일부만 반영됐고 후속 작업이 필요하다.
- `superseded`: 이후 요청이나 정책으로 대체됐다.
- `deferred`: 요청은 기록됐지만 아직 실행하지 않았다.

## 관련 파일

- [_history/request-traces/README.ko.md](../../_history/request-traces/README.ko.md)
- [_history/user-requests/README.ko.md](../../_history/user-requests/README.ko.md)
- [_history/work-summaries/README.ko.md](../../_history/work-summaries/README.ko.md)
- [_templates/request-trace/request-trace.ko.md](../../_templates/request-trace/request-trace.ko.md)
- [agent-platform/docs/work-evaluator-agent.md](../../agent-platform/docs/work-evaluator-agent.md)
