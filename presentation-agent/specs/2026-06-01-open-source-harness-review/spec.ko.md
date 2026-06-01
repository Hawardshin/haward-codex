# 스펙: 오픈소스 하네스 적용 검토

## 목표

`presentation-agent`가 발표 자료를 생성한 뒤 품질을 반복 검증할 수 있도록, 오픈소스 하네스 후보를 조사하고 적용 순서를 정한다.

## 요구사항

- `REQ-PA-014`를 발표 에이전트 요구사항에 추가한다.
- 하네스 후보는 즉시 적용, 근시일 적용, 장기 참고로 나눈다.
- 새 의존성은 이번 작업에서 설치하지 않는다.
- 후보마다 사용 목적, 설치 posture, adoption gate, 적용 위험을 기록한다.
- 조사 결과는 한영 문서로 남긴다.

## 비목표

- Playwright, axe-core, promptfoo, DeepEval, Inspect AI를 이번 작업에서 설치하지 않는다.
- 공개 benchmark dataset을 다운로드하지 않는다.
- PPTX pixel-faithful 검증을 이번 작업에서 구현하지 않는다.

## 성공 기준

- 요구사항, 설정, 연구 노트, workflow, web search record, plan, traceability가 남는다.
- 다음 구현자가 `quality_harness.py`를 바로 설계할 수 있을 정도로 우선순위가 분명하다.
