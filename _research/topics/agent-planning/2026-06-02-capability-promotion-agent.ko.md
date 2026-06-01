# Capability Promotion Agent 조사 노트

## 핵심 결론

자동 기능 추가는 “기능을 멋대로 만든다”가 아니라 “반복을 관찰하고, 가장 작은 자산으로 승격할 후보를 만들고, 위험도에 따라 실행한다”로 설계해야 한다.

## 참고 근거

- Anthropic의 agent engineering 글은 복잡한 autonomous agent보다 명확한 workflow와 단순 조합을 우선하는 관점을 제공한다.
- OpenAI Agents SDK 문서는 guardrail, tracing, human-in-the-loop, handoff 같은 개념을 제공해 내부 기록과 사람 체크포인트의 필요성을 뒷받침한다.
- NIST AI RMF는 자율 기능을 risk tier와 governance로 제한하는 근거로 사용하기 좋다.
- LangChain multi-agent/human-in-the-loop 문서는 역할 분리와 사람 승인 지점을 설계할 때 참고할 수 있다.

## 플랫폼 반영

- 후보 생성은 자동화한다.
- 실행은 위험도에 따라 제한한다.
- 가장 작은 capability type부터 검토한다.
- 고위험 변경은 human decision inbox로 보낸다.
- 검증, 평가, rollback, commit/push trace를 남긴다.

## 재사용 가치

이 노트는 향후 monitor UI에서 capability candidate board를 만들거나, background detector/worker를 구현할 때 다시 참고한다.
