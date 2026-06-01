# 요구사항 변경: 코딩 프로젝트 bootstrap

- 날짜: 2026-06-01
- 변경 ID: `REQ-WS-038`
- 출처 요청: `UR-2026-06-01-023`
- 작업 모드: `standard`

## 변경 내용

새 코딩 프로젝트를 만들 때 기술별 기본 구조를 반복해서 수작업으로 만들지 않도록 공통 bootstrap 도구와 workflow를 요구사항으로 추가한다.

## 요구사항

새 코딩 프로젝트는 기술별 blueprint로 dry-run 계획을 먼저 확인하고, 적용 시 root project 등록, 프로젝트별 README/docs/specs/configs/tests/tools/artifacts, 기술별 공식 문서 체크리스트, coding research 연결점을 자동 준비할 수 있어야 한다.

## 이유

- 프로젝트가 늘어나도 각 프로젝트의 경계와 산출물이 분리되어야 한다.
- 사용자는 새 코딩 프로젝트를 편하게 시작하되, 불필요한 폴더와 의존성 낭비를 줄이고 싶어 한다.
- 기술별 공식 문서와 coding research 연결이 생성 시점부터 보여야 한다.

## 검증

- `_tools/coding-project-bootstrap/` 단위 테스트
- dry-run plan 출력
- optional registry update 동작
- `structure-audit`
- `workspace-health`
