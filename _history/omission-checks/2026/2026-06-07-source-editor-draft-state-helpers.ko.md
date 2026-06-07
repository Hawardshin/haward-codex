# 2026-06-07 소스 에디터 draft 상태 helper 분리 누락 점검

## 체크리스트

- [x] 새 사용자 지시에 대해 웹 검색을 먼저 수행했다.
- [x] 기존 타입 `SourceDraftEntry`, `WorkspaceTextFile`, `WorkspaceWriteReport`를 재사용했다.
- [x] `MonitorShell.tsx`에 남은 draft 생성 중복을 제거했다.
- [x] 단일 저장과 전체 저장의 baseline/content 보존 규칙을 helper에 유지했다.
- [x] stale async load, save lock 관련 기존 계약 테스트를 새 helper 경계에 맞게 갱신했다.
- [x] 좁은 테스트와 전체 테스트를 실행했다.

## 남은 후보

- source workbench의 상태와 액션 전체를 별도 hook 또는 reducer로 분리한다.
- 저장/닫기/전체 저장 상태 전이를 직접 호출 가능한 단위 테스트로 더 고정한다.
