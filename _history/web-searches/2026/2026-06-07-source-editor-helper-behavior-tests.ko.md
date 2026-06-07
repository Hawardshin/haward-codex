# 2026-06-07 소스 에디터 helper 동작 테스트 웹 검색 기록

## 검색 쿼리

- `React official docs extracting state logic into a reducer`
- `React official docs keeping components pure`
- `TypeScript official docs type-only imports exports modules`

## 확인한 출처

- React Managing State: https://react.dev/learn/managing-state
- React Keeping Components Pure: https://react.dev/learn/keeping-components-pure
- React Components and Hooks must be pure: https://react.dev/reference/rules/components-and-hooks-must-be-pure
- TypeScript Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference

## 계획 반영

- 저장 결과 병합 같은 상태 전이 규칙을 컴포넌트 바깥 순수 helper로 이동했다.
- helper를 실제 입력/출력으로 검증해 컴포넌트 정규식 테스트만으로는 놓칠 수 있는 포맷/중복 제거 회귀를 잡도록 했다.
- type-only import가 런타임 테스트 import를 막지 않도록 TypeScript transpile 기반 테스트를 사용했다.

## 불확실성

- source workbench 전체 이벤트 핸들러 hook 분리는 아직 남아 있다. 다음 조각에서는 비동기 취소/lock 상태까지 포함한 reducer 또는 hook 경계를 검토한다.
