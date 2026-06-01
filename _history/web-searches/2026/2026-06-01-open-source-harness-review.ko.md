# 웹 검색 기록: 오픈소스 하네스 적용 검토

## 요청

핫한 오픈소스 하네스들을 보고 현재 발표 에이전트와 플랫폼에 적용할 만한 것이 있는지 조사한다.

## 작업 모드

`standard`

## 검색 시각

2026-06-01

## 검색 쿼리

- `2026 open source AI agent evaluation harness Inspect AI promptfoo DeepEval OpenAI Evals GitHub official`
- `open source browser agent benchmark harness BrowserGym WebArena OSWorld GitHub official`
- `open source visual regression accessibility testing harness Playwright axe-core Storybook Chromatic official`
- `presentation slide evaluation benchmark PPTAgent SlideAudit PPTArena arXiv GitHub`
- `Inspect AI official evaluation framework open source GitHub UK AI Safety Institute`
- `OpenAI Evals GitHub official eval framework`
- `Playwright official end-to-end testing screenshots visual comparisons`
- `axe-core official GitHub accessibility testing engine Playwright`

## 확인한 주요 출처

- Inspect AI official docs: https://inspect.aisi.org.uk/
- Inspect AI GitHub: https://github.com/UKGovernmentBEIS/inspect_ai
- OpenAI Evals cookbook: https://developers.openai.com/cookbook/examples/evaluation/getting_started_with_openai_evals
- promptfoo GitHub: https://github.com/promptfoo/promptfoo
- DeepEval GitHub: https://github.com/confident-ai/deepeval
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- AgentLab GitHub: https://github.com/ServiceNow/AgentLab
- PPTAgent: https://arxiv.org/abs/2501.03936
- SlideAudit: https://arxiv.org/abs/2508.03630
- PresentBench: https://arxiv.org/abs/2603.07244

## 무시하거나 낮게 본 출처

- Reddit 글과 SEO성 비교 글은 adoption/discovery signal로만 보았고 사실 근거로 쓰지 않았다.
- Chromatic은 유용하지만 SaaS 성격이 강하고 현재 project-local OSS 하네스 우선순위에는 맞지 않아 보류했다.
- BrowserGym/WebArena/OSWorld 계열은 browser agent benchmark로 의미가 있지만, 현재 발표 덱 생성 품질 검증에는 직접 적용성이 낮아 보류했다.

## 판단

- 즉시 설치보다 내부 no-install `deck-spec` 품질 하네스가 더 적합하다.
- HTML 발표 덱 검증에는 Playwright가 가장 직접적인 후보이며, 접근성 검사는 axe-core와 결합하는 것이 적합하다.
- screenshot regression은 Playwright가 지원하지만 OS/browser/font 차이로 흔들릴 수 있으므로 환경 고정 후 적용해야 한다.
- promptfoo, DeepEval, Inspect AI는 발표 스크립트/디자인 생성 프롬프트가 반복 가능한 데이터셋 형태가 된 뒤 도입한다.
- PPTAgent/SlideAudit/PresentBench는 도구 설치보다 rubric/taxonomy로 흡수하는 것이 현재 단계에 맞다.

## 계획 영향

- `presentation-agent/configs/evaluation/harness-candidates.json`을 추가해 후보, gate, 우선순위를 관리한다.
- `REQ-PA-014`로 발표 품질 하네스 요구사항을 추가한다.
- 다음 구현 후보는 `quality_harness.py`와 `test_quality_harness.py`다.

## 불확실성

- 일부 최신 논문/벤치마크는 실제 코드 공개와 유지보수 상태를 별도로 확인해야 한다.
- 시각 회귀는 CI 환경이 정해지기 전까지 nonblocking advisory로 두는 것이 안전하다.
