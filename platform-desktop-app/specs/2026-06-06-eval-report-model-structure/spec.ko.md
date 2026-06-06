# 스펙: EVAL report model structure

## 목표

EVAL report의 data/model 책임과 JSX rendering 책임을 분리한다. 사용자가 “구조개선”을 요구한 맥락에서, 화면을 보존하면서도 변경 가능한 score model을 독립 module로 만든다.

## 설계 결정

- 새 module: `components/features/evaluationReportModel.ts`.
- public API: `buildEvaluationReportModel`, `formatEvalPercent`, `evalScenarios`.
- 하위 model: `evaluationRuntimeTelemetry.ts`의 `buildRuntimeTelemetryModel`.
- panel 역할: props 수신, model 호출, JSX rendering, action callback 연결.

## 언어/런타임 선택

- 옵션 A: TypeScript pure module. React lifecycle 없이 계산 가능하고 existing type check에 걸리므로 선택.
- 옵션 B: React custom hook. state/effect가 없으므로 불필요한 React coupling이 생겨 미선택.
- 옵션 C: Rust/Tauri score command. native metric source에는 맞지만 document/category scoring을 renderer snapshot에 묶는 편이 더 직접적이라 미선택.

## 아키텍처 선택

- 옵션 A: feature-local model module. EVAL panel과 가까우면서 UI와 계산 책임을 분리할 수 있어 선택.
- 옵션 B: shared `lib/evaluation` module. 아직 다른 surface 사용자가 없어 shared abstraction으로 승격하지 않는다.
- 옵션 C: component split only. JSX는 나뉘지만 score model이 그대로 UI에 남아 미선택.

## 폴더 구조 선택

- 옵션 A: `components/features/evaluationReportModel.ts`. 현재 EVAL feature ownership 안에 model을 둔다. 선택.
- 옵션 B: `lib/eval/reportModel.ts`. 재사용 범위가 넓어질 때 이동한다.

## 수용 기준

- panel은 `buildEvaluationReportModel`을 호출한다.
- model은 dimensions, tool rows, bottlenecks, open-source candidates, history bars를 반환한다.
- tests/contracts는 panel/model/runtime model의 책임 분리를 확인한다.
- package와 Browser smoke가 통과한다.
