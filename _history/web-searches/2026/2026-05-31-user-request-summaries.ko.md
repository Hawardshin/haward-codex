# 2026-05-31 웹 검색 기록: 사용자 요청 요약 저장

## 사용자 지시 요약

사용자는 자신이 요청한 다양한 프롬프트와 지시를 원문 전체가 아니어도 요약해서 파일로 저장하라고 지시했다.

## 검색 실행

- 검색 시각: 2026-05-31
- 검색어:
  - `AI agent conversation memory user instruction summarization request logs best practices`
  - `LLM agent memory summarization user preferences instructions history durable notes paper`
  - `software project decision log user requests issue summaries changelog best practices`
  - `Microsoft Agent Framework memory persistence agents documentation`
  - `AgentMemory.md AI agent memory documentation`
  - `Memory Matters The Need to Improve Long-Term Memory in LLM-Agents AAAI paper`
  - `Keep a Changelog changelog format official`
- 검색 도구: Codex web search

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| [Memory Matters](https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688) | 논문 | 2026-05-31 | 에이전트 장기 메모리에서 memory type separation이 필요하다는 관점을 참고했다. |
| [Microsoft Agent Framework Memory & Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory) | 공식 문서 | 2026-05-31 | session state, context provider, history provider를 통해 장기 컨텍스트를 주입/저장하는 구조를 참고했다. |
| [agentmemory.md](https://agentmemory.md/) | 오픈소스 도구 문서 | 2026-05-31 | 결정, 목표, 선호, 작업을 구조화된 메모리 타입으로 나누는 관점을 참고했다. |
| [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | 문서화 관행 | 2026-05-31 | 시간이 지나도 읽히는 변경 기록은 사람이 이해할 수 있어야 한다는 관점을 참고했다. |

## 제외하거나 약한 출처

| 출처 | 이유 |
| --- | --- |
| 개인 블로그/Reddit 메모리 경험담 | 실무 신호로는 참고했지만, 저장소 정책 근거로는 공식 문서와 논문을 우선했다. |
| 특정 제품 마케팅성 memory 문서 | 이 저장소의 일반 운영 규칙으로 직접 채택하기에는 제품 의존성이 컸다. |

## 계획에 반영한 인사이트

- 사용자 요청은 전체 원문보다 의미 요약, 지속 규칙 여부, 반영 위치를 구조화해 저장한다.
- 사용자 요청 요약은 작업 요약과 별도 계층으로 둔다.
- 종료 평가에서 `user_request_summary_targets`를 확인해 누락을 방지한다.
- 오래된 요청 요약은 지식 베이스처럼 틀릴 수 있으므로 중요한 판단에는 skeptic 검증을 연결한다.

## 공개 판단 요약

사용자 요청 요약은 장기 메모리의 사용자 의도 계층이다. 전체 채팅을 저장하지 않아도 요청의 핵심 의미와 반영 위치를 추적할 수 있어야 하므로 `_history/user-requests/`를 별도 계층으로 둔다.

## 연결

- 요청 요약: `_history/user-requests/2026/2026-05-31.ko.md`
- 계획 기록: `_history/plans/2026/2026-05-31-user-request-summaries.ko.md`
- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-user-request-summaries.ko.md`
