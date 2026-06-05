# 작업 모드 선택: 구현 완료 후 자동 빌드 규칙

## 선택

- work_mode: `governance`

## 이유

- 사용자의 지시는 앞으로 모든 구현 작업의 close-out 행동을 바꾸는 지속 운영 규칙이다.
- `persistent-instructions`, `AGENTS.md`, memory bootstrap anchor, 요구사항, 스펙, 평가 기록에 영향을 준다.
- 소스 기능 구현은 아니므로 빌드 실행 규칙 자체는 문서화하고, 이번 변경은 docs/config 검증으로 닫는다.

## 범위

- 포함: durable instruction, memory bootstrap, 요구사항/스펙/히스토리/평가 기록
- 제외: CI 시스템 변경, 새 build runner 구현, 특정 프로젝트 build script 변경

## 검증 계획

- docs audit
- memory bootstrap check
- config contract check for memory bootstrap
- omission guard
- work evaluator
- git diff check
