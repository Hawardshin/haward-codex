# 요구사항 변경: Workspace Health 소스 구조 리팩터링

## 변경 요약

- 추가 요구사항: `REQ-WS-034`
- 출처 요청: `UR-2026-06-01-018`
- 작업 모드: `standard`

## 변경 내용

`workspace-health`처럼 저장소 운영 도구가 커질 경우 단일 스크립트에 CLI, 체크 정의, 실행, 직렬화를 모두 넣지 않고 책임별 모듈로 분리한다. 기존 명령을 쓰던 운영 문서와 자동화가 깨지지 않도록 legacy script entrypoint는 유지한다.

## 근거

- Python `src` layout은 import 가능한 코드를 별도 위치에 두어 패키지 경계를 명확히 한다.
- 리팩터링은 외부 동작을 보존하면서 내부 구조와 유지보수성을 개선하는 작업이어야 한다.
- monorepo 운영 도구는 폴더와 모듈 목적이 분명해야 온보딩과 변경 범위 판단이 쉬워진다.

## 수용 기준

- 기존 명령 `python3 _tools/workspace-health/src/workspace_health.py`가 계속 동작한다.
- 테스트가 새 package module을 직접 import한다.
- CLI, 모델, 체크 정의, 실행/직렬화 책임이 분리된다.
- 단위 테스트와 전체 workspace health check가 통과한다.
