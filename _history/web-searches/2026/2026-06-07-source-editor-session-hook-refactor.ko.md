# 2026-06-07 소스 에디터 세션 훅 분리 웹 검색 기록

## 검색 쿼리

- `React official docs useReducer extracting state logic into reducer custom hook`
- `React official docs reusing logic with custom hooks effects race conditions ignore stale responses`
- `TypeScript official docs module exports type imports reference`

## 확인한 출처

- React `useReducer`: https://react.dev/reference/react/useReducer
- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- React Synchronizing with Effects: https://react.dev/learn/synchronizing-with-effects
- TypeScript Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference

## 계획 반영

- React의 custom hook 경계를 기준으로, UI 컴포넌트 안에 남아 있던 editor ref와 draft sync timer를 `useSourceEditorSession`으로 분리했다.
- reducer는 아직 비동기 invoke와 UI action이 섞인 전체 handler를 한 번에 옮기기보다, 순수 helper와 hook 세션 경계를 단계적으로 나누는 것이 더 안전하다고 판단했다.
- TypeScript module export 경계를 유지하기 위해 source editor barrel export와 readiness source map을 함께 갱신했다.

## 불확실성

- source editor 전체 event handler를 reducer나 더 큰 controller hook으로 묶는 작업은 아직 다음 후보로 남아 있다.
