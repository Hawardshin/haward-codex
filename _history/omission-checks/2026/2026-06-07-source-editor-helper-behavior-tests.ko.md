# 2026-06-07 소스 에디터 helper 동작 테스트 누락 점검

## 체크리스트

- [x] 저장 결과 병합 로직을 공통 helper로 분리했다.
- [x] AGENTS starter와 patch context helper를 직접 동작 테스트로 검증했다.
- [x] draft dirty/sort/current selection helper를 직접 동작 테스트로 검증했다.
- [x] save report dedupe/limit/preserve-visible-content 규칙을 직접 동작 테스트로 검증했다.
- [x] 구조 계약 테스트가 새 helper 사용과 inline 중복 제거를 확인한다.
- [x] workspace-monitor check/test를 실행했다.
- [x] platform-desktop-app test를 실행했다.
- [x] 내부 패키징 결과를 최종 평가에 반영한다.
