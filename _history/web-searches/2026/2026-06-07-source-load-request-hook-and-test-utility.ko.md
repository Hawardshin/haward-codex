# 2026-06-07 소스 로드 요청 훅 및 테스트 유틸 분리 웹 검색 기록

## 검색 쿼리

- `React official docs extracting state logic into a reducer`
- `React official docs reusing logic with custom hooks`
- `TypeScript official docs modules type-only imports exports`

## 확인한 출처

- React Extracting State Logic into a Reducer: https://react.dev/learn/extracting-state-logic-into-a-reducer
- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference

## 계획 반영

- UI 컴포넌트가 직접 소유하던 비동기 요청 순번 관리를 custom hook으로 분리해 React의 로직 재사용 패턴과 맞췄다.
- reducer까지 도입할 만큼 상태 전이가 복잡하지 않으므로, 이번 슬라이스는 ref 기반 요청 게이트 훅으로 제한했다.
- 테스트 전용 TS 모듈 로더를 공통 ESM 유틸로 분리하고 각 테스트는 계약 검증에 집중하도록 했다.

## 불확실성

- source editor 저장/로드 액션 전체를 hook 또는 reducer로 묶는 다음 단계에서는 UI 잠금, stale 응답 무시, 에러 표시 계약을 함께 검증해야 한다.
