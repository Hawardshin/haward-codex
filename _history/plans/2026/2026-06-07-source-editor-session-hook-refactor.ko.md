# 2026-06-07 소스 에디터 세션 훅 분리 계획

## 목표

- source editor의 상태 전환 helper 다음 단계로, editor session ref와 draft sync lifecycle을 `MonitorShell.tsx` 밖으로 이동한다.
- `MonitorShell.tsx`는 UI event handler와 native invoke 흐름을 유지하되, 세션 상태의 직접 ref/timer 관리는 hook에 위임한다.

## 실행 슬라이스

1. `useSourceEditorSession.ts`를 추가한다.
2. hook에 Monaco editor ref, visible draft ref, active path ref, draft sync timer, cleanup을 넣는다.
3. visible state apply, draft update scheduling, effective draft snapshot helper를 hook return API로 제공한다.
4. `MonitorShell.tsx`에서 inline ref/timer/state sync 함수를 제거하고 hook을 사용한다.
5. source editor index, readiness source map, 구조 계약 테스트, Tool Studio 계약 테스트를 갱신한다.
6. 좁은 테스트, Workspace Monitor check/test, platform-desktop-app test, 내부 패키징으로 검증한다.

## 제외

- source editor의 모든 native invoke handler를 하나의 controller hook으로 옮기는 작업은 다음 후보로 남긴다.
- 공개 배포 signing/notarization/updater endpoint 검증은 이번 범위가 아니다.
