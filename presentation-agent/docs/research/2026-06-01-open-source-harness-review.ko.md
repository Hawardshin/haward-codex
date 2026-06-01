# 발표 에이전트 오픈소스 하네스 적용 검토

## 요약

현재 `presentation-agent`에 바로 맞는 것은 대형 agent benchmark 설치가 아니라, `deck-spec`과 생성 HTML/PPTX를 반복 검사하는 작은 품질 하네스다. 외부 하네스는 아래 순서로 적용하는 것이 유지보수 비용 대비 효과가 좋다.

1. 내부 Python 정적 품질 하네스: 즉시 적용.
2. Playwright HTML 렌더 smoke: 설치 감사 후 적용.
3. `@axe-core/playwright` 접근성 검사: Playwright와 함께 적용.
4. Playwright screenshot regression: 렌더링 환경 고정 후 적용.
5. promptfoo/DeepEval/Inspect AI: prompt-driven generation이 안정화된 뒤 적용.

## 현재 구조와의 맞춤

- `html_deck.py`와 단위 테스트는 생성 경로를 이미 검증한다.
- `deck-spec`에는 발표 스크립트, 발표자 노트, 근거 출처가 들어가므로 정적 품질 검사의 효과가 크다.
- HTML 산출물은 브라우저에서 실제로 보여야 하므로 Playwright 계열이 자연스럽다.
- PPTX 산출물은 artifact-tool 경로가 있으므로, 우선 구조/텍스트/노트 보존 검증을 유지하고 픽셀 faithful 검증은 뒤로 둔다.

## 권장 적용 구조

### 1단계: no-install 정적 하네스

- `presentation-agent/src/presentation_agent/quality_harness.py`
- `presentation-agent/tests/test_quality_harness.py`
- 검사 항목:
  - 필수 metadata와 slide field
  - `script_beat`, `speaker_notes`, `evidence_sources`
  - 슬라이드 수와 layout diversity
  - 제목 길이와 본문 밀도
  - 원격 asset과 라이선스 불명 asset
  - 근거 없는 factual claim 후보

### 2단계: 브라우저 smoke

- 후보: Playwright
- 검사 항목:
  - 생성 HTML이 desktop/mobile-like viewport에서 열린다.
  - slide가 blank가 아니다.
  - keyboard navigation과 progress가 동작한다.
  - print stylesheet와 presenter notes 영역이 존재한다.

### 3단계: 접근성

- 후보: `@axe-core/playwright`
- 검사 항목:
  - 자동 탐지 가능한 contrast, label, duplicate ID, aria 위반
  - 단, 발표용 화면의 리듬, 감정선, 설득력은 수동/LLM rubric 검토가 필요하다.

### 4단계: 시각 회귀

- 후보: Playwright screenshot comparison
- 선결 조건:
  - OS/browser/font/viewport 고정
  - baseline update 승인 규칙
  - dynamic element hide/normalize policy
  - CI 또는 동일 로컬 환경

### 5단계: LLM/prompt regression

- 후보: promptfoo, DeepEval, Inspect AI, OpenAI Evals pattern
- 적용 시점:
  - 발표 brief 입력과 `deck-spec` 출력 계약이 안정화된 뒤
  - 모델별 출력 차이를 비교할 필요가 생긴 뒤
  - 비용, API key, privacy 정책이 정리된 뒤

## 하네스 후보 상태

상세 후보와 채택 gate는 `presentation-agent/configs/evaluation/harness-candidates.json`에 기록했다.

## 근거 자료

- Inspect AI: https://inspect.aisi.org.uk/
- OpenAI Evals cookbook: https://developers.openai.com/cookbook/examples/evaluation/getting_started_with_openai_evals
- promptfoo: https://github.com/promptfoo/promptfoo
- DeepEval: https://github.com/confident-ai/deepeval
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- AgentLab: https://github.com/ServiceNow/AgentLab
- PPTAgent: https://arxiv.org/abs/2501.03936
- SlideAudit: https://arxiv.org/abs/2508.03630
- PresentBench: https://arxiv.org/abs/2603.07244
