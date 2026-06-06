# 2026-06-06 EVAL report catalog structure 요구사항

## 배경

EVAL report model은 계산 로직과 정적 카탈로그 데이터를 함께 담고 있었다. 오픈소스 후보, 평가 시나리오, tool signal은 변경 주기와 책임이 score formula와 다르므로 별도 module로 분리할 필요가 있다.

## 요구사항

- REQ-ERCS-001: EVAL scenario, tool signal, fallback eval repo catalog는 `evaluationReportCatalog.ts`로 분리한다.
- REQ-ERCS-002: `evaluationReportModel.ts`는 catalog를 조합해 score/report model을 계산하고, 정적 후보 목록의 소유자가 되지 않는다.
- REQ-ERCS-003: `EvaluationReportPanel.tsx`는 scenario rendering에는 catalog를, score rendering에는 report model을 사용한다.
- REQ-ERCS-004: contract/tests는 panel, model, catalog, runtime telemetry model 경계를 각각 확인한다.
- REQ-ERCS-005: 구현 후 check, test, build, internal package, Browser smoke를 실행한다.

## 수용 기준

- `evaluationReportCatalog.ts`가 존재하고 `evalScenarios`, `toolSignals`, `fallbackEvalRepos`, `mergeEvalRepos`를 export한다.
- `evaluationReportModel.ts`는 `mergeEvalRepos`와 `toolSignals`를 import해 사용한다.
- EVAL cockpit UI의 data attributes와 주요 표시 내용은 유지된다.
- 패키징 산출물 `.app`/DMG가 생성되고 smoke 검증이 통과한다.
