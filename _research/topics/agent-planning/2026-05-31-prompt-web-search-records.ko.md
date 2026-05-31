# 프롬프트별 웹 검색 기록

## 질문

모든 프롬프트 실행 전에 웹 검색을 수행하고, 나중에 사용자가 확인할 수 있는 검색 과정 텍스트를 남기려면 어떤 구조가 좋은가?

## 확인한 출처

| 출처 | 유형 | 확인일 | 활용 |
| --- | --- | --- | --- |
| [OpenAI Web search docs](https://platform.openai.com/docs/guides/tools-web-search) | 공식 문서 | 2026-05-31 | 웹 검색 call, 쿼리, URL citation annotation, inline citation 표시 요구를 참고했다. |
| [Anthropic Search results docs](https://docs.anthropic.com/en/docs/build-with-claude/search-results) | 공식 문서 | 2026-05-31 | 검색 결과에 source/title/content를 구조화하고 citation 설정으로 attribution을 활성화하는 방식을 참고했다. |
| [Firebase AI Logic: Grounding with Google Search](https://firebase.google.com/docs/ai-logic/grounding-google-search) | 공식 문서 | 2026-05-31 | grounding metadata에 검색 쿼리, 결과, 출처가 포함되고 grounded result는 출처 표시가 필요하다는 점을 참고했다. |

## 인사이트

- 프롬프트 단위 웹 검색 기록은 단순 로그가 아니라 close-out 산출물이어야 한다.
- 기록 항목은 `queries`, `sources_checked`, `ignored_sources`, `insights_applied`, `uncertainty`, `public_decision_summary`로 표준화한다.
- 내부 추론 원문을 저장하는 대신 사용자가 검증 가능한 검색 판단 요약을 저장한다.
- 평가 에이전트가 `web_search_record_targets` 누락을 blocking gap으로 처리해야 규칙이 유지된다.
- 검색 결과는 citation처럼 검증 핸들로 다루고, 제목이나 인기 신호만으로 사실 근거로 쓰지 않는다.

## 적용

- `_ops/prompts/README.ko.md`에 모든 프롬프트 공통 계약을 추가한다.
- `_history/web-searches/`를 웹 검색 기록 저장소로 둔다.
- `_templates/web-search-record/`에 한국어/영어 템플릿을 둔다.
- `work-evaluator-agent` 입력과 검증 코드에 `web_search_record_targets`를 추가한다.

## 불확실성

이 노트는 공식 문서 중심으로 확인했다. 실제 자동화 도구가 검색 쿼리와 citation metadata를 얼마나 자세히 제공하는지는 사용하는 런타임과 API에 따라 달라질 수 있다.
