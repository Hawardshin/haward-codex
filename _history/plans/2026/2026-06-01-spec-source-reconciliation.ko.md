# 계획 기록: 스펙/소스 불일치 조정

## 요청

스펙이 애매하거나 현재 소스와 다른 경우, 스펙을 수정할지 소스를 수정할지 판단하고 사용자에게 답변 가능한 알림으로 구체화 질문을 보내는 구조를 만든다.

## 선택한 작업 모드

- `standard`
- 이유: 플랫폼 공통 CLI, 알림 이벤트, workflow, 요구사항 기준선, 메모리 anchor를 바꾸는 의미 있는 작업이다.

## 근거 확인

- IEEE/ISO/IEC 29148-2018: 요구사항 엔지니어링 프로세스와 좋은 요구사항 속성, 반복적 요구사항 프로세스를 확인했다.
- ISO/IEC/IEEE 29148:2018: 요구사항 프로세스와 정보 항목/형식 지침을 확인했다.
- IBM Traceability: 요구사항과 개발/테스트 artifact 연결, 변경 영향 분석, lifecycle coverage를 확인했다.
- IBM Requirements Management: 요구사항 분석/정의/승인/traceability/change management/revision/document update 흐름을 확인했다.

## 결정

- 새 구조의 이름은 `spec-reconciliation-agent`로 둔다.
- deterministic checker는 Python으로 구현하고 CLI 이름은 `reconcile-spec`로 둔다.
- 이슈는 `update_spec`, `update_source`, `ask_user`, `defer`로만 분류한다.
- 사용자 결정이 필요한 경우 `clarification_needed` 알림 이벤트를 사용한다.
- 질문은 `question_id`, `question`, `options`, `recommended_option`, `answer_format`, `decision_impact`를 갖는다.
- `ask_user` 이슈는 답변이 기록되기 전까지 관련 스펙/소스 수정을 막는다.

## 실행 계획

1. 기존 spec-driven workflow와 CLI 구조를 읽는다.
2. `spec_reconciliation.py`와 단위 테스트를 추가한다.
3. `reconcile-spec` CLI를 추가한다.
4. 알림 설정에 `clarification_needed` 이벤트를 추가한다.
5. workflow, prompt, agent config, planning template를 추가한다.
6. 요구사항/스펙/히스토리/평가 문서로 durable context를 남긴다.
7. 검증 명령을 실행하고 결과를 산출물에 반영한다.
8. 커밋하고 push한다.
