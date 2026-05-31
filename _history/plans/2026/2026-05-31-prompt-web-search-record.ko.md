# 계획 기록: 프롬프트별 웹 검색 기록 의무화

## 초기 요청

사용자는 앞으로 항상 웹 검색을 프롬프트마다 수행하고, 그 사고 과정도 텍스트에 넣도록 요구했다.

## 검색 질문

- 에이전트 웹 검색 결과는 어떤 쿼리/출처/citation 정보를 남기는가?
- 검색 기반 답변이나 grounding 결과를 사용자에게 검증 가능하게 보여주는 표준은 무엇인가?
- 내부 추론을 노출하지 않고도 사용자가 확인 가능한 판단 요약을 남기려면 어떤 필드가 필요한가?

## 사용한 검색 채널

- Codex web search
- 로컬 저장소 검색: `_ops/prompts/`, `_docs/web-first-work-policy.*`, `work-evaluator-agent`

## 확인한 출처

- OpenAI Web search docs
- Anthropic Search results docs
- Firebase AI Logic Grounding with Google Search
- 기존 내부 문서: `_docs/web-first-work-policy.ko.md`, `_ops/prompts/05-web-first-intake.md`, `_ops/workflows/40-evaluate-and-rework.md`

## 도출한 인사이트

- 모든 프롬프트에 같은 문장을 반복하기보다 `_ops/prompts/README.*` 공통 계약을 두고 각 프롬프트가 이를 상속한다.
- 의미 있는 작업의 검색 과정은 `_history/web-searches/YYYY/`에 저장한다.
- 저장 대상은 raw internal reasoning이 아니라 검색어, 출처, 제외한 출처, 계획 반영 인사이트, 불확실성, 공개 판단 요약이다.
- 평가 에이전트가 `web_search_record_targets` 누락을 blocking gap으로 잡아야 규칙이 빠지지 않는다.

## 선택한 계획

1. 웹 검색 기록 README와 템플릿을 만든다.
2. 모든 `_ops/prompts/*.md`에 공통 계약을 연결한다.
3. 웹 우선 정책, 운영 허브, start/close/evaluate 워크플로를 갱신한다.
4. `work-evaluator-agent` 코드, 템플릿, 테스트에 `web_search_record_targets`를 추가한다.
5. 메모리 부트스트랩 manifest에 웹 검색 기록 정책 anchor를 추가한다.
6. 리서치 노트, 히스토리, 작업 요약, 평가 보고서를 남긴다.
7. 검증 후 commit/push 한다.

## 보류한 선택지

- 내부 chain-of-thought 전체 저장: 정책상 부적절하고, 사용자가 검증할 수 있는 공개 판단 요약으로 대체한다.
- 모든 검색 기록을 `_research/`에 저장: 재사용 가치가 있는 조사만 `_research/`로 보내고, 실행별 기록은 `_history/web-searches/`에 둔다.

## 위험과 불확실성

- 자동 도구별로 검색 metadata 제공 수준이 다를 수 있다.
- 웹 검색이 실패하거나 무관한 경우도 있으므로 실패 사유와 로컬 검증을 기록하는 예외 규칙이 필요하다.

## 검증 방법

- work evaluator 단위 테스트
- JSON 형식 검증
- memory bootstrap 검증
- config contract 검증
- workspace map/task board 재생성 및 check
- knowledge/grounding/evaluation CLI 확인

## 계획 변경 이력

- 2026-05-31: 최초 작성.
