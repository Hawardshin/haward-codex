# 발표 품질 하네스 워크플로

## 목적

발표 에이전트가 만든 `deck-spec`, HTML 덱, PPTX 산출물을 매번 눈대중으로만 확인하지 않도록 반복 가능한 품질 하네스 흐름을 둔다.

## 기본 순서

1. `deck-spec` 정적 검사를 먼저 실행한다.
   - 필수 메타데이터와 슬라이드 필드가 있는지 확인한다.
   - `script_beat`, `speaker_notes`, `evidence_sources` 누락을 확인한다.
   - 슬라이드 수, 레이아웃 분포, 제목 길이, 본문 밀도, 원격/미확인 에셋 사용 여부를 확인한다.
2. 기존 Python 단위 테스트와 카탈로그 검증을 실행한다.
3. HTML 덱을 재생성하고 원격 에셋이 없는지 정적 검사한다.
4. Playwright 검증은 `cd presentation-agent && npm run test:browser`로 실행한다.
   - Chromium desktop/mobile viewport에서 HTML 덱이 열린다.
   - `.pa-slide`가 있는 실제 덱만 검증하고, 링크 인덱스 HTML은 제외한다.
   - 키보드 이동, nonblank slide, 진행률, 발표자 노트 토글을 확인한다.
5. axe-core 검증은 같은 Playwright test 안에서 자동 접근성 위반을 확인한다. 단, 자동 검사만으로 발표 품질이 보장된다고 보지 않는다.
6. 시각 회귀 검증은 브라우저, OS, font, viewport, snapshot update 규칙이 고정된 뒤 blocking check로 승격한다.
7. LLM/에이전트 평가 하네스는 프롬프트 입출력 계약이 안정된 뒤 prompt drift와 evidence grounding 회귀 검사에 사용한다.

## 채택 우선순위

- 1순위: Python 기반 no-install `deck-spec` 품질 하네스.
- 2순위: Playwright HTML 렌더 smoke test. 현재 `presentation-agent`에 설치됨.
- 3순위: `@axe-core/playwright` 접근성 scan. 현재 `presentation-agent`에 설치됨.
- 4순위: Playwright screenshot baseline.
- 5순위: promptfoo, DeepEval, Inspect AI 같은 LLM/agent 평가 하네스.

## 보류 기준

- 하네스가 현재 산출물과 맞지 않고 설치만 늘리는 경우 보류한다.
- 시각 회귀가 font/OS 차이로 과도하게 흔들리면 nonblocking advisory로 둔다.
- LLM judge 결과가 근거 없는 선호도 평가에 머물면 발표 품질 기준으로 쓰지 않는다.
- 논문 벤치마크는 local rubric으로 번역되기 전까지 참고 자료로만 쓴다.

## 관련 설정

- `presentation-agent/configs/evaluation/harness-candidates.json`
- `presentation-agent/docs/research/2026-06-01-open-source-harness-review.ko.md`
- `presentation-agent/playwright.config.ts`
- `presentation-agent/tests/browser/html-deck.spec.ts`
