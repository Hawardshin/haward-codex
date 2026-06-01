# 오픈소스 하네스 조사: 발표 에이전트 적용 후보

## 조사 질문

핫한 오픈소스 평가/검증 하네스 중 `presentation-agent`에 바로 적용하거나 다음 단계로 검토할 만한 것이 있는가.

## 결론

바로 설치할 도구보다 먼저 만들 가치가 큰 것은 프로젝트 내부의 no-install `deck-spec` 품질 하네스다. 그 다음 적용 후보는 HTML 발표 덱을 실제 브라우저에서 열어 보는 Playwright, 접근성 자동 검사를 위한 `@axe-core/playwright`, 이후 시각 회귀와 LLM prompt regression 하네스다.

## 주요 출처와 판단

| 출처 | 유형 | 확인 내용 | 적용 판단 |
| --- | --- | --- | --- |
| Inspect AI | 공식 문서/저장소 | UK AI Security Institute와 Meridian Labs가 개발한 LLM evaluation framework이며 datasets, solvers, scorers, agents, sandbox, web view를 제공한다. | 발표 생성이 agentic workflow로 확장되면 좋은 상위 구조 참고. 지금은 설치 보류. |
| OpenAI Evals | 공식 cookbook/저장소 | eval은 dataset과 eval class/YAML 구조로 구성되고 model-graded templates를 쓸 수 있다. | 직접 도입보다 평가 데이터셋과 eval class 패턴 참고. |
| promptfoo | 공식 저장소 | prompt, agent, RAG 평가와 red teaming, CLI/CI 흐름, 로컬 실행, MIT 라이선스를 제공한다. | script/deck generation prompt가 안정화되면 prompt regression 후보. |
| DeepEval | 공식 저장소 | LLM app을 Pytest처럼 평가하고 hallucination, task completion, answer relevancy 같은 metric을 제공한다. | Python 생태계와 맞지만 API/key/cost 문제가 있어 나중 후보. |
| Playwright | 공식 문서 | screenshot comparison과 text/binary snapshot 기능을 제공하며, host OS/font/browser 차이로 결과가 흔들릴 수 있다고 경고한다. | HTML 덱 렌더 smoke와 navigation check에 강한 후보. visual baseline은 환경 고정 후. |
| Playwright + axe | 공식 문서 | `@axe-core/playwright`로 contrast, label, duplicate ID 같은 자동 탐지 가능한 접근성 이슈를 잡을 수 있다. | HTML 덱 접근성 검증 후보. 수동 발표 품질 검토는 별도 필요. |
| AgentLab/BrowserGym/WebArena/OSWorld | 공식/저장소 | web/browser/desktop agent benchmark를 묶어 실행하는 구조와 task/dependency 관리를 보여준다. | 발표 덱 생성 자체에는 직접 맞지 않고, 나중에 브라우저를 조작하는 agent 평가에 참고. |
| PPTAgent/PPTEval | 논문 | 발표 생성을 인간 workflow에 가까운 reference analysis와 edit-based generation으로 보고 Content, Design, Coherence 평가 축을 제안한다. | local rubric 설계에 유용. |
| SlideAudit | 논문 | 2400개 slide와 design flaw taxonomy를 만들었고 AI의 자동 결함 탐지가 아직 어렵다는 결과를 제시한다. | 자동 평가를 과신하지 않게 하는 taxonomy와 경고로 유용. |
| PresentBench | 논문 | slide generation을 fine-grained binary checklist로 평가하는 방향을 제안한다. | 발표별 checklist 기반 acceptance criteria 설계에 유용. |

## 적용 우선순위

1. `quality_harness.py`를 만들어 `deck-spec`의 필수 필드, speaker notes, evidence sources, layout coverage, text density, remote asset guard를 검사한다.
2. 설치 감사 후 Playwright를 도입해 생성 HTML을 열고 slide navigation, viewport, nonblank 상태를 검사한다.
3. Playwright와 함께 axe-core를 도입해 자동 접근성 위반을 잡는다.
4. 브라우저/OS/font/viewport가 고정되면 screenshot baseline을 도입한다.
5. promptfoo 또는 DeepEval은 발표 스크립트/디자인 프롬프트가 안정화된 후 prompt drift 검증에 사용한다.
6. Inspect AI는 발표 에이전트가 여러 tool과 agent를 포함하는 평가 시나리오로 커질 때 검토한다.

## 보류한 것

- Chromatic/Storybook은 componentized UI가 커진 뒤가 적절하다.
- BrowserGym/WebArena/OSWorld는 브라우저 agent 평가에는 좋지만 현재 HTML/PPT 생성 검증에는 과하다.
- 논문 벤치마크는 출처와 taxonomy로 사용하되, 이 프로젝트의 acceptance 기준으로 그대로 옮기지 않는다.

## 불확실성

- GitHub star, Reddit, community activity는 채택 신호일 뿐 정확성 증거가 아니다.
- 일부 2026년 slide benchmark는 최신 연구라 재현성, 코드 공개 범위, 실제 유지보수 상태를 별도 확인해야 한다.
- Playwright screenshot은 OS/font 차이에 민감하므로 CI 환경 없이 blocking으로 두면 오탐이 늘 수 있다.

## 다음 작업 제안

- 다음 구현 단계에서는 `presentation-agent/src/presentation_agent/quality_harness.py`와 `tests/test_quality_harness.py`를 추가한다.
- 브라우저 하네스는 설치 감사, `package.json`, local command, rollback 계획을 먼저 만든 뒤 도입한다.
