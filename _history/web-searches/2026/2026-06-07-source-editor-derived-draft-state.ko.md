# 2026-06-07 소스 에디터 draft 파생 상태 분리 웹 검색 기록

## 검색 쿼리

- `React official docs useMemo deriving state from props state`
- `React official docs extracting state logic into reducer`
- `TypeScript official docs modules import export organization`

## 확인한 출처

- React Managing State: https://react.dev/learn/managing-state
- React Extracting State Logic into a Reducer: https://react.dev/learn/extracting-state-logic-into-a-reducer
- TypeScript Modules Handbook: https://www.typescriptlang.org/docs/handbook/2/modules.html

## 계획 반영

- React 기준상 derived state는 별도 state로 저장하지 않고 계산 또는 memoized selector로 유지하는 방향을 유지했다.
- reducer 전체 이동은 비동기 로드/저장 잠금 영향이 커서 보류하고, 먼저 draft selector 성격의 순수 helper를 추가했다.
- TypeScript 모듈 export 경계를 유지하기 위해 기존 `source-editor/index.ts` 재export 구조를 그대로 사용했다.

## 불확실성

- 다음 단계에서 source workbench 전체 action을 hook/reducer로 이동하려면 저장/로드/닫기 이벤트 시퀀스를 더 직접적인 동작 테스트로 고정해야 한다.
