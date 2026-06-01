# 스펙/소스 불일치 조정 요구사항 변경

## 변경 요약

- 날짜: 2026-06-01
- 변경 ID: `REQ-CHANGE-2026-06-01-SPEC-SOURCE-RECONCILIATION`
- 관련 요청: `UR-2026-06-01-013`
- 추가 요구사항: `REQ-WS-030`
- 상태: 반영됨

## 사용자 의도

프로젝트 스펙이 애매하거나 현재 소스와 다를 때, AI가 임의로 스펙이나 소스를 고치지 말고 어떤 쪽을 바꿔야 하는지 판단 근거를 정리해야 한다. 판단에 사용자 결정이 필요하면 사용자가 바로 답할 수 있는 형식의 알림으로 질문해야 한다.

## 변경 내용

- 스펙/소스/테스트/산출물 비교 근거를 먼저 기록한다.
- 각 이슈를 `update_spec`, `update_source`, `ask_user`, `defer` 중 하나로 분류한다.
- `ask_user` 이슈는 안정적인 질문 ID, 선택지, 답변 형식, 결정 영향을 포함해야 한다.
- 답변이 기록되기 전까지 해당 이슈의 스펙이나 소스를 변경하지 않는다.
- 알림 이벤트는 `clarification_needed`를 사용한다.

## 근거

- ISO/IEC/IEEE 29148은 요구사항 엔지니어링의 프로세스와 정보 항목을 다루며, 요구사항을 생명주기 전반에서 관리해야 한다는 기준을 제공한다.
- IBM 요구사항 traceability 문서는 요구사항과 구현/테스트 artifact 연결, 변경 영향 분석의 필요성을 설명한다.

## 영향 범위

- `agent-platform` planning CLI
- 알림 설정
- spec-driven workflow와 prompt router
- 메모리 부트스트랩 anchor
- 향후 프로젝트별 spec/source review 절차
