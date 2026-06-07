# 2026-06-07 소스 에디터 액션 상태 분리 계획

## 목표

- 이전 source load hook 분리보다 넓게 잡아 source editor의 주요 사용자 액션 상태 전환까지 source editor 모듈로 이동한다.
- `MonitorShell.tsx`는 UI 이벤트와 Tauri invoke 조합을 담당하고, draft 상태 계산은 순수 helper가 맡도록 줄인다.

## 실행 슬라이스

1. `sourceDraftActions.ts`를 추가해 open/select/save/save-all/revert/close 상태 전환 helper를 만든다.
2. `MonitorShell.tsx`의 inline draft 상태 계산을 새 helper 호출로 바꾼다.
3. source editor index export와 readiness source structure 집계를 갱신한다.
4. 테스트용 TS importer가 상대 TS/TSX import/export를 재귀적으로 처리하도록 확장한다.
5. source editor helper 테스트, 구조 계약 테스트, Tool Studio 계약 테스트를 갱신한다.
6. Workspace Monitor check/test, platform-desktop-app test, 내부 패키징으로 검증한다.

## 제외

- source editor 전체를 reducer/hook 하나로 완전히 전환하는 작업은 다음 구조 개선 후보로 남긴다.
- 공개 배포용 updater signing, notarization, clean-machine smoke는 이번 범위가 아니다.
