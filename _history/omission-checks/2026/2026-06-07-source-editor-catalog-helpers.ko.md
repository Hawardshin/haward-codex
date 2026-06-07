# 2026-06-07 소스 에디터 catalog helper 분리 누락 점검

## 체크리스트

- [x] 새 사용자 지시에 대해 웹 검색을 먼저 수행했다.
- [x] runtime catalog와 snapshot catalog 선택 로직을 helper로 옮겼다.
- [x] AGENTS.md 경로 선택 로직을 helper로 옮겼다.
- [x] 편집 가능 파일 제한과 검색 필터를 helper로 옮겼다.
- [x] source picker 선택 파일과 workspace root label 계산을 helper로 옮겼다.
- [x] 구조 계약 테스트와 기존 Tool Studio 테스트를 새 경계에 맞췄다.
- [x] 좁은 테스트, check, 전체 test를 실행했다.

## 남은 후보

- source workbench async handler를 hook으로 분리한다.
- source catalog helper에 직접 입력/출력 단위 테스트를 추가한다.
