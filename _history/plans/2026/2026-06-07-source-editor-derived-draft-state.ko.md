# 2026-06-07 소스 에디터 draft 파생 상태 분리 계획

## 단계

1. `MonitorShell.tsx`에 남은 draft 파생 상태 계산을 확인한다.
2. `sourceDrafts.ts`에 open/dirty/current selector helper를 추가한다.
3. `MonitorShell.tsx`의 useMemo와 렌더링 dirty 계산을 helper 호출로 바꾼다.
4. 구조 계약 테스트를 보강한다.
5. check, test, package/run을 실행한다.

## 제외

- source workbench 전체 hook/reducer 이동은 이번 조각에서 제외한다.
- UI copy, Rust command, 저장 API 동작은 변경하지 않는다.
