# 계획: EVAL report catalog structure

1. Web-first intake와 memory bootstrap 결과를 반영한다.
2. 구조 개선 slice를 EVAL report catalog 분리로 제한한다.
3. `evaluationReportCatalog.ts`를 추가해 scenarios, tool signals, fallback repos, merge function을 옮긴다.
4. `evaluationReportModel.ts`와 `EvaluationReportPanel.tsx` import를 갱신한다.
5. comprehensive improvement contract, workspace monitor test, desktop readiness test를 새 boundary에 맞춘다.
6. targeted tests, collect/check/test/build/package, Browser smoke를 실행한다.
7. close-out 기록, evaluation, request trace를 남기고 commit/push한다.

## 리스크

- catalog import cycle: catalog는 `WorkspaceSnapshot` type만 참조하고 model을 참조하지 않는다.
- UI 회귀: data attributes와 scenario labels를 보존한다.
- contract drift: static repo token은 catalog test로 이동한다.
