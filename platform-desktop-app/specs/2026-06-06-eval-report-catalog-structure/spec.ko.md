# 스펙: EVAL report catalog structure

## 목표

EVAL report의 정적 catalog 책임을 score model에서 분리해, 후보 목록과 시나리오 변경이 계산 로직 변경과 섞이지 않게 한다.

## 설계 결정

- 새 module: `components/features/evaluationReportCatalog.ts`.
- catalog API: `evalScenarios`, `toolSignals`, `fallbackEvalRepos`, `mergeEvalRepos`.
- model API: 기존 `buildEvaluationReportModel`, `formatEvalPercent` 유지.
- compatibility: `evaluationReportModel.ts`는 catalog type과 `evalScenarios` re-export를 유지해 기존 import 회귀 위험을 줄인다.

## 언어/런타임 선택

- TypeScript module: 선택. 기존 renderer build/test로 검증 가능하며 runtime resource를 만들지 않는다.
- React hook: 미선택. state/effect가 없고 정적 catalog에 hook lifecycle이 필요 없다.
- Rust/Tauri command: 미선택. 정적 UI catalog는 native boundary로 넘길 이유가 없다.

## 아키텍처 선택

- Feature-local catalog module: 선택. EVAL feature 내부 소유권을 유지하면서 경계를 분리한다.
- Shared `lib/evaluation` module: 보류. 아직 다른 feature 소비자가 없다.

## 폴더 구조 선택

- `components/features/evaluationReportCatalog.ts`: 선택. 기존 `evaluationReportModel.ts`와 같은 feature folder라 탐색 비용이 낮다.
- `lib/eval/reportCatalog.ts`: 보류. cross-feature dependency가 생길 때 이동한다.

## 수용 기준

- catalog module은 scenario/tool/repo catalog와 merge function을 가진다.
- model module은 catalog를 import해서 score model을 조립한다.
- tests/contracts는 static catalog token을 catalog module에서 확인한다.
- build/package/Browser smoke가 통과한다.
