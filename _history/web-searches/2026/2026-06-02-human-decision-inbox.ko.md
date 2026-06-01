# 웹 검색 기록: Human Decision Inbox

## 요청

- 날짜: 2026-06-02
- 사용자 요청: 사람 답변이 필요한 문제를 한 번에 모으고, 답변 전까지 다른 작업을 계속하며, 답변 후 안전하게 interrupt/resume하는 구조를 만들기.
- 작업 모드: `governance`

## 검색 쿼리

- `human in the loop agent workflow interrupt resume pending user decisions inbox`
- `workflow engine human task wait state resume on signal interrupt current work`
- `async human approval workflow queue resume process after approval`
- `agent human feedback interrupt resume workflow pending decisions`

## 확인한 자료

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| LangChain Human-in-the-Loop | 공식 문서 | tool action 검토 시 interrupt하고, checkpoint 상태에서 human decision으로 resume하는 구조 | inbox에 `interrupt_policy`, `checkpoint_required`, `resume_action` 필드 추가 |
| Microsoft Agent Framework AG-UI workflows | 공식 문서 | pending request와 interrupt ID 기반 resume payload 구조 | 답변을 decision ID로 매칭하고 resume 상태를 추적하도록 반영 |
| Conductor Human Task | 공식 문서 | workflow가 external human signal을 기다리는 human task 상태 | 사람이 답하기 전에는 해당 decision만 waiting 상태로 두는 구조에 반영 |
| GitHub issue dependencies | 공식 문서 | blocked-by/blocking 관계를 명시해 병목을 추적 | `blocked_work`와 `unblocked_work`를 inbox record에 분리 |

## 약한 자료 처리

- 일반 블로그 글은 이번 변경에서 직접 근거로 쓰지 않았다.
- 채택 근거는 공식 문서와 기존 저장소 요구사항으로 제한했다.

## 계획 영향

- 단순한 “질문 목록”이 아니라 상태 전이, checkpoint, notification event, resume action을 가진 inbox JSON으로 설계했다.
- 답변 수신 시 무조건 즉시 중단하지 않고, `interrupt_now_when`과 `schedule_resume_when`을 나눴다.
- 사람이 한 번에 답할 수 있도록 관련 질문 batching rule을 추가했다.

## 불확실성

- 이 변경은 운영 구조와 규칙을 만든 것이며, 독립적인 runtime scheduler를 구현한 것은 아니다.
- 실제 interrupt 시점은 작업의 위험도, 우선순위, 현재 파일 편집 상태에 따라 에이전트 판단이 필요하다.

## 공개 판단 요약

사용자 답변 대기 병목은 “질문을 잘한다”만으로 해결되지 않는다. 질문을 중앙 인박스에 모으고, 현재 진행 가능한 작업과 막힌 작업을 분리하며, 답변 수신 후 체크포인트 기반으로 재개하는 운영 구조가 필요하다.
