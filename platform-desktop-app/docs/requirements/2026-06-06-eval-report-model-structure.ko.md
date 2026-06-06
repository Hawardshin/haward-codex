# 2026-06-06 EVAL report model structure 요구사항

## 배경

EVAL 화면은 현재 작업 평가, 근거 커버리지, 도구 사용, runtime telemetry, 오픈소스 후보, 병목 후보를 한 화면에 표시한다. 이전 개선에서 runtime telemetry model은 분리됐지만, `EvaluationReportPanel.tsx`에는 여전히 문서 집계와 점수 계산 책임이 남아 있었다.

## 요구사항

- REQ-ERMS-001: EVAL report document aggregation, scoring, priority dimension construction은 UI component 밖의 pure TypeScript module로 분리한다.
- REQ-ERMS-002: `EvaluationReportPanel.tsx`는 `buildEvaluationReportModel` 결과를 렌더링하는 역할에 집중한다.
- REQ-ERMS-003: runtime telemetry model은 `evaluationReportModel.ts`가 하위 model로 조합하고, UI component가 직접 runtime score formula를 알지 않게 한다.
- REQ-ERMS-004: comprehensive improvement contract, workspace-monitor tests, desktop readiness tests는 새 structure boundary를 확인한다.
- REQ-ERMS-005: 구현 후 check, test, build, package, Browser smoke를 실행한다.

## 수용 기준

- `evaluationReportModel.ts`가 존재하고 `buildEvaluationReportModel`을 export한다.
- `EvaluationReportPanel.tsx` line count와 책임이 줄어든다.
- EVAL cockpit data attributes와 사용자 표시 내용은 유지된다.
- internal package와 Browser smoke가 통과한다.
