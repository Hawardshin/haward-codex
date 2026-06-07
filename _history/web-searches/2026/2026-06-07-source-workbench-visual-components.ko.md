# 웹 검색 기록: 소스 워크벤치 하위 컴포넌트 분리

- 날짜: 2026-06-07
- 검색 목적: React 컴포넌트 추출, props 전달, 조건부 렌더링 원칙을 공식 문서로 확인한다.
- 확인한 출처:
  - React 공식 문서, Conditional Rendering: https://react.dev/learn/conditional-rendering
  - React 공식 문서, Passing Props to a Component: https://react.dev/learn/passing-props-to-a-component
  - React 공식 문서, Describing the UI: https://react.dev/learn/describing-the-ui
  - TypeScript 공식 문서, JSX: https://www.typescriptlang.org/docs/handbook/jsx
- 계획 영향: 상태 로직은 기존 hook/controller에 유지하고, 조건부 JSX가 커진 화면 조각만 props 기반 child component로 분리했다.

