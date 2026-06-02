# 요구사항 변경: 전체 워크스페이스 완성도 감사

## 요약

`REQ-WS-075`를 추가해 전체 워크스페이스 완성도 감사가 최신 보안, 구조, 설정, 프로젝트, 도구, 프론트엔드 검증을 포함하도록 기준선화한다.

## 변경 이유

사용자는 지금까지의 미완 작업, 모순, 이상한 부분을 전체 프로젝트에서 확인하고 완성도를 높이라고 요청했다. 기존 `workspace-health`는 일부 핵심 설정과 테스트만 보았고, 최근 추가된 privacy audit, presentation browser validation, desktop readiness, 최신 core config contract를 충분히 포함하지 않았다.

## 반영 범위

- `_tools/structure-audit/`: root generated output 분류 보강
- `_tools/workspace-health/`: privacy, browser, desktop, 최신 config contract 검증 추가
- `_specs/`: 미완처럼 보이는 validation heading과 commit/push 체크 잔여 정리
- `_history/evaluations/`: health report와 평가 기록 추가

## 근거

- GitHub Docs: work planning and tracking
- Nx Docs: monorepo folder structure
- OpenTelemetry: spans as operation timing units
- Technical debt management research: 발견된 기술부채가 추적되지 않으면 방치될 수 있음
