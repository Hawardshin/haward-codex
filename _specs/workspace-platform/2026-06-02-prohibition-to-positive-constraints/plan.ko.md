# 금지형 지시 변환 계획

## 단계

1. 웹 검색으로 금지/부정 지시와 LLM negation 관련 근거를 확인한다.
2. 요구사항 `REQ-WS-078`을 기준선과 변경/검토 문서에 추가한다.
3. `ai-usage-gap-profile`에 금지형 지시 변환 계약을 추가한다.
4. 철학, traceability, 지속 지시, workflow, prompt에 원칙을 반영한다.
5. 히스토리, 요청 추적, 평가 입력을 작성한다.
6. config contract, philosophy trace, memory bootstrap, docs audit, workspace-health를 실행한다.
7. 평가 후 커밋하고 push한다.

## 근거

- OpenAI prompt guidance: 금지만 말하지 말고 무엇을 할지 말한다.
- arXiv/ACL negation benchmark: LLM은 negation을 일관되게 처리하지 못할 수 있다.
