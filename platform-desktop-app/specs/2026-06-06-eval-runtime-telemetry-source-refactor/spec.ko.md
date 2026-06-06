# 스펙: EVAL runtime telemetry source refactor

## 목표

EVAL runtime telemetry 계산 로직을 `EvaluationReportPanel.tsx`에서 분리해 UI component를 가볍게 만들고, score model을 독립적으로 변경/검증하기 쉽게 만든다.

## 설계 결정

- 새 모듈 `components/features/evaluationRuntimeTelemetry.ts`를 만든다.
- `EvalRuntimeTelemetrySignal`, `RuntimeTelemetryRow`, `RuntimeTelemetryModel` type을 새 모듈에서 export한다.
- `buildRuntimeTelemetryModel`은 runtime telemetry availability, native runtime score, telemetry rows를 반환한다.
- `formatRuntimeBytes`는 helper module에서 export해 panel evidence copy도 같은 formatting을 사용한다.
- static contract check는 panel과 helper를 함께 검사한다.
- `package-internal`, `package-public`, `tauri-build-prepared`는 Tauri build 직전에 `cleanup-macos-dmg-intermediates.mjs`를 실행해 이전 실패가 남긴 `src-tauri/target/release/bundle/macos/rw.*.dmg` 파일을 제거한다.

## 언어/런타임 선택

- 옵션 A: TypeScript pure module. 기존 Next/TypeScript check에 바로 걸리고 runtime dependency가 없어 선택했다.
- 옵션 B: React custom hook. hook은 React lifecycle에 묶이므로 순수 score model에는 과하다.
- 옵션 C: Rust command에서 score까지 계산. native telemetry source에는 맞지만 UI evidence wording과 language fallback을 Rust에 묶게 되어 미선택했다.

## 아키텍처 선택

- 옵션 A: panel-local feature helper. EVAL feature ownership이 명확하고 import path가 작아 선택했다.
- 옵션 B: shared `lib/telemetry` module. 다른 surface가 쓰기 전에는 premature shared abstraction이다.
- 옵션 C: component split only. UI markup만 나누면 score model 책임이 그대로 남아 미선택했다.

## 수용 기준

- helper module이 score model과 semantic metric rows를 소유한다.
- panel은 helper result를 dimension/evidence/rendering에 조합한다.
- contract checks/tests가 helper boundary를 확인한다.
- package pipeline이 stale macOS DMG intermediate cleanup step을 가진다.
- build/package/smoke가 통과한다.

## 근거

- React useMemo/pure calculation guidance: https://react.dev/reference/react/useMemo
- React logic reuse guidance: https://react.dev/learn/reusing-logic-with-custom-hooks
- TypeScript module/type-only import guidance: https://www.typescriptlang.org/docs/handbook/modules/reference
- OpenTelemetry process metric names: https://opentelemetry.io/docs/specs/semconv/system/process-metrics/

## 제한

- `EvaluationReportPanel.tsx`에는 아직 document/history/tool aggregation과 dimension construction이 남아 있다.
- 다음 source 개선은 dimension model이나 `MonitorShell` resident section orchestration 분리가 될 수 있다.
