# 스펙: 구현 완료 후 자동 빌드 규칙

## 목표

사용자가 직접 빌드하지 않아도 되도록, 에이전트가 의미 있는 구현 작업을 끝낼 때 담당 프로젝트의 build 또는 package 검증까지 수행한다.

## 요구사항

- `REQ-WS-091`

## 범위

- durable instruction에 build/package close-out rule 추가
- Codex adapter인 `AGENTS.md`에 실행 규칙 추가
- memory bootstrap에서 해당 규칙을 hot persistent instruction anchor로 유지
- 요청, 계획, 검증, 평가 기록 생성

## 비범위

- CI/CD pipeline 변경
- 새 build runner 구현
- 특정 프로젝트의 build script 변경
- docs-only 작업에 전체 제품 빌드 강제

## 수용 기준

- 향후 의미 있는 구현 작업은 최종 응답 전에 owning project build/package 명령을 실행한다.
- build가 불가능하거나 부적절하면 이유와 대체 검증을 기록한다.
- 이번 governance 변경은 docs/config/evaluator 검증을 통과한다.
