# 2026-06-07 소스 에디터 helper 동작 테스트 보강 요청

## 요약

- 사용자는 부족한 부분 구현을 요청했다.
- 직전 조각에서 남은 미흡점인 source-editor helper 직접 동작 테스트와 저장 결과 병합 중복 제거를 이번 범위로 잡았다.

## 범위

- source document/draft helper를 실제 함수 호출로 검증한다.
- source save result 병합 규칙을 공통 helper로 모은다.
- TypeScript, Node test, 내부 패키징 검증을 실행한다.
