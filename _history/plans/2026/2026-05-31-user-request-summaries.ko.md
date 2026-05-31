# 2026-05-31 계획 기록: 사용자 요청 요약 저장

## 초기 지시 요약

사용자는 자신이 요청한 다양한 프롬프트와 지시를 원문 전체가 아니어도 의미 요약으로 파일에 저장하라고 지시했다.

## 조사

- 웹 검색을 먼저 수행했다.
- 장기 에이전트 메모리는 메모리 유형 분리, 지속 컨텍스트, 사람이 읽을 수 있는 변경 기록이 중요하다는 관점을 확인했다.
- 관련 조사 기록은 `_history/web-searches/2026/2026-05-31-user-request-summaries.ko.md`와 `_research/topics/agent-memory/2026-05-31-user-request-summaries.ko.md`에 저장했다.

## 계획

1. 사용자 요청 요약 전용 폴더를 `_history/user-requests/`에 만든다.
2. 2026-05-31의 누적 사용자 요청을 원문 대신 의미 요약 표로 저장한다.
3. 한영 README, 템플릿, 정책 문서를 추가해 기록 규칙을 명시한다.
4. 종료 평가 입력에 `user_request_summary_targets`를 추가해 누락을 blocking gap으로 만든다.
5. 메모리 부트스트랩 manifest에 요청 요약 정책을 warm anchor로 추가한다.
6. 작업 요약, 일지, 워크플로, 조율 보드, 평가 보고서에 이번 변경을 연결한다.

## 공개 판단

요청 요약은 작업 요약과 다르다. 작업 요약은 결과를 설명하고, 요청 요약은 사용자가 원한 방향과 반복 규칙을 보존한다. 따라서 별도 계층으로 둔다.

## 완료 기준

- `_history/user-requests/2026/2026-05-31.ko.md`와 `.en.md`가 존재한다.
- 정책, 템플릿, README가 존재한다.
- `work-evaluator-agent`가 `user_request_summary_targets`를 검사한다.
- 테스트와 평가가 통과한다.
- 커밋 후 push한다.
