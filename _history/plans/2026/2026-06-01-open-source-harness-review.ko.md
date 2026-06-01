# 계획: 오픈소스 하네스 적용 검토

## 목적

핫한 오픈소스 하네스를 조사하고 `presentation-agent`에 적용 가능한 순서를 정한다.

## 선택한 작업 모드

`standard`

## 계획 근거

- 사용자 요청은 조사 중심이지만 프로젝트 요구사항과 적용 구조를 남기는 durable 변경이다.
- 발표 에이전트는 이미 `deck-spec`, HTML, PPTX 산출물을 갖고 있어 품질 하네스 후보를 프로젝트 내부에 연결할 수 있다.
- 설치는 아직 필요하지 않으므로 의존성 추가 없이 설정과 문서, 요구사항, 스펙을 먼저 남긴다.

## 실행 계획

1. 웹 검색으로 LLM/agent eval, browser/visual/accessibility, presentation-specific benchmark를 분리 조사한다.
2. 현재 `presentation-agent` 구조와 맞는 적용 순서를 판단한다.
3. `REQ-PA-014`를 추가한다.
4. `harness-candidates.json`으로 후보, gate, 우선순위를 설정화한다.
5. 연구 노트, workflow, spec, history, 평가를 남긴다.
6. 설치 없이 가능한 검증을 실행한다.

## 적용 판단

- 즉시: no-install `deck-spec` 품질 하네스.
- 다음: Playwright HTML smoke test.
- 그 다음: axe-core accessibility scan.
- 이후: visual regression, promptfoo/DeepEval/Inspect AI.
- 참고: PPTAgent, SlideAudit, PresentBench의 rubric/taxonomy.
