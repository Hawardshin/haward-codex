# 계획 기록: 섹션 딥링크 UX

## 실행 순서

1. 공식 UX/접근성 출처를 확인한다.
2. 기존 섹션 위치 유틸리티와 `SnapshotLoader`, `MonitorShell` 흐름을 읽는다.
3. URL builder를 추가해 query/hash를 동기화한다.
4. `initialSection` 처리를 `openSection` 수준으로 보강한다.
5. 단위 테스트와 브라우저 smoke로 직접 URL 진입을 확인한다.
6. 최종 빌드, guard, evaluation, commit, push를 수행한다.

## 롤백 경계

- 구현 롤백 파일: `section-location.mjs`, `section-location.d.mts`, `section-location.test.mjs`, `MonitorShell.tsx`
- 기록 롤백 파일: 이번 슬러그의 요구사항, 스펙, 히스토리 기록
