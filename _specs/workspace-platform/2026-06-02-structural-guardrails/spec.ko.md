# 구조적 가드레일 스펙

## 목적

사용자의 “가드레일은 필요” 지시를 플랫폼의 실행 원칙으로 반영한다. 가드레일은 prompt 문구가 아니라 위험한 행동 전후에 놓이는 구조적 실행 경계로 정의한다.

## 요구사항

- `REQ-WS-079`

## 범위

- 철학 원칙 추가
- `ai-usage-gap-profile`에 `structural_guardrail_contract` 추가
- workflow/prompt에 material risk guardrail record 추가
- memory bootstrap과 persistent instructions 반영
- 요구사항, 히스토리, 평가 기록 생성

## 비범위

- 모든 prompt 파일을 자동 검사하는 linter 구현
- 외부 guardrail SaaS 또는 policy engine 설치
- 실제 runtime permission system 구현

## 수용 기준

- 가드레일이 금지문과 구분되는 실행 경계로 설명된다.
- material risk 작업은 위험 표면, selected guardrail, allowed/blocked actions, fallback/escalation, verification evidence를 남겨야 한다.
- `check-config-contract`, `check-philosophy-trace`, `check-memory-bootstrap`, omission, grounding, evaluator를 통과한다.
