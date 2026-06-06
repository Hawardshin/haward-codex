# 연구 노트: EVAL report catalog structure

## 요약

EVAL report model에는 score 계산, document aggregation, static scenario catalog, tool signal catalog, fallback open-source eval repo 목록이 함께 있었다. 이전 refactor로 runtime telemetry model은 분리됐지만, static catalog는 여전히 계산 모델에 남아 있었다.

## 근거

- React 공식 문서는 component purity를 강조한다. 화면 component가 렌더링 외 책임을 많이 갖지 않게 분리하는 방향과 맞다.
- React custom hook은 state/effect나 lifecycle 재사용이 필요할 때 적합하다. 이번 catalog는 lifecycle이 없으므로 hook보다 plain TypeScript module이 더 적합하다.
- TypeScript 공식 module 문서는 파일 단위 import/export로 경계를 명시하는 방식을 제공한다.

## 적용 결정

- `evaluationReportCatalog.ts`를 추가해 EVAL scenario, tool signal, fallback eval repo, repo merge function을 보관한다.
- `evaluationReportModel.ts`는 catalog를 가져와 score model을 계산한다.
- `EvaluationReportPanel.tsx`는 scenario rendering을 위해 catalog를 직접 참조하고, 계산은 model API를 호출한다.

## 제외

- promptfoo, DeepEval, Phoenix, Opik, Langfuse 등 외부 EVAL runner 설치는 하지 않는다.
- cross-feature shared `lib/evaluation` 이동은 아직 재사용자가 없으므로 보류한다.
