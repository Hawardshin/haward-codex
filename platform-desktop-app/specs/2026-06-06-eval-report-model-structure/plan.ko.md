# 계획: EVAL report model structure

1. Web-first intake와 memory bootstrap을 수행한다.
2. 구조개선 slice를 EVAL report model 분리로 제한한다.
3. `evaluationReportModel.ts`를 만들고 score/document aggregation logic을 이동한다.
4. `EvaluationReportPanel.tsx`가 model 결과만 렌더링하게 바꾼다.
5. comprehensive improvement contract와 tests를 새 source boundary에 맞춘다.
6. collect, check, test, build, package, Browser smoke를 실행한다.
7. close-out 기록, evaluation, trace를 남기고 commit/push한다.

## 리스크

- score formula regression: 기존 수식과 display tokens를 유지한다.
- contract drift: tests가 panel/model/runtime boundary를 모두 확인한다.
- package cost: 사용자의 자동 build/package 요구에 따라 최종 `package:internal`을 실행한다.
