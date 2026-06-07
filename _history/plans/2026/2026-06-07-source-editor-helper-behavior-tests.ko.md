# 2026-06-07 소스 에디터 helper 동작 테스트 계획

## 실행

1. source workbench에서 아직 반복되는 저장 결과 병합 로직을 확인한다.
2. `sourceDrafts.ts`에 `mergeSourceSaveReports`를 추가한다.
3. `MonitorShell.tsx`의 세 저장 결과 갱신 지점을 helper 호출로 바꾼다.
4. TypeScript helper를 직접 호출하는 Node 테스트를 추가한다.
5. 전체 프로젝트 검증과 내부 패키징을 실행한다.

## 제외

- source workbench 전체 hook/reducer 분리는 다음 조각으로 남긴다.
- 공개 release signing/notarization은 이번 범위가 아니다.
