# 웹 검색 기록: 스펙/소스 불일치 조정

## 개요

- 날짜: 2026-06-01
- 요청 요약: 스펙이 애매하거나 스펙과 현재 소스가 다를 때, 스펙을 수정할지 소스를 수정할지 판단하고 사용자에게 답변 가능한 알림으로 질문하는 구조를 추가한다.
- 작업 모드: `standard`

## 검색어

- `requirements traceability ambiguity stakeholder clarification specification vs implementation change official guidance`
- `IEEE 29148 requirements specification validation ambiguity stakeholder requirements official`
- `requirements traceability matrix requirements change management specification implementation mismatch best practices`
- `software requirements ambiguity clarification questions source code spec mismatch best practices`
- `IEEE ISO IEC 29148 requirements specification ambiguity validation official`
- `IBM requirements management traceability change impact analysis requirements official`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| IEEE SA, `IEEE/ISO/IEC 29148-2018` | 공식 표준 페이지 | 요구사항 엔지니어링 프로세스, 좋은 요구사항 구성, 요구사항 프로세스의 반복 적용을 다룬다. | 스펙/요구사항을 생명주기 artifact로 보고 변경 전 근거를 기록하는 원칙에 반영했다. |
| ISO, `ISO/IEC/IEEE 29148:2018` | 공식 표준 페이지 | 2024년에 확인되어 현재 버전으로 유지되고, 요구사항 프로세스와 정보 항목/형식을 다룬다. | self-documenting template와 reconciliation input의 필수 정보 항목을 둔 근거로 사용했다. |
| IBM Engineering Requirements Management, `Traceability` | 공식 문서 | 요구사항을 구현/테스트 artifact와 연결하고, 변경 영향 분석과 lifecycle coverage에 traceability를 사용한다. | spec/source 비교 evidence, affected paths, traceability 산출물 요구에 반영했다. |
| IBM Think, `What is requirements management?` | 공식 설명 | 요구사항 분석/정의/승인/traceability/change management/revision/document update 흐름을 설명한다. | `update_spec`과 `update_source`를 임의 수정이 아니라 변경 영향 분석 후 분류하는 구조로 반영했다. |

## 제외하거나 약하게 본 출처

- 일반 블로그/SEO성 RTM 글: 핵심 구현 근거로 쓰지 않고 검색 아이디어 확인용으로만 봤다.
- Reddit/커뮤니티 글: 실무 감각은 참고할 수 있지만 이번 durable policy의 근거는 공식 표준과 공식 문서 위주로 잡았다.
- 오래된 SRS 튜토리얼: 현재 저장소 운영 규칙에 비해 직접 적용성이 낮아 제외했다.

## 계획 반영 인사이트

- 스펙과 소스가 다를 때 한쪽을 즉시 고치는 대신, 요구사항-구현-테스트 artifact의 traceability를 먼저 확인한다.
- 변경은 `update_spec`, `update_source`, `ask_user`, `defer`로 분류한다.
- 사용자 의도가 애매하면 추상적인 "어떻게 할까요?"가 아니라 질문 ID, 선택지, 답변 형식, 결정 영향을 포함한 알림을 보낸다.
- 답변이 필요한 이슈는 답변이 기록되기 전까지 스펙이나 소스를 변경하지 않는다.

## 불확실성

- 특정 조직의 요구사항 관리 도구마다 traceability 구현 방식은 다를 수 있다. 저장소에서는 도구 종속 기능 대신 JSON template, Markdown trace, CLI 검증으로 구현한다.
