# 스펙: Spec-Driven 운영 루프

## 메타데이터

- 스펙 ID: `SPEC-WS-SDD-001`
- 상태: `baseline`
- 범위: shared workspace, `agent-platform/`
- 출처 요청: `UR-2026-05-31-037`
- 관련 요구사항: `REQ-WS-013`
- 작성일: 2026-05-31

## 목표

사용자 요청과 요구사항을 곧바로 구현하지 않고, 스펙, 구현 계획, 작업 목록, 검증 기록, traceability를 거친 뒤 구현하는 spec-driven 방식과 유사한 운영 구조를 만든다.

## 범위

포함:

- `_specs/` 공통 스펙 계층
- 프로젝트별 `project-name/specs/` 규칙
- spec-driven 정책, 프롬프트, 워크플로, 템플릿
- `spec-driven-planner-agent`
- `work-evaluator-agent`의 `spec_targets` 필수 확인
- 히스토리, 요구사항, 요청 trace, 작업 요약 연결

제외:

- 외부 spec-driven 도구 설치
- GitHub Spec Kit 또는 Kiro의 직접 도입
- 자동 코드 생성 파이프라인

## Acceptance Criteria

| ID | 기준 |
| --- | --- |
| AC-SDD-001 | WHEN 의미 있는 작업이 예상 동작, 운영 규칙, 프로젝트 구조, 플랫폼 capability, 구현 기준을 바꾼다 THEN 관련 스펙 산출물을 `_specs/` 또는 프로젝트 `specs/`에 만들거나 갱신해야 한다. |
| AC-SDD-002 | WHEN 스펙을 만든다 THEN `spec`, `plan`, `tasks`, `validation`, `traceability` 산출물을 연결해야 한다. |
| AC-SDD-003 | WHEN 작업을 닫는다 THEN `work-evaluator-agent` 입력에 `spec_targets`를 포함해야 한다. |
| AC-SDD-004 | WHEN 스펙이 요구사항을 바꾼다 THEN `_requirements/` 기준선/변경/검토 기록을 함께 갱신해야 한다. |
| AC-SDD-005 | WHEN 프로젝트 전용 기능을 만든다 THEN 해당 프로젝트의 `specs/` 안에 스펙을 두어야 한다. |

## 성공 상태

- 운영 문서에서 spec-driven 흐름을 찾을 수 있다.
- 새 작업 시작 시 요구사항 다음에 스펙을 확인하거나 만든다.
- 종료 평가가 `spec_targets` 누락을 blocking gap으로 잡는다.
