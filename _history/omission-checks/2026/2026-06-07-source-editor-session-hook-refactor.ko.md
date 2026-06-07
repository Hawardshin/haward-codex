# 2026-06-07 소스 에디터 세션 훅 분리 누락 체크

## 체크리스트

- [x] 새 사용자 지시 후 웹 검색 기록을 남겼다.
- [x] 이전 구현보다 넓은 source editor 세션 경계를 선택했다.
- [x] editor ref, active path ref, draft ref, draft sync timer를 hook으로 이동했다.
- [x] visible source state 적용과 draft update scheduling을 hook으로 이동했다.
- [x] save/save-all/revert 경로가 hook API를 사용하도록 바꿨다.
- [x] source editor index와 readiness source map에 새 hook을 등록했다.
- [x] 구조 계약 테스트와 Tool Studio 계약 테스트를 새 경계에 맞춰 갱신했다.
- [x] 좁은 source editor 구조 테스트와 Tool Studio 테스트를 실행했다.
- [x] Workspace Monitor check를 실행했다.
- [x] Workspace Monitor 전체 test와 platform-desktop-app test를 실행한다.
- [x] TypeScript와 Rust를 포함한 내부 패키징 명령을 실행한다.
- [x] 최종 리소스 잔여 상태를 확인한다.

## 남은 후보

- source editor native invoke handler 전체를 `useSourceWorkbenchController`로 옮긴다.
- 저장 실패, dirty draft close, stale load를 함께 보는 통합 행동 테스트를 추가한다.
