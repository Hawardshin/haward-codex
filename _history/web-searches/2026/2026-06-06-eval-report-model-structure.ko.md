# 2026-06-06 EVAL report model structure web search

## 질의

- React official guidance separating logic from components custom hooks pure functions useMemo components architecture
- TypeScript official modules type-only imports module structure maintainability
- React official scaling up reducer context extracting state logic components architecture
- Tauri official process model desktop app architecture frontend backend boundary

## 확인한 출처

- React Keeping Components Pure: https://react.dev/learn/keeping-components-pure
- React Scaling Up with Reducer and Context: https://react.dev/learn/scaling-up-with-reducer-and-context
- React useMemo reference: https://react.dev/reference/react/useMemo
- TypeScript Modules reference: https://www.typescriptlang.org/docs/handbook/modules/reference
- Tauri Process Model: https://tauri.app/concept/process-model/

## 판단

UI render component는 동일 입력에 대해 예측 가능한 view를 반환하는 쪽이 유지보수에 유리하다. EVAL 화면의 document aggregation, score construction, open-source candidate merge, priority calculation은 JSX rendering보다 feature model 책임에 가깝다.

## 적용

- `EvaluationReportPanel.tsx`에서 EVAL score model을 분리한다.
- 새 model은 React lifecycle 없이 순수 TypeScript function으로 유지한다.
- Tauri/native runtime telemetry model과 UI render component 사이에 EVAL report model boundary를 둔다.

## 불확실성

- 이번 검색은 구조 개선 원칙 확인용이다. 전체 앱 architecture migration이나 `MonitorShell.tsx` 대형 분해는 별도 slice로 남긴다.
