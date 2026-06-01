# 요청-결과 추적: 오픈소스 하네스 적용 검토

## 요청

핫한 오픈소스 하네스를 조사하고 현재 발표 에이전트와 플랫폼에 적용할 만한 것이 있는지 찾는다.

## 작업 모드

`standard`

## 요구사항

- `REQ-PA-014`: 발표 품질 하네스.

## 결과

- 새 의존성 설치 없이 하네스 후보와 도입 순서를 정리했다.
- 즉시 다음 구현 후보를 no-install `deck-spec` 품질 하네스로 정했다.
- Playwright/axe-core는 설치 감사 후 HTML 렌더와 접근성 검증 후보로 분리했다.
- promptfoo, DeepEval, Inspect AI는 프롬프트 기반 생성이 안정화된 뒤 도입할 후보로 분리했다.
- PPTAgent, SlideAudit, PresentBench는 local rubric/taxonomy 참고 자료로 분리했다.

## 산출물

- `presentation-agent/configs/evaluation/harness-candidates.json`
- `presentation-agent/docs/research/2026-06-01-open-source-harness-review.ko.md`
- `presentation-agent/docs/workflows/presentation-quality-harness-workflow.ko.md`
- `_research/topics/presentation/2026-06-01-open-source-harness-review.ko.md`
- `_history/web-searches/2026/2026-06-01-open-source-harness-review.ko.md`
- `presentation-agent/specs/2026-06-01-open-source-harness-review/`

## 평가

- 평가 파일: `_history/evaluations/2026/2026-06-01-open-source-harness-review.ko.md`
- 시간 기록: `_history/work-timings/2026/2026-06-01-open-source-harness-review.json`
