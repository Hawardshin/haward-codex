# 프롬프트 공통 계약

이 폴더의 모든 프롬프트는 아래 공통 계약을 상속한다.

## 웹 검색 우선

- 모든 프롬프트 실행은 계획, 저장소 탐색, 파일 수정 전에 웹 검색으로 시작한다.
- 검색어, 확인한 출처, 무시한 약한 출처, 계획에 반영한 인사이트를 텍스트로 남긴다.
- 의미 있는 작업은 `_history/web-searches/YYYY/`에 웹 검색 기록을 저장한다.
- 검색이 실패하거나 최신 사용자 지시가 검색을 금지한 경우에도 그 사유와 보강한 로컬 검증을 기록한다.

## 공개 판단 요약

- 문서에는 raw internal chain-of-thought를 저장하지 않는다.
- 대신 사용자가 검증할 수 있는 공개 판단 요약을 남긴다:
  - 어떤 질문을 검색했는가
  - 어떤 출처를 신뢰했는가
  - 어떤 출처를 제외했는가
  - 검색 결과가 계획을 어떻게 바꾸었는가
  - 남은 불확실성은 무엇인가

## 종료 평가

`work-evaluator-agent` 입력에는 의미 있는 작업마다 `web_search_record_targets`를 포함한다. 누락되면 blocking gap이다.

`work-evaluator-agent` 입력에는 의미 있는 작업마다 `requirements_targets`를 포함한다. 누락되면 blocking gap이다.

`work-evaluator-agent` 입력에는 의미 있는 작업마다 `spec_targets`를 포함한다. 누락되면 blocking gap이다.

`work-evaluator-agent` 입력에는 의미 있는 작업마다 `source_provenance_targets`와 `plan_evidence_targets`를 포함한다. 원천값 출처나 계획 근거가 빠지면 blocking gap이다.

스킬 작업이 있었다면 `work-evaluator-agent` 입력에는 `skill_work_occurred=true`, `skill_targets`, `skill_validation_targets`를 포함한다. 누락되면 blocking gap이다.

`work-evaluator-agent` 입력에는 의미 있는 작업마다 `request_trace_targets`를 포함한다. 누락되면 blocking gap이다.

선택한 작업 모드가 요구하면 `work-evaluator-agent` 입력에는 `timing_summary_targets`를 포함한다. 누락되면 blocking gap이다.

딥리서치나 긴 보고서 작업에는 `87-deep-research.md`를 사용하고, 보고서 작성 전 `complete-deep-research`로 조사 패키지 준비 상태를 확인한다.
