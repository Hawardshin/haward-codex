# 2026-06-07 source workbench controller hook 누락 점검

## 점검 목록

- [x] 웹 선검색 기록을 남겼다.
- [x] source workbench native invoke handler를 새 hook으로 이동했다.
- [x] `MonitorShell.tsx`의 중복 inline handler를 제거했다.
- [x] source editor barrel export를 갱신했다.
- [x] readiness source map에 새 hook을 추가했다.
- [x] source editor 구조 테스트와 Tool Studio 테스트의 위치 가정을 갱신했다.
- [x] workspace-monitor 전체 test를 실행한다.
- [x] platform-desktop-app 전체 test를 실행한다.
- [x] 내부 desktop package/run pipeline을 실행한다.
- [x] 리소스 hygiene를 확인한다.

## 누락 위험

- hook 호출 위치가 settings sync hook보다 앞서면 즉시 인자 평가에서 오류가 날 수 있으므로 TypeScript check로 확인한다.
- source editor 저장 후 settings sync queue가 계속 동작해야 하므로 controller hook이 `queueSettingsSync`를 직접 받는지 확인한다.

## 결과

- `useSourceWorkbenchController` 호출을 settings sync hook 뒤로 옮겨 `queueSettingsSync` 선언 순서를 맞췄다.
- 전체 테스트, 내부 패키징, signature/DMG verify, 리소스 hygiene를 통과했다.
