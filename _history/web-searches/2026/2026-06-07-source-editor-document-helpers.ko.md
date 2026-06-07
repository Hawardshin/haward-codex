# 2026-06-07 소스 에디터 문서 helper 분리 웹 검색 기록

## 검색 쿼리

- `React keeping components pure official docs`
- `TypeScript modules official docs type imports exports`
- `React reusing logic with custom hooks official docs`

## 확인한 출처

- React Keeping Components Pure: https://react.dev/learn/keeping-components-pure
- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference
- TypeScript Modules Handbook: https://www.typescriptlang.org/docs/handbook/2/modules.html

## 계획 반영

- UI 컴포넌트의 렌더/이벤트 흐름과 문서 문자열 생성 책임을 분리했다.
- helper는 React hook을 쓰지 않는 순수 TypeScript 함수로 두어 재사용과 테스트가 쉬운 경계를 만들었다.
- `SourceDiffSummary`는 type import로만 참조해 런타임 import 표면을 줄였다.

## 불확실성

- 다음 단계에서 source workbench 저장/로드 이벤트를 hook 또는 reducer로 옮길 때는 비동기 취소와 저장 lock 계약을 함께 고정해야 한다.
