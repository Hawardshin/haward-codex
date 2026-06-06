# EVAL runtime telemetry source refactor 연구 노트

## 목적

`EvaluationReportPanel.tsx`가 점수 계산, runtime telemetry formatting, UI 렌더링을 모두 들고 있어 컴포넌트 책임이 커졌다. runtime telemetry 계산을 별도 TypeScript module로 분리해 source maintainability를 개선한다.

## 적용한 원칙

- React component는 렌더링과 조합에 집중한다.
- 순수 계산은 component 밖 module로 빼서 TypeScript check와 static contract test로 보호한다.
- Type-only import를 사용해 runtime bundle에 type-only dependency가 남지 않게 한다.
- OpenTelemetry semantic process metric token은 helper module에서 소유한다.

## 적용 결정

- 새 파일: `platform-desktop-app/renderer/workspace-monitor/components/features/evaluationRuntimeTelemetry.ts`
- 이동 대상:
  - `EvalRuntimeTelemetrySignal`
  - byte formatting
  - native runtime score 계산
  - runtime telemetry row 생성
- 유지 대상:
  - EVAL panel의 document/history/tool signal aggregation
  - dimension UI 구성
  - runtime telemetry strip 렌더링

## 제한

- 이번 slice는 모듈 분리와 계약 보강에 집중한다.
- `EvaluationReportPanel.tsx` 전체 대형 component 분해는 후속 작업으로 남긴다.

## 참고 링크

- https://react.dev/reference/react/useMemo
- https://react.dev/learn/reusing-logic-with-custom-hooks
- https://www.typescriptlang.org/docs/handbook/modules/reference
- https://opentelemetry.io/docs/specs/semconv/system/process-metrics/
