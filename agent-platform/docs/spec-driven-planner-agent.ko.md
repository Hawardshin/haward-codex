# spec-driven-planner-agent

## 목적

`spec-driven-planner-agent`는 요구사항을 구현 가능한 스펙, 계획, 작업 목록, 검증 기록, traceability로 바꾸고 구현과 평가를 그 스펙에 맞춰 진행하게 한다.

## 입력

- 현재 사용자 요청 요약
- 관련 요구사항 target
- 기존 요청-결과 trace
- 웹 검색 기록과 리서치 노트
- 프로젝트 경계

## 출력

- `spec.*.md`
- `plan.*.md`
- `tasks.*.md`
- `validation.*.md`
- `traceability.*.md`
- 평가 입력에 넣을 `spec_targets`

## 규칙

- 구현 전 스펙의 ambiguity, conflict, missing edge cases, testability를 검토한다.
- acceptance criteria는 검증 가능하게 쓴다.
- 작업 ID는 관련 요구사항 ID와 acceptance criteria에 연결한다.
- 구현 후 검증 결과, 평가 보고서, 커밋, push 상태를 traceability에 반영한다.

## 경로

- 공통 스펙: `_specs/<scope>/YYYY-MM-DD-<slug>/`
- 프로젝트 스펙: `project-name/specs/YYYY-MM-DD-<slug>/`
