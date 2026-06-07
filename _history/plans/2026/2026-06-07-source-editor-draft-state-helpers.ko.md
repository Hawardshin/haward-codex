# 2026-06-07 소스 에디터 draft 상태 helper 분리 계획

## 단계

1. `MonitorShell.tsx`의 source draft 상태 전이 지점을 확인한다.
2. `source-editor/sourceDrafts.ts`에 순수 helper를 추가한다.
3. `MonitorShell.tsx`에서 중복 객체 생성과 저장 반영 로직을 helper 호출로 바꾼다.
4. 구조 계약 테스트를 보강한다.
5. 좁은 테스트, `workspace-monitor check`, 전체 테스트, 내부 패키징을 실행한다.

## 제외

- 이번 조각에서는 source workbench 전체 hook/reducer 이동을 하지 않는다.
- UI 배치나 Rust command 동작은 변경하지 않는다.
