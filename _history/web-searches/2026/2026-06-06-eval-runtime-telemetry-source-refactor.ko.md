# 2026-06-06 EVAL runtime telemetry source refactor 웹 검색 기록

## 요청

사용자가 "소스개선"을 요청했다.

## 검색 쿼리

- `React official docs extracting logic into custom hooks or separate functions maintainability useMemo`
- `TypeScript handbook modules type only imports official documentation`
- `Tauri v2 official docs state commands frontend backend separation`
- `OpenTelemetry process metrics semantic conventions official docs process.memory.usage process.cpu.utilization`

## 확인한 출처

- React useMemo: https://react.dev/reference/react/useMemo
- React custom hooks and logic reuse: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript modules reference: https://www.typescriptlang.org/docs/handbook/modules/reference
- OpenTelemetry process metrics: https://opentelemetry.io/docs/specs/semconv/system/process-metrics/

## 계획 영향

- React component 안의 runtime telemetry 계산을 UI 렌더링에서 분리한다.
- TypeScript module/type export로 runtime telemetry type과 pure score model을 명시한다.
- OpenTelemetry process metric 이름은 새 helper module이 소유하도록 해 후속 collector 연결 지점을 분명히 한다.

## 약한 출처와 제외

- 일반 블로그의 "React clean code"류 글은 현재 코드베이스의 구체적 계약보다 약해 제외했다.
- 대규모 frontend architecture 글은 이번 slice의 blast radius를 키우므로 참고하지 않았다.

## 공개 결정 요약

소스 개선은 새 기능 추가가 아니라, 직전 작업에서 커진 EVAL runtime telemetry 계산을 `EvaluationReportPanel` 밖의 순수 TypeScript 모듈로 분리하는 방향으로 진행한다.
