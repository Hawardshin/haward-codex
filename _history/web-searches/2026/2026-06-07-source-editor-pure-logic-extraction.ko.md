# 2026-06-07 소스 에디터 순수 로직 분리 웹 검색 기록

## 검색 쿼리

- `React official docs extracting logic into custom hooks best practices`
- `TypeScript official docs modules export import organization`
- `React official docs reuse logic custom hooks`

## 확인한 출처

- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript Modules Handbook: https://www.typescriptlang.org/docs/handbook/2/modules.html
- React Built-in Hooks Reference: https://react.dev/reference/react/hooks

## 계획 반영

- React stateful hook 분리는 아직 컴포넌트 상태 의존성이 커서 보류하고, 먼저 순수 함수 모듈화를 진행했다.
- TypeScript 모듈 기준에 맞춰 `source-editor/index.ts`에서 `sourceDiff`와 `sourceLanguage`를 재export했다.

## 불확실성

- 다음 단계에서 source workbench 상태/액션을 hook으로 빼려면 저장/로드/락 상태의 동시성 경계를 별도 테스트로 더 고정해야 한다.
