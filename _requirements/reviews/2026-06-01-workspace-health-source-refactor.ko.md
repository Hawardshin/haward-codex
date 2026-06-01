# 요구사항 검토: Workspace Health 소스 구조 리팩터링

## 검토 대상

- `REQ-WS-034`
- 사용자 요청: “리팩토링 폴더구조 소스 구조”

## 판단

- 상태: 승인
- 소유 영역: `_tools/workspace-health`
- 변경 유형: 운영 도구 내부 소스 구조 개선

## 검토 메모

- 전체 저장소 폴더를 크게 이동하면 기존 map, dashboard, workflow 경로가 흔들릴 수 있다.
- 따라서 이번 변경은 전체 검증 관문인 `workspace-health`를 package 구조로 분리하는 좁은 리팩터링으로 시작한다.
- 기존 script command는 유지하여 사용성 회귀를 막는다.

## 검증 필요 사항

- `workspace-health` 단위 테스트
- legacy script entrypoint 실행
- JSON/category 출력 확인
- 전체 `--include-build` health check
