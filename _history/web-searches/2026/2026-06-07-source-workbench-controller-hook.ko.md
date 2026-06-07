# 2026-06-07 source workbench controller hook 웹 검색 기록

## 검색 쿼리

- `React official docs custom hooks reusing logic extracting event handlers useCallback`
- `React official docs useCallback custom hook returning functions`
- `TypeScript official docs type only imports exports modules`

## 확인한 출처

- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- React `useCallback`: https://react.dev/reference/react/useCallback
- TypeScript Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference

## 계획 반영

- React 공식 문서의 custom hook 기준에 맞춰 UI shell에서 반복되는 source workbench event/native invoke logic을 `useSourceWorkbenchController`로 추출했다.
- hook이 반환하는 handler는 toolbar와 source editor UI가 그대로 호출할 수 있게 두고, 세부 상태 전환은 기존 pure helper를 계속 사용했다.
- TypeScript barrel export와 readiness source map을 함께 바꿔 새 모듈 경계가 검증 대상에 포함되도록 했다.

## 불확실성

- React callback 안정성 문서는 handler 추출 방향을 지지하지만, 실제 race-condition/저장 동작 안전성은 로컬 TypeScript와 계약 테스트, 패키징으로 검증해야 한다.
