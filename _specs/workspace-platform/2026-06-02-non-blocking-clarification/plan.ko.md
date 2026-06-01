# 계획: 비차단 역질문

## 근거 요약

- Elastic HITL 문서는 human review를 critical decision point에 두는 패턴을 설명한다.
- GitHub issue dependency 문서는 blocked-by/blocking 관계를 명시해 병목을 추적한다.
- Zapier HITL 상태 문서는 human-in-the-loop 단계가 대기 중이어도 나머지 workflow step이 계속될 수 있음을 보여준다.
- 기존 `REQ-WS-046`은 질문 수렴을 다루지만, 답변 대기 중 독립 작업을 계속하는 규칙은 보강이 필요하다.

## 실행 순서

1. 요구사항 `REQ-WS-047`과 변경/검토 기록을 추가한다.
2. AI usage gap profile에 gap pattern, intervention, policy를 추가한다.
3. 운영 모델, workflow, prompt, persistent instructions, AGENTS를 갱신한다.
4. spec/source reconciliation 경로에도 비차단 진행을 반영한다.
5. 메모리 부트스트랩, router, index를 갱신한다.
6. 웹 검색 기록, research note, 요청 요약, trace, work summary, evaluation, timing을 작성한다.
7. 검증 후 커밋하고 push한다.

## 위험과 대응

- 위험: 무관한 작업과 의존 작업을 잘못 구분할 수 있다.
- 대응: `blocked_decision_record_fields`와 `resume_action`을 필수로 남긴다.
- 위험: 안전하지 않은 작업까지 진행할 수 있다.
- 대응: 되돌리기 어렵거나 고위험이면 `block_only_when`에 따라 멈춘다.
