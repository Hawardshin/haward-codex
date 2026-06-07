# 웹 검색 기록: 소스 워크벤치 패널 분리

- 날짜: 2026-06-07
- 검색 목적: React/TypeScript 컴포넌트 분리와 props 타입 경계를 공식 문서 기준으로 확인한다.
- 확인한 출처:
  - React 공식 문서, Passing Props to a Component: https://react.dev/learn/passing-props-to-a-component
  - React 공식 문서, Using TypeScript: https://react.dev/learn/typescript
  - React 공식 문서, Components and Hooks must be pure: https://react.dev/reference/rules/components-and-hooks-must-be-pure
  - TypeScript 공식 문서, JSX: https://www.typescriptlang.org/docs/handbook/jsx
- 계획 영향: 상태/효과 로직은 기존 hook/controller에 유지하고, JSX 표시와 이벤트 props만 새 컴포넌트로 전달하는 방향을 유지했다.
- 불확실성: 외부 문서는 일반 원칙 확인용이며, 실제 수용 여부는 로컬 TypeScript/구조 검사/패키징 결과로 판단한다.

