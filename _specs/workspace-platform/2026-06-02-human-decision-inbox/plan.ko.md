# 계획: Human Decision Inbox

## 근거 요약

- LangChain HITL 문서는 사람 결정이 필요한 시점에 interrupt하고 checkpoint된 실행 상태에서 resume하는 구조를 제시한다.
- Microsoft Agent Framework AG-UI 문서는 pending request와 interrupt ID 기반 resume payload를 보여준다.
- Conductor Human Task는 workflow가 external human signal을 기다리는 상태를 명시한다.
- GitHub issue dependency 문서는 blocked-by/blocking 관계를 노출해 병목을 사람이 볼 수 있게 한다.
- 기존 `REQ-WS-047`은 대기 중 계속 작업하는 원칙을 만들었지만, 여러 질문을 모으고 답변 후 재개하는 중앙 구조는 보강이 필요하다.

## 실행 순서

1. `REQ-WS-048` 요구사항과 변경/검토 기록을 추가한다.
2. 중앙 inbox JSON과 설명 문서를 만든다.
3. human decision inbox workflow와 prompt를 추가한다.
4. AI usage gap profile, notification config, memory bootstrap, persistent instructions, `AGENTS.md`, router, ops index를 갱신한다.
5. 웹 검색 기록, research note, 계획, 요청 요약, trace, work summary, evaluation, timing을 작성한다.
6. coordination status와 board를 갱신한다.
7. 검증 후 커밋하고 push한다.

## 위험과 대응

- 위험: inbox가 만들어져도 실제 작업자가 확인하지 않으면 다시 채팅에 흩어질 수 있다.
- 대응: memory bootstrap, router, index, persistent instructions에서 모두 inbox 경로를 노출한다.
- 위험: 답변 수신 후 무조건 현재 작업을 중단하면 새 병목이 생길 수 있다.
- 대응: `interrupt_now_when`과 `schedule_resume_when`으로 즉시 재개와 예약 재개를 구분한다.
- 위험: context switch 중 현재 작업 상태를 잃을 수 있다.
- 대응: interrupt 전 checkpoint 필드를 필수로 둔다.
