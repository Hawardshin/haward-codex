# 계획 기록: Workspace Health 소스 구조 리팩터링

## 요청

- 요약: 폴더 구조와 소스 구조를 리팩토링.
- 작업 모드: `standard`

## 확인한 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-workspace-health-source-refactor.ko.md`
- 기존 요구사항: `REQ-WS-032`, `REQ-WS-033`
- 신규 요구사항: `REQ-WS-034`
- 현재 구조: `_tools/workspace-health/src/workspace_health.py` 단일 파일에 CLI, check 정의, 실행, 직렬화가 같이 있음.

## 선택한 방향

- 전체 루트 폴더 재배치는 이번 범위에서 제외한다.
- `workspace-health`를 legacy wrapper와 package module로 분리한다.
- 기존 명령을 보존해 운영 문서와 자동화가 깨지지 않게 한다.

## 수용 기준

- 단위 테스트 통과
- 기존 script entrypoint 통과
- category JSON 출력 통과
- 전체 `--include-build` health check 통과
- 평가와 히스토리 기록 저장
