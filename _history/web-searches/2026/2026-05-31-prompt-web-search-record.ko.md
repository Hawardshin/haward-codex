# 2026-05-31 웹 검색 기록: 프롬프트별 웹 검색 기록 의무화

## 사용자 지시 요약

사용자는 모든 프롬프트마다 웹 검색을 반드시 수행하고, 그 판단 과정도 텍스트에 남기라고 지시했다.

## 검색 실행

- 검색 시각: 2026-05-31
- 검색어:
  - `OpenAI web search tool citation grounding official docs`
  - `Anthropic Claude web search citations official documentation`
  - `Google Search grounding AI official documentation`
- 검색 도구: Codex web search

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| [OpenAI Web search docs](https://platform.openai.com/docs/guides/tools-web-search) | 공식 문서 | 2026-05-31 | 웹 검색 응답이 search call, cited URL annotations, inline citations를 포함한다는 구조를 참고했다. |
| [Anthropic Search results docs](https://docs.anthropic.com/en/docs/build-with-claude/search-results) | 공식 문서 | 2026-05-31 | 검색 결과에 source/title을 넣고 citation을 활성화하는 RAG식 attribution 구조를 참고했다. |
| [Firebase AI Logic: Grounding with Google Search](https://firebase.google.com/docs/ai-logic/grounding-google-search) | 공식 문서 | 2026-05-31 | grounding metadata, search queries, web results, source display 요구를 참고했다. |

## 제외하거나 약한 출처

| 출처 | 이유 |
| --- | --- |
| Reddit/SEO 관련 검색 결과 | 실무 신호로는 참고 가능하지만, 이 정책의 근거로는 공식 문서보다 약하다. |

## 계획에 반영한 인사이트

- 모든 프롬프트 실행은 웹 검색 기록을 남기는 공통 계약을 가져야 한다.
- 최종 산출물에는 raw internal reasoning이 아니라 검색어, 출처, 적용 인사이트, 공개 판단 요약을 남긴다.
- 종료 평가에서 `web_search_record_targets` 누락을 blocking gap으로 잡아야 미래 작업에서 빠지지 않는다.

## 공개 판단 요약

웹 검색은 최신성 확인과 근거 검증을 위한 기본 단계다. 프롬프트별로 검색 기록을 남기면 사용자는 왜 특정 방향으로 계획했는지 확인할 수 있고, 미래 에이전트는 같은 조사를 반복하지 않아도 된다.

## 연결

- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 계획 기록: `_history/plans/2026/2026-05-31-prompt-web-search-record.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-prompt-web-search-record.ko.md`
