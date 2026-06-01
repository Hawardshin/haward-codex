# 조사 노트: Human Decision Inbox와 인터럽트 재개

## 핵심 결론

사람의 답변이 필요한 작업은 전체 작업을 멈추는 전역 상태가 아니라, 명시적인 dependency record로 관리해야 한다. 좋은 구조는 다음을 포함한다.

- answerable question
- blocked work
- still-unblocked work
- notification event
- checkpoint requirement
- resume action
- decision history

## 확인한 외부 근거

- LangChain Human-in-the-Loop: human decision이 필요한 tool call을 interrupt하고 checkpoint를 통해 resume하는 패턴.
- Microsoft Agent Framework AG-UI workflows: pending request와 resume payload를 연결하는 interrupt ID 중심 구조.
- Conductor Human Task: workflow가 외부 human signal을 기다리는 human task 상태.
- GitHub issue dependencies: blocked-by/blocking 관계를 명시해 병목을 시각화하는 방식.

## 플랫폼 적용

- `_ops/coordination/human-decision-inbox.json`을 source of truth로 둔다.
- `_ops/workflows/61-human-decision-inbox.md`를 통해 새 질문 등록과 답변 수신 후 재개 흐름을 통일한다.
- `_ops/prompts/91-human-decision-inbox.md`는 실제 prompt 실행 시 필요한 영어 prompt body를 제공한다.
- notification config는 `human_decision_needed`, `human_decision_answered`, `resume_ready` 이벤트를 제공한다.

## 주의점

- 이 구조는 모든 결정을 자동화하지 않는다.
- 사람이 답한 뒤에도 즉시 interrupt가 항상 정답은 아니다.
- 현재 작업이 위험한 edit 중이면 checkpoint 후 다음 안전 지점까지 기다릴 수 있다.
- 답변을 반영한 뒤에는 영향받은 작업만 수정하고 targeted verification을 실행해야 한다.
