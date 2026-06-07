# 2026-06-07 소스 에디터 draft 상태 helper 분리 웹 검색 기록

## 검색 쿼리

- `React official docs custom hooks extracting stateful logic`
- `React official docs useReducer extracting state logic`
- `TypeScript official docs modules import export`

## 확인한 출처

- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- React Extracting State Logic into a Reducer: https://react.dev/learn/extracting-state-logic-into-a-reducer
- TypeScript Modules Handbook: https://www.typescriptlang.org/docs/handbook/2/modules.html

## 계획 반영

- hook 또는 reducer 전체 분리는 아직 저장/로드/닫기 동시성 영향이 크므로 보류했다.
- 먼저 `SourceDraftEntry` 생성, 현재 editor 내용 병합, 저장 결과 반영, draft 제거를 순수 helper로 분리했다.
- `source-editor/index.ts` 재export를 통해 `MonitorShell.tsx` import 경계를 유지했다.

## 불확실성

- 다음 단계에서 source workbench 상태 전체를 hook/reducer로 옮기려면 async load 취소, save lock, 전체 저장 중 active draft 보존 테스트를 더 직접적인 단위 테스트로 고정해야 한다.
