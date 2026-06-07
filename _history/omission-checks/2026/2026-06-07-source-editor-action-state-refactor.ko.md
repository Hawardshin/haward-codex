# 2026-06-07 소스 에디터 액션 상태 분리 누락 체크

## 체크리스트

- [x] 새 사용자 지시 후 웹 검색 기록을 남겼다.
- [x] 이전 히스토리에서 너무 좁게 남은 다음 후보를 확인했다.
- [x] source editor의 사용자 액션 상태 전환을 더 넓은 범위로 분리했다.
- [x] 저장 report 병합과 저장 대상 생성 로직을 공통 helper로 통일했다.
- [x] 새 helper를 index export와 readiness source map에 등록했다.
- [x] 테스트 importer를 상대 TS/TSX 모듈까지 처리하도록 확장했다.
- [x] source editor helper 테스트와 구조 계약 테스트를 갱신했다.
- [x] Workspace Monitor check/test와 platform-desktop-app test를 실행했다.
- [x] TypeScript와 Rust를 포함한 내부 패키징 명령을 실행했다.
- [x] 최종 리소스 잔여 상태를 확인했다.

## 남은 후보

- source editor 전체 event handler를 `useSourceWorkbench` 또는 reducer로 한 단계 더 묶는다.
- 저장 실패, stale load, dirty draft close confirmation을 함께 보는 통합 테스트를 추가한다.
