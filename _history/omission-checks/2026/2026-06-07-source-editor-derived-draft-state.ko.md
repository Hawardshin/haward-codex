# 2026-06-07 소스 에디터 draft 파생 상태 분리 누락 점검

## 체크리스트

- [x] 새 사용자 지시에 대해 웹 검색을 먼저 수행했다.
- [x] `openDraftEntries`, `dirtyDraftEntries`, `dirtySourcePathSet`, `currentSourceDirty` 계산을 helper로 옮겼다.
- [x] `saveAllSourceDrafts`의 dirty+sort 산출도 같은 helper 기준을 사용하게 했다.
- [x] draft tab dirty 표시도 같은 helper 기준을 사용하게 했다.
- [x] 구조 계약 테스트에 되돌림 방지 조건을 추가했다.
- [x] 좁은 테스트, check, 전체 test를 실행했다.

## 남은 후보

- source workbench async action을 hook 또는 reducer로 이동한다.
- source draft helper의 직접 입력/출력 단위 테스트를 추가한다.
